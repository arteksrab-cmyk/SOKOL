import { useId } from 'react';

type SokolEagleMarkProps = {
  compact?: boolean;
  smallBird?: boolean;
  className?: string;
};

function TracedFalcon({
  gradientId,
  compact = false,
  smallBird = false,
}: {
  gradientId: string;
  compact?: boolean;
  smallBird?: boolean;
}) {
  const traceGradientId = `${gradientId}-trace`;
  const birdWidth = compact ? 180 : smallBird ? 100 : 180;
  const birdHeight = compact ? 148 : smallBird ? 82 : 148;
  const birdX = compact ? 108 : smallBird ? 138 : 108;
  const birdY = compact ? 14 : smallBird ? 77 : 28;

  return (
    <svg
      x={birdX}
      y={birdY}
      width={birdWidth}
      height={birdHeight}
      viewBox="0 0 127 104"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={traceGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a6d2d" />
          <stop offset="47%" stopColor="#f2d887" />
          <stop offset="100%" stopColor="#b47c31" />
        </linearGradient>
      </defs>
      <g className="sokol-eagle-bird-group">
        <g transform="translate(0 104) scale(.1 -.1)" className="sokol-eagle-trace">
          <path style={{ fill: `url(#${traceGradientId})` }} d="M785 851c-77-31-146-60-152-64-9-6-8-16 2-41 12-28 12-35 1-39-7-3-19-1-27 4-19 12-69 11-69-1 0-5 4-10 9-10 14 0 22-29 15-55-3-13-17-31-31-40-22-15-27-15-47-1-32 20-42 63-20 87 16 17 16 19-1 25-10 4-30 3-45-3-33-13-53-4-40 17 6 8 10 25 10 36 0 18-22 30-141 78-78 31-144 55-146 52-2-2 22-22 54-45l58-41-49 0c-55 0-54-7 7-32l42-17-37 0c-52-1-48-14 10-33 39-13 42-16 20-17-37-1-36-20 2-27 37-8 38-20 2-29l-27-7 35-13 35-12-33-7c-38-9-43-26-6-26 16 0 23-4 18-12-5-8 5-10 37-6 24 3 38 4 32 1-7-3-13-9-13-15 0-10 46-5 93 8 9 3 17 1 17-4 0-5-15-13-32-18-26-8-34-16-36-37-2-15 0-27 5-28 4 0 20-2 34-4 20-3 27 2 36 26 12 32 23 34 132 30 55-1 91-20 91-48 0-17 20-17 47 2 13 9 20 22 17 30-6 13-41 31-56 27-3-1-9 6-12 15-5 12-2 14 16 9 13-3 41-9 63-13 36-6 39-5 26 10-12 15-10 16 18 11 19-4 31-2 31 4 0 6 15 12 33 15l32 3-35 14-35 14 30 12 30 12-27 7c-34 9-29 20 12 28 38 8 39 27 3 28-23 1-20 4 20 17 57 19 61 32 10 33l-38 1 48 20c60 26 61 42 2 34-25-4-45-5-45-2 0 3 27 24 60 46 57 38 70 51 53 49-5 0-71-26-148-58z" />
          <path style={{ fill: `url(#${traceGradientId})` }} d="M491 647l21-41 18 35c10 18 17 34 17 35-1 1-19 4-39 7l-38 6 21-42z" />
          <path style={{ fill: `url(#${traceGradientId})` }} d="M414 484c3-9 6-18 6-20 0-13 31-1 40 16 10 18 8 20-21 20-24 0-30-3-25-16z" />
          <path style={{ fill: `url(#${traceGradientId})` }} d="M562 483c2-10 12-18 23-18 11 0 21 8 23 18 3 13-3 17-23 17-20 0-26-4-23-17z" />
          <path style={{ fill: `url(#${traceGradientId})` }} d="M472 452c-9-16-22-27-28-25-19 6-74-68-74-99 0-31 11-36 30-13 20 24 30 17 30-20 0-39 5-42 31-19 16 15 17 14 12-4-5-20 24-82 38-82 18 0 41 54 35 83l-6 31 22-24 23-24 10 36c10 34 11 35 33 21 21-15 22-14 22 19 0 26-9 42-39 72-24 24-40 33-43 25-2-7-10 2-17 19-18 42-54 44-79 4z" />
        </g>
      </g>
    </svg>
  );
}

export function SokolEagleMark({ compact = false, smallBird = false, className = '' }: SokolEagleMarkProps) {
  const gradientId = `sokol-gold-${useId().replace(/:/g, '')}`;

  if (compact) {
    return (
      <svg
        className={`sokol-eagle sokol-eagle-compact ${className}`}
        viewBox="45 0 270 165"
        role="img"
        aria-label="Эмблема Сокол"
      >
        <path className="sokol-eagle-frame" d="M55 115V83L180 12l125 71v32" />
        <path className="sokol-eagle-frame-inner" d="M66 121V89L180 25 294 89v32" />
        <TracedFalcon gradientId={gradientId} compact />
      </svg>
    );
  }

  return (
    <svg
      className={`sokol-eagle sokol-eagle-full ${className}`}
      viewBox="0 0 360 390"
      role="img"
      aria-labelledby="sokol-eagle-title sokol-eagle-description"
    >
      <title id="sokol-eagle-title">Герб Сокол — золотой сокол в архитектурном контуре</title>
      <desc id="sokol-eagle-description">
        Симметричный золотой сокол над словом «СОКОЛ», заключённый в архитектурную рамку.
      </desc>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a6d2d" />
          <stop offset="47%" stopColor="#f2d887" />
          <stop offset="100%" stopColor="#b47c31" />
        </linearGradient>
      </defs>

       <path
        className="sokol-eagle-frame"
        pathLength="1"
         d="M55 166V136L180 65l125 71v30 M305 275v32L180 378 55 307v-32"
        style={{ stroke: `url(#${gradientId})` }}
      />
        <path className="sokol-eagle-frame-inner" d="M66 171V142L180 77 294 142v29M294 269v26L180 360 66 295v-26" />
       <path className="sokol-eagle-rule" d="M55 156h26M279 156h26M55 268h26M279 268h26" />

      <TracedFalcon gradientId={gradientId} smallBird={smallBird} />

      <text className="sokol-eagle-small-type" x="180" y="181" textAnchor="middle">ПРОИЗВОДСТВЕННАЯ ФИРМА</text>
      <g className="sokol-eagle-wordmark">
        <text className="sokol-eagle-type" x="180" y="257" textAnchor="middle">СОКОЛ</text>
      </g>
      <text className="sokol-eagle-small-type" x="180" y="291" textAnchor="middle">ВСЕ ВИДЫ ОСТЕКЛЕНИЯ</text>
      <line className="sokol-eagle-underline" x1="93" y1="303" x2="267" y2="303" />
    </svg>
  );
}
