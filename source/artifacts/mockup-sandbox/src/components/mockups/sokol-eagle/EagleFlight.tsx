import React from "react";

export function EagleFlight() {
  return (
    <main className="eagle-flight" aria-labelledby="eagle-flight-title">
      <style>{`
        .eagle-flight {
          --ef-navy-950: #071522;
          --ef-navy-900: #0b1d2b;
          --ef-navy-800: #123143;
          --ef-ivory: #f3f0e7;
          --ef-muted: #8da5aa;
          --ef-gold: #d9ae4d;
          --ef-gold-bright: #f1d27c;
          --ef-lime: #c9f04a;
          --ef-orange: #e47c49;
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          color: var(--ef-ivory);
          background:
            radial-gradient(circle at 72% 42%, rgba(214, 169, 73, .12), transparent 20rem),
            radial-gradient(circle at 12% 86%, rgba(37, 93, 104, .18), transparent 24rem),
            linear-gradient(135deg, var(--ef-navy-950) 0%, #091b29 56%, #08121d 100%);
          font-family: "DM Sans", "Segoe UI", sans-serif;
        }

        .eagle-flight::before {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          opacity: .23;
          background-image:
            linear-gradient(rgba(243, 240, 231, .045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(243, 240, 231, .045) 1px, transparent 1px);
          background-size: 4.25rem 4.25rem;
          mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 76%, transparent);
          content: "";
        }

        .eagle-flight::after {
          position: absolute;
          top: 13rem;
          right: -11rem;
          width: 30rem;
          height: 30rem;
          border: 1px solid rgba(217, 174, 77, .11);
          border-radius: 50%;
          transform: rotate(-18deg) scaleY(.42);
          pointer-events: none;
          content: "";
        }

        .eagle-flight__header,
        .eagle-flight__content {
          width: min(100% - 3rem, 72rem);
          margin: 0 auto;
        }

        .eagle-flight__header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 5.6rem;
          border-bottom: 1px solid rgba(243, 240, 231, .14);
        }

        .eagle-flight__lockup {
          display: inline-flex;
          align-items: center;
          gap: .72rem;
          color: var(--ef-ivory);
        }

        .eagle-flight__mini {
          display: block;
          width: 2.35rem;
          height: 2.35rem;
        }

        .eagle-flight__lockup-copy {
          display: grid;
          gap: .16rem;
        }

        .eagle-flight__wordmark {
          font-family: "Arial Narrow", "DM Sans", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: .28em;
        }

        .eagle-flight__descriptor {
          color: var(--ef-muted);
          font-family: "Space Mono", monospace;
          font-size: .47rem;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .eagle-flight__status {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: var(--ef-muted);
          font-family: "Space Mono", monospace;
          font-size: .58rem;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .eagle-flight__status-dot {
          width: .42rem;
          height: .42rem;
          border-radius: 50%;
          background: var(--ef-lime);
          box-shadow: 0 0 0 .25rem rgba(201, 240, 74, .1);
          animation: eagle-status 2.8s ease-in-out infinite;
        }

        .eagle-flight__content {
          display: grid;
          grid-template-columns: minmax(15rem, .72fr) minmax(24rem, 1.28fr);
          align-items: center;
          gap: 3.4rem;
          min-height: calc(100dvh - 5.6rem);
          padding: 3.25rem 0 3.8rem;
        }

        .eagle-flight__eyebrow {
          display: flex;
          align-items: center;
          gap: .8rem;
          margin: 0 0 1.3rem;
          color: var(--ef-gold-bright);
          font-family: "Space Mono", monospace;
          font-size: .64rem;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .eagle-flight__eyebrow::before {
          width: 2.45rem;
          height: 1px;
          background: var(--ef-orange);
          content: "";
        }

        .eagle-flight__title {
          max-width: 27rem;
          margin: 0;
          color: var(--ef-ivory);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3.25rem, 6vw, 5.7rem);
          font-weight: 400;
          letter-spacing: -.06em;
          line-height: .91;
        }

        .eagle-flight__title em {
          color: var(--ef-gold-bright);
          font-style: normal;
        }

        .eagle-flight__description {
          max-width: 25rem;
          margin: 1.8rem 0 0;
          color: var(--ef-muted);
          font-size: .9rem;
          line-height: 1.72;
        }

        .eagle-flight__details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: .8rem;
          max-width: 25rem;
          margin: 2.25rem 0 0;
        }

        .eagle-flight__detail {
          display: grid;
          gap: .34rem;
          padding: .8rem 0 .8rem .8rem;
          border-left: 1px solid var(--ef-orange);
          background: linear-gradient(90deg, rgba(228, 124, 73, .055), transparent);
        }

        .eagle-flight__detail strong {
          color: var(--ef-ivory);
          font-family: "Space Mono", monospace;
          font-size: .68rem;
          font-weight: 400;
        }

        .eagle-flight__detail span {
          color: var(--ef-muted);
          font-family: "Space Mono", monospace;
          font-size: .53rem;
          letter-spacing: .07em;
          line-height: 1.35;
          text-transform: uppercase;
        }

        .eagle-flight__stage {
          position: relative;
          display: grid;
          min-height: min(39rem, 72vh);
          place-items: center;
        }

        .eagle-flight__stage-label {
          position: absolute;
          top: 0;
          right: .3rem;
          color: rgba(243, 240, 231, .43);
          font-family: "Space Mono", monospace;
          font-size: .55rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .eagle-flight__stage-label::after {
          display: inline-block;
          width: 2.8rem;
          height: 1px;
          margin: 0 0 .2rem .5rem;
          background: var(--ef-lime);
          content: "";
        }

        .eagle-flight__orbit {
          position: absolute;
          width: min(32rem, 88vw);
          aspect-ratio: 1;
          border: 1px solid rgba(243, 240, 231, .09);
          border-radius: 50%;
          transform: rotate(26deg) scaleY(.35);
        }

        .eagle-flight__orbit--accent {
          border-color: rgba(201, 240, 74, .11);
          transform: rotate(-38deg) scaleY(.27);
        }

        .eagle-flight__mark {
          position: relative;
          z-index: 1;
          width: min(27rem, 74vw);
          aspect-ratio: 1;
          filter: drop-shadow(0 1rem 2.1rem rgba(0, 0, 0, .22));
        }

        .eagle-flight__mark svg {
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .eagle-flight__roof {
          fill: none;
          stroke: var(--ef-gold);
          stroke-linecap: square;
          stroke-linejoin: bevel;
          stroke-width: 7;
        }

        .eagle-flight__roof-detail {
          fill: none;
          stroke: rgba(241, 210, 124, .45);
          stroke-linecap: round;
          stroke-width: 1.5;
        }

        .eagle-flight__roof-tip {
          transform-box: fill-box;
          transform-origin: center;
          animation: eagle-tip 4.4s ease-in-out infinite;
        }

        .eagle-flight__eagle {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: eagle-lift 4.8s cubic-bezier(.45, 0, .2, 1) infinite;
        }

        .eagle-flight__wing {
          fill: var(--ef-gold);
          stroke: var(--ef-gold-bright);
          stroke-linejoin: round;
          stroke-width: 1.2;
        }

        .eagle-flight__wing-shadow {
          fill: #9c7629;
          opacity: .7;
        }

        .eagle-flight__body {
          fill: var(--ef-gold-bright);
          stroke: #a97e2e;
          stroke-width: 1.2;
        }

        .eagle-flight__feather {
          fill: none;
          stroke: rgba(7, 21, 34, .65);
          stroke-linecap: round;
          stroke-width: 2;
        }

        .eagle-flight__trail {
          fill: none;
          stroke: var(--ef-lime);
          stroke-dasharray: 1 10;
          stroke-linecap: round;
          stroke-width: 2;
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: eagle-trail 4.8s cubic-bezier(.4, 0, .2, 1) infinite;
        }

        .eagle-flight__light {
          fill: var(--ef-ivory);
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: eagle-light 4.8s ease-in-out infinite;
        }

        .eagle-flight__light-line {
          fill: var(--ef-gold-bright);
          opacity: .24;
        }

        .eagle-flight__caption {
          position: absolute;
          right: .3rem;
          bottom: .25rem;
          display: flex;
          align-items: center;
          gap: .65rem;
          color: rgba(243, 240, 231, .5);
          font-family: "Space Mono", monospace;
          font-size: .55rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .eagle-flight__caption::before {
          width: 1.5rem;
          height: 1px;
          background: var(--ef-orange);
          content: "";
        }

        .eagle-flight__stage-wordmark {
          position: absolute;
          bottom: 1.7rem;
          left: 50%;
          z-index: 0;
          color: rgba(243, 240, 231, .11);
          font-family: "Arial Narrow", "DM Sans", sans-serif;
          font-size: clamp(2.7rem, 7vw, 5.5rem);
          font-weight: 700;
          letter-spacing: .17em;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        @keyframes eagle-lift {
          0%, 100% { transform: translateY(7px) scale(.985); }
          42% { transform: translateY(-7px) scale(1); }
          58% { transform: translateY(-11px) scale(1.01); }
        }

        @keyframes eagle-trail {
          0%, 9% { opacity: 0; transform: translate(0, 18px) scale(.78); }
          25% { opacity: .72; transform: translate(-10px, 5px) scale(1); }
          57% { opacity: .36; transform: translate(11px, -12px) scale(.9); }
          82%, 100% { opacity: 0; transform: translate(4px, -27px) scale(.7); }
        }

        @keyframes eagle-light {
          0%, 15% { opacity: 0; transform: translateX(-80px); }
          35% { opacity: .75; transform: translateX(0); }
          52%, 100% { opacity: 0; transform: translateX(86px); }
        }

        @keyframes eagle-tip {
          0%, 100% { opacity: .55; transform: translateY(2px); }
          48% { opacity: 1; transform: translateY(-3px); }
        }

        @keyframes eagle-status {
          0%, 100% { opacity: .55; transform: scale(.84); }
          50% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 760px) {
          .eagle-flight__header,
          .eagle-flight__content {
            width: min(100% - 2.2rem, 42rem);
          }

          .eagle-flight__header {
            min-height: 4.25rem;
          }

          .eagle-flight__content {
            grid-template-columns: 1fr;
            gap: .35rem;
            min-height: auto;
            padding-top: 1.5rem;
            padding-bottom: 1.8rem;
          }

          .eagle-flight__title {
            max-width: 22rem;
            font-size: clamp(2.7rem, 12vw, 4.25rem);
          }

          .eagle-flight__description {
            max-width: 28rem;
            margin-top: .85rem;
            font-size: .79rem;
            line-height: 1.52;
          }

          .eagle-flight__details {
            margin-top: .9rem;
          }

          .eagle-flight__stage {
            min-height: 18rem;
            margin-top: -.35rem;
          }

          .eagle-flight__mark {
            width: min(19.5rem, 76vw);
          }

          .eagle-flight__caption {
            bottom: -.05rem;
          }
        }

        @media (max-width: 470px) {
          .eagle-flight__header {
            min-height: 4.7rem;
          }

          .eagle-flight__status {
            display: none;
          }

          .eagle-flight__content {
            padding-top: 2rem;
          }

          .eagle-flight__eyebrow {
            margin-bottom: 1rem;
            font-size: .56rem;
          }

          .eagle-flight__title {
            font-size: clamp(2.8rem, 15vw, 4.2rem);
          }

          .eagle-flight__stage {
            min-height: 18rem;
          }

          .eagle-flight__stage-label {
            font-size: .48rem;
          }

          .eagle-flight__caption {
            font-size: .47rem;
          }

          .eagle-flight__stage-wordmark {
            bottom: 1.35rem;
            font-size: 2.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eagle-flight *,
          .eagle-flight *::before,
          .eagle-flight *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="eagle-flight__header">
        <div className="eagle-flight__lockup" aria-label="Сокол — производственная фирма">
          <svg className="eagle-flight__mini" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M8 22 24 9l16 13v13" fill="none" stroke="var(--ef-gold)" strokeWidth="2.5" />
            <path d="M14 20.5 24 12l10 8.5" fill="none" stroke="var(--ef-gold-bright)" strokeOpacity=".5" />
            <path d="m24 17 2.9 5.1 6.3-2.6-4.5 5.3 4.1 3.1-6.8-1.1-2 5.6-2-5.6-6.8 1.1 4.1-3.1-4.5-5.3 6.3 2.6Z" fill="var(--ef-gold-bright)" />
            <path d="M24 20.5v12.2" stroke="var(--ef-navy-950)" strokeWidth="1.2" />
          </svg>
          <span className="eagle-flight__lockup-copy">
            <span className="eagle-flight__wordmark">СОКОЛ</span>
            <span className="eagle-flight__descriptor">производственная фирма</span>
          </span>
        </div>
        <div className="eagle-flight__status">
          <span className="eagle-flight__status-dot" aria-hidden="true" />
          active identity study / 04
        </div>
      </header>

      <section className="eagle-flight__content">
        <div>
          <p className="eagle-flight__eyebrow">Hypothesis / Eagle Flight</p>
          <h1 className="eagle-flight__title" id="eagle-flight-title">
            Built to <em>rise.</em>
          </h1>
          <p className="eagle-flight__description">
            Геометричный сокол выходит из открытой крыши — знак движения вверх, точной сборки и света в архитектуре. Контур оставляет пространство для полёта.
          </p>
          <div className="eagle-flight__details" aria-label="Характеристики знака">
            <div className="eagle-flight__detail">
              <strong>UP / 04</strong>
              <span>направление и ритм</span>
            </div>
            <div className="eagle-flight__detail">
              <strong>OPEN / 01</strong>
              <span>контур без границ</span>
            </div>
          </div>
        </div>

        <div className="eagle-flight__stage" aria-label="Animated Eagle Flight logo mark">
          <span className="eagle-flight__stage-label">standalone mark / 240</span>
          <span className="eagle-flight__orbit" aria-hidden="true" />
          <span className="eagle-flight__orbit eagle-flight__orbit--accent" aria-hidden="true" />
          <span className="eagle-flight__stage-wordmark" aria-hidden="true">СОКОЛ</span>

          <div className="eagle-flight__mark">
            <svg viewBox="0 0 500 500" role="img" aria-labelledby="eagle-mark-title eagle-mark-description">
              <title id="eagle-mark-title">Сокол, направленный вверх</title>
              <desc id="eagle-mark-description">
                A geometric gold eagle lifting through an open architectural roof, with a measured lime flight trail.
              </desc>

              <g className="eagle-flight__roof" aria-hidden="true">
                <path d="M92 226V166L250 64l158 102v60" />
                <path d="M92 226h44M364 226h44" strokeWidth="3" />
                <path className="eagle-flight__roof-detail" d="M108 175 250 82l142 93" />
                <g className="eagle-flight__roof-tip">
                  <path d="m236 73 14-9 14 9-14 9Z" fill="var(--ef-gold-bright)" stroke="none" />
                  <path d="M250 79v44" stroke="var(--ef-gold-bright)" strokeWidth="1.5" />
                </g>
              </g>

              <path
                className="eagle-flight__trail"
                d="M250 390C228 355 242 327 250 292c8-34 19-55 0-94"
                pathLength="1"
                aria-hidden="true"
              />

              <g className="eagle-flight__light" aria-hidden="true">
                <rect className="eagle-flight__light-line" x="89" y="184" width="322" height="2" rx="1" />
                <rect x="208" y="181" width="84" height="8" rx="4" fill="var(--ef-ivory)" filter="url(#eagle-light-blur)" />
              </g>

              <g className="eagle-flight__eagle">
                <path className="eagle-flight__wing" d="M244 250 214 232l-48-35 24 43-66-27 49 39-63-5 65 27-42 13 75 6Z" />
                <path className="eagle-flight__wing-shadow" d="m214 232-48-35 24 43-49-20 74 49 32-19Z" />
                <path className="eagle-flight__wing" d="m256 250 30-18 48-35-24 43 66-27-49 39 63-5-65 27 42 13-75 6Z" />
                <path className="eagle-flight__wing-shadow" d="m286 232 48-35-24 43 49-20-74 49-32-19Z" />
                <path className="eagle-flight__feather" d="m183 239-35-18M191 249l-43-8M203 258l-47 5M317 239l35-18M309 249l43-8M297 258l47 5" />
                <path className="eagle-flight__body" d="m250 204 12 23 13 21-14 43-11 24-11-24-14-43 13-21Z" />
                <path className="eagle-flight__body" d="m239 210 11-17 11 17-11 15Z" />
                <path d="m247 193 3-8 3 8-3 5Z" fill="var(--ef-ivory)" />
                <path d="m236 315 14 30 14-30-14 9Z" fill="var(--ef-gold-bright)" stroke="#a97e2e" strokeWidth="1" />
                <path d="M250 229v61M244 236l6 8 6-8" className="eagle-flight__feather" />
              </g>

              <defs>
                <filter id="eagle-light-blur" x="-20%" y="-200%" width="140%" height="500%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="eagle-flight__caption">flight trace / сдержанно по сути</div>
        </div>
      </section>
    </main>
  );
}

export default EagleFlight;