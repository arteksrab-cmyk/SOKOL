import { SokolEagleMark } from '@/components/sokol-eagle-mark';

const sitePath = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export type LegalDocument = {
  path: string;
  label: string;
  title: string;
  summary: string;
  sections: LegalSection[];
  requiredData: string[];
};

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export const companyDetails = {
  name: 'ООО «ПФ СОКОЛ»',
  director: 'Таджибаева Виктория Андреевна',
  directorRole: 'Генеральный директор',
  inn: '5403087333',
  kpp: '540301001',
  ogrn: '1255400013131',
  address: '630022, Россия, Новосибирская область, г. Новосибирск, пер. 12-й Бронный, д. 1',
  regions: 'Новосибирск, Новосибирская область, Республика Алтай и Алтайский край',
  phone: '+7 (951) 379-28-30',
  email: 'pfsokol54@gmail.com',
};

export const legalDocuments: LegalDocument[] = [
  {
    path: '/documents/public-offer',
    label: 'Публичная оферта',
    title: 'Публичная оферта',
    summary: 'Условия, на которых ПФ СОКОЛ принимает и исполняет заказы на товары и услуги.',
    sections: [
      {
        heading: 'Товары и услуги',
        paragraphs: [
          'ПФ СОКОЛ изготавливает и поставляет решения для остекления, а также выполняет связанные работы по индивидуальным заказам клиентов.',
        ],
        items: [
          'стеклопакеты любой сложности и размеров;',
          'пластиковые и алюминиевые окна, раздвижные системы;',
          'пластиковые, металлические, алюминиевые и стеклянные двери;',
          'офисные перегородки, душевые перегородки, балконы и лоджии;',
          'подоконники, сэндвич-панели, уголки и сливы;',
          'монтаж, доставка, регулировка, замена резины, ремонт старых окон и замена стеклопакетов.',
        ],
      },
      {
        heading: 'Сроки',
        paragraphs: [
          'Изготовление и замена стеклопакетов выполняются от 1 дня. Изготовление и монтаж окон и дверей занимают ориентировочно от 5 до 10 рабочих дней. Отделочные аксессуары доступны от 1 дня. Также есть окна в наличии.',
          'Точный срок зависит от конструкции, размеров, материалов, комплектации и согласовывается с клиентом до оформления заказа.',
        ],
      },
      {
        heading: 'Договор, оплата и гарантия',
        paragraphs: [
          'Условия заказа и договора согласовываются индивидуально с каждым клиентом. Условия оплаты также определяются индивидуально и не публикуются как единый тариф.',
          'Гарантия на окна и двери составляет 3 года. Рекламации принимаются в течение всего гарантийного срока.',
        ],
      },
      {
        heading: 'Индивидуальные заказы и возврат',
        paragraphs: [
          'Товары, изготовленные по индивидуальному заказу, возврату не подлежат при соблюдении предусмотренных законом условий. Конкретные условия заказа, замены и рекламации фиксируются в договоре с клиентом.',
        ],
      },
      {
        heading: 'Территория работы',
        paragraphs: [`Заказы принимаются в ${companyDetails.regions}.`],
      },
    ],
    requiredData: [
      'проверить юридическую формулировку условий возврата товаров индивидуального изготовления;',
      'уточнить порядок приёмки работ, доставки, монтажа и расторжения договора;',
      'подтвердить контакт для официальных претензий и дату вступления оферты в силу.',
    ],
  },
  {
    path: '/documents/terms',
    label: 'Условия использования',
    title: 'Условия использования',
    summary: 'Правила использования сайта, материалов и каналов связи ПФ СОКОЛ.',
    sections: [
      {
        heading: 'Назначение сайта',
        paragraphs: [
          'Сайт содержит информацию о товарах и услугах ООО «ПФ СОКОЛ» и помогает связаться с компанией по телефону, электронной почте и через страницу VK.',
        ],
      },
      {
        heading: 'Информация о компании',
        items: [
          'Оператор сайта: ООО «ПФ СОКОЛ».',
          `${companyDetails.directorRole}: ${companyDetails.director}.`,
          `ИНН ${companyDetails.inn}, КПП ${companyDetails.kpp}, ОГРН ${companyDetails.ogrn}.`,
          `Юридический адрес: ${companyDetails.address}.`,
        ],
      },
      {
        heading: 'Материалы и внешние ссылки',
        paragraphs: [
          'Тексты, фотографии, логотип и другие материалы сайта принадлежат компании или используются на законных основаниях. Сайт содержит ссылку на внешнюю страницу VK; правила обработки данных на внешней площадке определяются её оператором.',
        ],
      },
    ],
    requiredData: [
      'уточнить разрешённые способы использования фотографий и материалов VK;',
      'подтвердить порядок обновления условий и дату вступления документа в силу.',
    ],
  },
  {
    path: '/documents/privacy',
    label: 'Политика конфиденциальности',
    title: 'Политика конфиденциальности',
    summary: 'Как ПФ СОКОЛ получает, использует, хранит и защищает персональные данные посетителей.',
    sections: [
      {
        heading: 'Оператор',
        paragraphs: [
          `Оператором персональных данных является ${companyDetails.name}. ${companyDetails.directorRole} — ${companyDetails.director}.`,
          `Реквизиты: ИНН ${companyDetails.inn}, КПП ${companyDetails.kpp}, ОГРН ${companyDetails.ogrn}. Юридический адрес: ${companyDetails.address}.`,
        ],
      },
      {
        heading: 'Какие данные получает сайт',
        paragraphs: [
          'На текущей версии сайта нет регистрации, личного кабинета, оплаты и форм отправки заявок. Посетитель может добровольно сообщить свои данные при обращении по телефону, email или через внешнюю страницу VK.',
          'Для сохранения выбора в cookie-баннере сайт использует локальное хранилище браузера. Аналитические и рекламные пиксели сейчас не подключены.',
        ],
      },
      {
        heading: 'Цели обработки',
        items: [
          'ответ на обращение и связь с клиентом;',
          'подготовка расчёта, заказа, договора или консультации;',
          'исполнение гарантийных и рекламационных обязательств;',
          'обеспечение работы сайта и сохранение выбора пользователя;',
          'исполнение требований законодательства Российской Федерации.',
        ],
      },
      {
        heading: 'Права пользователя',
        paragraphs: [
          'Пользователь может запросить сведения об обработке своих данных, их уточнение, прекращение обработки или удаление, если для хранения нет законного основания. Обращения принимаются по адресу pfsokol54@gmail.com.',
        ],
      },
    ],
    requiredData: [
      'подтвердить срок хранения обращений и документов;',
      'уточнить почтовый адрес для юридически значимых обращений;',
      'указать фактических подрядчиков и почтовый сервис, если им передаются данные;',
      'проверить финальную редакцию документа с ответственным за персональные данные.',
    ],
  },
  {
    path: '/documents/cookies',
    label: 'Политика Cookie',
    title: 'Политика Cookie',
    summary: 'Описание cookie и похожих технологий, которые используются на сайте.',
    sections: [
      {
        heading: 'Что используется сейчас',
        paragraphs: [
          'На текущей версии сайта не используются Яндекс.Метрика, рекламные пиксели, чаты, авторизация и платёжные сервисы.',
          'Сайт сохраняет в локальном хранилище браузера ключ cookie_consent со значением выбора пользователя: «принять» или «отклонить». Это нужно, чтобы повторно не показывать баннер при каждом посещении.',
        ],
      },
      {
        heading: 'Как изменить выбор',
        paragraphs: [
          'Пользователь может очистить данные сайта в настройках браузера. После очистки баннер настроек появится снова. На сайте также доступна кнопка «Настроить cookies» в футере.',
        ],
      },
      {
        heading: 'Если будут подключены новые сервисы',
        paragraphs: [
          'При добавлении аналитики, рекламы, онлайн-чата или других внешних сервисов политика Cookie должна быть обновлена до их включения на сайте.',
        ],
      },
    ],
    requiredData: [
      'подтвердить, что аналитика и рекламные сервисы не подключены в production;',
      'согласовать срок хранения записи cookie_consent;',
      'обновлять документ при добавлении внешних сервисов.',
    ],
  },
];

