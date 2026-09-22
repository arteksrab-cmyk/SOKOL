import type { CSSProperties } from "react";

const css = `
  .orbit-lens {
    --navy-950: #061725;
    --navy-900: #0a2030;
    --navy-800: #103448;
    --ivory: #f2eedf;
    --ivory-dim: #b9c2bb;
    --lime: #c8eb70;
    --orange: #df8959;
    position: relative;
    min-height: 100dvh;
    overflow: hidden;
    isolation: isolate;
    background:
      radial-gradient(circle at 50% 47%, rgba(32, 77, 83, 0.28), transparent 27rem),
      linear-gradient(135deg, var(--navy-950) 0%, var(--navy-900) 56%, #071b2b 100%);
    color: var(--ivory);
    font-family: "Trebuchet MS", "Segoe UI", sans-serif;
  }

  .orbit-lens::before {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: radial-gradient(rgba(242, 238, 223, 0.16) 0.55px, transparent 0.55px);
    background-size: 22px 22px;
    content: "";
    opacity: 0.09;
    pointer-events: none;
  }

  .orbit-lens__header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: min(100% - 48px, 1180px);
    margin: 0 auto;
    padding: 25px 0;
  }

  .orbit-lens__lockup {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    color: var(--ivory);
    text-decoration: none;
  }

  .orbit-lens__mini-mark {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border: 1px solid rgba(200, 235, 112, 0.78);
    border-radius: 50%;
    background: rgba(6, 23, 37, 0.6);
    box-shadow: 0 0 0 4px rgba(200, 235, 112, 0.06);
  }

  .orbit-lens__mini-mark span {
    display: block;
    margin-top: -2px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 25px;
    font-weight: 700;
    line-height: 1;
    transform: translateX(-1px);
  }

  .orbit-lens__wordmark {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.19em;
  }

  .orbit-lens__descriptor {
    margin: 0;
    color: var(--ivory-dim);
    font-family: "Courier New", monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .orbit-lens__main {
    display: grid;
    min-height: calc(100dvh - 86px);
    place-items: center;
    padding: 10px 24px 62px;
  }

  .orbit-lens__stage {
    position: relative;
    display: grid;
    width: min(76vw, 640px);
    aspect-ratio: 1;
    place-items: center;
  }

  .orbit-lens__stage::before,
  .orbit-lens__stage::after {
    position: absolute;
    border: 1px solid rgba(242, 238, 223, 0.08);
    border-radius: 50%;
    content: "";
    pointer-events: none;
  }

  .orbit-lens__stage::before {
    width: 66%;
    height: 66%;
  }

  .orbit-lens__stage::after {
    width: 31%;
    height: 31%;
    border-color: rgba(200, 235, 112, 0.12);
  }

  .orbit-lens__svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .orbit-lens__orbit {
    transform-box: fill-box;
    transform-origin: center;
  }

  .orbit-lens__orbit--outer {
    animation: orbit-lens-spin 32s linear infinite;
  }

  .orbit-lens__orbit--inner {
    animation: orbit-lens-spin-reverse 24s linear infinite;
  }

  .orbit-lens__core {
    animation: orbit-lens-breathe 5.5s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  .orbit-lens__caption {
    position: absolute;
    right: 0;
    bottom: 5%;
    left: 0;
    margin: 0;
    color: var(--ivory-dim);
    font-family: "Courier New", monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-align: center;
    text-transform: uppercase;
  }

  .orbit-lens__caption strong {
    color: var(--lime);
    font-weight: 400;
  }

  .orbit-lens__footer {
    position: absolute;
    right: 24px;
    bottom: 24px;
    left: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(185, 194, 187, 0.68);
    font-family: "Courier New", monospace;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .orbit-lens__footer span:last-child {
    color: var(--orange);
  }

  @keyframes orbit-lens-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes orbit-lens-spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  @keyframes orbit-lens-breathe {
    0%, 100% { opacity: 0.86; transform: scale(0.98); }
    50% { opacity: 1; transform: scale(1.03); }
  }

  @media (max-width: 560px) {
    .orbit-lens__header {
      width: min(100% - 32px, 1180px);
      padding-top: 18px;
    }

    .orbit-lens__descriptor {
      display: none;
    }

    .orbit-lens__main {
      min-height: calc(100dvh - 73px);
      padding: 0 16px 52px;
    }

    .orbit-lens__stage {
      width: min(96vw, 520px);
    }

    .orbit-lens__caption {
      bottom: 3%;
      font-size: 9px;
    }

    .orbit-lens__footer {
      right: 16px;
      bottom: 15px;
      left: 16px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .orbit-lens__orbit--outer,
    .orbit-lens__orbit--inner,
    .orbit-lens__core {
      animation: none;
    }
  }
`;

