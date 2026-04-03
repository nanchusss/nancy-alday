import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

/* 🔥 constantes FUERA (fix warning React) */
const ITEM_WIDTH = 520;
const GAP = 80;
const STEP = ITEM_WIDTH + GAP;

export default function ImageRunway() {
  const trackRef = useRef(null);
  const navigate = useNavigate();

  // 🔁 LOOP
  const loopedProjects = [...projects, ...projects, ...projects];

  const baseIndex = projects.length;
  const baseOffset = baseIndex * STEP;

  const [activeIndex, setActiveIndex] = useState(baseIndex);

  const current = useRef(baseOffset);
  const target = useRef(baseOffset);
  const raf = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      target.current += delta;

      clearTimeout(scrollTimeout);

      // 🔥 SNAP
      scrollTimeout = setTimeout(() => {
        const index = Math.round(target.current / STEP);
        target.current = index * STEP;
      }, 120);
    };

    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      const total = projects.length;
      const loopSize = STEP * total;

      // 🔁 LOOP estable
      if (target.current < loopSize) {
        target.current += loopSize;
        current.current += loopSize;
      }

      if (target.current > loopSize * 2) {
        target.current -= loopSize;
        current.current -= loopSize;
      }

      // 🎯 SMOOTH
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
  }, []);

  // 🔥 DETECT ACTIVE
  const detectActive = () => {
    if (!trackRef.current) return;

    const children = trackRef.current.children;
    if (!children.length) return;

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

  // 🔥 índice real
  const realIndex =
    ((activeIndex % projects.length) + projects.length) %
    projects.length;

  // 🔥 CLICK
  const handleClick = (i) => {
    const real =
      ((i % projects.length) + projects.length) %
      projects.length;

    if (i === activeIndex) {
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

      <ScrollSpace />

      <Track
        ref={trackRef}
        onClick={(e) => e.stopPropagation()} // 🔥 evita cierre accidental
      >
        {loopedProjects.map((p, i) => (
          <Item
            key={i}
            active={i === activeIndex}
            onClick={() => handleClick(i)}
          >
            <Image src={p.image[0]} />
          </Item>
        ))}
      </Track>
    </Wrapper>
  );
}

/* ---------------- STYLES ---------------- */

/* ---------------- STYLES ---------------- */

const Wrapper = styled.section`
  height: 300vh;
  background: #f6f3ef;
  overflow: hidden;
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
`;

const Image = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center;

  border-radius: 18px;

  @media (max-width: 768px) {
    width: 400px;
    height: 520px;
    margin-left: 100px;
    align-items: center;
  }
`;