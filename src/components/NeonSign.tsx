import { useState } from 'react';

interface NeonSignProps {
  mainText: string;
  accentText?: string;
  mainColor?: string;
  accentColor?: string;
  backgroundColor?: string;
}

export function NeonSign({ 
  mainText = "MIDNIGHT", 
  accentText = "MUNCHIES",
  mainColor = "#b52bff",
  accentColor = "#30d8ff",
  backgroundColor = "#0f0426"
}: NeonSignProps) {
  const fullText = accentText ? `${mainText} ${accentText}` : mainText;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@400;700&display=swap');

        .neon-container {
          --bg-dark: ${backgroundColor};
          --bg-grad-top: #16062b;
          --neon-main: ${mainColor};
          --neon-accent: ${accentColor};
          --neon-pink: #ff59c6;
          --tube-stroke: rgba(255,255,255,0.06);
          --glow-strong: 36px;
          --glow-soft: 8px;
          --extrusion-color: rgba(40,10,60,0.55);
          --size: clamp(2.2rem, 6vw + 1.2rem, 8rem);
        }

        .neon-container {
          width: 100%;
          min-height: 100vh;
          margin: 0;
          background: radial-gradient(1200px 600px at 50% 20%, rgba(60,10,90,0.18), transparent 20%),
                      linear-gradient(180deg, var(--bg-grad-top), var(--bg-dark));
          font-family: "Fredoka One", "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }

        .neon-wrap {
          width: min(1100px, 96%);
          text-align: center;
          perspective: 1400px;
        }

        .neon {
          font-size: var(--size);
          line-height: 0.95;
          letter-spacing: 0.02em;
          display: inline-block;
          transform-style: preserve-3d;
          transform: rotateX(6deg) translateZ(0);
          color: var(--neon-main);
          position: relative;
          padding: 0.25em 0.5em;
          -webkit-text-stroke: 1.6px var(--tube-stroke);
          text-shadow:
            0 0 calc(var(--glow-soft)) rgba(255,255,255,0.03),
            0 0 calc(var(--glow-strong)) var(--neon-main);
        }

        .neon::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          transform: translateZ(-40px) scale(1);
          z-index: -2;
          color: transparent;
          -webkit-text-stroke: 0px transparent;
          text-shadow:
            4px 4px 0px var(--extrusion-color),
            6px 6px 10px rgba(0,0,0,0.6);
          filter: blur(0.6px);
          opacity: 0.95;
        }

        .neon::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: var(--neon-pink);
          mix-blend-mode: screen;
          transform: translateY(2px) scale(1);
          opacity: 0.35;
          -webkit-text-stroke: 0px transparent;
          text-shadow: 0 0 12px rgba(255,89,198,0.35);
          clip-path: inset(6% 0 0 0);
        }

        .neon .accent {
          color: var(--neon-accent);
          display: inline-block;
          -webkit-text-stroke: 1.2px var(--tube-stroke);
          text-shadow:
            0 0 calc(var(--glow-soft)) rgba(255,255,255,0.02),
            0 0 calc(var(--glow-strong)) var(--neon-accent);
        }

        .reflection {
          margin-top: 0.9rem;
          height: 18vh;
          max-height: 160px;
          opacity: 0.13;
          transform: scaleY(-1) rotateX(170deg);
          filter: blur(6px) saturate(120%);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), transparent 35%);
          border-radius: 6px;
        }

        @media (max-width: 640px) {
          .neon-container {
            --size: clamp(1.6rem, 10vw, 4.2rem);
            --glow-strong: 22px;
          }
          .neon::after {
            opacity: 0.2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .neon, .neon::before, .neon::after {
            transition: none;
            transform: none;
            filter: none;
          }
        }
      `}</style>

      <div className="neon-container">
        <div className="neon-wrap" aria-label={`${fullText} neon sign`}>
          <h1 className="neon" data-text={fullText}>
            {mainText} {accentText && <span className="accent">{accentText}</span>}
          </h1>
          <div className="reflection" aria-hidden="true"></div>
        </div>
      </div>
    </>
  );
}
