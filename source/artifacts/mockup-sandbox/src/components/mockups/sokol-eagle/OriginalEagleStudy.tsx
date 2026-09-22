import React from "react";

export function OriginalEagleStudy() {
  return (
    <main className="ose-study" aria-labelledby="ose-title">
      <style>{`
        .ose-study {
          --ose-navy: #070f1c;
          --ose-navy-soft: #0d1c2b;
          --ose-gold: #d5a943;
          --ose-gold-light: #f4dc89;
          --ose-gold-deep: #8c6429;
          --ose-ivory: #f1ecdd;
          --ose-muted: #87959b;
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          color: var(--ose-ivory);
          background:
            radial-gradient(ellipse at 70% 42%, rgba(213, 169, 67, .13), transparent 28rem),
            radial-gradient(ellipse at 5% 96%, rgba(39, 80, 94, .18), transparent 25rem),
            linear-gradient(140deg, var(--ose-navy) 0%, #091827 62%, #102836 100%);
          font-family: "Manrope", "Segoe UI", sans-serif;
        }

        .ose-study::before {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: .18;
          background-image:
            linear-gradient(rgba(241, 236, 221, .06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(241, 236, 221, .06) 1px, transparent 1px);
          background-size: 4rem 4rem;
          mask-image: linear-gradient(to bottom, transparent 2%, #000 27%, #000 80%, transparent);
          content: "";
        }

        .ose-study__header,
        .ose-study__body {
          width: min(100% - 3.4rem, 78rem);
          margin-inline: auto;
        }

        .ose-study__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.35rem 0 1.2rem;
          border-bottom: 1px solid rgba(241, 236, 221, .14);
        }

        .ose-study__lockup {
          display: inline-flex;
          align-items: center;
          gap: .78rem;
          color: var(--ose-ivory);
          font-family: "Space Grotesk", "Segoe UI", sans-serif;
          font-size: .96rem;
          font-weight: 700;
          letter-spacing: .27em;
        }

        .ose-study__mini {
          width: 2.2rem;
          height: 2.2rem;
        }

        .ose-study__meta,
        .ose-study__eyebrow,
        .ose-study__stage-note,
        .ose-study__spec-label,
        .ose-study__caption {
          font-family: "Space Mono", monospace;
        }

        .ose-study__meta {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: var(--ose-muted);
          font-size: .58rem;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .ose-study__status {
          width: .42rem;
          height: .42rem;
          border-radius: 50%;
          background: var(--ose-gold-light);
          box-shadow: 0 0 0 .25rem rgba(213, 169, 67, .1);
          animation: ose-status 3.8s ease-in-out infinite;
        }

        .ose-study__body {
          display: grid;
          grid-template-columns: minmax(14rem, .5fr) minmax(36rem, 1.5fr);
          align-items: center;
          gap: 2rem;
          min-height: calc(100dvh - 5rem);
          padding: 2.1rem 0 2.5rem;
        }

        .ose-study__eyebrow {
          display: flex;
          align-items: center;
          gap: .7rem;
          margin: 0 0 1.2rem;
          color: var(--ose-gold-light);
          font-size: .58rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .ose-study__eyebrow::before {
          width: 2.15rem;
          height: 1px;
          background: var(--ose-gold);
          content: "";
        }

        .ose-study__title {
          max-width: 20rem;
          margin: 0;
          color: var(--ose-ivory);
          font-family: "Space Grotesk", "Segoe UI", sans-serif;
          font-size: clamp(2.8rem, 5.5vw, 5.25rem);
          font-weight: 450;
          letter-spacing: -.075em;
          line-height: .92;
        }

        .ose-study__title em {
          color: var(--ose-gold-light);
          font-style: normal;
        }

        .ose-study__copy {
          max-width: 22rem;
          margin: 1.4rem 0 0;
          color: #b7c0b9;
          font-size: .84rem;
          line-height: 1.66;
        }

        .ose-study__copy strong {
          color: var(--ose-ivory);
          font-weight: 600;
        }

        .ose-study__specs {
          display: flex;
          gap: 1.5rem;
          margin-top: 2.1rem;
        }

        .ose-study__spec {
          display: grid;
          gap: .28rem;
          padding-left: .7rem;
          border-left: 1px solid var(--ose-gold);
        }

        .ose-study__spec-value {
          color: var(--ose-ivory);
          font-family: "Space Mono", monospace;
          font-size: .62rem;
        }

        .ose-study__spec-label {
          color: var(--ose-muted);
          font-size: .49rem;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .ose-study__stage {
          position: relative;
          display: grid;
          min-height: min(43rem, 77vh);
          place-items: center;
        }

        .ose-study__stage-note {
          position: absolute;
          top: .2rem;
          right: .2rem;
          color: rgba(241, 236, 221, .38);
          font-size: .51rem;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .ose-study__stage-note::after {
          display: inline-block;
          width: 2.4rem;
          height: 1px;
          margin: 0 0 .16rem .45rem;
          background: var(--ose-gold);
          content: "";
        }

        .ose-study__mark-shell {
          position: relative;
          z-index: 1;
          width: min(50rem, 95vw);
          aspect-ratio: 1.24;
          filter: drop-shadow(0 1.25rem 1.8rem rgba(0, 0, 0, .28));
        }

        .ose-study__mark-shell::before {
          position: absolute;
          top: 25%;
          left: 50%;
          width: 16rem;
          height: 8rem;
          border-radius: 50%;
          background: rgba(213, 169, 67, .18);
          filter: blur(2rem);
          transform: translateX(-50%);
          animation: ose-halo 6s ease-in-out infinite;
          content: "";
        }

        .ose-study__mark {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .ose-study__ghost-frame {
          fill: none;
          stroke: rgba(213, 169, 67, .26);
          stroke-width: 2.2;
          stroke-linecap: square;
          animation: ose-frame 8s ease-in-out infinite;
        }

        .ose-study__ghost-frame-inner {
          fill: none;
          stroke: rgba(241, 236, 221, .11);
          stroke-width: 1;
        }

        .ose-study__eagle {
          transform-box: fill-box;
          transform-origin: center;
          animation: ose-breathe 6.4s ease-in-out infinite;
        }

        .ose-study__wing-base {
          fill: url(#ose-wing-gold);
          stroke: var(--ose-gold-light);
          stroke-width: .65;
          stroke-linejoin: round;
        }

        .ose-study__trace {
          fill: url(#ose-trace-gold);
          stroke: none;
        }

        .ose-study__feather {
          fill: url(#ose-feather-gold);
          stroke: rgba(247, 223, 145, .72);
          stroke-width: .45;
          stroke-linejoin: round;
        }

        .ose-study__feather-dark {
          fill: var(--ose-gold-deep);
          stroke: rgba(246, 215, 127, .55);
          stroke-width: .45;
          stroke-linejoin: round;
        }

        .ose-study__feather-line {
          fill: none;
          stroke: rgba(87, 53, 16, .74);
          stroke-width: 1.35;
          stroke-linecap: round;
        }

        .ose-study__body-gold {
          fill: url(#ose-body-gold);
          stroke: var(--ose-gold-light);
          stroke-width: .65;
          stroke-linejoin: round;
        }

        .ose-study__face {
          fill: var(--ose-navy);
          stroke: var(--ose-gold-light);
          stroke-width: .8;
        }

        .ose-study__eye,
        .ose-study__beak {
          fill: var(--ose-gold-light);
        }

        .ose-study__sheen {
          fill: url(#ose-sheen);
          opacity: 0;
          mix-blend-mode: screen;
          animation: ose-sheen 7.4s ease-in-out infinite;
        }

        .ose-study__rule {
          stroke: rgba(213, 169, 67, .78);
          stroke-width: 1;
        }

        .ose-study__type {
          fill: var(--ose-gold-light);
          font-family: "Space Grotesk", "Segoe UI", sans-serif;
          font-size: 36px;
          font-weight: 650;
          letter-spacing: 8px;
        }

        .ose-study__small-type {
          fill: rgba(241, 236, 221, .52);
          font-family: "Space Mono", monospace;
          font-size: 6.5px;
          letter-spacing: 1.25px;
        }

        .ose-study__caption {
          position: absolute;
          right: .2rem;
          bottom: .1rem;
          display: flex;
          align-items: center;
          gap: .55rem;
          color: rgba(241, 236, 221, .38);
          font-size: .49rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .ose-study__caption::before {
          width: 1.25rem;
          height: 1px;
          background: var(--ose-gold);
          content: "";
        }

        @keyframes ose-breathe {
          0%, 100% { opacity: .94; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-2px) scale(1.008); }
        }

        @keyframes ose-sheen {
          0%, 22% { opacity: 0; transform: translateX(-220px); }
          34% { opacity: .36; }
          51%, 100% { opacity: 0; transform: translateX(220px); }
        }

        @keyframes ose-frame {
          0%, 100% { opacity: .45; }
          50% { opacity: .8; }
        }

        @keyframes ose-halo {
          0%, 100% { opacity: .4; transform: translateX(-50%) scale(.9); }
          50% { opacity: .7; transform: translateX(-50%) scale(1.08); }
        }

        @keyframes ose-status {
          0%, 100% { opacity: .55; transform: scale(.84); }
          50% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 780px) {
          .ose-study__header,
          .ose-study__body {
            width: min(100% - 2.15rem, 42rem);
          }

          .ose-study__body {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: .55rem;
            min-height: 0;
            padding-top: 2.45rem;
          }

          .ose-study__title {
            max-width: 22rem;
            font-size: clamp(3.1rem, 15vw, 5.2rem);
          }

          .ose-study__copy {
            max-width: 31rem;
          }

          .ose-study__stage {
            min-height: 29rem;
            margin-top: -.2rem;
          }

          .ose-study__mark-shell {
            width: min(50rem, 108vw);
          }
        }

        @media (max-width: 480px) {
          .ose-study__header {
            padding-top: 1rem;
          }

          .ose-study__meta {
            display: none;
          }

          .ose-study__lockup {
            font-size: .87rem;
          }

          .ose-study__body {
            width: min(100% - 1.55rem, 35rem);
            padding-top: 2.05rem;
          }

          .ose-study__eyebrow {
            margin-bottom: .9rem;
            font-size: .54rem;
          }

          .ose-study__copy {
            margin-top: 1.1rem;
            font-size: .78rem;
            line-height: 1.55;
          }

          .ose-study__specs {
            gap: 1.1rem;
            margin-top: 1.4rem;
          }

          .ose-study__stage {
            min-height: 23rem;
            margin-top: .1rem;
          }

          .ose-study__stage-note {
            right: 0;
            font-size: .46rem;
          }

          .ose-study__caption {
            right: 0;
            font-size: .43rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ose-study *,
          .ose-study *::before,
          .ose-study *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="ose-study__header">
        <div className="ose-study__lockup" aria-label="Сокол">
          <svg className="ose-study__mini" viewBox="0 0 48 48" role="presentation" aria-hidden="true">
            <g transform="translate(0 48) scale(.37795 -.37795)" className="ose-study__trace">
              <path d="M785 851c-77-31-146-60-152-64-9-6-8-16 2-41 12-28 12-35 1-39-7-3-19-1-27 4-19 12-69 11-69-1 0-5 4-10 9-10 14 0 22-29 15-55-3-13-17-31-31-40-22-15-27-15-47-1-32 20-42 63-20 87 16 17 16 19-1 25-10 4-30 3-45-3-33-13-53-4-40 17 6 8 10 25 10 36 0 18-22 30-141 78-78 31-144 55-146 52-2-2 22-22 54-45l58-41-49 0c-55 0-54-7 7-32l42-17-37 0c-52-1-48-14 10-33 39-13 42-16 20-17-37-1-36-20 2-27 37-8 38-20 2-29l-27-7 35-13 35-12-33-7c-38-9-43-26-6-26 16 0 23-4 18-12-5-8 5-10 37-6 24 3 38 4 32 1-7-3-13-9-13-15 0-10 46-5 93 8 9 3 17 1 17-4 0-5-15-13-32-18-26-8-34-16-36-37-2-15 0-27 5-28 4 0 20-2 34-4 20-3 27 2 36 26 12 32 23 34 132 30 55-1 91-20 91-48 0-17 20-17 47 2 13 9 20 22 17 30-6 13-41 31-56 27-3-1-9 6-12 15-5 12-2 14 16 9 13-3 41-9 63-13 36-6 39-5 26 10-12 15-10 16 18 11 19-4 31-2 31 4 0 6 15 12 33 15l32 3-35 14-35 14 30 12 30 12-27 7c-34 9-29 20 12 28 38 8 39 27 3 28-23 1-20 4 20 17 57 19 61 32 10 33l-38 1 48 20c60 26 61 42 2 34-25-4-45-5-45-2 0 3 27 24 60 46 57 38 70 51 53 49-5 0-71-26-148-58z" />
              <path d="M491 647l21-41 18 35c10 18 17 34 17 35-1 1-19 4-39 7l-38 6 21-42z" />
              <path d="M414 484c3-9 6-18 6-20 0-13 31-1 40 16 10 18 8 20-21 20-24 0-30-3-25-16z" />
              <path d="M562 483c2-10 12-18 23-18 11 0 21 8 23 18 3 13-3 17-23 17-20 0-26-4-23-17z" />
              <path d="M472 452c-9-16-22-27-28-25-19 6-74-68-74-99 0-31 11-36 30-13 20 24 30 17 30-20 0-39 5-42 31-19 16 15 17 14 12-4-5-20 24-82 38-82 18 0 41 54 35 83l-6 31 22-24 23-24 10 36c10 34 11 35 33 21 21-15 22-14 22 19 0 26-9 42-39 72-24 24-40 33-43 25-2-7-10 2-17 19-18 42-54 44-79 4z" />
            </g>
          </svg>
          <span>СОКОЛ</span>
        </div>
        <div className="ose-study__meta">
          <span className="ose-study__status" aria-hidden="true" />
          original silhouette study / 06
        </div>
      </header>

      <section className="ose-study__body">
        <div>
          <p className="ose-study__eyebrow">Trace / source pixels</p>
          <h1 className="ose-study__title" id="ose-title">
            The eagle, <em>closer.</em>
          </h1>
          <p className="ose-study__copy">
            Здесь нет новой интерпретации: <strong>знак обведён непосредственно с image_1789464903048.png.</strong> Сохраняются исходные контуры крыльев, головы и хвоста.
          </p>
          <div className="ose-study__specs" aria-label="Silhouette characteristics">
            <div className="ose-study__spec">
                <span className="ose-study__spec-value">TRACE / 01</span>
                <span className="ose-study__spec-label">source contour</span>
            </div>
            <div className="ose-study__spec">
                <span className="ose-study__spec-value">PIXEL / 127×104</span>
                <span className="ose-study__spec-label">direct raster trace</span>
            </div>
          </div>
        </div>

        <div className="ose-study__stage" aria-label="Direct trace of the supplied eagle icon">
          <span className="ose-study__stage-note">direct trace / primary</span>
          <div className="ose-study__mark-shell">
            <svg className="ose-study__mark" viewBox="0 0 840 610" role="img" aria-labelledby="ose-mark-title ose-mark-desc">
              <title id="ose-mark-title">Точная трассировка иконки сокола</title>
              <desc id="ose-mark-desc">A direct vector trace of the supplied 127 by 104 pixel eagle icon, with no redesigned feathers or added geometry.</desc>
              <defs>
                <linearGradient id="ose-trace-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f7e19a" />
                  <stop offset="58%" stopColor="#dfb754" />
                  <stop offset="100%" stopColor="#a97029" />
                </linearGradient>
                <linearGradient id="ose-sheen" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#fff1b1" stopOpacity="0" />
                  <stop offset="50%" stopColor="#fff1b1" stopOpacity=".9" />
                  <stop offset="100%" stopColor="#fff1b1" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path className="ose-study__ghost-frame" d="M188 91 420 22l232 69v31M188 415v31l232 70 232-70v-31" />
              <path className="ose-study__ghost-frame-inner" d="M204 98 420 34l216 64v20M204 408v27l216 65 216-65v-27" />

              <g className="ose-study__eagle">
                <g transform="translate(102 24) scale(5.02)" className="ose-study__trace">
                  <g transform="translate(0 104) scale(.1 -.1)">
                    <path d="M785 851c-77-31-146-60-152-64-9-6-8-16 2-41 12-28 12-35 1-39-7-3-19-1-27 4-19 12-69 11-69-1 0-5 4-10 9-10 14 0 22-29 15-55-3-13-17-31-31-40-22-15-27-15-47-1-32 20-42 63-20 87 16 17 16 19-1 25-10 4-30 3-45-3-33-13-53-4-40 17 6 8 10 25 10 36 0 18-22 30-141 78-78 31-144 55-146 52-2-2 22-22 54-45l58-41-49 0c-55 0-54-7 7-32l42-17-37 0c-52-1-48-14 10-33 39-13 42-16 20-17-37-1-36-20 2-27 37-8 38-20 2-29l-27-7 35-13 35-12-33-7c-38-9-43-26-6-26 16 0 23-4 18-12-5-8 5-10 37-6 24 3 38 4 32 1-7-3-13-9-13-15 0-10 46-5 93 8 9 3 17 1 17-4 0-5-15-13-32-18-26-8-34-16-36-37-2-15 0-27 5-28 4 0 20-2 34-4 20-3 27 2 36 26 12 32 23 34 132 30 55-1 91-20 91-48 0-17 20-17 47 2 13 9 20 22 17 30-6 13-41 31-56 27-3-1-9 6-12 15-5 12-2 14 16 9 13-3 41-9 63-13 36-6 39-5 26 10-12 15-10 16 18 11 19-4 31-2 31 4 0 6 15 12 33 15l32 3-35 14-35 14 30 12 30 12-27 7c-34 9-29 20 12 28 38 8 39 27 3 28-23 1-20 4 20 17 57 19 61 32 10 33l-38 1 48 20c60 26 61 42 2 34-25-4-45-5-45-2 0 3 27 24 60 46 57 38 70 51 53 49-5 0-71-26-148-58z" />
                    <path d="M491 647l21-41 18 35c10 18 17 34 17 35-1 1-19 4-39 7l-38 6 21-42z" />
                    <path d="M414 484c3-9 6-18 6-20 0-13 31-1 40 16 10 18 8 20-21 20-24 0-30-3-25-16z" />
                    <path d="M562 483c2-10 12-18 23-18 11 0 21 8 23 18 3 13-3 17-23 17-20 0-26-4-23-17z" />
                    <path d="M472 452c-9-16-22-27-28-25-19 6-74-68-74-99 0-31 11-36 30-13 20 24 30 17 30-20 0-39 5-42 31-19 16 15 17 14 12-4-5-20 24-82 38-82 18 0 41 54 35 83l-6 31 22-24 23-24 10 36c10 34 11 35 33 21 21-15 22-14 22 19 0 26-9 42-39 72-24 24-40 33-43 25-2-7-10 2-17 19-18 42-54 44-79 4z" />
                  </g>
                </g>
              </g>

              <line className="ose-study__rule" x1="270" y1="454" x2="570" y2="454" />
              <text className="ose-study__type" x="420" y="507" textAnchor="middle">СОКОЛ</text>
              <line className="ose-study__rule" x1="310" y1="524" x2="530" y2="524" />
              <text className="ose-study__small-type" x="420" y="548" textAnchor="middle">ПРЯМАЯ ТРАССИРОВКА / 127×104</text>
            </svg>
          </div>
          <div className="ose-study__caption">source contour / no redesign</div>
        </div>
      </section>
    </main>
  );
}

export default OriginalEagleStudy;