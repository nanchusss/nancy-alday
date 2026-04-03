import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";
import { useNavigate } from "react-router-dom";

import retrato from "../IMAGES/retrato.jpg";
import TechEcosystem from "./TechGrid";

export default function ReliefLanding() {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const horizontalRef = useRef(null);

  const [scrollX, setScrollX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = t.landing.editorialSlides;

  /* ================= SCROLL HORIZONTAL ================= */
  useEffect(() => {
    const el = horizontalRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (window.innerWidth > 768) {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.1;
        }
      }
    };

    const handleScroll = () => {
      setScrollX(el.scrollLeft);

      const panels = Array.from(el.children);
      let closestIndex = 0;
      let closestDistance = Infinity;

      panels.forEach((panel, i) => {
        const rect = panel.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(window.innerWidth / 2 - center);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper>

      {/* TOP */}
      <TopSection>
        <HorizontalTrack ref={horizontalRef}>
          {slides.map((slide, index) => {
            const depthShift = scrollX * 0.03;
            const frontShift = scrollX * 0.015;

            return (
              <Panel key={index}>
                <PanelContent>
                  <TitleWrapper>
                    <OutlineTitle style={{ transform: `translateX(${depthShift}px)` }}>
                      {index === 0 ? "About Me" : slide.title}
                    </OutlineTitle>

                    <MainTitle style={{ transform: `translateX(${frontShift}px)` }}>
                      {index === 0 ? "About Me" : slide.title}
                    </MainTitle>
                  </TitleWrapper>
                </PanelContent>
              </Panel>
            );
          })}
        </HorizontalTrack>
      </TopSection>

      {/* BOTTOM */}
      <BottomSection>

        {/* ABOUT */}
        {activeIndex === 0 && (
          <AboutStage id="about">
            <PortraitSmall src={retrato} />

            <AboutContent>
              <AboutParagraph delay={0}>
                I'm a passionate frontend developer with a background in arts.
              </AboutParagraph>

              <AboutParagraph delay={0.2}>
                I enjoy creating interfaces that are visually appealing and intuitive.
              </AboutParagraph>

              <AboutParagraph delay={0.4}>
                If you're looking for creativity + execution, let's connect.
              </AboutParagraph>
            </AboutContent>
          </AboutStage>
        )}

        {/* TECH */}
        {activeIndex === 1 && <TechEcosystem />}

        {/* PROJECTS CTA */}
        {activeIndex === 2 && (
          <ProjectStage>
            <Discover onClick={() => navigate("/projects")}>
              <Dot />
 <ViewMoreText>View More</ViewMoreText>
            </Discover>
           
          </ProjectStage>
        )}

      </BottomSection>

    </Wrapper>
  );
}

/* ================= STYLES ================= */

const ViewMoreText = styled.span`
  position: relative;

  font-size: 16px;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  color: #1a1a1a;

  cursor: pointer;

  /* línea sutil debajo */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;

    width: 100%;
    height: 1px;

    background: rgba(0, 0, 0, 0.3);

    transform: scaleX(0.6);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  /* micro interacción */
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  /* SOLO desktop */
  height: 100vh;

  @media (max-width: 768px) {
    height: auto; /* 🔥 clave */
    min-height: 100vh; /* opcional pero recomendable */
    display: block; /* 🔥 resetea flex para evitar colapsos */
  }
`;

const TopSection = styled.div`
  height: 50%;


   @media (max-width: 768px) {
    height: auto;
    padding: 40px 20px 40px;
  }
`;

const BottomSection = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  padding: 4vh 6vw;

  @media (max-width: 768px) {
    height: auto;
    padding: 40px 20px 60px;

    display: block; /* 🔥 esto cambia TODO */
  }
`;

const HorizontalTrack = styled.div`
  display: flex;
  height: 100%;
  overflow-x: auto;

  scroll-snap-type: x mandatory;

  @media (max-width: 768px) {
    height: auto; /* 🔥 clave */
  }
`;

const Panel = styled.div`
  flex: 0 0 100vw;
  display: flex;
  align-items: center;
  padding: 0 8vw;

  @media (max-width: 768px) {
    padding: 0 20px; /* 🔥 esto cambia TODO */
  }
`;

const PanelContent = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  position: relative;
`;

const OutlineTitle = styled.h1`
  position: absolute;
  font-size: clamp(60px, 10vw, 140px);
  color: transparent;
  -webkit-text-stroke: 1px black;
  opacity: 0.2;
`;

const MainTitle = styled.h1`
  font-size: clamp(60px, 10vw, 140px);
  margin-bottom: 20px;
  align-self: flex-start;
  margin-left: -4px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const AboutStage = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  width: 100%;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
    margin-top: 60px; /* 🔥 AQUÍ ESTÁ EL CAMBIO BUENO */
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const AboutParagraph = styled.p`
  font-size: 33px;
  margin-bottom: 16px;
  
  max-width: 100%;

  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
  animation-delay: ${({ delay }) => delay}s;

  @media (max-width: 768px) {
  margin-top: 20px;
    font-size: 27px;
    line-height: 1.6;
    letter-spacing: 0.2px;
  }
`;

const PortraitSmall = styled.img`
  width: 200px;

  @media (max-width: 768px) {
    width: 70%;
    margint-top: 20px;
    max-width: 260px;
  }
`;

const ProjectStage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Discover = styled.div`
  position: absolute;
  top: 50%;
  font-size: 34px;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    position: relative;
    transform: none;

    margin-top: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%; /* 🔥 evita cortes */
  }
`;

const Dot = styled.div`
  width: 22px;
  height: 22px;
  background: black;
  border-radius: 50%;
`;