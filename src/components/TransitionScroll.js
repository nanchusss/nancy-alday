import React from "react";
import styled from "styled-components";
import image from "./Home/Images/fondo.png";
import mobileimage from "./Home/Images/fondomobile.png";

export default function HeroSection() {
  return (
    <Wrapper>

      {/* ILUSTRACIÓN RESPONSIVE */}
      <HeroImageWrapper>
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileimage} />
          <img src={image} alt="" />
        </picture>
      </HeroImageWrapper>

      {/* CONTENIDO */}
      <Content>

        <TextBlock>
          <Title>
            I design digital experiences
            shaped by art, structure
            and emotion.
          </Title>

          <Subtitle>
            From art and music to frontend — 
            a multidisciplinary approach to building interfaces.
          </Subtitle>
        </TextBlock>

        <Signature>
          Nancy Alday
          <span>Frontend Developer · Barcelona</span>
        </Signature>

      </Content>

    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #f9f8f3ff;
`;

/* ILUSTRACIÓN RESPONSIVE */
const HeroImageWrapper = styled.div`
  position: absolute;

  left: 55%;
  top: 55%;
  transform: translate(-50%, -50%);

  width: 85%;
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
    left: 50%;
    top: 50%;
    width: 130%;
    transform: translate(-50%, -50%);
    opacity: 0.9;
  }
`;

/* CONTENIDO */
const Content = styled.div`
  position: relative;
  z-index: 2;

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 6vh 8vw;
`;

/* BLOQUE TEXTO */
const TextBlock = styled.div`
  max-width: 720px;
`;

/* TITULAR */
const Title = styled.h1`
  font-size: clamp(48px, 6vw, 88px);
  line-height: 1.05;
  letter-spacing: -0.03em;

  font-family: "Canela", serif;
  color: #111;

  margin: 30px 30px 0px 0;

  /* MOBILE */
  @media (max-width: 768px) {
   left: 50%;
    top: 40%;
   ;
  }
`;

/* SUB */
const Subtitle = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: #555;

  max-width: 520px;
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
    margin-top: 60px;
    color: white;
    padding-top: 20px;

    span {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;