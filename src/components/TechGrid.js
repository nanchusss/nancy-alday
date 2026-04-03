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
    "JWT",
    "Git",
    "Postman",
    "Figma",
    "OpenAI"
  ];

  return (
    <Wrapper>
      <Header>
        <Title>{t?.tech?.title || "Tech Ecosystem"}</Title>
        <Subtitle>
          {t?.tech?.subtitle ||
            "Technologies I use to build structured digital systems."}
        </Subtitle>
      </Header>

      <TickerWrapper>
        <Ticker>
          {[...stack, ...stack].map((tech, index) => (
            <TechItem key={index}>{tech}</TechItem>
          ))}
        </Ticker>
      </TickerWrapper>
    </Wrapper>
  );
}

const scroll = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
    gap: 20px;
  }
`;

const Header = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h2`
  font-size: clamp(48px, 4vw, 58px);
  font-weight: 600;
  letter-spacing: -1px;
  padding-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 48px;
    line-height: 1.2;
    
    letter-spacing: -0.5px;
  }
`;

const Subtitle = styled.p`
  font-size: 34px;
  opacity: 0.6;
  max-width: 1200px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-left: -20px;
    line-height: 1.5;
    padding: 20px;
    letter-spacing: 1px;
    max-width: 100%;
    margin-top: 10px;
  }
`;

const TickerWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Ticker = styled.div`
  display: flex;
  gap: 60px;
  width: max-content;
  animation: ${scroll} 25s linear infinite;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 32px; /* 🔥 menos separación */
    animation: ${scroll} 35s linear infinite; /* 🔥 más lento (clave UX) */
  }
`;

const TechItem = styled.div`
  font-size: clamp(24px, 3vw, 48px);
  font-weight: 600;
  opacity: 0.2;
  transition: all 0.3s ease;
  margin-bottom: 30px;
  padding-bottom: 30px;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
  padding:  10px;
    font-size: 50px; /* 🔥 control real */
    opacity: 0.35; /* 🔥 más visible en mobile */
  }
`;