import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

import finestracat from "../IMAGES/finestracat.png";
import aguaymanto from "../IMAGES/eltaller-aguaymanto.png";
import base from "../IMAGES/base-mendoza.png";
import finestra from "../IMAGES/finestra-serveis.png";

export default function ProjectsShowcase() {
  const { t } = useContext(LanguageContext);
  const [progress, setProgress] = useState(0);

  const images = [finestracat, aguaymanto, base, finestra];
  const urls = [
    "https://www.finestracat.com",
    "https://www.eltaller-aguaymanto.com",
    "https://www.base-mendoza.com",
    "https://www.finestraserveis.com"
  ];

  useEffect(() => {
    const handleScroll = () => {
      const max = 500;
      const value = Math.min(window.scrollY / max, 1);
      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>
      <Intro>
        <Overline>Selected Work</Overline>

        <MainTitle progress={progress}>
          PRO
          <span>YECTOS</span>
        </MainTitle>

        <Underline progress={progress} />

        <IntroText>
          Experiencias digitales donde la arquitectura técnica
          se encuentra con el diseño y la conversión.
        </IntroText>
      </Intro>

      <SnapContainer>
        {t.projects.items.map((project, index) => (
          <ProjectSection
            key={index}
            project={project}
            image={images[index]}
            url={urls[index]}
            index={index}
          />
        ))}
      </SnapContainer>
    </Wrapper>
  );
}

/* ================= PROJECT SECTION ================= */

function ProjectSection({ project, image, url, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const enhancedDescription = project.description
    .replace(/React/gi, "<highlight>React</highlight>")
    .replace(/UI Design/gi, "<highlight>UI Design</highlight>")
    .replace(/Integration/gi, "<highlight>Integration</highlight>")
    .replace(/Landing/gi, "<highlight>Landing</highlight>");

  return (
    <Section ref={ref}>
      <Inner reverse={index % 2 !== 0}>
        <ImageWrapper visible={visible}>
          <Image src={image} alt={project.title} />
        </ImageWrapper>

        <Content visible={visible} reverse={index % 2 !== 0}>
          <Title visible={visible}>
            {project.title.split(" ")[0]}{" "}
            <span>
              {project.title.split(" ").slice(1).join(" ")}
            </span>
          </Title>

          <Description
            dangerouslySetInnerHTML={{
              __html: enhancedDescription.replace(
                /<highlight>(.*?)<\/highlight>/g,
                `<span class="highlight">$1</span>`
              )
            }}
          />

          <Stack>{project.stack}</Stack>

          <CTA href={url} target="_blank" rel="noreferrer">
            <span>Explorar proyecto</span>
          </CTA>
        </Content>
      </Inner>
    </Section>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  background: #f3efe7;
`;

const Intro = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Overline = styled.span`
  letter-spacing: 5px;
  font-size: 13px;
  opacity: 0.6;
  margin-bottom: 25px;
`;

const MainTitle = styled.h2`
  font-size: 140px;
  font-weight: 500;
  letter-spacing: 6px;
  margin-bottom: 20px;
  color: #2f2c27;
  cursor: pointer;

  span {
    display: inline-block;
    color: #2f2c27;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                background 0.6s ease,
                text-shadow 0.6s ease;
  }

  &:hover span {
    transform: translateY(-25px);

    background: linear-gradient(135deg, #b57edc, #e66aa8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    text-shadow: 0 0 18px rgba(200, 160, 220, 0.35);
  }
`;

const Underline = styled.div`
  width: ${({ progress }) => progress * 400}px;
  height: 3px;
  background: linear-gradient(90deg, #b57edc, #e66aa8);
  margin-bottom: 50px;
  transition: width 0.2s ease;
`;

const IntroText = styled.p`
  max-width: 650px;
  text-align: center;
  font-size: 20px;
  opacity: 0.7;
`;

const SnapContainer = styled.div`
  scroll-snap-type: y mandatory;
`;

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 90%;
  max-width: 1400px;
  display: flex;
  align-items: center;
  gap: 140px;
  flex-direction: ${({ reverse }) =>
    reverse ? "row-reverse" : "row"};

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 60px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 30px;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0)" : "translateY(100px)"};
  transition: all 1.3s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Image = styled.img`
  width: 100%;
  transition: transform 2s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const Content = styled.div`
  flex: 1;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible, reverse }) =>
    visible
      ? "translateX(0)"
      : reverse
      ? "translateX(-120px)"
      : "translateX(120px)"};
  transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Title = styled.h3`
  font-size: 78px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #2f2c27;

  span {
    position: relative;
  }

  span::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: ${({ visible }) => (visible ? "100%" : "0%")};
    height: 5px;
    background: linear-gradient(90deg, #b57edc, #e66aa8);
    transition: width 1.2s ease 0.4s;
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 35px;

  .highlight {
    background: linear-gradient(135deg, #b57edc, #e66aa8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
  }
`;

const Stack = styled.p`
  font-size: 15px;
  letter-spacing: 1px;
  opacity: 0.6;
  margin-bottom: 60px;
`;

const CTA = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 22px 80px;
  border-radius: 999px;

  font-family: "Sora", sans-serif;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;

  color: #2f2c27;
  border: 1px solid rgba(47, 44, 39, 0.6);
  background: transparent;

  overflow: hidden;
  isolation: isolate;
  z-index: 0;

  transition: 
    color 0.6s ease,
    transform 1s ease,
    border 0.6s ease,
    box-shadow 0.6s ease;

  /* Relleno radial */
  &::before {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
    top: 50%;
    left: 50%;
    border-radius: 50%;

    background: radial-gradient(
      circle,
      rgba(197, 163, 218, 0.55) 0%,
      rgba(217, 141, 183, 0.45) 60%,
      rgba(217, 141, 183, 0.25) 100%
    );

    transform: translate(-50%, -50%) scale(0);
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);

    z-index: -1;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }

  /* Efecto hover principal */
  &:hover {
    
    border: none;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    box-shadow: 0 20px 60px rgba(180, 120, 170, 0.25);
    transform: translateY(-4px);
  }
`;