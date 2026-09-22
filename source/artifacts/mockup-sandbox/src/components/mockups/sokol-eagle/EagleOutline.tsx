import React from "react";

const outlineSpecs = [
  { value: "MONO / 01", label: "single-line eagle" },
  { value: "OPEN / 06", label: "architectural contour" },
];

function EagleMark({
  compact = false,
  labelled = false,
}: {
  compact?: boolean;
  labelled?: boolean;
}) {
  const titleId = compact ? undefined : "eagle-outline-mark-title";
  const descriptionId = compact ? undefined : "eagle-outline-mark-description";

  return (
    <svg
      className={compact ? "eagle-outline__mini-svg" : "eagle-outline__mark-svg"}
      viewBox="0 0 360 360"
      role={compact ? "presentation" : "img"}
      aria-hidden={compact ? true : undefined}
      aria-labelledby={labelled ? `${titleId} ${descriptionId}` : undefined}
    >
      {!compact && (
        <>
          <title id={titleId}>Сокол monoline eagle emblem</title>
          <desc id={descriptionId}>
            A calm, thin-line eagle nested in an open house-shaped hexagon, with a moving signal point.
          </desc>
        </>
      )}
      <defs>
        <linearGradient id={compact ? "eagle-gold-mini" : "eagle-gold"} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--eagle-gold-light)" />
          <stop offset="52%" stopColor="var(--eagle-gold)" />
          <stop offset="100%" stopColor="var(--eagle-gold-deep)" />
        </linearGradient>
        {!compact && (
          <clipPath id="eagle-scan-clip">
            <path d="M180 65 302 135v90l-122 70-122-70v-90Z" />
          </clipPath>
        )}
      </defs>

      <g className="eagle-outline__contour" fill="none" stroke={`url(#${compact ? "eagle-gold-mini" : "eagle-gold"})`}>
        <path d="M70 147V130L180 66l110 64v17" />
        <path d="M70 213v17l110 64 110-64v-17" />
        <path className="eagle-outline__contour-inner" d="M92 142 180 91l88 51M92 218l88 51 88-51" />
      </g>

      <g className="eagle-outline__eagle" fill="none" stroke={`url(#${compact ? "eagle-gold-mini" : "eagle-gold"})`}>
        <path d="M180 143c-9-10-16-15-27-18 8 11 12 21 11 31-24-8-47-21-71-36 13 20 30 37 50 50-27-7-50-14-73-29 18 24 41 42 69 52-18 7-33 15-45 26 20-5 39-8 58-6-7 12-15 22-24 32 18-4 35-12 52-27" />
        <path d="M180 143c9-10 16-15 27-18-8 11-12 21-11 31 24-8 47-21 71-36-13 20-30 37-50 50 27-7 50-14 73-29-18 24-41 42-69 52 18 7 33 15 45 26-20-5-39-8-58-6 7 12 15 22 24 32-18-4-35-12-52-27" />
        <path d="M180 140v91" />
        <path d="M166 225c4 8 9 16 14 22 5-6 10-14 14-22" />
        <path d="M172 144c3 5 5 8 8 11 3-3 5-6 8-11" />
        <path d="m177 151-8 11 10-4M183 151l8 11-10-4" />
        <path className="eagle-outline__feather" d="M119 185c21 1 42-2 61-10M241 185c-21 1-42-2-61-10" />
      </g>

      {!compact && (
        <g className="eagle-outline__scan-layer" clipPath="url(#eagle-scan-clip)" aria-hidden="true">
          <path d="M72 178h216" />
          <circle cx="82" cy="178" r="3.5" />
          <circle cx="82" cy="178" r="10" />
        </g>
      )}

      {!compact && (
        <g className="eagle-outline__signal-node" aria-hidden="true">
          <circle className="eagle-outline__signal-halo" cx="290" cy="130" r="12" />
          <circle className="eagle-outline__signal-core" cx="290" cy="130" r="3.5" />
        </g>
      )}
    </svg>
  );
}

