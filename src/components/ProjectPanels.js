import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

import finestracat from "../IMAGES/finestracat.png";
import aguaymanto from "../IMAGES/eltaller-aguaymanto.png";
import base from "../IMAGES/base-mendoza.png";
import finestra from "../IMAGES/finestra-serveis.png";

export default function ProjectsShowcase() {
  const { t } = useContext(LanguageContext);

  const images = [finestracat, aguaymanto, base, finestra];

  const [activeIndex, setActiveIndex] = useState(null);

  const openSlider = (index) => {
    setActiveIndex(index);
  };

  const closeSlider = () => {
    setActiveIndex(null);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeIndex]);

  return (
    <>
      <Wrapper>
        <HeaderRow>
          <Star>✺</Star>
          <Overline>SELECTED CASES</Overline>
        </HeaderRow>

        {t.projects.items.map((project, index) => (
          <ProjectRow
            key={index}
            reverse={index % 2 !== 0}
          >
            <ProjectText>
              <ProjectTitle>
                {project.title}
              </ProjectTitle>

              <ProjectMeta>
                {project.stack}
              </ProjectMeta>
            </ProjectText>

            <ProjectImageWrapper>
              <ProjectImage
                src={images[index]}
                alt={project.title}
                onClick={() => openSlider(index)}
              />
            </ProjectImageWrapper>
          </ProjectRow>
        ))}
      </Wrapper>

      {activeIndex !== null && (
        <SliderOverlay onClick={closeSlider}>
          <SliderContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeSlider}>×</CloseButton>

            <NavButton left onClick={prevSlide}>‹</NavButton>

            <SliderImage
              src={images[activeIndex]}
              alt=""
            />

            <NavButton onClick={nextSlide}>›</NavButton>
          </SliderContent>
        </SliderOverlay>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  background: #0c0c0c;
  color: #eae6df;
  padding: 160px 0;
`;

const HeaderRow = styled.div`
  width: 85%;
  margin: 0 auto 140px auto;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Star = styled.span`
  font-size: 22px;
`;

const Overline = styled.span`
  font-size: 19px;
  letter-spacing: 4px;
  text-transform: uppercase;
  opacity: 0.6;
`;

const ProjectRow = styled.div`
  width: 85%;
  margin: 0 auto 220px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ reverse }) =>
    reverse ? "row-reverse" : "row"};
  gap: 140px;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 60px;
  }
`;

const ProjectText = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h2`
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(110px, 9vw, 180px);
  line-height: 0.85;
  margin: 0;
  position: relative;
  display: inline-block;
  cursor: default;

  background: linear-gradient(
    to right,
    #C2185B 0%,
    #e77fa8ff 50%,
    #eae6df 50%,
    #eae6df 100%
  );

  background-size: 200% 100%;
  background-position: right bottom;

  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  transition: background-position 4s cubic-bezier(0.65, 0, 0.35, 1);

  &:hover {
    background-position: left bottom;
  }
`;
const ProjectMeta = styled.div`
  margin-top: 20px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.5;
`;

const ProjectImageWrapper = styled.div`
  flex: 1;
  max-width: 750px;
  position: relative;
  cursor: pointer;
  isolation: isolate; /* 🔥 importante */

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      rgba(194, 24, 91, 0.45) 0%,
      rgba(231, 127, 168, 0.35) 40%,
      transparent 70%
    );
    filter: blur(100px);
    opacity: 0;
    transition: opacity 0.6s ease;
    z-index: 0;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  display: block;
  filter: grayscale(100%);
  border-radius: 3px;
  transform: scale(1);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    filter: grayscale(0%);
    transform: scale(1.08);
  }
`;

/* ===== SLIDER ===== */

const SliderOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;

const SliderContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
`;

const SliderImage = styled.img`
  width: 100%;
  display: block;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  font-size: 40px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? "left: -80px;" : "right: -80px;")}
  transform: translateY(-50%);
  font-size: 60px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;