import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SokolEagleMark } from '@/components/sokol-eagle-mark';
import { DocumentsPage, LegalDocumentPage, legalDocuments } from '@/pages/legal';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import workPhoto01 from '@assets/q887KnWlW01vgzChEzTX4e_eWjkFaH3w50WwgHHDx898g78fj4bshsQVGQl_f2_1789833489841.jpg';
import workPhoto02 from '@assets/xdRaF88Lf3jpg0cgWhmF7tAp0fRIxlbz1DFojgVHYLOTAv8htpRCC8VlnEXNqM_1789833489864.jpg';
import workPhoto03 from '@assets/53yqnKQq30i2h1BpyCcqC88zIM9HNW6jH3UjtphlHkOMIU4KQB4Q6q06XIfXNP_1789833489884.jpg';
import workPhoto04 from '@assets/Zf1im9q09Pj34LkUbs6vpqPfk0OyFXYvK4W-SClWADkkyfudv7_VLib11emVJO_1789833489908.jpg';
import workPhoto05 from '@assets/Dq5PhjWjB51BPLOzSHnOWK5p-3iRwSJrQC0VMl-m0FvykZL_x0mEpPEH97deaV_1789833489933.jpg';
import workPhoto06 from '@assets/rhZGOhXvAFMa5jP5AzOGO-u83U9d9p80ZGIxx3axoM8OYqAa84u3cvnS3YfXcG_1789833489957.jpg';
import workPhoto07 from '@assets/jlO26ekiNiEbTFidH32mVIx5JQRVF_sgO-i-7tRoamXvWaAaevfb-xrd31hsWu_1789833489982.jpg';
import workPhoto08 from '@assets/yBt4zdfDMt9FpdOH63mKunsNOypQjAsDSa0bs_YVi-QAw_8S-oIjv_WwJdqxPw_1789833490014.jpg';
import workPhoto09 from '@assets/VgU1TIApVI-GyPl_1zcgj7YAGBxYOqQ36cM5Ug1o3Qgkl_4nQgGj2PYtV2lVI6_1789833490043.jpg';
import workPhoto10 from '@assets/9JPoP1kW1ePVUDn_CgzwBjZQKETqVcVpOgqSyrNUwINdiLwkWFQSzN6uoyUZY__1789833490065.jpg';
import workPhoto11 from '@assets/wN1_dWgpez6npllKSnximKDTGTFnphyLRYj-CO1QA5SqhdbuYD1-lcVO2KIVm0_1789833490087.jpg';

const queryClient = new QueryClient();
const vkUrl = 'https://vk.ru/pf_sokol';
const phoneUrl = 'tel:+79513792830';
const emailUrl = 'mailto:pfsokol54@gmail.com';
const cookieConsentKey = 'cookie_consent';
const sitePath = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

const workPhotos = [
  { src: workPhoto01, alt: 'Остекление частного дома' },
  { src: workPhoto02, alt: 'Профили и комплектующие для окон' },
  { src: workPhoto03, alt: 'Окно в кирпичном доме' },
  { src: workPhoto04, alt: 'Панорамное окно в кирпичном доме' },
  { src: workPhoto05, alt: 'Оконный блок в квартире' },
  { src: workPhoto06, alt: 'Реализованный объект ПФ СОКОЛ' },
  { src: workPhoto07, alt: 'Оконное решение на объекте' },
  { src: workPhoto08, alt: 'Остекление жилого объекта' },
  { src: workPhoto09, alt: 'Готовое оконное решение' },
  { src: workPhoto10, alt: 'Остекление и монтаж на объекте' },
  { src: workPhoto11, alt: 'Оконная конструкция после монтажа' },
] as const;

