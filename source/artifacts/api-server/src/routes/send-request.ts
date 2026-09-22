import { Router, type IRouter } from "express";
import tls from "node:tls";

const router: IRouter = Router();
const recipient = "pfsokol54@gmail.com";
const smtpHost = "smtp.gmail.com";
const smtpPort = 465;

type SendRequestBody = {
  formType?: "request" | "estimate";
  fields?: Record<string, unknown>;
};

const fieldLabels: Record<string, string> = {
  name: "Имя",
  phone: "Телефон",
  email: "Почта",
  request: "Текст запроса",
  height: "Высота проёма, мм",
  width: "Ширина проёма, мм",
  color: "Цвет рольставней",
  closing: "Способ закрытия",
  placement: "Размещение",
  comment: "Комментарий",
  contact: "Удобный способ связи",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

type SmtpResponse = {
  code: number;
  text: string;
};

function sendSmtpMail({
  username,
  password,
  from,
  to,
  subject,
  html,
}: {
  username: string;
  password: string;
  from: string;
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: smtpHost, port: smtpPort, servername: smtpHost });
    let buffer = "";
    let settled = false;

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      socket.removeAllListeners();
      socket.end();
      if (error) reject(error);
      else resolve();
    };

    const readResponse = () => new Promise<SmtpResponse>((resolveResponse, rejectResponse) => {
      const onData = (chunk: Buffer) => {
        buffer += chunk.toString("utf8");
        const lines = buffer.split(/\r?\n/);
        const finalLineIndex = lines.findIndex((line) => /^\d{3} /.test(line));
        if (finalLineIndex === -1) return;
        const finalLine = lines[finalLineIndex];
        buffer = lines.slice(finalLineIndex + 1).join("\r\n");
        cleanup();
        const code = Number(finalLine.slice(0, 3));
        const text = lines.slice(0, finalLineIndex + 1).join(" ");
        if (code >= 400) rejectResponse(new Error(`SMTP ${code}: ${text}`));
        else resolveResponse({ code, text });
      };

      const onError = (error: Error) => {
        cleanup();
        rejectResponse(error);
      };
      const cleanup = () => {
        socket.off("data", onData);
        socket.off("error", onError);
      };

      socket.on("data", onData);
      socket.once("error", onError);
    });

    const command = async (value: string, expectedCode?: number) => {
      socket.write(`${value}\r\n`);
      const response = await readResponse();
      if (expectedCode && response.code !== expectedCode) {
        throw new Error(`SMTP expected ${expectedCode}, received ${response.code}`);
      }
      return response;
    };

    socket.once("secureConnect", async () => {
      try {
        await readResponse();
        await command(`EHLO sokol-landing.ru`, 250);
        await command("AUTH LOGIN", 334);
        await command(Buffer.from(username).toString("base64"), 334);
        await command(Buffer.from(password).toString("base64"), 235);
        await command(`MAIL FROM:<${from}>`, 250);
        await command(`RCPT TO:<${to}>`, 250);
        await command("DATA", 354);

        const message = [
          `From: ПФ СОКОЛ <${from}>`,
          `To: ${to}`,
          `Subject: ${subject}`,
          "MIME-Version: 1.0",
          'Content-Type: text/html; charset="UTF-8"',
          "Content-Transfer-Encoding: 8bit",
          "",
          html,
        ].join("\r\n").replace(/^\./gm, "..");
        socket.write(`${message}\r\n.\r\n`);
        await readResponse();
        await command("QUIT", 221);
        finish();
      } catch (error) {
        finish(error instanceof Error ? error : new Error("SMTP request failed"));
      }
    });

    socket.once("error", (error) => finish(error));
  });
}

router.post("/send-request", async (req, res): Promise<void> => {
  const body = req.body as SendRequestBody;
  const fields = body.fields;

  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    res.status(400).json({ success: false, error: "Данные формы не переданы" });
    return;
  }

  const normalizedFields = Object.entries(fields).reduce<Record<string, string>>((result, [key, value]) => {
    if (typeof value === "string" && value.trim()) {
      result[key] = value.trim().slice(0, 4000);
    }
    return result;
  }, {});

  if (!normalizedFields.name || !normalizedFields.phone) {
    res.status(400).json({ success: false, error: "Имя и телефон обязательны" });
    return;
  }

  const username = process.env.MAIL_SMTP_USER ?? recipient;
  const password = process.env.MAIL_SMTP_PASSWORD;
  if (!password) {
    req.log.error("MAIL_SMTP_PASSWORD is not configured");
    res.status(503).json({ success: false, error: "Почтовая отправка пока не настроена на сервере" });
    return;
  }

  const isEstimate = body.formType === "estimate";
  const subject = isEstimate
    ? `Анкета для расчёта сметы ПФ СОКОЛ — ${normalizedFields.name}`
    : `Заявка с сайта ПФ СОКОЛ — ${normalizedFields.name}`;
  const rows = Object.entries(normalizedFields)
    .filter(([key]) => fieldLabels[key])
    .map(([key, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e6e8ec;color:#697386">${escapeHtml(fieldLabels[key])}</td><td style="padding:8px 12px;border-bottom:1px solid #e6e8ec">${escapeHtml(value)}</td></tr>`)
    .join("");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#111a38">
      <h2>${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px">${rows}</table>
      <p style="color:#697386;font-size:12px;margin-top:20px">Отправлено с сайта ПФ СОКОЛ.</p>
    </div>
  `;

  try {
    await sendSmtpMail({
      username,
      password,
      from: username,
      to: recipient,
      subject,
      html,
    });
    req.log.info({ formType: body.formType ?? "request" }, "Form email sent");
    res.json({ success: true });
  } catch (error) {
    req.log.error({ err: error }, "SMTP email request failed");
    res.status(502).json({ success: false, error: "Не удалось отправить письмо через Gmail" });
  }
});

export default router;