import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import { LanguageContext } from "../components/LanguageContext";
import artwork from "../IMAGES/Extimidad.jpg";

export default function ReliefLanding({ onContactClick }) {
  const { t, language } = useContext(LanguageContext);

  const [hoverActive, setHoverActive] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const aboutRef = useRef(null);

  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = now
    .toLocaleString(language === "es" ? "es-ES" : "en-US", {
      month: "short"
    })
    .toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;

      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      const aboutTop = aboutRef.current.offsetTop;
      const aboutHeight = aboutRef.current.offsetHeight;
      const aboutBottom = aboutTop + aboutHeight;

      let overlay = 0;
      let bgOpacity = 1;

      if (scrollY < aboutTop) {
        const progress = scrollY / viewport;
        overlay = Math.min(progress * 0.9, 0.9);
        bgOpacity = 1;
      } else if (scrollY >= aboutTop && scrollY <= aboutBottom) {
        const progress = (scrollY - aboutTop) / aboutHeight;
        overlay = 0.9 * (1 - progress);
        bgOpacity = 1 - progress * 0.8;
      } else {
        overlay = 0;
        bgOpacity = 0.15;
      }

      const nearEnd = scrollY + viewport > pageHeight * 0.85;
      if (nearEnd) {
        const progress =
          (scrollY + viewport - pageHeight * 0.85) /
          (pageHeight * 0.15);
        bgOpacity = 0.15 + progress * 0.85;
      }

      setOverlayOpacity(overlay);
      setBackgroundOpacity(bgOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 🔥 Ahora el Header puede abrir el modal */}
      <Header onContactClick={onContactClick} />

      <PageWrapper>
        <Background style={{ opacity: backgroundOpacity }} />

        <Overlay opacity={hoverActive ? 0.55 : overlayOpacity} />

        <Hero>
          <Availability
            onMouseEnter={() => setHoverActive(true)}
            onMouseLeave={() => setHoverActive(false)}
          >
            <Month>{month}</Month>
            <Day>{day}</Day>
            <Status>{t.landing.availability}</Status>
          </Availability>

          <Title>
            {t.landing.heroTitleTop} <br />
            {t.landing.heroTitleBottom}
          </Title>

          <Developer>{t.landing.developer}</Developer>

          <Subtitle>
            {t.landing.subtitleLine1} <br />
            {t.landing.subtitleLine2}
          </Subtitle>
        </Hero>

        <AboutSection ref={aboutRef}>
          <AboutInner>
            <AboutText>
              <h2>{t.landing.aboutTitle}</h2>
              <p>{t.landing.aboutText}</p>
            </AboutText>
          </AboutInner>
        </AboutSection>
      </PageWrapper>
    </>
  );
}


/* ================= STYLES ================= */

const PageWrapper = styled.div`
  height: 200vh;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-image: url(${artwork});
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: opacity 0.6s ease;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, ${props => props.opacity});
  transition: background 0.3s ease;
  z-index: 1;
  pointer-events: none;
`;

/* HERO */

const Hero = styled.section`
  position: relative;
  height: 100vh;
  z-index: 2;
  padding-left: 4%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 4%;

  @media (max-width: 768px) {
    min-height: 100svh;
    height: auto;
    padding: 140px 20px 80px;
  }
`;

const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: clamp(110px, 15vw, 150px);
  line-height: 0.78;
 
  margin: 0;
  color: #F5F2EE;

  @media (max-width: 768px) {
    font-size: 112px;
     letter-spacing: -14px;
    line-height: 0.9;
  }
`;

const Developer = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: clamp(120px, 17vw, 150px);
  line-height: 0.78;
  margin: 0;
  color: #F5F2EE;

  @media (max-width: 768px) {
    font-size: 102px;
     letter-spacing: -14px;
    line-height: 0.9;
  }
`;

const Subtitle = styled.p`
  margin-top: 30px;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #BFB8B0;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
    margin-top: 24px;
    max-width: 100%;
  }
`;

const Availability = styled.div`
  position: absolute;
  top: 18%;
  right: 6%;
  font-family: "Inter", sans-serif;
  text-align: right;
  cursor: pointer;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    text-align: left;
    margin-bottom: 40px;
  }
`;

const Month = styled.div`
  font-size: 44px;
  font-weight: 700;
  color: #F5F2EE;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Day = styled.div`
  font-size: 44px;
  font-weight: 700;
  color: #F5F2EE;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Status = styled.div`
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 8px;
  color: #BFB8B0;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

/* ABOUT */

const AboutSection = styled.section`
  height: 100vh;
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
    padding: 120px 20px;
  }
`;

const AboutInner = styled.div`
  max-width: 900px;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const AboutText = styled.div`
  color: #F5F2EE;

  h2 {
    font-family: "Inter", sans-serif;
    font-weight: 800;
    letter-spacing: -6px;
    font-size: 78px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 62px;
      letter-spacing: -2px;
    }
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 29px;
    line-height: 1.7;

    @media (max-width: 768px) {
      font-size: 24px;
      line-height: 1.6;
    }
  }
`;