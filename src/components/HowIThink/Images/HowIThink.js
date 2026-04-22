import React, { useRef } from "react";
import { useScroll, useSpring, animated } from "@react-spring/web";
import styled from "styled-components";
import { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";

export default function HowIThink() {
  const ref = useRef();
const { t } = useContext(LanguageContext);
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

  /* ================= OPACITY ================= */

 const opacity1 = progress.p.to((p) => {
  if (p < 0.18) return 1;
  if (p > 0.26) return 0;
  return 1 - (p - 0.18) / 0.08;
});

const opacity2 = progress.p.to((p) => {
  if (p < 0.2) return 0;

  if (p >= 0.2 && p <= 0.3)
    return (p - 0.2) / 0.1;

  if (p > 0.3 && p < 0.36)
    return 1;

  if (p >= 0.36 && p <= 0.42)
    return 1 - (p - 0.36) / 0.06;

  return 0;
});

const opacity3 = progress.p.to((p) => {
  if (p < 0.4) return 0;

  if (p >= 0.4 && p <= 0.5)
    return (p - 0.4) / 0.1;

  return 1;
});

  /* ================= SHAPES ================= */

  const shapes = [
    { angle: -150, color: "#E4572E", size: 150, path: "M60,10 C90,20 110,60 80,90 C50,120 10,100 10,60 C10,30 30,0 60,10 Z" },
    { angle: -165, color: "#6FA8DC", size: 120, path: "M50,10 C80,20 90,60 60,80 C30,100 0,80 10,50 C20,20 30,0 50,10 Z" },
    { angle: 0, color: "#F2C94C", size: 150, path: "M70,10 C110,30 120,80 80,110 C40,140 0,110 10,60 C20,20 40,0 70,10 Z" },
    { angle: 45, color: "#3A7D44", size: 120, path: "M40,10 C60,20 80,50 60,70 C40,90 10,80 10,50 C10,20 20,0 40,10 Z" },
    { angle: 90, color: "#111111", size: 120, path: "M35,10 C60,20 70,50 50,70 C30,90 0,70 10,40 C20,20 20,0 35,10 Z" },
  ];

  return (
    <Wrapper ref={ref}>
      <Sticky>

        {/* BACKGROUNDS */}
        <YellowOverlay style={{ clipPath: yellowReveal }} />
        <OrangeOverlay style={{ clipPath: orangeReveal }} />

        {/* BLOBS */}
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

  // 👉 posición base (top-left)
  const baseX = -120;
  const baseY = -120;

  // 👉 desplazamiento orgánico (cada uno distinto)
  const x = baseX + i * 60 + reveal * 180;
  const y = baseY + i * 40 + reveal * 220;

  // 👉 escala MUCHO más agresiva
  const scale = 0.4 + reveal * 2.2;

  return `translate(${x}px, ${y}px) scale(${scale})`;
}),
                opacity: progress.p.to((p) =>
  Math.max(0, Math.min(1, (p - i * 0.06) * 3))
),
              }}
            >
              <BlobSVG viewBox="0 0 120 120" style={{ width: shape.size, height: shape.size }}>
                <path d={shape.path} fill={shape.color} />
              </BlobSVG>
            </BlobWrapper>
          ))}
        </SemiCircle>

        {/* TEXT */}
        <Content>

         <Section
  style={{
    opacity: opacity1,
    transform: progress.p.to((p) => {
      if (p < 0.15) return "translateY(0px)";
      if (p > 0.35) return "translateY(-40px)";
      return `translateY(${-(p - 0.15) * 200}px)`;
    }),
    color: "#111",
  }}
><h2>{t.howIThink.sections[0].title}</h2>
<p>{t.howIThink.sections[0].text}</p>
          </Section>

          <Section
  style={{
    opacity: opacity2,
    transform: progress.p.to((p) => {
      if (p < 0.3) return "translateY(40px)";
      if (p > 0.6) return "translateY(0px)";
      return `translateY(${(1 - (p - 0.3) / 0.3) * 40}px)`;
    }),
    color: "#111",
  }}
>
           <h2>{t.howIThink.sections[1].title}</h2>
<p>{t.howIThink.sections[1].text}</p>
          </Section>

         <Section
  style={{
    opacity: opacity3,
    transform: progress.p.to((p) => {
      if (p < 0.6) return "translateY(40px)";
      if (p > 0.9) return "translateY(0px)";
      return `translateY(${(1 - (p - 0.6) / 0.3) * 40}px)`;
    }),
    color: "#fff",
  }}
>
            <h2>{t.howIThink.sections[2].title}</h2>
<p>{t.howIThink.sections[2].text}</p>
          </Section>

        </Content>

      </Sticky>
    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  height: 200vh;
  background: #f6f3ef;
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
    font-size: clamp(48px, 8vw, 80px);
    font-family: "Canela", serif;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
  }
`;

const YellowOverlay = styled(animated.div)`
  position: absolute;
  inset: 0;
  background: #F2C94C;
  z-index: 0;
`;

const OrangeOverlay = styled(animated.div)`
  position: absolute;
  inset: 0;
  background: #E4572E;
  z-index: 1;
`;

const SemiCircle = styled.div`
  position: absolute;
  z-index: 2;
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