import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

export default function HowIBuild() {
  const { t } = useContext(LanguageContext);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!t?.howIBuild?.blocks) return null;

  return (
    <Section ref={sectionRef}>
      <Container>
        <Title visible={visible}>{t.howIBuild.title}</Title>

        <Grid>
          {t.howIBuild.blocks.map((block, index) => (
            <Block
              key={index}
              index={index}
              visible={visible}
              delay={index * 0.15}
            >
              <BlockTitle>{block.title}</BlockTitle>
              <BlockText>{block.text}</BlockText>
            </Block>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

/* ================= STYLES ================= */

const Section = styled.section`
  background: #f8f5ef;
  padding: 180px 0;
`;

const Container = styled.div`
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 120px;
  color: #2f2c27;
  letter-spacing: 3px;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(60px)"};
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const Block = styled.div`
  padding: 70px 60px;
  border-radius: 28px;

  background: ${({ index }) =>
    index % 2 === 0 ? "#eae4d8" : "#5e4a67"};

  color: ${({ index }) =>
    index % 2 === 0 ? "#2f2c27" : "#f8f5ef"};

  transition: all 0.6s ease;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0px)" : "translateY(80px)"};
  transition-delay: ${({ delay }) => delay}s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const BlockTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 22px;
  letter-spacing: 1px;
`;

const BlockText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.9;
`;