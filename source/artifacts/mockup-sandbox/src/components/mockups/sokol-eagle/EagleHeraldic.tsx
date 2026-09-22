import React from "react";

export function EagleHeraldic() {
  return (
    <main className="eagle-heraldic" aria-labelledby="eagle-heraldic-title">
      <style>{`
        .eagle-heraldic {
          --eh-navy-950: #071520;
          --eh-navy-900: #0b202c;
          --eh-navy-800: #123242;
          --eh-ivory: #f2eee3;
          --eh-ivory-dim: #c6c9bd;
          --eh-muted: #8299a0;
          --eh-gold: #d8ad54;
          --eh-gold-light: #f2d887;
          --eh-gold-deep: #9a6d2d;
          --eh-lime: #c6e15a;
          --eh-orange: #dd8050;
          position: relative;
          min-height: 100dvh;
          overflow: hidden;
          color: var(--eh-ivory);
          background:
            radial-gradient(circle at 69% 43%, rgba(194, 145, 55, .16), transparent 23rem),
            radial-gradient(circle at 18% 86%, rgba(44, 92, 102, .13), transparent 20rem),
            linear-gradient(132deg, var(--eh-navy-950) 0%, #0a1b27 53%, #102936 100%);
          font-family: "DM Sans", "Segoe UI", sans-serif;
          isolation: isolate;
        }

        .eagle-heraldic::before {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: .24;
          background-image:
            linear-gradient(rgba(243, 240, 227, .05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(243, 240, 227, .05) 1px, transparent 1px);
          background-size: 4rem 4rem;
          mask-image: linear-gradient(to bottom, transparent 0%, #000 19%, #000 78%, transparent 100%);
          content: "";
        }

        .eagle-heraldic::after {
          position: absolute;
          top: 22%;
          right: -12rem;
          width: 36rem;
          height: 36rem;
          border: 1px solid rgba(216, 173, 84, .12);
          border-radius: 50%;
          pointer-events: none;
          content: "";
        }

        .eagle-heraldic__header,
        .eagle-heraldic__content {
          width: min(100% - 3rem, 74rem);
          margin: 0 auto;
        }

        .eagle-heraldic__header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.45rem 0 1.35rem;
          border-bottom: 1px solid rgba(242, 238, 227, .15);
        }

        .eagle-heraldic__lockup {
          display: inline-flex;
          align-items: center;
          gap: .75rem;
          color: var(--eh-ivory);
        }

        .eagle-heraldic__mini-mark {
          display: grid;
          width: 2.3rem;
          height: 2.3rem;
          place-items: center;
        }

        .eagle-heraldic__mini-mark svg {
          width: 100%;
          height: 100%;
        }

        .eagle-heraldic__wordmark {
          font-family: "Arial Narrow", "DM Sans", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: .3em;
        }

        .eagle-heraldic__meta,
        .eagle-heraldic__eyebrow,
        .eagle-heraldic__spec strong,
        .eagle-heraldic__spec span,
        .eagle-heraldic__stage-label,
        .eagle-heraldic__caption,
        .eagle-heraldic__seal-note {
          font-family: "Space Mono", monospace;
        }

        .eagle-heraldic__meta {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          color: var(--eh-muted);
          font-size: .61rem;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .eagle-heraldic__status {
          width: .42rem;
          height: .42rem;
          border-radius: 50%;
          background: var(--eh-lime);
          box-shadow: 0 0 0 .25rem rgba(198, 225, 90, .1);
          animation: eh-status 3.2s ease-in-out infinite;
        }

        .eagle-heraldic__content {
          display: grid;
          grid-template-columns: minmax(15rem, .78fr) minmax(26rem, 1.22fr);
          align-items: center;
          gap: 3rem;
          min-height: calc(100dvh - 5.5rem);
          padding: 2.5rem 0 3.5rem;
        }

        .eagle-heraldic__eyebrow {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin: 0 0 1.45rem;
          color: var(--eh-gold-light);
          font-size: .65rem;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .eagle-heraldic__eyebrow::before {
          width: 2.35rem;
          height: 1px;
          background: var(--eh-orange);
          content: "";
        }

        .eagle-heraldic__title {
          max-width: 28rem;
          margin: 0;
          color: var(--eh-ivory);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3.1rem, 6.4vw, 5.9rem);
          font-weight: 400;
          letter-spacing: -.065em;
          line-height: .91;
        }

        .eagle-heraldic__title em {
          color: var(--eh-gold-light);
          font-style: normal;
        }

        .eagle-heraldic__description {
          max-width: 24rem;
          margin: 1.8rem 0 0;
          color: var(--eh-ivory-dim);
          font-size: .93rem;
          line-height: 1.7;
        }

        .eagle-heraldic__description strong {
          color: var(--eh-ivory);
          font-weight: 500;
        }

        .eagle-heraldic__specs {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          gap: 1.85rem;
          margin: 2.55rem 0 0;
        }

        .eagle-heraldic__spec {
          display: grid;
          gap: .35rem;
          padding-left: .8rem;
          border-left: 1px solid var(--eh-orange);
        }

        .eagle-heraldic__spec strong {
          color: var(--eh-ivory);
          font-size: .69rem;
          font-weight: 400;
        }

        .eagle-heraldic__spec span {
          color: var(--eh-muted);
          font-size: .54rem;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .eagle-heraldic__stage {
          position: relative;
          display: grid;
          min-height: min(39rem, 73vh);
          place-items: center;
        }

        .eagle-heraldic__stage-label {
          position: absolute;
          top: .1rem;
          right: 1rem;
          color: rgba(242, 238, 227, .43);
          font-size: .55rem;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .eagle-heraldic__stage-label::after {
          display: inline-block;
          width: 2.65rem;
          height: 1px;
          margin: 0 0 .18rem .5rem;
          background: var(--eh-orange);
          content: "";
        }

        .eagle-heraldic__orbit {
          position: absolute;
          width: min(35rem, 92vw);
          aspect-ratio: 1;
          border: 1px solid rgba(216, 173, 84, .12);
          border-radius: 50%;
          transform: rotate(-25deg) scaleY(.34);
        }

        .eagle-heraldic__orbit--inner {
          width: min(28rem, 75vw);
          border-color: rgba(242, 238, 227, .09);
          transform: rotate(62deg) scaleY(.2);
        }

        .eagle-heraldic__mark-wrap {
          position: relative;
          z-index: 1;
          width: min(30rem, 73vw);
          aspect-ratio: .93;
          filter: drop-shadow(0 1.1rem 1.5rem rgba(0, 0, 0, .2));
        }

        .eagle-heraldic__mark-wrap::before {
          position: absolute;
          top: 12%;
          left: 50%;
          width: 9rem;
          height: 9rem;
          border-radius: 50%;
          background: rgba(216, 173, 84, .19);
          filter: blur(1.7rem);
          opacity: .7;
          transform: translateX(-50%);
          content: "";
          animation: eh-halo 5.6s ease-in-out infinite;
        }

        .eagle-heraldic__mark {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .eagle-heraldic__mark .eh-frame {
          fill: none;
          stroke: url(#eh-gold-stroke);
          stroke-linecap: square;
          stroke-width: 4.5;
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          animation: eh-edge-light 8s ease-in-out infinite;
        }

        .eagle-heraldic__mark .eh-frame-inner {
          fill: none;
          stroke: rgba(242, 216, 135, .25);
          stroke-width: 1;
        }

        .eagle-heraldic__mark .eh-rule {
          stroke: rgba(216, 173, 84, .62);
          stroke-width: 1;
        }

        .eagle-heraldic__eagle {
          fill: url(#eh-eagle-fill);
          stroke: var(--eh-gold-light);
          stroke-linejoin: round;
          stroke-width: .75;
          transform-box: fill-box;
          transform-origin: center;
          animation: eh-eagle-breathe 5.6s ease-in-out infinite;
        }

        .eagle-heraldic__eagle-detail {
          fill: none;
          stroke: rgba(86, 56, 23, .78);
          stroke-linecap: round;
          stroke-width: 1.15;
        }

        .eagle-heraldic__eagle-eye {
          fill: var(--eh-ivory);
          animation: eh-eye 5.6s ease-in-out infinite;
        }

        .eagle-heraldic__type {
          fill: var(--eh-gold-light);
          font-family: "Arial Narrow", "DM Sans", sans-serif;
          font-size: 29px;
          font-weight: 700;
          letter-spacing: 5px;
        }

        .eagle-heraldic__small-type {
          fill: rgba(242, 216, 135, .83);
          font-family: "Arial Narrow", "DM Sans", sans-serif;
          font-size: 6.7px;
          font-weight: 500;
          letter-spacing: 1.45px;
        }

        .eagle-heraldic__underline {
          fill: none;
          stroke: var(--eh-gold);
          stroke-width: 1.2;
        }

        .eagle-heraldic__seal-note {
          fill: var(--eh-muted);
          font-size: 5.7px;
          letter-spacing: 1px;
        }

        .eagle-heraldic__caption {
          position: absolute;
          right: .8rem;
          bottom: .15rem;
          display: flex;
          align-items: center;
          gap: .65rem;
          color: rgba(242, 238, 227, .49);
          font-size: .55rem;
          letter-spacing: .11em;
          text-transform: uppercase;
        }

        .eagle-heraldic__caption::before {
          width: 1.35rem;
          height: 1px;
          background: var(--eh-orange);
          content: "";
        }

        @keyframes eh-edge-light {
          0%, 18% { stroke-dashoffset: .34; opacity: .78; }
          48%, 70% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -.34; opacity: .78; }
        }

        @keyframes eh-halo {
          0%, 100% { opacity: .5; transform: translateX(-50%) scale(.86); }
          50% { opacity: .88; transform: translateX(-50%) scale(1.08); }
        }

        @keyframes eh-eagle-breathe {
          0%, 100% { opacity: .93; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-2px) scale(1.012); }
        }

        @keyframes eh-eye {
          0%, 46%, 50%, 100% { opacity: 1; }
          48% { opacity: .25; }
        }

        @keyframes eh-status {
          0%, 100% { opacity: .58; transform: scale(.84); }
          50% { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 760px) {
          .eagle-heraldic__header,
          .eagle-heraldic__content {
            width: min(100% - 2.2rem, 42rem);
          }

          .eagle-heraldic__content {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 1.35rem;
            padding-top: 3.4rem;
          }

          .eagle-heraldic__title {
            max-width: 23rem;
            font-size: clamp(3.25rem, 16vw, 5.4rem);
          }

          .eagle-heraldic__description {
            max-width: 29rem;
          }

          .eagle-heraldic__stage {
            min-height: 28rem;
            margin-top: -.8rem;
          }

          .eagle-heraldic__mark-wrap {
            width: min(28rem, 88vw);
          }
        }

        @media (max-width: 480px) {
          .eagle-heraldic__header {
            padding-top: 1.1rem;
          }

          .eagle-heraldic__meta {
            display: none;
          }

          .eagle-heraldic__wordmark {
            font-size: .9rem;
          }

          .eagle-heraldic__specs {
            gap: 1.2rem;
          }

          .eagle-heraldic__stage {
            min-height: 25rem;
          }

          .eagle-heraldic__stage-label {
            right: 0;
          }

          .eagle-heraldic__caption {
            right: 0;
            font-size: .5rem;
          }
        }

        /* The compact treatment keeps the complete seal in a short portrait viewport. */
        @media (max-width: 760px) and (max-height: 760px) {
          .eagle-heraldic__header {
            padding-top: .9rem;
            padding-bottom: .85rem;
          }

          .eagle-heraldic__content {
            min-height: 0;
            gap: .45rem;
            padding-top: 1.6rem;
            padding-bottom: 1rem;
          }

          .eagle-heraldic__eyebrow {
            margin-bottom: .85rem;
          }

          .eagle-heraldic__title {
            max-width: 21rem;
            font-size: clamp(2.8rem, 13.5vw, 4.45rem);
          }

          .eagle-heraldic__description {
            max-width: 28rem;
            margin-top: .95rem;
            font-size: .84rem;
            line-height: 1.45;
          }

          .eagle-heraldic__specs {
            gap: 1.35rem;
            margin-top: 1.2rem;
          }

          .eagle-heraldic__stage {
            min-height: 20rem;
            margin-top: -.45rem;
          }

          .eagle-heraldic__mark-wrap {
            width: min(21rem, 72vw);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eagle-heraldic *,
          .eagle-heraldic *::before,
          .eagle-heraldic *::after {
            animation-duration: .001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <header className="eagle-heraldic__header">
        <div className="eagle-heraldic__lockup" aria-label="Сокол">
          <span className="eagle-heraldic__mini-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" role="presentation">
              <path d="M6 17 20 7l14 10v12l-14 9L6 29Z" fill="none" stroke="var(--eh-gold)" strokeWidth="1.7" />
              <path d="m10.5 16.9 5.8 2.7 3.7-2.1 3.7 2.1 5.8-2.7-5.6 6.7-3.9 1.6-3.9-1.6Z" fill="var(--eh-gold-light)" />
              <circle cx="20" cy="19.2" r="1" fill="var(--eh-navy-950)" />
            </svg>
          </span>
          <span className="eagle-heraldic__wordmark">СОКОЛ</span>
        </div>
        <div className="eagle-heraldic__meta">
          <span className="eagle-heraldic__status" aria-hidden="true" />
          active identity study / 04
        </div>
      </header>

      <section className="eagle-heraldic__content">
        <div>
          <p className="eagle-heraldic__eyebrow">Hypothesis / Formal seal</p>
          <h1 className="eagle-heraldic__title" id="eagle-heraldic-title">
            A mark built to <em>hold.</em>
          </h1>
          <p className="eagle-heraldic__description">
            Золотой сокол становится знаком качества: <strong>симметричный, производственный, узнаваемый.</strong> Дом-контур собирает герб в устойчивый премиальный штамп.
          </p>
          <div className="eagle-heraldic__specs" aria-label="Logo characteristics">
            <div className="eagle-heraldic__spec">
              <strong>SEAL / 01</strong>
              <span>formal geometry</span>
            </div>
            <div className="eagle-heraldic__spec">
              <strong>GOLD / 04</strong>
              <span>ceremonial pulse</span>
            </div>
          </div>
        </div>

        <div className="eagle-heraldic__stage" aria-label="Animated heraldic eagle logo mark">
          <span className="eagle-heraldic__stage-label">standalone mark / 240</span>
          <span className="eagle-heraldic__orbit" aria-hidden="true" />
          <span className="eagle-heraldic__orbit eagle-heraldic__orbit--inner" aria-hidden="true" />
          <div className="eagle-heraldic__mark-wrap">
            <svg
              className="eagle-heraldic__mark"
              viewBox="0 0 360 390"
              role="img"
              aria-labelledby="eagle-heraldic-mark-title eagle-heraldic-mark-description"
            >
              <title id="eagle-heraldic-mark-title">Герб Сокол — золотой орёл в архитектурном контуре</title>
              <desc id="eagle-heraldic-mark-description">
                Symmetrical spread-wing eagle above the Cyrillic word Сокол, enclosed by a broken gold house and hexagon frame.
              </desc>
              <defs>
                <linearGradient id="eh-gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9a6d2d" />
                  <stop offset="47%" stopColor="#f2d887" />
                  <stop offset="100%" stopColor="#b47c31" />
                </linearGradient>
                <linearGradient id="eh-eagle-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f4da8e" />
                  <stop offset="100%" stopColor="#aa7730" />
                </linearGradient>
              </defs>

              <path
                className="eh-frame"
                pathLength="1"
                d="M55 115V83L180 12l125 71v32 M305 275v32L180 378 55 307v-32"
              />
              <path className="eh-frame-inner" d="M66 121V89L180 25 294 89v32M294 269v26L180 360 66 295v-26" />
              <path className="eh-rule" d="M55 122h26M279 122h26M55 268h26M279 268h26" />

              <g className="eagle-heraldic__eagle">
                <path d="M180 111c-8-10-8-22 0-29 8 7 8 19 0 29Z" />
                <path d="M174 95c-18-11-35-20-63-20l20 12-37-4 28 17-39 2 46 12-31 9c26 8 48 6 68-9Z" />
                <path d="M186 95c18-11 35-20 63-20l-20 12 37-4-28 17 39 2-46 12 31 9c-26 8-48 6-68-9Z" />
                <path d="M180 104c-7 11-12 20-11 33l11 17 11-17c1-13-4-22-11-33Z" />
                <path className="eagle-heraldic__eagle-detail" d="M159 91 124 83l26 16M146 103l-38-1 31 10M201 91l35-8-26 16M214 103l38-1-31 10M168 113l12 14 12-14M173 129l7 18 7-18" />
                <path className="eagle-heraldic__eagle-detail" d="M176.5 91.5c2.3 1.6 4.7 1.6 7 0M176.5 97c2.3 1.6 4.7 1.6 7 0" />
                <circle className="eagle-heraldic__eagle-eye" cx="177" cy="87" r="1.4" />
                <circle className="eagle-heraldic__eagle-eye" cx="183" cy="87" r="1.4" />
              </g>

              <text className="eagle-heraldic__small-type" x="180" y="181" textAnchor="middle">ПРОИЗВОДСТВЕННАЯ ФИРМА</text>
              <line className="eh-rule" x1="93" y1="190" x2="267" y2="190" />
              <text className="eagle-heraldic__type" x="180" y="239" textAnchor="middle">СОКОЛ</text>
              <line className="eagle-heraldic__underline" x1="99" y1="252" x2="261" y2="252" />
              <text className="eagle-heraldic__small-type" x="180" y="270" textAnchor="middle">ВСЕ ВИДЫ ОСТЕКЛЕНИЯ</text>
              <text className="eagle-heraldic__seal-note" x="180" y="291" textAnchor="middle">QUALITY / FORM / PRODUCTION</text>
            </svg>
          </div>
          <div className="eagle-heraldic__caption">edge light / ceremonial by design</div>
        </div>
      </section>
    </main>
  );
}

export default EagleHeraldic;