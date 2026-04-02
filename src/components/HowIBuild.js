import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

export default function HowIBuild() {
  const { t } = useContext(LanguageContext);
  const sectionRef = useRef(null);

  const [targetProgress, setTargetProgress] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = t.howIBuild.blocks;

  /* 🔥 SCROLL DETECTION */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.4;
      const endOffset = windowHeight * 0.2;

      const total = rect.height + startOffset + endOffset;
      const current = Math.min(
        Math.max(startOffset - rect.top, 0),
        total
      );

      let percent = total > 0 ? current / total : 0;
      percent = percent * 2.5;

      setTargetProgress(Math.min(Math.max(percent, 0), 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔥 SUAVIDAD */
  useEffect(() => {
    let animationFrame;
    const ease = 0.12;

    const animate = () => {
      setProgress(prev => prev + (targetProgress - prev) * ease);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [targetProgress]);

  return (
    <Wrapper ref={sectionRef}>
      <Container>
        <Left>
          <SmallTitle>{t.howIBuild.title}</SmallTitle>
          <MainTitle>
            Structured process,<br />
            creative execution.
          </MainTitle>
        </Left>

        <Right>
          <Timeline>
            <LineBase />
            <LineFill style={{ height: `${progress * 100}%` }} />

            {steps.map((_, index) => {
              const stepRatio = index / (steps.length - 1);
              const circlePosition = stepRatio * 100;
              const active = progress >= stepRatio - 0.02;

              return (
                <Circle
                  key={index}
                  active={active}
                  style={{ top: `${circlePosition}%` }}
                />
              );
            })}
          </Timeline>

          <Content>
            {steps.map((step, index) => (
              <Step key={index}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Step>
            ))}
          </Content>
        </Right>
      </Container>
    </Wrapper>
  );
}

/* ================= STYLES ================= */
/* ================= STYLES ================= */

const Wrapper = styled.section`
  padding: 220px 0;
  background: #0f0f0f;
  color: #f3efe7;

  @media (max-width: 768px) {
    padding: 120px 0;
  }
`;

const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  display: flex;
  gap: 120px;

  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    gap: 80px;
  }
`;

const Left = styled.div`
  width: 35%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SmallTitle = styled.div`
  font-size: 25px;
  letter-spacing: 3px;
  font-family: "Inter", sans-serif;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: 2px;
  }
`;

const MainTitle = styled.h2`
  font-size: 46px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 38px;
    line-height: 1.3;
  }
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  gap: 80px;

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

const Timeline = styled.div`
  position: relative;
  width: 4px;
  height: 800px;

  @media (max-width: 768px) {
    width: 2px;
    height: 100%;
    min-height: 500px;
  }
`;

const LineBase = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #3a3a3a;
`;

const LineFill = styled.div`
  position: absolute;
  width: 100%;
  background: #e7dc05ff ;
  top: 0;
  left: 0;
`;

const Circle = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ active }) =>
    active ? "#e7dc05ff " : "#3a3a3a"};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Step = styled.div`
  margin-bottom: 140px;

  @media (max-width: 768px) {
    margin-bottom: 80px;
  }

  h3 {
    font-size: 28px;
    margin-bottom: 12px;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 24px;
    max-width: 600px;
    line-height: 1.6;
    opacity: 0.7;

    @media (max-width: 768px) {
      font-size: 16px;
      max-width: 100%;
      line-height: 1.5;
    }
  }
`;