type CookieConsent = 'accepted' | 'rejected';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="icon-arrow" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <path d={diagonal ? 'M3.5 13.5 13.5 3.5M5 3.5h8.5V12' : 'M2 8.5h12M9 3.5l5 5-5 5'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function SokolMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? 'scale-90 origin-left' : ''}`}>
      <span className="sokol-mark-icon">
        <SokolEagleMark compact />
        <span className="absolute -right-1 top-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--secondary))]" />
      </span>
      <span className="sokol-mark-copy">
        <span className="display text-[1rem] font-bold tracking-[-.06em]">СОКОЛ</span>
        <span className="sokol-mark-location">г. Новосибирск</span>
      </span>
    </div>
  );
}

function ExternalMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 4.5 5.4 5.8c-.8.5-1.1 1.5-.7 2.4 2.2 5.2 6.3 9.3 11.5 11.5.9.4 1.9.1 2.4-.7l1.3-2.1c.4-.7.2-1.6-.5-2l-2.7-1.6c-.6-.4-1.4-.2-1.8.3l-1 1.2a15.7 15.7 0 0 1-4.7-4.7l1.2-1c.5-.4.7-1.2.3-1.8L9.5 5c-.4-.7-1.3-.9-2-.5Z" fill="currentColor" />
    </svg>
  );
}

function WorksGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActiveIndex((index + workPhotos.length) % workPhotos.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % workPhotos.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = touchEndX - touchStartX.current;
    if (Math.abs(distance) > 45) {
      goTo(activeIndex + (distance < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  const activePhoto = workPhotos[activeIndex];

  return (
    <section className="works-section section light-grid" id="наши-работы" aria-labelledby="works-title">
      <div className="works-layout">
        <div className="reveal">
          <span className="eyebrow">04 / Наши объекты</span>
          <h2 className="section-heading display mt-7" id="works-title">Наши <em>работы.</em></h2>
          <p className="section-copy mt-8">
            Показываем реальные решения «ПФ СОКОЛ» — от отдельных окон и дверей до полного остекления дома.
          </p>
          <div className="works-meta mt-10">
            <span>ПФ СОКОЛ / портфолио</span>
            <span>{String(activeIndex + 1).padStart(2, '0')} / {String(workPhotos.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div
          className="works-carousel reveal delay-1"
          role="region"
          aria-roledescription="carousel"
          aria-label="Фотографии выполненных работ"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
            if (event.key === 'ArrowRight') goTo(activeIndex + 1);
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="works-frame">
            <img
              key={activePhoto.src}
              className="works-image"
              src={activePhoto.src}
              alt={activePhoto.alt}
              draggable="false"
            />
            <span className="works-frame-caption">Реализованный объект</span>
          </div>
          <div className="works-controls">
            <button className="works-arrow works-arrow-previous" type="button" aria-label="Предыдущая работа" onClick={() => goTo(activeIndex - 1)}>
              <Arrow diagonal={false} />
            </button>
            <div className="works-dots" aria-label="Выбрать работу">
              {workPhotos.map((photo, index) => (
                <button
                  className={`works-dot ${index === activeIndex ? 'is-active' : ''}`}
                  type="button"
                  key={photo.src}
                  aria-label={`Работа ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button className="works-arrow" type="button" aria-label="Следующая работа" onClick={() => goTo(activeIndex + 1)}>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CookieBanner({
  onChoose,
}: {
  onChoose: (choice: CookieConsent) => void;
}) {
  return (
    <aside className="cookie-banner" role="dialog" aria-label="Настройки cookies">
      <div className="cookie-copy">
        <span className="cookie-kicker">Настройки cookies</span>
        <p>
          Мы используем только необходимые технологии для работы сайта и сохранения
          вашего выбора. Аналитика и рекламные пиксели не подключены.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-button cookie-button-muted" type="button" onClick={() => onChoose('rejected')}>
          Отклонить
        </button>
        <button className="cookie-button cookie-button-primary" type="button" onClick={() => onChoose('accepted')}>
          Принять
        </button>
      </div>
    </aside>
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character] ?? character);
}

type FormKind = 'request' | 'estimate';

async function sendFormToServer(formType: FormKind, fields: Record<string, string>) {
  const response = await fetch('/api/send-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, fields }),
  });
  const result = await response.json().catch(() => null) as { success?: boolean; error?: string } | null;
  if (!response.ok || !result?.success) {
    throw new Error(result?.error ?? 'Не удалось отправить форму');
  }
}

function downloadWordDocument(subject: string, lines: string[], filename: string) {
  const documentHtml = `
    <html><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
    <body><h1>${escapeHtml(subject)}</h1>
    ${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join('')}
    </body></html>
  `;
  const documentUrl = URL.createObjectURL(new Blob([documentHtml], { type: 'application/msword' }));
  const downloadLink = document.createElement('a');
  downloadLink.href = documentUrl;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(documentUrl), 1000);
}

