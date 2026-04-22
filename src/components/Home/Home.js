import React from "react";
import styled from "styled-components";
import image from "./images/fondo.png";
import mobileimage from "./images/fondomobile.png";
import { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

export default function HeroSection() {

  const { t } = useContext(LanguageContext);
  return (
    <Wrapper>

      <HeroImageWrapper>
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileimage} />
          <img src={image} alt="" />
        </picture>
      </HeroImageWrapper>

      <Content>

        <TextBlock>
        <Title>{t.landing.hero.title}</Title>

          <Subtitle>
            {t.landing.hero.subtitle}
          </Subtitle>
        </TextBlock>

        <Signature>
          {t.landing.hero.signatureName}
          <span>{t.landing.hero.signatureRole}</span>
        </Signature>

      </Content>

    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  position: relative;
  background: #f9f8f3ff;

  /* MOBILE FIRST */
  min-height: 100svh;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 100vh;
  }
`;

/* IMAGEN */
const HeroImageWrapper = styled.div`
  position: absolute;

  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 90%;
  max-width: 1200px;

  opacity: 0.95;
  pointer-events: none;

  picture,
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  /* MOBILE */
  @media (max-width: 768px) {
    width: 120%;
    top: 48%;
    opacity: 0.9;
  }
`;

/* CONTENIDO */
const Content = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100svh;
  padding: 6vh 8vw;

  @media (min-width: 768px) {
    height: 100%;
  }
`;

/* TEXTO */
const TextBlock = styled.div`
  max-width: 720px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

/* TITLE */
const Title = styled.h1`
  font-size: clamp(42px, 6vw, 88px);
  line-height: 1.05;
  letter-spacing: -0.03em;

  font-family: "Canela", serif;
  color: #111;

  margin: 20px 20px 0px 0;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

/* SUB */
const Subtitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #555;

  max-width: 520px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

/* FIRMA */
const Signature = styled.div`
  align-self: flex-end;

  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  color: #111;

  span {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    color: #666;
    letter-spacing: 0.04em;
  }

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-top: 40px;

    color: white;

    span {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;