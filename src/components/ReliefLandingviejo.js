import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";
import { useNavigate } from "react-router-dom";

import retrato from "../IMAGES/retrato.jpg";
import TechEcosystem from "./TechGrid";
import ScrollHint from "./ScrollHint";

export default function ReliefLanding() {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  const horizontalRef = useRef(null);

  const startX = useRef(0);
  const endX = useRef(0);

  const [hasEnteredRelief, setHasEnteredRelief] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = t.landing.editorialSlides;

  /* ================= SCROLL VERTICAL (flecha) ================= */
  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.8;

      setHasEnteredRelief(window.scrollY > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= SCROLL HORIZONTAL + TOUCH ================= */
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

    /* ===== TOUCH (mobile) ===== */
    const handleTouchStart = (e) => {
      startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = startX.current - endX.current;

      if (Math.abs(diff) < 50) return;

      let newIndex = activeIndex;

      if (diff > 0) {
        newIndex = Math.min(activeIndex + 1, slides.length - 1);
      } else {
        newIndex = Math.max(activeIndex - 1, 0);
      }

      el.scrollTo({
        left: newIndex * window.innerWidth,
        behavior: "smooth",
      });

      setActiveIndex(newIndex);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("scroll", handleScroll);

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("scroll", handleScroll);

      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, slides.length]);

  return (
    <Wrapper>

      {hasEnteredRelief && <ScrollHint direction="right" />}

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
                    <OutlineTitle
                      style={{ transform: `translateX(${depthShift}px)` }}
                    >
                      {index === 0 ? "About Me" : slide.title}
                    </OutlineTitle>

                    <MainTitle
                      style={{ transform: `translateX(${frontShift}px)` }}
                    >
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

        {activeIndex === 0 && (
          <AboutStage>
            <PortraitSmall src={retrato} />

            <AboutContent>
              <AboutParagraph>
                I'm a passionate frontend developer with a background in arts.
              </AboutParagraph>

              <AboutParagraph>
                I enjoy creating interfaces that are visually appealing and intuitive.
              </AboutParagraph>

              <AboutParagraph>
                If you're looking for creativity + execution, let's connect.
              </AboutParagraph>
            </AboutContent>
          </AboutStage>
        )}

        {activeIndex === 1 && <TechEcosystem />}

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
  min-height: 50%;
  height: auto;
  display: flex;
  align-items: center;
  padding: 4vh 6vw;
`;

const HorizontalTrack = styled.div`
  display: flex;
  height: 100%;
  overflow-x: auto;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
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


  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
    margin-top: 60px;
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;
  font-size: 33px;
  color: black;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const AboutParagraph = styled.p`
  font-size: 33px;
  margin-bottom: 16px;
  max-width: 100%;

  opacity: 1;
  transform: none;
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



