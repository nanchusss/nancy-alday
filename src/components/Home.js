import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export default function Home() {
  const textRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const el = textRef.current;
      if (!el) return;

      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;

      el.style.transform = `
        translate(${x}px, ${y}px)
        skewX(${x * 0.05}deg)
        skewY(${y * 0.05}deg)
      `;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <Wrapper>
      <Hero>
        <Inner>
          <TopLine>Frontend Developer & Artist</TopLine>

          <Name ref={textRef}>NANCY</Name>

          <Bottom>
            Crafting digital spaces with emotion & precision
          </Bottom>
        </Inner>
      </Hero>
    </Wrapper>
  );
}

/* ================= WRAPPER ================= */

const Wrapper = styled.div`
  background: ${({ theme }) => {
    console.log("THEME HOME:", theme);
    return theme.background;
  }};
`;

/* ================= HERO ================= */

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

/* ===== SMALL TEXT ===== */

const TopLine = styled.div`
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;

  color: ${({ theme }) => theme.secondaryText};

   [data-theme="dark"] & {
    color: rgba(255, 255, 255, 1);
`;

/* ===== MAIN NAME ===== */

const Name = styled.h1`
  font-family: "Canela", serif;

  font-size: clamp(120px, 14vw, 280px);
  line-height: 0.8;
  letter-spacing: -0.04em;

  margin: 0;

  transition: transform 0.2s ease-out;
  will-change: transform;

   [data-theme="dark"] & {
    color: rgba(255, 255, 255, 1);
`;

/* ===== SUBTEXT ===== */

const Bottom = styled.div`
  font-size: 16px;
  max-width: 400px;
  line-height: 1.6;

  color: ${({ theme }) => theme.secondaryText};
`;