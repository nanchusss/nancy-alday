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
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 600;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.6;
  max-width: 400px;
`;

const TickerWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Ticker = styled.div`
  display: flex;
  gap: 60px;
  width: max-content;
  animation: ${scroll} 25s linear infinite;
`;

const TechItem = styled.div`
  font-size: clamp(24px, 3vw, 48px);
  font-weight: 600;
  opacity: 0.2;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;