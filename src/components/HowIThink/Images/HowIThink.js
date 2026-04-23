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
    const t = Math.max(0, Math.min(1, (p - 0.2) / 0.25));
    return `circle(${t * 200}% at 50% 50%)`;
  });

  const orangeReveal = progress.p.to((p) => {
    const t = Math.max(0, Math.min(1, (p - 0.32) / 0.3));
    return `circle(${t * 150}% at 50% 50%)`;
  });

  // 👉 NUEVO AZUL (NO TOCA LO ANTERIOR)
  const blueReveal = progress.p.to((p) => {
    const t = Math.max(0, Math.min(1, (p - 0.6) / 0.3));
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
    { color: theme.shapes[0], size: 150, path: "M60,10 C90,20 110,60 80,90 C50,120 10,100 10,60 C10,30 30,0 60,10 Z" },
    { color: theme.shapes[1], size: 120, path: "M50,10 C80,20 90,60 60,80 C30,100 0,80 10,50 C20,20 30,0 50,10 Z" },
    { color: theme.shapes[2], size: 150, path: "M70,10 C110,30 120,80 80,110 C40,140 0,110 10,60 C20,20 40,0 70,10 Z" },
    { color: theme.shapes[3], size: 120, path: "M40,10 C60,20 80,50 60,70 C40,90 10,80 10,50 C10,20 20,0 40,10 Z" },
    { color: theme.shapes[4], size: 120, path: "M35,10 C60,20 70,50 50,70 C30,90 0,70 10,40 C20,20 20,0 35,10 Z" },
  ];

  return (
    <Wrapper ref={ref}>
      <Sticky>

        {/* BACKGROUNDS */}
        <YellowOverlay style={{ clipPath: yellowReveal, background: theme.overlayColors[0] }} />
        <OrangeOverlay style={{ clipPath: orangeReveal, background: theme.overlayColors[1] }} />
        <BlueOverlay style={{ clipPath: blueReveal, background: theme.overlayColors[2] }} />

        {/* BLOBS (SIN CAMBIOS) */}
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

                  return `translate(${x}px, ${y}px) scale(${scale})`;
                }),
                opacity: progress.p.to((p) =>
                  Math.max(0, Math.min(1, (p - i * 0.06) * 3))
                ),
              }}
            >
            <BlobSVG viewBox="-20 -20 160 160" style={{ width: shape.size, height: shape.size }}>
                <path d={shape.path} fill={shape.color} />
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