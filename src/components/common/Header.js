import React, { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
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
            EN
          </LangButton>

          <LangButton
            onClick={() => {
              setLanguage("es");
              setOpen(false);
            }}
          >
            ES
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

      <MobileMenu open={open}>
        <LangButton onClick={() => setLanguage("en")}>EN</LangButton>
        <LangButton onClick={() => setLanguage("es")}>ES</LangButton>
        <ContactButton
          onClick={() => {
            onContactClick();
            setOpen(false);
          }}
        >
          {t.landing.contact}
        </ContactButton>
      </MobileMenu>
    </Container>
  );
}

/* ===================== */
/* ANIMATIONS */
/* ===================== */

const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/* ===================== */
/* STYLES */
/* ===================== */

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(18px);
  background: rgba(233, 228, 218, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${fadeDown} 0.8s ease;
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
  gap: 22px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.div`
  font-size: 20px;
  letter-spacing: 6px;
  font-weight: 600;
  color: #2f2c28;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    letter-spacing: 10px;
    opacity: 0.7;
  }
`;

const LangButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  letter-spacing: 2px;
  color: #3a3732;
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;
  transition: 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0%;
    background: #0c0c0cff;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const ContactButton = styled.button`
  padding: 11px 28px;
  border-radius: 40px;
  font-family: "Sora", sans-serif;
  font-size: 16px;
  letter-spacing: 1.5px;
  cursor: pointer;
  border: none;
  color: #f4f1ea;

  background: #8C88B6;
  transition: all 0.35s ease;

  box-shadow: 0 6px 20px rgba(140, 136, 182, 0.25);

  &:hover {
    background: #7671A3;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(118, 113, 163, 0.35);
  }

  &:active {
    transform: translateY(0px) scale(0.98);
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
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-20px)")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: 0.4s ease;
`;