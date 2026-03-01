import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LanguageContext } from "../LanguageContext";

export default function Header({ onContactClick }) {
  const { setLanguage, t } = useContext(LanguageContext);

  return (
    <Container>
      <Inner>
        <Brand>
          <Name>Nancy Alday</Name>
          <Role>Visual Artist & Developer</Role>
        </Brand>

        <Right>
          <LangGroup>
            <LangButton onClick={() => setLanguage("en")}>
              {t.landing.languageEN}
            </LangButton>

            <LangButton onClick={() => setLanguage("es")}>
              {t.landing.languageES}
            </LangButton>
          </LangGroup>

          <ContactButton onClick={onContactClick}>
            <StaticText>{t.landing.contact}</StaticText>

            <MarqueeWrapper>
              <MarqueeContent>
                {t.landing.contact} — {t.landing.contact} — {t.landing.contact} —
              </MarqueeContent>
              <MarqueeContent>
                {t.landing.contact} — {t.landing.contact} — {t.landing.contact} —
              </MarqueeContent>
            </MarqueeWrapper>
          </ContactButton>
        </Right>
      </Inner>
    </Container>
  );
}


/* ================= ANIMATIONS ================= */

const marqueeMove = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

/* ================= STYLES ================= */

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  backdrop-filter: blur(18px);
  background: rgba(243, 241, 236, 0.49);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  z-index: 1000;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #111;
`;

const Role = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #434242ff;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const LangGroup = styled.div`
  display: flex;
  gap: 18px;
`;

const LangButton = styled.button`
  background: none;
  border: none;
  font-size: 17px;
  letter-spacing: 2px;
  color: #333;
  cursor: pointer;
`;

const ContactButton = styled.button`
  position: relative;
  overflow: hidden;
  padding: 12px 24px;
  border-radius: 40px;
  font-size: 17px;
  border: 1px solid #111;
  background: transparent;
  cursor: pointer;
  width: 180px;
  height: 44px;
  font-family: "Inter", sans-serif;
  letter-spacing: 2px;
`;

const StaticText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  font-size: 17px;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  ${ContactButton}:hover & {
    opacity: 0;
  }
`;

const MarqueeWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  animation: ${marqueeMove} 12s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ContactButton}:hover & {
    opacity: 1;
  }
`;

const MarqueeContent = styled.div`
  padding-right: 40px;
`;