function RequestDialog({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const request = String(formData.get('request') ?? '').trim();
    const lines = [
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Почта: ${email}`,
      `Текст запроса: ${request}`,
    ];
    const subject = `Заявка с сайта ПФ СОКОЛ — ${name}`;
    setSending(true);
    setError(null);
    try {
      await sendFormToServer('request', { name, phone, email, request });
      downloadWordDocument(subject, lines, 'zayavka-pf-sokol.doc');
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Не удалось отправить форму');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="request-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="request-dialog" role="dialog" aria-modal="true" aria-labelledby="request-title">
        <div className="request-dialog-header">
          <div>
            <span className="eyebrow">ПФ СОКОЛ / заявка</span>
            <h2 id="request-title" className="request-title display">Оставить<br /><em>заявку.</em></h2>
          </div>
          <button className="request-close" type="button" onClick={onClose} aria-label="Закрыть форму">×</button>
        </div>
        {submitted ? (
          <div className="request-success">
            <strong>Заявка подготовлена.</strong>
            <p>Заявка отправлена на почту завода. Word-файл также скачан на ваш компьютер.</p>
            <button className="button-primary" type="button" onClick={onClose}>Закрыть</button>
          </div>
        ) : (
          <form className="request-form" onSubmit={handleSubmit}>
            <label>
              <span>Имя</span>
              <input name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" required />
            </label>
            <label>
              <span>Телефон</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" required />
            </label>
            <label>
              <span>Почта</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@example.ru" required />
            </label>
            <label className="request-form-wide">
              <span>Текст запроса</span>
              <textarea name="request" rows={4} placeholder="Опишите задачу, размеры или удобное время для связи" required />
            </label>
            <label className="request-consent request-form-wide">
              <input name="consent" type="checkbox" required />
              <span>Соглашаюсь на обработку персональных данных в соответствии с <a href={sitePath('/documents/privacy')} target="_blank" rel="noreferrer">политикой конфиденциальности</a>.</span>
            </label>
            {error && <p className="request-form-error request-form-wide" role="alert">{error}</p>}
            <div className="request-form-footer request-form-wide">
              <p>После отправки заявка уйдёт на почту завода, а Word-файл скачается автоматически.</p>
              <button className="button-primary" type="submit" disabled={sending}>{sending ? 'Отправляем…' : 'Отправить заявку'} {!sending && <Arrow />}</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

function EstimateDialog({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const height = String(formData.get('height') ?? '').trim();
    const width = String(formData.get('width') ?? '').trim();
    const color = String(formData.get('color') ?? '').trim();
    const closing = String(formData.get('closing') ?? '').trim();
    const placement = String(formData.get('placement') ?? '').trim();
    const comment = String(formData.get('comment') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const contact = String(formData.get('contact') ?? '').trim();
    const lines = [
      'Анкета для расчёта сметы',
      `Высота проёма: ${height} мм`,
      `Ширина проёма: ${width} мм`,
      `Цвет рольставней: ${color}`,
      `Способ закрытия: ${closing}`,
      `Размещение: ${placement}`,
      `Комментарий: ${comment || 'не указан'}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Удобный способ связи: ${contact}`,
    ];
    const subject = `Анкета для расчёта сметы ПФ СОКОЛ — ${name}`;
    setSending(true);
    setError(null);
    try {
      await sendFormToServer('estimate', { name, phone, height, width, color, closing, placement, comment, contact });
      downloadWordDocument(subject, lines, 'anketa-pf-sokol.doc');
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Не удалось отправить анкету');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="request-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="request-dialog estimate-dialog" role="dialog" aria-modal="true" aria-labelledby="estimate-title">
        <div className="request-dialog-header">
          <div>
            <span className="eyebrow">ПФ СОКОЛ / расчёт</span>
            <h2 id="estimate-title" className="request-title display">Анкета для<br /><em>сметы.</em></h2>
          </div>
          <button className="request-close" type="button" onClick={onClose} aria-label="Закрыть анкету">×</button>
        </div>
        {submitted ? (
          <div className="request-success">
            <strong>Анкета подготовлена.</strong>
            <p>Анкета отправлена на почту завода. Word-файл также скачан на ваш компьютер.</p>
            <button className="button-primary" type="button" onClick={onClose}>Закрыть</button>
          </div>
        ) : (
          <form className="request-form" onSubmit={handleSubmit}>
            <label>
              <span>Высота проёма, мм</span>
              <input name="height" type="number" min="1" placeholder="Например, 1800" required />
            </label>
            <label>
              <span>Ширина проёма, мм</span>
              <input name="width" type="number" min="1" placeholder="Например, 1200" required />
            </label>
            <label>
              <span>Цвет рольставней</span>
              <select name="color" defaultValue="" required>
                <option value="" disabled>Выберите цвет</option>
                <option>Белый</option>
                <option>Коричневый</option>
                <option>Антрацит</option>
                <option>Другой / пока не знаю</option>
              </select>
            </label>
            <label>
              <span>Способ закрытия</span>
              <select name="closing" defaultValue="" required>
                <option value="" disabled>Выберите вариант</option>
                <option>Ручной</option>
                <option>Автоматический</option>
                <option>Пока не знаю</option>
              </select>
            </label>
            <label>
              <span>Размещение</span>
              <select name="placement" defaultValue="" required>
                <option value="" disabled>Где установить</option>
                <option>Частный дом</option>
                <option>Квартира</option>
                <option>Офис / коммерческое помещение</option>
                <option>Другое</option>
              </select>
            </label>
            <label>
              <span>Удобный способ связи</span>
              <select name="contact" defaultValue="" required>
                <option value="" disabled>Как с вами связаться</option>
                <option>Телефонный звонок</option>
                <option>WhatsApp или Telegram</option>
                <option>Электронная почта</option>
              </select>
            </label>
            <label className="request-form-wide">
              <span>Комментарий</span>
              <textarea name="comment" rows={3} placeholder="Количество проёмов, адрес, пожелания или дополнительные размеры" />
            </label>
            <label>
              <span>Имя</span>
              <input name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" required />
            </label>
            <label>
              <span>Телефон</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" required />
            </label>
            <label className="request-consent request-form-wide">
              <input name="consent" type="checkbox" required />
              <span>Соглашаюсь на обработку персональных данных в соответствии с <a href={sitePath('/documents/privacy')} target="_blank" rel="noreferrer">политикой конфиденциальности</a>.</span>
            </label>
            {error && <p className="request-form-error request-form-wide" role="alert">{error}</p>}
            <div className="request-form-footer request-form-wide">
              <p>После отправки анкета уйдёт на почту завода, а Word-файл скачается автоматически.</p>
              <button className="button-primary" type="submit" disabled={sending}>{sending ? 'Отправляем…' : 'Подготовить анкету'} {!sending && <Arrow />}</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

function Home() {
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const [estimateOpen, setEstimateOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(cookieConsentKey);
    if (savedChoice === 'accepted' || savedChoice === 'rejected') {
      setCookieConsent(savedChoice);
    }
  }, []);

  const openRequest = () => {
    setRequestOpen(true);
  };
  const openEstimate = () => {
    setEstimateOpen(true);
  };
  const saveCookieChoice = (choice: CookieConsent) => {
    window.localStorage.setItem(cookieConsentKey, choice);
    setCookieConsent(choice);
  };

  return (
    <main className="site-shell">
      <section className="hero" id="начало">
        <header className="mobile-sticky-header hero-inner mx-auto flex max-w-[1180px] items-center justify-between px-5 py-5 md:px-8 md:py-7">
          <a href="#начало" aria-label="Сокол — начало страницы"><SokolMark /></a>
          <nav className="desktop-nav flex items-center gap-5" aria-label="Основная навигация">
            <a className="nav-link text-[hsl(var(--primary-foreground)/.7)]" href="#о-сообществе">О сообществе</a>
            <a className="nav-link text-[hsl(var(--primary-foreground)/.7)]" href="#ритм">Ритм</a>
            <button className="button-request" type="button" onClick={openRequest}>Оставить заявку <Arrow /></button>
            <a className="button-primary" href={vkUrl} target="_blank" rel="noopener noreferrer">Перейти в VK <ExternalMark /></a>
          </nav>
          <a className="mobile-phone-button" href={phoneUrl} aria-label="Позвонить в ПФ Сокол">
             <span className="mobile-phone-icon"><PhoneIcon /></span>
            <span>+7 (951) 379-28-30</span>
            <Arrow />
          </a>
        </header>

        <div className="hero-content hero-inner mx-auto flex min-h-[620px] max-w-[1180px] flex-col justify-between px-5 pb-11 pt-14 md:min-h-[690px] md:px-8 md:pb-14 md:pt-16">
          <div className="reveal">
            <p className="hero-company-title display">Производственная<br />фирма</p>
            <span className="eyebrow">Официальная страница в VK</span>
            <p className="hero-label mt-4 font-mono text-[.68rem] font-bold uppercase tracking-[.14em]">Остекление · материалы · решения</p>
            <h1 className="hero-title display mt-4">
              <span className="block">СОКОЛ</span>
            </h1>
          </div>
          <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="reveal delay-1">
              <p className="hero-lead">Окна, двери, стеклопакеты, перегородки, балконы и аксессуары с доставкой и монтажом в Новосибирске и соседних регионах.</p>
              <a className="button-primary mt-6" href={vkUrl} target="_blank" rel="noopener noreferrer">Смотреть решения <Arrow /></a>
            </div>
            <div className="scroll-cue hidden text-center md:block">Листайте ниже<span /></div>
          </div>
        </div>
        <div className="orbit-mark">
           <SokolEagleMark smallBird className="orbit-logo" />
        </div>
      </section>

      <section className="section light-grid" id="о-сообществе">
        <div className="grid gap-14 md:grid-cols-[.85fr_1.15fr] md:gap-24">
          <div className="reveal">
            <span className="eyebrow">01 / Зачем заглядывать</span>
            <h2 className="section-heading display mt-7">Остекление, которое <em>работает.</em></h2>
          </div>
          <div className="reveal delay-1 flex flex-col justify-end">
            <p className="section-copy">«ПФ СОКОЛ» изготавливает и устанавливает решения для дома и бизнеса: окна, двери, стеклопакеты, офисные и душевые перегородки, балконы и лоджии. Работаем в Новосибирске, Новосибирской области, Республике Алтай и Алтайском крае.</p>
            <a className="button-ghost mt-8 w-fit" href={vkUrl} target="_blank" rel="noopener noreferrer">Открыть страницу VK <Arrow diagonal /></a>
          </div>
        </div>
        <div className="mt-24 grid gap-0 md:grid-cols-3">
          {[
            ['01', 'Окна и двери', 'Пластиковые, алюминиевые, раздвижные системы, а также металлические и стеклянные двери.'],
            ['02', 'Стекло и перегородки', 'Стеклопакеты любой сложности и размеров, офисные и душевые перегородки.'],
            ['03', 'Балконы и аксессуары', 'Балконы, лоджии, подоконники, сэндвич-панели, уголки и сливы.'],
          ].map(([number, title, copy], index) => (
            <article className={`path-card reveal ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`} key={number}>
              <span className="path-number">{number}</span>
              <span className="path-arrow">↗</span>
              <h3 className="path-title">{title}</h3>
              <p className="path-copy mt-3">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dark-band section" id="ритм">
        <div className="grid items-end gap-12 md:grid-cols-[1fr_.72fr] md:gap-20">
          <div className="reveal">
            <span className="eyebrow">02 / Возможности</span>
            <h2 className="section-heading display mt-7">Стеклопакеты <em>любой сложности.</em></h2>
          </div>
          <p className="section-copy reveal delay-1">В «ПФ СОКОЛ» можно подобрать решение под конкретный проём, задачу и интерьер — от окон в наличии до стеклопакетов любой сложности и размера.</p>
        </div>
        <div className="signal-panel mt-20 p-7 sm:p-12 md:mt-28 md:p-20">
          <div className="signal-content flex min-h-[300px] flex-col justify-between gap-16">
            <div className="flex items-center justify-between">
              <span className="signal-meta">ПФ СОКОЛ / решения</span>
              <span className="signal-meta">VK / pf_sokol</span>
            </div>
            <div>
              <h3 className="signal-title display">Найдите своё<br />решение.</h3>
              <a className="button-dark mt-8 w-fit button-primary" href={vkUrl} target="_blank" rel="noopener noreferrer">Перейти в VK <Arrow diagonal /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section light-grid" id="услуги">
        <div className="grid gap-14 md:grid-cols-[.85fr_1.15fr] md:gap-24">
          <div className="reveal">
            <span className="eyebrow">03 / Как работаем</span>
            <h2 className="section-heading display mt-7">От замера до <em>монтажа.</em></h2>
          </div>
          <div className="reveal delay-1 service-detail-grid">
            <article className="service-detail">
              <span className="service-detail-label">Услуги</span>
              <p>Монтаж, доставка, регулировка, замена резины, ремонт старых окон и замена стеклопакетов.</p>
            </article>
            <article className="service-detail">
              <span className="service-detail-label">Сроки</span>
              <p>Стеклопакеты и аксессуары — от 1 дня. Окна и двери с монтажом — ориентировочно 5–10 рабочих дней.</p>
            </article>
            <article className="service-detail">
              <span className="service-detail-label">Гарантия</span>
              <p>Гарантия на окна и двери — 3 года. Рекламации принимаются в течение всего гарантийного срока.</p>
            </article>
            <article className="service-detail">
              <span className="service-detail-label">Заказ</span>
              <p>Договор и условия оплаты согласовываются индивидуально с каждым клиентом.</p>
            </article>
          </div>
        </div>
      </section>

      <WorksGallery />

      <section className="section light-grid contact-section">
        <div className="reveal">
          <span className="eyebrow">05 / Связаться</span>
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 className="section-heading display">Обсудим ваш<br /><em>проект.</em></h2>
            <p className="section-copy md:pb-2">Посмотрите актуальные материалы в VK или свяжитесь с «ПФ СОКОЛ» напрямую — по телефону или электронной почте.</p>
          </div>
        </div>
        <div className="quote-line reveal delay-1 mt-20 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>Стекло, свет и пространство — под одну задачу.</span>
          <div className="contact-actions">
            <button className="button-primary" type="button" onClick={openEstimate}>Заполнить анкету для расчёта сметы <Arrow /></button>
            <div className="contact-links">
              <a className="button-ghost" href={phoneUrl}>+7 (951) 379-28-30 <Arrow /></a>
              <a className="button-ghost" href={emailUrl}>Написать на email <ExternalMark /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer section section-tight" id="footer">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
          <div>
            <a className="footer-logo-link" href="#начало" aria-label="Вернуться в начало"><SokolEagleMark smallBird className="footer-logo" /></a>
            <p className="footer-note mt-7 max-w-[310px]">ООО «ПФ СОКОЛ» — окна, двери, стеклопакеты, перегородки, балконы, лоджии и монтажные услуги.</p>
          </div>
          <nav className="footer-documents" aria-label="Документы сайта">
            <span className="footer-documents-title">Документы</span>
            {legalDocuments.map((document) => (
              <a className="footer-note" href={sitePath(document.path)} key={document.path}>{document.label}</a>
            ))}
          </nav>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <span className="footer-note">Официальная страница VK</span>
            <a className="flex items-center gap-2 text-lg" href={vkUrl} target="_blank" rel="noopener noreferrer">vk.ru/pf_sokol <ExternalMark /></a>
            <a className="footer-note" href={phoneUrl}>+7 (951) 379-28-30</a>
            <a className="footer-note" href={emailUrl}>pfsokol54@gmail.com</a>
            <button className="footer-note footer-settings" type="button" onClick={() => setCookieConsent(null)}>Настроить cookies</button>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[hsl(var(--primary-foreground)/.14)] pt-5 sm:flex-row sm:items-end">
          <div className="footer-legal">
            <span className="footer-note">ООО «ПФ СОКОЛ» · ИНН 5403087333 · ОГРН 1255400013131</span>
            <span className="footer-note">© ПФ СОКОЛ. Все права защищены.</span>
          </div>
          <a className="footer-note hover:!text-[hsl(var(--secondary))]" href="#начало">Наверх ↑</a>
        </div>
      </footer>
      {cookieConsent === null && <CookieBanner onChoose={saveCookieChoice} />}
      {requestOpen && <RequestDialog onClose={() => setRequestOpen(false)} />}
      {estimateOpen && <EstimateDialog onClose={() => setEstimateOpen(false)} />}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/documents" component={DocumentsPage} />
        {legalDocuments.map((document) => (
          <Route path={document.path} component={() => <LegalDocumentPage document={document} />} key={document.path} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;