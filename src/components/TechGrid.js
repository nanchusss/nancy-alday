import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiOpenai,
  SiPostman,
  SiJavascript,
  SiStyledcomponents,
  SiJsonwebtokens
} from "react-icons/si";

export default function TechEcosystem() {
  const { t } = useContext(LanguageContext) || {};
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px"
    }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);

  const stack = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiStyledcomponents />, name: "Styled Components" },
    { icon: <SiJavascript />, name: "JavaScript (ES6+)" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiJsonwebtokens />, name: "JWT Auth" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <SiOpenai />, name: "OpenAI API" }
  ];

  const title = t?.tech?.title || "Tech Ecosystem";
  const subtitle =
    t?.tech?.subtitle ||
    "Technologies and tools I use to build modern digital products.";

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title visible={isVisible}>{title}</Title>
        <Subtitle visible={isVisible}>{subtitle}</Subtitle>

        <Wall>
          {stack.map((tech, index) => (
            <TechItem
              key={index}
              visible={isVisible}
              delay={index * 0.1}
            >
              <IconWrapper>{tech.icon}</IconWrapper>
              <TechName>{tech.name}</TechName>
            </TechItem>
          ))}
        </Wall>
      </Container>
    </Section>
  );
}

/* ================= STYLES ================= */

const Section = styled.section`
  background: #f6f2ea;
  padding: 180px 0;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 400;
  color: #2f2c27;
  letter-spacing: 3px;
  margin-bottom: 20px;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(60px)"};
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #5a574f;
  margin-bottom: 120px;
  letter-spacing: 0.5px;

  opacity: ${({ visible }) => (visible ? 0.8 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(60px)"};
  transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Wall = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 90px 120px;

  @media (max-width: 900px) {
    gap: 60px;
  }
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(80px)"};

  transition: opacity 1s ease,
              transform 1s cubic-bezier(0.22, 1, 0.36, 1);

  transition-delay: ${({ delay }) => delay}s;

  &:hover {
    transform: translateY(-8px);
  }

  &:hover svg {
    opacity: 1;
    transform: scale(1.08);
  }

  &:hover span {
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  font-size: 62px;
  color: #5a574f;
  opacity: 0.65;
  transition: all 0.4s ease;
`;

const TechName = styled.span`
  font-size: 14px;
  margin-top: 18px;
  letter-spacing: 1px;
  color: #3a3732;
  opacity: 0.7;
  transition: opacity 0.4s ease;
`;