import React, { useRef, useContext } from "react";
import styled from "styled-components";
import { useScroll, useSpring, animated } from "@react-spring/web";
import image from "../proyectos/images/fondo.png";
import mobileimage from "../proyectos/images/fondomobile.png";

import { LanguageContext } from "../LanguageContext";

export default function HeroSection() {
  const { t } = useContext(LanguageContext);
  const ref = useRef();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });
  
  /* ================= FORMAS ANIMADAS DEL BACKGROUND ================= */
  
  const shapes = [
    { color: "#E4572E", size: 120, x: 20, y: 15 }, // Subí de 30 a 15 para no tapar la cara
    { color: "#4A90E2", size: 80, x: 70, y: 60 },
    { color: "#F2C94C", size: 100, x: 40, y: 80 },
    { color: "#3A7D44", size: 90, x: 85, y: 25 },
  ];
  
  // Springs individuales para cada forma con movimiento autónomo + scroll reactivo
  const shape1X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = shapes[0].x;
      const autonomousMovement = Math.sin(Date.now() * 0.001) * 5; // Movimiento autónomo
      const scrollMovement = Math.sin(p * Math.PI * 2) * 15; // Movimiento por scroll
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape1Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = shapes[0].y;
      const autonomousMovement = Math.cos(Date.now() * 0.0008) * 3; // Movimiento autónomo
      const scrollMovement = Math.cos(p * Math.PI * 3) * 10; // Movimiento por scroll
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape1Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.0012) * 0.05; // Escalado autónomo
      const scrollScale = Math.sin(p * Math.PI * 4) * 0.2; // Escalado por scroll
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape1Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.0001; // Rotación autónoma lenta
      const scrollRotation = p * 360; // Rotación por scroll
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape2X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = shapes[1].x;
      const autonomousMovement = Math.sin(Date.now() * 0.001 + 1) * 4;
      const scrollMovement = Math.sin(p * Math.PI * 2 + 1) * 15;
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape2Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = shapes[1].y;
      const autonomousMovement = Math.cos(Date.now() * 0.0009 + 1) * 4;
      const scrollMovement = Math.cos(p * Math.PI * 3 + 1) * 10;
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape2Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.0011 + 1) * 0.06;
      const scrollScale = Math.sin(p * Math.PI * 4 + 1) * 0.2;
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape2Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.00015 + 45;
      const scrollRotation = p * 360 + 45;
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape3X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = shapes[2].x;
      const autonomousMovement = Math.sin(Date.now() * 0.0013 + 2) * 6;
      const scrollMovement = Math.sin(p * Math.PI * 2 + 2) * 15;
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape3Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = shapes[2].y;
      const autonomousMovement = Math.cos(Date.now() * 0.001 + 2) * 5;
      const scrollMovement = Math.cos(p * Math.PI * 3 + 2) * 10;
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape3Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.0014 + 2) * 0.04;
      const scrollScale = Math.sin(p * Math.PI * 4 + 2) * 0.2;
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape3Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.00008 + 90;
      const scrollRotation = p * 360 + 90;
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape4X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = shapes[3].x;
      const autonomousMovement = Math.sin(Date.now() * 0.0016 + 3) * 4;
      const scrollMovement = Math.sin(p * Math.PI * 2 + 3) * 15;
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape4Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = shapes[3].y;
      const autonomousMovement = Math.cos(Date.now() * 0.0012 + 3) * 3;
      const scrollMovement = Math.cos(p * Math.PI * 3 + 3) * 10;
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape4Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.001 + 3) * 0.07;
      const scrollScale = Math.sin(p * Math.PI * 4 + 3) * 0.2;
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const shape4Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.00012 + 135;
      const scrollRotation = p * 360 + 135;
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  /* ================= PÁJARO EXTRAÍDO DEL BACKGROUND ================= */
  
  const birdX = useSpring({
    x: scrollYProgress.to((p) => {
      // Trayectoria en zigzag por todo el viewport
      if (p < 0.2) {
        return 10 + p * 5 * 60; // 10% -> 70%
      } else if (p < 0.4) {
        return 70 - (p - 0.2) * 5 * 50; // 70% -> 20%
      } else if (p < 0.6) {
        return 20 + (p - 0.4) * 5 * 40; // 20% -> 60%
      } else if (p < 0.8) {
        return 60 - (p - 0.6) * 5 * 70; // 60% -> -10%
      } else {
        return -10 + (p - 0.8) * 5 * 30; // -10% -> 20%
      }
    }),
    config: { tension: 100, friction: 25 }
  });
  
  const birdY = useSpring({
    y: scrollYProgress.to((p) => {
      // Movimiento vertical ondulado que interactúa con las formas
      return Math.sin(p * Math.PI * 8) * 25 + Math.cos(p * Math.PI * 4) * 15;
    }),
    config: { tension: 100, friction: 25 }
  });
  
  const birdRotation = useSpring({
    rotate: scrollYProgress.to((p) => {
      // Rotación dinámica según la dirección del vuelo
      const baseRotation = Math.sin(p * Math.PI * 6) * 20;
      const directionRotation = p < 0.5 ? 15 : -15;
      return baseRotation + directionRotation;
    }),
    config: { tension: 100, friction: 25 }
  });
  
  const birdScale = useSpring({
    scale: scrollYProgress.to((p) => {
      // Cambio de escala para simular profundidad
      return 0.9 + Math.sin(p * Math.PI * 3) * 0.3;
    }),
    config: { tension: 100, friction: 25 }
  });
  
  const birdOpacity = useSpring({
    opacity: scrollYProgress.to((p) => {
      // Aparece gradualmente y se desvanece al final
      if (p < 0.05) return 0;
      if (p < 0.85) return 1;
      return 1 - (p - 0.85) / 0.15;
    }),
    config: { tension: 100, friction: 25 }
  });

  return (
    <Wrapper ref={ref}>

      <HeroImageWrapper>
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileimage} />
          <img src={image} alt="" />
        </picture>
        
        {/* FORMAS ANIMADAS CORREGIDAS */}
        <animated.div
          style={{
            position: "absolute",
            top: shape1Y.y.to(y => `${y}%`),
            left: shape1X.x.to(x => `${x}%`),
            transform: shape1Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape1Scale.scale})`),
            width: `${shapes[0].size}px`,
            height: `${shapes[0].size}px`,
            borderRadius: "50%",
            backgroundColor: shapes[0].color,
            opacity: 0.7,
          }}
        />
        <animated.div
          style={{
            position: "absolute",
            top: shape2Y.y.to(y => `${y}%`),
            left: shape2X.x.to(x => `${x}%`),
            transform: shape2Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape2Scale.scale})`),
            width: `${shapes[1].size}px`,
            height: `${shapes[1].size}px`,
            borderRadius: "50%",
            backgroundColor: shapes[1].color,
            opacity: 0.7,
          }}
        />
        <animated.div
          style={{
            position: "absolute",
            top: shape3Y.y.to(y => `${y}%`),
            left: shape3X.x.to(x => `${x}%`),
            transform: shape3Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape3Scale.scale})`),
            width: `${shapes[2].size}px`,
            height: `${shapes[2].size}px`,
            borderRadius: "50%",
            backgroundColor: shapes[2].color,
            opacity: 0.7,
          }}
        />
        <animated.div
          style={{
            position: "absolute",
            top: shape4Y.y.to(y => `${y}%`),
            left: shape4X.x.to(x => `${x}%`),
            transform: shape4Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape4Scale.scale})`),
            width: `${shapes[3].size}px`,
            height: `${shapes[3].size}px`,
            borderRadius: "50%",
            backgroundColor: shapes[3].color,
            opacity: 0.7,
          }}
        />
        
        {/* PÁJARO ANIMADO CORREGIDO */}
        <animated.div
          style={{
            position: "absolute",
            top: birdY.y.to(y => `${y}%`),
            left: birdX.x.to(x => `${x}%`),
            transform: birdRotation.rotate.to(r => `rotate(${r}deg) scale(${birdScale.scale})`),
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#2c3e50",
            opacity: birdOpacity.opacity,
          }}
        />
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
  background: #FCF1E7;

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