import React, { useRef, useContext } from "react";
import { useScroll, useSpring, animated } from "@react-spring/web";
import styled from "styled-components";
import { LanguageContext } from "../../LanguageContext";
import { useTheme } from "styled-components";

export default function HowIThink() {
  const ref = useRef();
  const { t } = useContext(LanguageContext);
  const theme = useTheme();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const progress = useSpring({
    p: scrollYProgress,
    config: { tension: 120, friction: 30 },
  });

  /* ================= BACKGROUNDS ================= */

  const yellowReveal = progress.p.to((p) => {
    const t = Math.max(0, Math.min(1, (p - 0.05) / 0.25));
    return `circle(${t * 200}% at 50% 50%)`;
  });

  const orangeReveal = progress.p.to((p) => {
    const t = Math.max(0, Math.min(1, (p - 0.2) / 0.3));
    return `circle(${t * 150}% at 50% 50%)`;
  });

  // 👉 NUEVO AZUL (NO TOCA LO ANTERIOR)
  const blueReveal = progress.p.to((p) => {
    const t = Math.max(0, Math.min(1, (p - 0.4) / 0.35));
    return `circle(${t * 150}% at 50% 50%)`;
  });

  /* ================= OPACITY (ORIGINALES) ================= */

  // 1️⃣ PRIMER BLOQUE
// 1️⃣ PRIMER BLOQUE (más duración)
const opacity1 = progress.p.to((p) => {
  if (p < 0.24) return 1;                         // 👈 dura más
  if (p <= 0.30) return 1 - (p - 0.24) / 0.06;     // 👈 fade out limpio
  return 0;
});

// GAP → 0.30 - 0.32


// 2️⃣ SEGUNDO BLOQUE (retrasado para no solapar)
const opacity2 = progress.p.to((p) => {
  if (p < 0.32) return 0;                          // 👈 empieza después del gap
  if (p <= 0.38) return (p - 0.32) / 0.06;          // 👈 fade in
  if (p <= 0.42) return 1;                          // 👈 visible
  if (p <= 0.48) return 1 - (p - 0.42) / 0.06;      // 👈 fade out
  return 0;
});

// GAP → 0.42 - 0.44


// 3️⃣ TERCER BLOQUE
const opacity3 = progress.p.to((p) => {
  if (p < 0.44) return 0;
  if (p <= 0.50) return (p - 0.44) / 0.06;
  if (p <= 0.60) return 1;
  if (p <= 0.66) return 1 - (p - 0.60) / 0.06;
  return 0;
});

// GAP → 0.66 - 0.68


// 4️⃣ AZUL (FINAL)
const opacity4 = progress.p.to((p) => {
  if (p < 0.68) return 0;
  if (p <= 0.75) return (p - 0.68) / 0.07;
  return 1;
});

  /* ================= SHAPES ================= */

  const shapes = [
    { 
      color: "#FF6B35", // Naranja
      size: 150,
      path: "M45,15 Q75,5 85,25 T90,55 Q85,75 65,85 Q45,90 25,80 Q10,65 15,45 Q20,25 35,15 Q40,10 45,15 Z",
      gradient: `radial-gradient(circle at 30% 30%, #FF6B35, #FF6B35dd, #FF6B3599)`
    },
    { 
      color: "#9B59B6", // Lila
      size: 120,
      path: "M35,20 Q60,10 70,30 T75,55 Q70,70 50,75 Q30,78 15,65 Q5,50 10,35 Q15,20 25,18 Q30,15 35,20 Z",
      gradient: `radial-gradient(circle at 40% 40%, #9B59B6, #9B59B6dd, #9B59B699)`
    },
    { 
      color: "#F1C40F", // Amarillo
      size: 150,
      path: "M50,10 Q80,15 85,35 T80,65 Q75,80 55,85 Q35,88 20,75 Q10,60 15,40 Q20,20 35,12 Q42,8 50,10 Z",
      gradient: `radial-gradient(circle at 35% 35%, #F1C40F, #F1C40Fdd, #F1C40F99)`
    },
    { 
      color: "#3498DB", // Azul
      size: 120,
      path: "M30,25 Q50,15 60,30 T65,50 Q60,65 45,70 Q30,72 20,60 Q15,45 20,30 Q25,20 30,25 Z",
      gradient: `radial-gradient(circle at 45% 30%, #3498DB, #3498DBdd, #3498DB99)`
    },
  ];

  return (
    <Wrapper ref={ref}>
      <Sticky>

        {/* BACKGROUNDS */}
        <YellowOverlay style={{ clipPath: yellowReveal, background: theme.overlayColors[0] }} />
        <OrangeOverlay style={{ clipPath: orangeReveal, background: theme.overlayColors[1] }} />
        <BlueOverlay style={{ clipPath: blueReveal, background: theme.overlayColors[2] }} />

        {/* BACKGROUND LAYER - Muy suave */}
        <BackgroundLayer>
          {shapes.slice(0, 2).map((shape, i) => (
            <BackgroundBlob
              key={`bg-${i}`}
              style={{
                transform: progress.p.to((p) => {
                  const reveal = Math.max(0, Math.min(1, (p - i * 0.1) * 2));
                  const x = -100 + i * 80 + reveal * 150;
                  const y = -80 + i * 30 + reveal * 180;
                  const scale = 0.6 + reveal * 1.5;
                  return `translate(${x}px, ${y}px) scale(${scale})`;
                }),
                opacity: progress.p.to((p) => Math.max(0, Math.min(0.3, (p - i * 0.08) * 2))),
              }}
            >
              <BlobSVG viewBox="0 0 100 100" style={{ width: shape.size * 1.2, height: shape.size * 1.2 }}>
                <path 
                  d={shape.path} 
                  fill={shape.color}
                  opacity="0.2"
                  filter="blur(6.4px)"
                />
              </BlobSVG>
            </BackgroundBlob>
          ))}
        </BackgroundLayer>

        {/* MAIN BLOBS */}
        <SemiCircle>
          {shapes.map((shape, i) => (
            <BlobWrapper
              key={i}
              style={{
                transform: progress.p.to((p) => {
                  const reveal = Math.max(
                    0,
                    Math.min(1, (p - i * 0.08) * 3.5)
                  );

                  const x = -120 + i * 60 + reveal * 180;
                  const y = -120 + i * 40 + reveal * 220;
                  const scale = 0.4 + reveal * 2.2;
                  const float = Math.sin(p * 2 + i) * 3;

                  return `translate(${x}px, ${y + float}px) scale(${scale})`;
                }),
                opacity: progress.p.to((p) =>
                  Math.max(0, Math.min(1, (p - i * 0.06) * 3))
                ),
              }}
            >
            <BlobSVG viewBox="0 0 100 100" style={{ width: shape.size, height: shape.size }}>
                <defs>
                  <filter id={`blob-filter-${i}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="turbulence"/>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2" xChannelSelector="R" yChannelSelector="G"/>
                    <feGaussianBlur stdDeviation="0.4"/>
                  </filter>
                </defs>
                <path 
                  d={shape.path} 
                  fill={shape.color}
                  filter={`url(#blob-filter-${i})`}
                  opacity="0.95"
                />
              </BlobSVG>
            </BlobWrapper>
          ))}
        </SemiCircle>

        {/* TEXT */}
        <Content>

          <Section style={{ opacity: opacity1, color: theme.text }}>
            <h2>{t.howIThink.sections[0].title}</h2>
            <p>{t.howIThink.sections[0].text}</p>
          </Section>

          <Section style={{ opacity: opacity2, color: theme.text }}>
            <h2>{t.howIThink.sections[1].title}</h2>
            <p>{t.howIThink.sections[1].text}</p>
          </Section>

          <Section style={{ opacity: opacity3, color: theme.text }}>
            <h2>{t.howIThink.sections[2].title}</h2>
            <p>{t.howIThink.sections[2].text}</p>
          </Section>

          {/* 👉 NUEVO BLOQUE AZUL */}
          <Section style={{ opacity: opacity4, color: theme.text }}>
            <h2>{t.howIThink.sections[3].title}</h2>
            <p>{t.howIThink.sections[3].text}</p>
          </Section>

        </Content>

      </Sticky>
    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  height: 260vh;
  background: ${props => props.theme.background};
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  z-index: 5;
`;

const Section = styled(animated.div)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8vw;
  max-width: 600px;

  h2 {
    font-size: clamp(56px, 10vw, 96px);
    font-family: "Canela", serif;
    margin-bottom: 24px;
    line-height: 1.1;
  }

  p {
    font-size: 20px;
    line-height: 1.6;
  }
`;

const YellowOverlay = styled(animated.div)`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.overlayColors[0]};
  z-index: 0;
`;

const OrangeOverlay = styled(animated.div)`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.overlayColors[1]};
  z-index: 1;
`;

const BlueOverlay = styled(animated.div)`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.overlayColors[2]};
  z-index: 2;
`;

const SemiCircle = styled.div`
  position: absolute;
  z-index: 3;
  width: 70vw;
  height: 30vw;
`;

const BlobWrapper = styled(animated.div)`
  position: absolute;
  left: 50%;
  top: 20%;
`;

const BlobSVG = styled(animated.svg)`
  display: block;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  z-index: 1;
  width: 60vw;
  height: 40vw;
  pointer-events: none;
`;

const BackgroundBlob = styled(animated.div)`
  position: absolute;
  left: 50%;
  top: 20%;
`;