export function EagleOutline() {
  return (
    <main className="eagle-outline" aria-labelledby="eagle-outline-title">
      <style>{`
        .eagle-outline {
          --eagle-navy-950: #071522;
          --eagle-navy-900: #0a1c2b;
          --eagle-navy-800: #102b3a;
          --eagle-ivory: #f3f0e7;
          --eagle-muted: #91a7ac;
          --eagle-gold: #e2b94f;
          --eagle-gold-light: #f4d980;
          --eagle-gold-deep: #a97927;
          --eagle-lime: #c9f04a;
          --eagle-orange: #e47c49;
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          color: var(--eagle-ivory);
          background:
            radial-gradient(circle at 67% 50%, rgba(176, 143, 51, .1), transparent 23rem),
            linear-gradient(138deg, var(--eagle-navy-950), var(--eagle-navy-900) 58%, #081521);
          font-family: "DM Sans", "Segoe UI", sans-serif;
        }

        .eagle-outline::before {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          opacity: .2;
          background-image:
            linear-gradient(rgba(191, 235, 216, .05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191, 235, 216, .05) 1px, transparent 1px);
          background-size: 4rem 4rem;
          mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent);
          content: "";
        }

        .eagle-outline::after {
          position: absolute;
          top: 9.25rem;
          right: 13%;
          z-index: -1;
          width: 24rem;
          height: 24rem;
          border: 1px solid rgba(226, 185, 79, .1);
          border-radius: 50%;
          transform: rotate(-24deg) scaleY(.46);
          pointer-events: none;
          content: "";
        }

        .eagle-outline__header,
        .eagle-outline__content {
          width: min(100% - 3rem, 72rem);
          margin: 0 auto;
        }

        .eagle-outline__header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.45rem 0;
          border-bottom: 1px solid rgba(243, 240, 231, .14);
        }

        .eagle-outline__lockup {
          display: inline-flex;
          align-items: center;
          gap: .75rem;
          color: var(--eagle-ivory);
        }

        .eagle-outline__mini-mark {
          display: grid;
          width: 2.35rem;
          height: 2.35rem;
          place-items: center;
          border: 1px solid rgba(226, 185, 79, .48);
          clip-path: polygon(50% 0, 100% 29%, 100% 71%, 50% 100%, 0 71%, 0 29%);
        }

        .eagle-outline__mini-svg {
          width: 2rem;
          height: 2rem;
        }

        .eagle-outline__wordmark {
          font-family: "Arial Narrow", "DM Sans", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: .3em;
        }

        .eagle-outline__context {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          color: var(--eagle-muted);
          font-family: "Space Mono", monospace;
          font-size: .61rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .eagle-outline__context::before {
          width: .4rem;
          height: .4rem;
          border-radius: 50%;
          background: var(--eagle-lime);
          box-shadow: 0 0 0 .25rem rgba(201, 240, 74, .09);
          content: "";
          animation: eagle-status 2.7s ease-in-out infinite;
        }

        .eagle-outline__content {
          display: grid;
          grid-template-columns: minmax(15rem, .82fr) minmax(20rem, 1.18fr);
          align-items: center;
          gap: 4.8rem;
          min-height: calc(100dvh - 5.6rem);
          padding: 3.4rem 0 4rem;
        }

        .eagle-outline__eyebrow {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin: 0 0 1.35rem;
          color: var(--eagle-lime);
          font-family: "Space Mono", monospace;
          font-size: .65rem;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .eagle-outline__eyebrow::before {
          width: 2.35rem;
          height: 1px;
          background: var(--eagle-lime);
          content: "";
        }

        .eagle-outline__title {
          max-width: 25rem;
          margin: 0;
          color: var(--eagle-ivory);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 400;
          letter-spacing: -.065em;
          line-height: .93;
        }

        .eagle-outline__title em {
          color: var(--eagle-gold);
          font-style: normal;
        }

        .eagle-outline__description {
          max-width: 23rem;
          margin: 1.8rem 0 0;
          color: var(--eagle-muted);
          font-size: .92rem;
          line-height: 1.72;
        }

        .eagle-outline__descriptor {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: .75rem;
          max-width: 23rem;
          margin-top: 2.2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(243, 240, 231, .14);
        }

        .eagle-outline__descriptor strong {
          color: var(--eagle-gold-light);
          font-family: "Space Mono", monospace;
          font-size: .65rem;
          font-weight: 400;
          letter-spacing: .11em;
          text-transform: uppercase;
        }

        .eagle-outline__descriptor span {
          color: var(--eagle-muted);
          font-family: "Space Mono", monospace;
          font-size: .59rem;
          letter-spacing: .08em;
          text-align: right;
          text-transform: uppercase;
        }

        .eagle-outline__specs {
          display: flex;
          gap: 1.6rem;
          margin-top: 2rem;
        }

        .eagle-outline__spec {
          display: grid;
          gap: .35rem;
          padding-left: .8rem;
          border-left: 1px solid rgba(228, 124, 73, .75);
        }

        .eagle-outline__spec strong {
          color: var(--eagle-ivory);
          font-family: "Space Mono", monospace;
          font-size: .68rem;
          font-weight: 400;
        }

        .eagle-outline__spec span {
          color: var(--eagle-muted);
          font-family: "Space Mono", monospace;
          font-size: .55rem;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .eagle-outline__stage {
          position: relative;
          display: grid;
          min-height: min(39rem, 72vh);
          place-items: center;
        }

        .eagle-outline__stage-label,
        .eagle-outline__caption {
          position: absolute;
          color: rgba(243, 240, 231, .46);
          font-family: "Space Mono", monospace;
          font-size: .55rem;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .eagle-outline__stage-label {
          top: .25rem;
          right: .2rem;
        }

        .eagle-outline__stage-label::after {
          display: inline-block;
          width: 2.7rem;
          height: 1px;
          margin: 0 0 .18rem .5rem;
          background: var(--eagle-orange);
          content: "";
        }

        .eagle-outline__mark {
          position: relative;
          width: min(28rem, 73vw);
          aspect-ratio: 1;
          filter: drop-shadow(0 0 1.6rem rgba(226, 185, 79, .13));
        }

        .eagle-outline__mark-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .eagle-outline__contour {
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .eagle-outline__contour-inner {
          opacity: .3;
          stroke-width: 1.2;
        }

        .eagle-outline__eagle {
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .eagle-outline__feather {
          opacity: .65;
          stroke-width: 1.2;
        }

        .eagle-outline__scan-layer {
          opacity: .66;
          stroke: var(--eagle-lime);
          stroke-width: 1.4;
          stroke-linecap: round;
          transform: translateY(-52px);
          animation: eagle-scan 4.8s cubic-bezier(.42, 0, .24, 1) infinite;
        }

        .eagle-outline__scan-layer circle {
          fill: var(--eagle-lime);
          stroke: none;
        }

        .eagle-outline__scan-layer circle + circle {
          fill: none;
          stroke: var(--eagle-lime);
          stroke-width: 1;
          opacity: .6;
          animation: eagle-scan-ping 2.2s ease-out infinite;
        }

        .eagle-outline__signal-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: eagle-node 4.8s ease-in-out infinite;
        }

        .eagle-outline__signal-halo {
          fill: rgba(201, 240, 74, .1);
          stroke: var(--eagle-lime);
          stroke-opacity: .22;
          stroke-width: 1;
        }

        .eagle-outline__signal-core {
          fill: var(--eagle-ivory);
          stroke: var(--eagle-lime);
          stroke-width: 1.2;
        }

        .eagle-outline__caption {
          right: .2rem;
          bottom: .45rem;
        }

        .eagle-outline__caption::before {
          display: inline-block;
          width: 1.35rem;
          height: 1px;
          margin: 0 .65rem .2rem 0;
          background: var(--eagle-orange);
          content: "";
        }

        @keyframes eagle-scan {
          0%, 10% { opacity: 0; transform: translateY(-52px); }
          18% { opacity: .68; }
          72% { opacity: .6; transform: translateY(138px); }
          84%, 100% { opacity: 0; transform: translateY(165px); }
        }

        @keyframes eagle-scan-ping {
          0%, 100% { opacity: .1; transform: scale(.7); }
          45% { opacity: .7; transform: scale(1.3); }
        }

        @keyframes eagle-node {
          0%, 100% { opacity: .45; transform: scale(.9); }
          48% { opacity: 1; transform: scale(1.12); }
        }

        @keyframes eagle-status {
          0%, 100% { opacity: .55; transform: scale(.82); }
          50% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 720px) {
          .eagle-outline__header,
          .eagle-outline__content {
            width: min(100% - 2.2rem, 42rem);
          }

          .eagle-outline__context {
            display: none;
          }

          .eagle-outline__content {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: .7rem;
            padding-top: 1.65rem;
          }

          .eagle-outline__title {
            max-width: 21rem;
            font-size: clamp(2.8rem, 14vw, 4.4rem);
          }

          .eagle-outline__description {
            max-width: 28rem;
            margin-top: 1rem;
            font-size: .78rem;
            line-height: 1.48;
          }

          .eagle-outline__descriptor {
            margin-top: .7rem;
            padding: .7rem 0;
            font-size: .56rem;
          }

          .eagle-outline__stage {
            min-height: 15.5rem;
            margin-top: -.5rem;
          }

          .eagle-outline__mark {
            width: min(16.5rem, 64vw);
          }

          .eagle-outline__specs { margin-top: .85rem; }
          .eagle-outline__caption { bottom: .1rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .eagle-outline *,
          .eagle-outline *::before,
          .eagle-outline *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="eagle-outline__header">
        <div className="eagle-outline__lockup" aria-label="Сокол — производственная фирма">
          <span className="eagle-outline__mini-mark">
            <EagleMark compact />
          </span>
          <span className="eagle-outline__wordmark">СОКОЛ</span>
        </div>
        <div className="eagle-outline__context">identity study / 04</div>
      </header>

      <section className="eagle-outline__content">
        <div className="eagle-outline__copy">
          <p className="eagle-outline__eyebrow">Hypothesis / Eagle Outline</p>
          <h1 className="eagle-outline__title" id="eagle-outline-title">
            Quietly <em>precise.</em>
          </h1>
          <p className="eagle-outline__description">
            The сокол is reduced to a measured line: wings, body, and a clear vertical axis. An open house contour keeps the symbol architectural — built for glass, фасад, and every size between.
          </p>
          <div className="eagle-outline__descriptor">
            <strong>Производственная фирма</strong>
            <span>все виды остекления</span>
          </div>
          <div className="eagle-outline__specs" aria-label="Logo characteristics">
            {outlineSpecs.map((spec) => (
              <div className="eagle-outline__spec" key={spec.value}>
                <strong>{spec.value}</strong>
                <span>{spec.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="eagle-outline__stage" aria-label="Animated Sokol eagle outline logo">
          <span className="eagle-outline__stage-label">standalone mark / 240</span>
          <div className="eagle-outline__mark">
            <EagleMark labelled />
          </div>
          <div className="eagle-outline__caption">scan contour / calm signal</div>
        </div>
      </section>
    </main>
  );
}

export default EagleOutline;