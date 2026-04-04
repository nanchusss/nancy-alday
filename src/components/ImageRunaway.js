import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

const ITEM_WIDTH = 520;
const GAP = 80;
const STEP = ITEM_WIDTH + GAP;

export default function ImageRunway() {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  const loopedProjects = [...projects, ...projects, ...projects];

  const baseIndex = projects.length;
  const baseOffset = baseIndex * STEP;

  const [activeIndex, setActiveIndex] = useState(baseIndex);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const current = useRef(baseOffset);
  const target = useRef(baseOffset);
  const raf = useRef(null);

  /* 🔥 detect mobile */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* 🔥 SOLO DESKTOP ANIMATION */
  useEffect(() => {
    if (isMobile) {
      if (trackRef.current) {
        trackRef.current.style.transform = "none";
      }
      return;
    }

    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      target.current += delta;

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const index = Math.round(target.current / STEP);
        target.current = index * STEP;
      }, 120);
    };

    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      const total = projects.length;
      const loopSize = STEP * total;

      if (target.current < loopSize) {
        target.current += loopSize;
        current.current += loopSize;
      }

      if (target.current > loopSize * 2) {
        target.current -= loopSize;
        current.current -= loopSize;
      }

      current.current += (target.current - current.current) * 0.1;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-current.current}px)`;
        detectActive();
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  /* 🔥 detect active */
  const detectActive = () => {
    if (!trackRef.current) return;

    const children = trackRef.current.children;
    const center = window.innerWidth / 2;

    let closest = 0;
    let min = Infinity;

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const offset = Math.abs(center - (rect.left + rect.width / 2));

      if (offset < min) {
        min = offset;
        closest = i;
      }
    }

    setActiveIndex(closest);
  };

  const realIndex =
    ((activeIndex % projects.length) + projects.length) %
    projects.length;

  const handleClick = (i) => {
    const real =
      ((i % projects.length) + projects.length) %
      projects.length;

    if (i === activeIndex || isMobile) {
      navigate(`/project/${real}`);
    } else {
      target.current = i * STEP;
    }
  };

  return (
    <Wrapper
      onClick={(e) => {
        if (!trackRef.current?.contains(e.target)) {
          navigate("/");
        }
      }}
    >
      <TopBar>
        <ProjectTitle>{projects[realIndex]?.title}</ProjectTitle>
      </TopBar>

      {!isMobile && <ScrollSpace />}

      <Track ref={trackRef} onClick={(e) => e.stopPropagation()}>
        {(isMobile ? projects : loopedProjects).map((p, i) => (
          <Item
            key={i}
            active={i === activeIndex}
            onClick={() => handleClick(i)}
          >
            <Image src={p.image[0]} />
            <MobileTitle>{p.title}</MobileTitle>
          </Item>
        ))}
      </Track>
    </Wrapper>
  );
}

/* ---------------- STYLES ---------------- */

const Wrapper = styled.section`
  height: 300vh;
  background: #f6f3ef;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    overflow: visible;
    padding: 40px 0 80px;
  }
`;

const ScrollSpace = styled.div`
  height: 200vh;
`;

const TopBar = styled.div`
  position: fixed;
  top: 130px;
  width: 100%;
  text-align: center;
  z-index: 10;

  @media (max-width: 768px) {
    position: relative;
    margin-bottom: 30px;
  }
`;

const ProjectTitle = styled.h2`
  font-family: "Inter", sans-serif;
  letter-spacing: 0.28em;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
`;

const Track = styled.div`
  position: fixed;
  top: 20%;
  left: 0;

  display: flex;
  gap: 80px;

  transform: translateY(-50%);
  will-change: transform;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    transform: none;

    flex-direction: column;
    align-items: center;

    gap: 60px;
    padding: 0 20px;
  }
`;

const Item = styled.div`
  width: 520px;
  height: 720px;

  flex-shrink: 0;

  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  transform: ${({ active }) =>
    active
      ? "scale(1) translateY(-20px)"
      : "scale(0.82) translateY(40px)"};

  opacity: ${({ active }) => (active ? 1 : 0.35)};
  z-index: ${({ active }) => (active ? 3 : 1)};

 @media (max-width: 768px) {
  width: 100%;
  max-width: 420px;
  height: auto;

  transform: translateY(40px) scale(0.96);
  opacity: 0;

  animation: reveal 0.6s ease forwards;
  animation-delay: ${({ index }) => index * 0.1}s;

  @keyframes reveal {
    to {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
}
  }
`;

const Image = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center;

  border-radius: 18px;

  @media (max-width: 768px) {
    aspect-ratio: 4 / 5;
    border-radius: 16px;
  }
`;

const MobileTitle = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 14px;
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.6;
    text-align: center;
  }
`;