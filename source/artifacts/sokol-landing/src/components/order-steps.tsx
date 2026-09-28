import { ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Заявка',
    copy: 'Опишите задачу. Если есть размеры и фотографии проёма, приложите их.',
  },
  {
    title: 'Замер и подбор',
    copy: 'Уточним параметры и подберём систему; необходимость замера согласуем отдельно.',
  },
  {
    title: 'Изготовление',
    copy: 'Согласуем состав заказа, стоимость и срок, затем подготовим конструкцию.',
  },
  {
    title: 'Доставка и монтаж',
    copy: 'Доставим заказ и выполним монтаж, если он входит в согласованный состав работ.',
  },
];

export function OrderSteps({ onRequest }: { onRequest: () => void }) {
  return (
    <section className="order-steps-section section light-grid" id="порядок-заказа" aria-labelledby="order-steps-title">
      <div className="order-steps-intro reveal">
        <div>
          <span className="eyebrow">Порядок заказа</span>
          <h2 className="section-heading display mt-7" id="order-steps-title">
            От первого запроса до <em>монтажа.</em>
          </h2>
        </div>
        <p className="section-copy">
          Заранее уточним задачу, состав заказа, стоимость и сроки. Условия согласуем индивидуально.
        </p>
      </div>

      <ol className="order-step-grid">
        {steps.map((step, index) => (
          <li className={`order-step reveal ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : index === 3 ? 'delay-3' : ''}`} key={step.title}>
            <span className="order-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="order-step-title display">{step.title}</h3>
            <p className="order-step-copy">{step.copy}</p>
          </li>
        ))}
      </ol>

      <div className="order-step-footer reveal delay-1">
        <p>Точные сроки и стоимость подтвердим после уточнения размеров и комплектации.</p>
        <button className="button-primary" type="button" onClick={onRequest} data-testid="button-discuss-project">
          Обсудить проект <ArrowRight aria-hidden="true" size={17} />
        </button>
      </div>
    </section>
  );
}