export function OrbitLens() {
  const miniMarkStyle = { color: "var(--lime)" } as CSSProperties;

  return (
    <div className="orbit-lens">
      <style>{css}</style>

      <header className="orbit-lens__header" aria-label="Sokol identity preview">
        <div className="orbit-lens__lockup" aria-label="Сокол">
          <div className="orbit-lens__mini-mark" aria-hidden="true">
            <span style={miniMarkStyle}>С</span>
          </div>
          <span className="orbit-lens__wordmark">СОКОЛ</span>
        </div>
        <p className="orbit-lens__descriptor">identity study / 03</p>
      </header>

      <main className="orbit-lens__main" aria-labelledby="orbit-lens-title">
        <div className="orbit-lens__stage">
          <svg
            className="orbit-lens__svg"
            viewBox="0 0 640 640"
            role="img"
            aria-labelledby="orbit-lens-title orbit-lens-svg-description"
          >
            <title id="orbit-lens-title">Orbit Lens С mark</title>
            <desc id="orbit-lens-svg-description">
              A Cyrillic С held in a quiet orbital lens with counter-rotating elliptical rings.
            </desc>

            <defs>
              <radialGradient id="orbit-lens-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c8eb70" stopOpacity="0.32" />
                <stop offset="52%" stopColor="#c8eb70" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#c8eb70" stopOpacity="0" />
              </radialGradient>
              <filter id="orbit-lens-soft-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
            </defs>

            <g className="orbit-lens__orbit orbit-lens__orbit--outer" fill="none">
              <ellipse
                cx="320"
                cy="320"
                rx="257"
                ry="128"
                stroke="#b9c2bb"
                strokeOpacity="0.22"
                strokeWidth="1"
                transform="rotate(-28 320 320)"
              />
              <ellipse
                cx="320"
                cy="320"
                rx="257"
                ry="128"
                stroke="#c8eb70"
                strokeDasharray="2 15"
                strokeLinecap="round"
                strokeOpacity="0.72"
                strokeWidth="2"
                transform="rotate(-28 320 320)"
              />
              <circle cx="551" cy="207" r="5" fill="#df8959" stroke="none" />
              <circle cx="551" cy="207" r="12" fill="none" stroke="#df8959" strokeOpacity="0.28" />
            </g>

            <g className="orbit-lens__orbit orbit-lens__orbit--inner" fill="none">
              <ellipse
                cx="320"
                cy="320"
                rx="214"
                ry="81"
                stroke="#f2eedf"
                strokeOpacity="0.36"
                strokeWidth="1"
                transform="rotate(36 320 320)"
              />
              <ellipse
                cx="320"
                cy="320"
                rx="182"
                ry="182"
                stroke="#c8eb70"
                strokeDasharray="1 21"
                strokeLinecap="round"
                strokeOpacity="0.44"
                strokeWidth="2"
              />
              <circle cx="145" cy="409" r="4" fill="#c8eb70" stroke="none" />
            </g>

            <g className="orbit-lens__core">
              <circle cx="320" cy="320" r="126" fill="url(#orbit-lens-core)" filter="url(#orbit-lens-soft-glow)" />
              <circle cx="320" cy="320" r="74" fill="#0a2030" stroke="#c8eb70" strokeOpacity="0.18" strokeWidth="1" />
              <path
                d="M 367 263 A 67 67 0 1 0 367 377"
                fill="none"
                stroke="#f2eedf"
                strokeLinecap="round"
                strokeWidth="17"
              />
              <circle cx="320" cy="320" r="8" fill="#c8eb70" />
              <circle cx="320" cy="320" r="19" fill="none" stroke="#c8eb70" strokeOpacity="0.42" strokeWidth="1" />
            </g>
          </svg>

          <p className="orbit-lens__caption" id="orbit-lens-description">
            <strong>Orbit Lens</strong> / signal held in place
          </p>
        </div>
      </main>

      <footer className="orbit-lens__footer" aria-label="Logo hypothesis details">
        <span>С / orbital object</span>
        <span>hypothesis 03</span>
      </footer>
    </div>
  );
}