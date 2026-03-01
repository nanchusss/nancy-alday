import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

export default function TechEcosystem() {
  const { t } = useContext(LanguageContext) || {};

  const stack = [
    "React",
    "Styled Components",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "JWT Auth",
    "Git",
    "Postman",
    "Figma",
    "OpenAI API"
  ];

  const title = t?.tech?.title || "Tech Ecosystem";
  const subtitle =
    t?.tech?.subtitle ||
    "Technologies and tools I use to build modern digital products.";

  return (
    <Section>
      <HeaderBlock>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </HeaderBlock>

      <TickerWrapper>
        <Ticker>
          {[...stack, ...stack].map((tech, index) => (
            <TechItem key={index}>{tech}</TechItem>
          ))}
        </Ticker>
      </TickerWrapper>
    </Section>
  );
}

/* ================= ANIMATION ================= */

const scroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

/* ================= STYLES ================= */

const Section = styled.section`
  background: #111;
  padding: 200px 0;
  overflow: hidden;
`;

const HeaderBlock = styled.div`
  text-align: center;
  margin-bottom: 140px;
`;

const Title = styled.h2`
  font-size: clamp(80px, 10vw, 120px);
  font-family: "Inter", sans-serif;
  font-weight: 800;
  letter-spacing: -6px;
  color: #fff;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 24px;
  color: #aaa;
  max-width: 800px;
  margin: 0 auto;
`;

const TickerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Ticker = styled.div`
  display: flex;
  gap: 120px;
  width: max-content;
  animation: ${scroll} 25s linear infinite;
`;

const TechItem = styled.div`
  font-size: clamp(60px, 8vw, 120px);
  font-weight: 800;
  color: rgba(255, 255, 255, 0.08);
  white-space: nowrap;
  letter-spacing: -4px;
  transition: color 0.4s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;