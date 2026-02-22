import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LanguageContext } from "../LanguageContext";

export default function Header({ onContactClick }) {
  const { t, setLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Inner>
        <Left>
          <LangButton
            onClick={() => {
              setLanguage("en");
              setOpen(false);
            }}
          >
            {t.landing.languageEN}
          </LangButton>

          <LangButton
            onClick={() => {
              setLanguage("es");
              setOpen(false);
            }}
          >
            {t.landing.languageES}
          </LangButton>
        </Left>

        <Right>
          <ContactButton
            onClick={() => {
              onContactClick();
              setOpen(false);
            }}
          >
            {t.landing.contact}
          </ContactButton>

          <MobileToggle onClick={() => setOpen(!open)}>
            {open ? "✕" : "⋯"}
          </MobileToggle>
        </Right>
      </Inner>

      {open && (
        <MobileMenu>
          <LangButton onClick={() => setLanguage("en")}>
            {t.landing.languageEN}
          </LangButton>

          <LangButton onClick={() => setLanguage("es")}>
            {t.landing.languageES}
          </LangButton>

          <ContactButton
            onClick={() => {
              onContactClick();
              setOpen(false);
            }}
          >
            {t.landing.contact}
          </ContactButton>
        </MobileMenu>
      )}
    </Container>
  );
}

/* STYLES */

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  z-index: 1000;
  background: rgba(233, 228, 218, 0.85);
  backdrop-filter: blur(12px);
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Left = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LangButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 17px;
  letter-spacing: 1px;
  color: #3a3732;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ContactButton = styled.button`
  background: transparent;
  border: 1px solid rgba(60, 56, 50, 0.4);
  padding: 10px 22px;
  border-radius: 40px;
  font-family: "Cormorant Garamond", serif;
  font-size: 19px;
  letter-spacing: 1px;
  color: #3a3732;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(60, 56, 50, 0.8);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #3a3732;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 90px;
  right: 20px;
  background: rgba(248, 244, 238, 0.95);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
`;