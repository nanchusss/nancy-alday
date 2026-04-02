import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LanguageContext } from "../LanguageContext";

export default function Header({ onContactClick, isDark, toggleTheme }) {
  const { setLanguage, t } = useContext(LanguageContext);

  return (
    <Container>
      <Inner>
        

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

          <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
  {isDark ? "☀" : "☾"}
</ThemeToggle>
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

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 28px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  transition: all 0.25s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  backdrop-filter: blur(18px);
  background: rgba(243, 241, 236, 0);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  border-bottom: white 1px solid;
  align-items: center;
  z-index: 1000;

  @media (max-width: 768px) {
    height: 70px;
  }
`;


const Inner = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;





const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const LangGroup = styled.div`
  display: flex;
  gap: 18px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const LangButton = styled.button`
  background: none;
  border: none;
  font-size: 17px;
  letter-spacing: 2px;
  color: #333;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 13px;
    letter-spacing: 1px;
  }
`;

const ContactButton = styled.button`
  position: relative;
  overflow: hidden;
  border: white 1px solid;
  padding: 12px 24px;
  border-radius: 40px;
  font-size: 17px;
  opacity: 0.5;
  color: black;
  border-color: black;
  background: transparent;
  cursor: pointer;
  width: 180px;
  height: 44px;
  font-family: "Inter", sans-serif;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    width: 120px;
    height: 36px;
    font-size: 13px;
    letter-spacing: 1px;
    padding: 8px 16px;
  }
`;

const StaticText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  color: white;
  color: black;
  opacity: 0.7;
  font-size: 17px;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  ${ContactButton}:hover & {
    opacity: 0;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const MarqueeWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  color: black; 
  align-items: center;
  white-space: nowrap;
  animation: ${marqueeMove} 12s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ContactButton}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    animation: ${marqueeMove} 18s linear infinite;
  }
`;

const MarqueeContent = styled.div`
  padding-right: 40px;

  @media (max-width: 768px) {
    padding-right: 20px;
  }
`;