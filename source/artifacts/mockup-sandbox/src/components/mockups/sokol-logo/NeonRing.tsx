import { useId } from "react";

function NeonMark({ size = 320 }: { size?: number }) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "");

  return (
    <svg
      className="neon-ring__mark"
      width={size}
      height={size}
      viewBox="0 0 320 320"
      role="img"
      aria-label="Сокол Neon Ring mark"
    >
      <defs>
        <filter id={`${id}-soft-glow`} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${id}-tight-glow`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="neon-ring__halo" filter={`url(#${id}-soft-glow)`}>
        <circle cx="160" cy="160" r="113" fill="none" stroke="#c8f36b" strokeWidth="2" opacity="0.34" />
        <circle cx="160" cy="160" r="126" fill="none" stroke="#c8f36b" strokeWidth="1" opacity="0.15" />
      </g>

      <circle
        className="neon-ring__outer-orbit"
        cx="160"
        cy="160"
        r="139"
        fill="none"
        stroke="#f2ead8"
        strokeWidth="1"
        strokeDasharray="1 11"
        opacity="0.24"
      />
      <ellipse
        className="neon-ring__tilted-orbit"
        cx="160"
        cy="160"
        rx="142"
        ry="52"
        fill="none"
        stroke="#c8f36b"
        strokeWidth="1"
        strokeDasharray="50 17 2 11"
        opacity="0.42"
        transform="rotate(-23 160 160)"
      />
      <circle
        className="neon-ring__sweep"
        cx="160"
        cy="160"
        r="126"
        fill="none"
        stroke="#c8f36b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="90 700"
        filter={`url(#${id}-tight-glow)`}
      />
      <circle
        className="neon-ring__inner-ring"
        cx="160"
        cy="160"
        r="108"
        fill="rgba(8, 18, 35, 0.46)"
        stroke="#c8f36b"
        strokeWidth="1.5"
        opacity="0.92"
      />

      <g className="neon-ring__wordmark" aria-hidden="true">
        <text
          x="160"
          y="211"
          textAnchor="middle"
          fill="#f2ead8"
          fontFamily="Georgia, Times, serif"
          fontSize="155"
          fontWeight="400"
          letterSpacing="-12"
        >
          С
        </text>
        <circle cx="218" cy="159" r="4" fill="#c8f36b" filter={`url(#${id}-tight-glow)`} />
      </g>

      <g className="neon-ring__signal" filter={`url(#${id}-tight-glow)`}>
        <circle cx="160" cy="18" r="4" fill="#c8f36b" />
        <circle cx="160" cy="18" r="8" fill="none" stroke="#c8f36b" strokeWidth="1" opacity="0.34" />
      </g>
      <circle cx="54" cy="218" r="2" fill="#df8251" opacity="0.8" />
    </svg>
  );
}

