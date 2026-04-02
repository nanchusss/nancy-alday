import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import img from "../IMAGES/eltaller-aguaymanto.png";
import img from "../IMAGES/finestra-serveis.png";
import img from "../IMAGES/base-mendoza.png";

export default function RevealScene() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const total = rect.height - windowHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);

      setProgress(scrolled / total);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎯 easing (clave para que no sea amateur)
  const ease = progress * progress;

  // tamaño del "agujero"
  const size = 10 + ease * 50;

  const clipPath = `inset(0 ${50 - size / 2}% 0 ${50 - size / 2}%)`;

  // fondo con ligera escala
  const scale = 1 + ease * 0.08;

  return (
    <Section ref={ref}>
      <Sticky>

        {/* BACKGROUND */}
        <Background style={{ transform: `scale(${scale})` }}>
          <img src={img} alt="" />
        </Background>

        {/* MASK */}
        <Mask style={{ clipPath }} />

        {/* FRAME */}
        <Frame />

        {/* TITLE */}
        <Title style={{ opacity: ease > 0.4 ? 1 : 0 }}>
          El Taller Aguaymanto
        </Title>

      </Sticky>
    </Section>
  );
}

const Section = styled.section`
  height: 300vh;
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Mask = styled.div`
  position: absolute;
  inset: 0;
  background: #0d0d0d;

  transition: clip-path 0.1s linear;
`;

const Frame = styled.div`
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255,255,255,0.2);
  pointer-events: none;
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: white;
  font-size: clamp(40px, 8vw, 120px);
  letter-spacing: 0.08em;

  transition: opacity 0.4s ease;
`;