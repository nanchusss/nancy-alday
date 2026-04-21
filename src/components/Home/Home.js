import React, { useEffect, useRef } from "react";
import styled from "styled-components";


export default function Home() {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth - 0.5) * 60;
      const y = (e.clientY / innerHeight - 0.5) * 60;

      // 👉 movimiento 3D
      el.style.transform = `
        rotateX(${y * 0.08}deg)
        rotateY(${x * 0.08}deg)
        translate(${x}px, ${y}px)
      `;

      // 👉 variables para capas
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <Wrapper>
      <Hero>
        <Inner>
          <NameWrapper ref={textRef}>
            <LayerBack>Projects</LayerBack>
            <LayerColor>Projects</LayerColor>
            <Name>Projects</Name>
          </NameWrapper>

          <Bottom>
            Crafting digital spaces with emotion & precision
          </Bottom>
        </Inner>
      </Hero>

   
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
`;

const Hero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 8vw;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NameWrapper = styled.div`
  position: relative;
  perspective: 800px;
  transform-style: preserve-3d;

  --x: 0px;
  --y: 0px;
`;

/* BASE */
const BaseText = `
  position: absolute;
  inset: 0;

  font-family: "Canela", serif;
  font-size: clamp(120px, 14vw, 280px);
  line-height: 0.8;
  letter-spacing: -0.04em;
`;

/* 🔴 CAPA PROFUNDIDAD (más separada, menos blur) */
const LayerBack = styled.h1`
  ${BaseText};

  color: rgba(0, 0, 0, 0.25);

  transform: translate(60px, 50px);
  filter: blur(6px);
  opacity: 0.6;
`;

/* 🔵 CAPA COLOR (editorial real) */
const LayerColor = styled.h1`
  ${BaseText};

  color: #6fa8dc;
  mix-blend-mode: multiply;

  transform: translate(
    calc(var(--x) * -0.2 + 10px),
    calc(var(--y) * -0.2 - 10px)
  );
`;

/* ⚫ TEXTO PRINCIPAL */
const Name = styled.h1`
  position: relative;

  font-family: "Canela", serif;
  font-size: clamp(120px, 14vw, 280px);
  line-height: 0.8;
  letter-spacing: -0.04em;

  margin: 0;
  color: ${({ theme }) => theme.text};

  transform: translateZ(20px);

  text-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
`;

const Bottom = styled.div`
  font-size: 36px;
  max-width: 600px;
  line-height: 1.6;

  color: ${({ theme }) => theme.secondaryText};
`;