export function NeonRing() {
  return (
    <main className="neon-ring" aria-labelledby="neon-ring-title">
      <style>{`
        .neon-ring {
          --navy-950: #07111f;
          --navy-900: #0b1729;
          --navy-800: #12243a;
          --ivory: #f2ead8;
          --lime: #c8f36b;
          --orange: #df8251;
          position: relative;
          isolation: isolate;
          min-height: 100dvh;
          overflow: hidden;
          box-sizing: border-box;
          padding: 28px clamp(22px, 5vw, 72px) 42px;
          color: var(--ivory);
          background:
            radial-gradient(circle at 50% 54%, rgba(28, 63, 80, 0.54), transparent 31%),
            radial-gradient(circle at 82% 14%, rgba(200, 243, 107, 0.075), transparent 19%),
            var(--navy-950);
          font-family: "Avenir Next", "Segoe UI", sans-serif;
        }

        .neon-ring::before {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          content: "";
          opacity: 0.34;
          background-image:
            linear-gradient(rgba(242, 234, 216, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242, 234, 216, 0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(to bottom, black, transparent 78%);
        }

        .neon-ring::after {
          position: absolute;
          z-index: -1;
          top: 14%;
          right: 8%;
          width: 1px;
          height: 54%;
          content: "";
          opacity: 0.3;
          background: linear-gradient(to bottom, transparent, var(--lime), transparent);
        }

        .neon-ring__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1320px;
          margin: 0 auto;
        }

        .neon-ring__lockup {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: var(--ivory);
          text-decoration: none;
        }

        .neon-ring__mini-mark {
          display: grid;
          width: 36px;
          height: 36px;
          place-items: center;
          border: 1px solid rgba(200, 243, 107, 0.64);
          border-radius: 50%;
          background: rgba(200, 243, 107, 0.045);
          box-shadow: 0 0 18px rgba(200, 243, 107, 0.12), inset 0 0 14px rgba(200, 243, 107, 0.08);
        }

        .neon-ring__mini-mark span {
          display: block;
          color: var(--ivory);
          font-family: Georgia, Times, serif;
          font-size: 24px;
          line-height: 1;
          transform: translate(-1px, -1px);
        }

        .neon-ring__wordmark-label {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.27em;
          line-height: 1;
        }

        .neon-ring__header-note,
        .neon-ring__eyebrow,
        .neon-ring__spec-label,
        .neon-ring__footer {
          color: rgba(242, 234, 216, 0.51);
          font-family: "SFMono-Regular", Consolas, monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .neon-ring__header-note {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .neon-ring__header-note::before {
          width: 5px;
          height: 5px;
          content: "";
          border-radius: 50%;
          background: var(--lime);
          box-shadow: 0 0 8px rgba(200, 243, 107, 0.75);
        }

        .neon-ring__stage {
          display: grid;
          grid-template-columns: minmax(150px, 1fr) minmax(300px, 460px) minmax(150px, 1fr);
          align-items: center;
          gap: 32px;
          max-width: 1320px;
          min-height: min(700px, calc(100dvh - 142px));
          margin: 0 auto;
        }

        .neon-ring__intro {
          align-self: center;
          max-width: 220px;
          padding-bottom: 3vh;
        }

        .neon-ring__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          color: var(--lime);
        }

        .neon-ring__eyebrow::before {
          width: 26px;
          height: 1px;
          content: "";
          background: var(--lime);
        }

        .neon-ring h1 {
          max-width: 210px;
          margin: 0;
          color: var(--ivory);
          font-family: Georgia, Times, serif;
          font-size: clamp(30px, 3.5vw, 52px);
          font-weight: 400;
          letter-spacing: -0.045em;
          line-height: 0.98;
        }

        .neon-ring__description {
          max-width: 210px;
          margin: 20px 0 0;
          color: rgba(242, 234, 216, 0.6);
          font-size: 12px;
          line-height: 1.65;
        }

        .neon-ring__figure {
          position: relative;
          display: grid;
          width: min(100%, 460px);
          aspect-ratio: 1;
          margin: 0 auto;
          place-items: center;
        }

        .neon-ring__figure::before,
        .neon-ring__figure::after {
          position: absolute;
          width: 100%;
          height: 1px;
          content: "";
          background: linear-gradient(to right, transparent, rgba(200, 243, 107, 0.24), transparent);
        }

        .neon-ring__figure::after {
          transform: rotate(90deg);
        }

        .neon-ring__mark {
          position: relative;
          z-index: 1;
          display: block;
          width: 88%;
          height: 88%;
          overflow: visible;
          animation: neon-ring-breathe 5.6s ease-in-out infinite;
        }

        .neon-ring__halo {
          animation: neon-ring-halo 5.6s ease-in-out infinite;
          transform-origin: 160px 160px;
        }

        .neon-ring__sweep {
          animation: neon-ring-sweep 18s linear infinite;
          transform-origin: 160px 160px;
        }

        .neon-ring__signal {
          animation: neon-ring-orbit 8s linear infinite;
          transform-origin: 160px 160px;
        }

        .neon-ring__specs {
          display: flex;
          flex-direction: column;
          align-self: end;
          gap: 24px;
          max-width: 190px;
          padding-bottom: 10vh;
          border-left: 1px solid rgba(242, 234, 216, 0.17);
          padding-left: 20px;
        }

        .neon-ring__spec {
          display: grid;
          gap: 6px;
        }

        .neon-ring__spec-label {
          color: rgba(242, 234, 216, 0.42);
          font-size: 9px;
        }

        .neon-ring__spec-value {
          color: var(--ivory);
          font-family: "SFMono-Regular", Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          line-height: 1.4;
        }

        .neon-ring__spec-value strong {
          color: var(--lime);
          font-weight: 400;
        }

        .neon-ring__footer {
          display: flex;
          justify-content: space-between;
          max-width: 1320px;
          margin: 0 auto;
          padding-top: 18px;
          border-top: 1px solid rgba(242, 234, 216, 0.12);
        }

        .neon-ring__footer span:last-child {
          color: rgba(242, 234, 216, 0.3);
        }

        @keyframes neon-ring-breathe {
          0%, 100% { transform: scale(0.985); opacity: 0.93; }
          50% { transform: scale(1); opacity: 1; }
        }

        @keyframes neon-ring-halo {
          0%, 100% { transform: scale(0.98); opacity: 0.72; }
          50% { transform: scale(1.035); opacity: 1; }
        }

        @keyframes neon-ring-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes neon-ring-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 760px) {
          .neon-ring {
            padding: 22px 20px 28px;
          }

          .neon-ring__header-note {
            display: none;
          }

          .neon-ring__stage {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 24px;
            min-height: auto;
            padding: 10vh 0 9vh;
          }

          .neon-ring__intro {
            align-self: auto;
            width: 100%;
            max-width: 460px;
            padding-bottom: 0;
          }

          .neon-ring h1,
          .neon-ring__description {
            max-width: 100%;
          }

          .neon-ring__description {
            margin-top: 12px;
          }

          .neon-ring__figure {
            width: min(100%, 370px);
            order: 2;
          }

          .neon-ring__specs {
            flex-direction: row;
            align-self: auto;
            width: 100%;
            max-width: 460px;
            padding: 18px 0 0;
            border-top: 1px solid rgba(242, 234, 216, 0.17);
            border-left: 0;
          }

          .neon-ring__footer {
            gap: 12px;
            font-size: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .neon-ring__mark,
          .neon-ring__halo,
          .neon-ring__sweep,
          .neon-ring__signal {
            animation: none;
          }
        }
      `}</style>

      <header className="neon-ring__header">
        <div className="neon-ring__lockup" aria-label="Сокол">
          <div className="neon-ring__mini-mark" aria-hidden="true">
            <span>С</span>
          </div>
          <span className="neon-ring__wordmark-label">СОКОЛ</span>
        </div>
        <div className="neon-ring__header-note">identity study / 01</div>
      </header>

      <section className="neon-ring__stage">
        <div className="neon-ring__intro">
          <div className="neon-ring__eyebrow">hypothesis 01</div>
          <h1 id="neon-ring-title">Neon Ring</h1>
          <p className="neon-ring__description">
            A contained signal. The С stays immediate; the halo gives it just enough charge to feel alive.
          </p>
        </div>

        <figure className="neon-ring__figure">
          <NeonMark />
        </figure>

        <aside className="neon-ring__specs" aria-label="Mark characteristics">
          <div className="neon-ring__spec">
            <span className="neon-ring__spec-label">core</span>
            <span className="neon-ring__spec-value">Cyrillic <strong>С</strong></span>
          </div>
          <div className="neon-ring__spec">
            <span className="neon-ring__spec-label">signal</span>
            <span className="neon-ring__spec-value">orbit / <strong>subtle</strong></span>
          </div>
          <div className="neon-ring__spec">
            <span className="neon-ring__spec-label">scale</span>
            <span className="neon-ring__spec-value">36px → <strong>∞</strong></span>
          </div>
        </aside>
      </section>

      <footer className="neon-ring__footer">
        <span>СОКОЛ / identity exploration</span>
        <span>navy · ivory · lime · signal orange</span>
      </footer>
    </main>
  );
}