function LegalHeader() {
  return (
    <header className="legal-header">
      <a href={sitePath('/')} aria-label="ПФ СОКОЛ — на главную">
        <SokolEagleMark compact />
      </a>
      <a className="legal-back" href={sitePath('/')}>← На главную</a>
    </header>
  );
}

export function DocumentsPage() {
  return (
    <main className="legal-page">
      <LegalHeader />
      <section className="legal-hero">
        <span className="eyebrow">Документы</span>
        <h1 className="legal-title display">Документы<br /><em>ПФ СОКОЛ.</em></h1>
        <p className="legal-lead">
          Рабочая редакция документов сайта и условий взаимодействия с клиентами.
        </p>
      </section>
      <section className="legal-company-section">
        <div className="legal-company-card">
          <span className="legal-draft-label">Реквизиты компании</span>
          <h2>{companyDetails.name}</h2>
          <div className="legal-company-grid">
            <span>{companyDetails.directorRole}<strong>{companyDetails.director}</strong></span>
            <span>ИНН / КПП<strong>{companyDetails.inn} / {companyDetails.kpp}</strong></span>
            <span>ОГРН<strong>{companyDetails.ogrn}</strong></span>
            <span>Юридический адрес<strong>{companyDetails.address}</strong></span>
          </div>
        </div>
      </section>
      <section className="legal-list-section">
        <div className="legal-list">
          {legalDocuments.map((document, index) => (
            <a className="legal-card" href={sitePath(document.path)} key={document.path}>
              <span className="legal-card-number">0{index + 1}</span>
              <span>
                <strong>{document.label}</strong>
                <span>{document.summary}</span>
              </span>
              <span className="legal-card-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <main className="legal-page">
      <LegalHeader />
      <article className="legal-article">
        <span className="eyebrow">Документы / {document.label}</span>
        <h1 className="legal-title display">{document.title}</h1>
        <p className="legal-lead">{document.summary}</p>
        <div className="legal-body">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && (
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
        <div className="legal-draft">
          <span className="legal-draft-label">Перед публикацией проверить</span>
          <h2>Рабочая редакция требует финального согласования.</h2>
          <p>
            Основные данные клиента уже добавлены. Перед публикацией нужно проверить следующие пункты:
          </p>
          <ul>
            {document.requiredData.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <a className="button-ghost legal-return" href={sitePath('/documents')}>← Все документы</a>
      </article>
    </main>
  );
}