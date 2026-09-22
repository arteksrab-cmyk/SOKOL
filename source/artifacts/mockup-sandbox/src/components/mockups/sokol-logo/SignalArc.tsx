import React from "react";

const signalPoints = [
  { cx: "67", cy: "26", delay: "0s" },
  { cx: "54", cy: "103", delay: "1.25s" },
  { cx: "73", cy: "184", delay: "2.5s" },
];

export function SignalArc() {
  return (
    <main className="signal-arc" aria-labelledby="signal-arc-title">
      <style>{`
        .signal-arc {
          --navy-950: #071522;
          --navy-900: #0b1d2b;
          --navy-800: #102b3a;
          --ivory: #f3f0e7;
          --muted: #93a8ad;
          --lime: #c9f04a;
          --lime-soft: #a1c83c;
          --orange: #e47c49;
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          color: var(--ivory);
          background:
            radial-gradient(circle at 51% 46%, rgba(50, 95, 103, .17), transparent 29rem),
            linear-gradient(135deg, var(--navy-950) 0%, #0a1a28 52%, #08131f 100%);
          font-family: "DM Sans", "Segoe UI", sans-serif;
          isolation: isolate;
        }

        .signal-arc::before {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: .24;
          background-image:
            linear-gradient(rgba(191, 235, 216, .055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(191, 235, 216, .055) 1px, transparent 1px);
          background-size: 4.1rem 4.1rem;
          mask-image: linear-gradient(to bottom, transparent 0%, #000 20%, #000 72%, transparent 100%);
          content: "";
        }

        .signal-arc::after {
          position: absolute;
          top: 13.5rem;
          left: 50%;
          width: 31rem;
          height: 31rem;
          border: 1px solid rgba(201, 240, 74, .09);
          border-radius: 50%;
          transform: translateX(-50%);
          content: "";
          pointer-events: none;
        }

        .signal-arc__header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: min(100% - 3rem, 72rem);
          margin: 0 auto;
          padding: 1.6rem 0;
          border-bottom: 1px solid rgba(243, 240, 231, .14);
        }

        .signal-arc__lockup {
          display: inline-flex;
          align-items: center;
          gap: .75rem;
          color: var(--ivory);
          text-decoration: none;
        }

        .signal-arc__mini-mark {
          position: relative;
          display: grid;
          width: 2.25rem;
          height: 2.25rem;
          place-items: center;
        }

        .signal-arc__mini-mark svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .signal-arc__wordmark {
          font-family: "Arial Narrow", "DM Sans", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: .3em;
        }

        .signal-arc__meta {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: var(--muted);
          font-family: "Space Mono", monospace;
          font-size: .62rem;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .signal-arc__status {
          width: .42rem;
          height: .42rem;
          border-radius: 50%;
          background: var(--lime);
          box-shadow: 0 0 0 .25rem rgba(201, 240, 74, .1);
          animation: signal-status 2.4s ease-in-out infinite;
        }

        .signal-arc__content {
          display: grid;
          grid-template-columns: minmax(0, .85fr) minmax(19rem, 1.15fr);
          align-items: center;
          gap: 4rem;
          width: min(100% - 3rem, 72rem);
          min-height: calc(100dvh - 5.8rem);
          margin: 0 auto;
          padding: 3rem 0 4rem;
        }

        .signal-arc__eyebrow {
          display: flex;
          align-items: center;
          gap: .8rem;
          margin: 0 0 1.4rem;
          color: var(--lime);
          font-family: "Space Mono", monospace;
          font-size: .68rem;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .signal-arc__eyebrow::before {
          width: 2.5rem;
          height: 1px;
          background: var(--lime);
          content: "";
        }

        .signal-arc__title {
          max-width: 27rem;
          margin: 0;
          color: var(--ivory);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3rem, 6vw, 5.7rem);
          font-weight: 400;
          letter-spacing: -.055em;
          line-height: .94;
        }

        .signal-arc__title em {
          color: var(--lime);
          font-style: normal;
        }

        .signal-arc__description {
          max-width: 24rem;
          margin: 1.9rem 0 0;
          color: var(--muted);
          font-size: .95rem;
          line-height: 1.7;
        }

        .signal-arc__specs {
          display: flex;
          gap: 1.8rem;
          margin: 2.5rem 0 0;
        }

        .signal-arc__spec {
          display: grid;
          gap: .32rem;
          padding-left: .8rem;
          border-left: 1px solid rgba(228, 124, 73, .7);
        }

        .signal-arc__spec strong {
          color: var(--ivory);
          font-family: "Space Mono", monospace;
          font-size: .72rem;
          font-weight: 400;
        }

        .signal-arc__spec span {
          color: var(--muted);
          font-family: "Space Mono", monospace;
          font-size: .56rem;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .signal-arc__stage {
          position: relative;
          display: grid;
          min-height: min(37rem, 70vh);
          place-items: center;
        }

        .signal-arc__stage-label {
          position: absolute;
          top: 0;
          right: 1rem;
          color: rgba(243, 240, 231, .42);
          font-family: "Space Mono", monospace;
          font-size: .56rem;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .signal-arc__stage-label::after {
          display: inline-block;
          width: 3rem;
          height: 1px;
          margin: 0 0 .2rem .5rem;
          background: var(--orange);
          content: "";
        }

        .signal-arc__orbital-line {
          position: absolute;
          width: min(31rem, 82vw);
          aspect-ratio: 1;
          border: 1px solid rgba(243, 240, 231, .1);
          border-radius: 50%;
          transform: rotate(-20deg) scaleY(.36);
        }

        .signal-arc__orbital-line--secondary {
          transform: rotate(64deg) scaleY(.28);
          border-color: rgba(201, 240, 74, .14);
        }

        .signal-arc__mark {
          position: relative;
          z-index: 1;
          width: min(24rem, 67vw);
          aspect-ratio: 1;
          filter: drop-shadow(0 0 1.8rem rgba(201, 240, 74, .12));
        }

        .signal-arc__mark svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .signal-arc__arc {
          fill: none;
          stroke: var(--lime);
          stroke-linecap: round;
          stroke-width: 4.5;
        }

        .signal-arc__arc--inner {
          opacity: .55;
          stroke: var(--lime-soft);
          stroke-width: 1.4;
        }

        .signal-arc__pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: signal-pulse 3.75s cubic-bezier(.4, 0, .2, 1) infinite;
        }

        .signal-arc__pulse-halo {
          fill: rgba(201, 240, 74, .18);
          filter: blur(5px);
        }

        .signal-arc__pulse-core {
          fill: var(--ivory);
          stroke: var(--lime);
          stroke-width: 1.5;
        }

        .signal-arc__mark-c {
          fill: var(--ivory);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 9.5rem;
          font-weight: 400;
          letter-spacing: -.13em;
        }

        .signal-arc__mark-c-outline {
          fill: none;
          stroke: rgba(243, 240, 231, .24);
          stroke-width: .7;
        }

        .signal-arc__caption {
          position: absolute;
          right: 1rem;
          bottom: .4rem;
          display: flex;
          align-items: center;
          gap: .7rem;
          color: rgba(243, 240, 231, .5);
          font-family: "Space Mono", monospace;
          font-size: .57rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .signal-arc__caption::before {
          width: 1.4rem;
          height: 1px;
          background: var(--orange);
          content: "";
        }

        @keyframes signal-pulse {
          0% { opacity: 0; transform: translate(0, 0) scale(.5); }
          8% { opacity: 1; transform: translate(0, 0) scale(1); }
          48% { opacity: 1; transform: translate(-1.2rem, 3.7rem) scale(1); }
          92% { opacity: .9; transform: translate(2.3rem, -4.3rem) scale(.8); }
          100% { opacity: 0; transform: translate(0, 0) scale(.5); }
        }

        @keyframes signal-status {
          0%, 100% { opacity: .55; transform: scale(.84); }
          50% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 700px) {
          .signal-arc__header,
          .signal-arc__content {
            width: min(100% - 2.2rem, 42rem);
          }

          .signal-arc__meta {
            display: none;
          }

          .signal-arc__content {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 1.5rem;
            padding-top: 3.5rem;
          }

          .signal-arc__title {
            max-width: 22rem;
            font-size: clamp(3.4rem, 17vw, 5.2rem);
          }

          .signal-arc__description {
            max-width: 25rem;
          }

          .signal-arc__stage {
            min-height: 24rem;
            margin-top: -1rem;
          }

          .signal-arc__stage-label {
            right: 0;
          }

          .signal-arc__caption {
            right: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .signal-arc *,
          .signal-arc *::before,
          .signal-arc *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="signal-arc__header">
        <div className="signal-arc__lockup" aria-label="Сокол">
          <span className="signal-arc__mini-mark" aria-hidden="true">
            <svg viewBox="0 0 36 36" role="presentation">
              <path
                className="signal-arc__arc"
                d="M28.4 10.2A12.7 12.7 0 1 0 28.4 25.8"
                strokeWidth="2.5"
              />
              <circle cx="27.7" cy="10.2" r="2" fill="var(--ivory)" />
              <circle cx="27.7" cy="10.2" r="3.7" fill="none" stroke="var(--lime)" strokeOpacity=".28" />
            </svg>
          </span>
          <span className="signal-arc__wordmark">СОКОЛ</span>
        </div>
        <div className="signal-arc__meta">
          <span className="signal-arc__status" aria-hidden="true" />
          active identity study / 03
        </div>
      </header>

      <section className="signal-arc__content">
        <div>
          <p className="signal-arc__eyebrow">Hypothesis / Signal Arc</p>
          <h1 className="signal-arc__title" id="signal-arc-title">
            A signal you can <em>feel.</em>
          </h1>
          <p className="signal-arc__description">
            Two measured arcs keep the Cyrillic С open and legible. A small pulse traces the gap like a live transmission — energy with nowhere to hide.
          </p>
          <div className="signal-arc__specs" aria-label="Logo characteristics">
            <div className="signal-arc__spec">
              <strong>OPEN / 02</strong>
              <span>arc geometry</span>
            </div>
            <div className="signal-arc__spec">
              <strong>LIVE / 01</strong>
              <span>signal behavior</span>
            </div>
          </div>
        </div>

        <div className="signal-arc__stage" aria-label="Animated Signal Arc logo mark">
          <span className="signal-arc__stage-label">standalone mark / 240</span>
          <span className="signal-arc__orbital-line" aria-hidden="true" />
          <span className="signal-arc__orbital-line signal-arc__orbital-line--secondary" aria-hidden="true" />
          <div className="signal-arc__mark">
            <svg viewBox="0 0 240 240" role="img" aria-labelledby="mark-title mark-description">
              <title id="mark-title">Signal Arc Cyrillic С mark</title>
              <desc id="mark-description">An open luminous Cyrillic С made from two arcs with a scanning point at the opening.</desc>
              <text className="signal-arc__mark-c-outline" x="119" y="168" textAnchor="middle">С</text>
              <text className="signal-arc__mark-c" x="119" y="168" textAnchor="middle">С</text>
              <path
                className="signal-arc__arc"
                d="M177 68.4A78 78 0 1 0 177 171.6"
                pathLength="1"
              />
              <path
                className="signal-arc__arc signal-arc__arc--inner"
                d="M170.8 73.6A70.8 70.8 0 1 0 170.8 166.4"
                pathLength="1"
              />
              <g className="signal-arc__pulse" aria-hidden="true">
                <circle className="signal-arc__pulse-halo" cx="177" cy="68.4" r="9" />
                <circle className="signal-arc__pulse-core" cx="177" cy="68.4" r="3.5" />
              </g>
              {signalPoints.slice(1).map((point) => (
                <circle key={point.delay} cx={point.cx} cy={point.cy} r="1.5" fill="var(--orange)" opacity=".55" />
              ))}
            </svg>
          </div>
          <div className="signal-arc__caption">pulse on opening / subtle by design</div>
        </div>
      </section>
    </main>
  );
}

export default SignalArc;