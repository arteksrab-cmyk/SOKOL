const highlights = [
  { value: '3 года', label: 'гарантия на окна и двери' },
  { value: 'от 1 дня', label: 'стеклопакеты и аксессуары' },
  { value: '5–10 раб. дней', label: 'ориентир для окон и дверей с монтажом' },
];

export function TrustHighlights() {
  return (
    <dl className="hero-proof" aria-label="Сроки и гарантия">
      {highlights.map(({ value, label }) => (
        <div className="hero-proof-item" key={value} data-testid={`proof-${value}`}>
          <dt>{value}</dt>
          <dd>{label}</dd>
        </div>
      ))}
    </dl>
  );
}