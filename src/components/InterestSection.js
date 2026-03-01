import React, { useContext } from "react";
import styled from "styled-components";
import artwork from "../IMAGES/Extimidad.jpg";
import { LanguageContext } from "../components/LanguageContext";

export default function InterestSection({ onContactClick }) {
  const { t } = useContext(LanguageContext);

  return (
    <Section>
      <Background />
      <DarkLayer />

      <Inner>
        <SideText>
          {t.interest.sideTextLine1} <br />
          {t.interest.sideTextLine2}
        </SideText>

        <Center>
          <Intro>{t.interest.intro}</Intro>

          <TagGroup>
            {t.interest.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagGroup>

          <CTA>
            <Small>{t.interest.ctaSmall}</Small>
            <Button onClick={onContactClick}>
              {t.interest.button}
            </Button>
          </CTA>
        </Center>
      </Inner>
    </Section>
  );
}

/* ================= STYLES ================= */

const Section = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${artwork});
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
`;

const DarkLayer = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  width: 92%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  text-align: center;
  max-width: 1000px;
`;

const Intro = styled.p`
  font-size: 18px;
  letter-spacing: 3px;
  font-family: "Inter", sans-serif;
  color: rgba(255,255,255,0.8);
  margin-bottom: 60px;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px 22px;
  margin-bottom: 90px;
`;

const Tag = styled.div`
  padding: 10px 24px;
  font-family: "Inter", sans-serif;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.5);
  font-size: 21px;
  color: white;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
cursor: pointer;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Small = styled.p`
  font-size: 16px;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.8);
`;

const Button = styled.button`
  padding: 12px 30px;
  border-radius: 40px;
  border: 1px solid white;
  background: white;
  color: black;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: white;
  }
`;

const SideText = styled.div`
  position: absolute;
   font-family: "Inter", sans-serif;
  left: -2%;
  bottom: 8%;
  font-size: clamp(120px, 14vw, 200px);
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -8px;
  color: rgba(255, 255, 255, 0.69);
  pointer-events: none;
`;