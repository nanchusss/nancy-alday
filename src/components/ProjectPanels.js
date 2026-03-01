import React, { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

import finestracat from "../IMAGES/finestracat.png";
import aguaymanto from "../IMAGES/eltaller-aguaymanto.png";
import base from "../IMAGES/base-mendoza.png";
import finestra from "../IMAGES/finestra-serveis.png";

export default function ProjectsShowcase() {
  const { t } = useContext(LanguageContext);

  const images = [finestracat, aguaymanto, base, finestra];
  const urls = [
    "https://www.finestracat.com",
    "https://www.eltaller-aguaymanto.com",
    "https://www.base-mendoza.com",
    "https://www.finestraserveis.com"
  ];

  return (
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

          {/* TEXT */}
          <ProjectText reverse={index % 2 !== 0}>
            <ProjectTitle
              href={urls[index]}
              target="_blank"
              rel="noreferrer"
            >
              {project.title}
            </ProjectTitle>

            <ProjectMeta>
              {project.stack}
            </ProjectMeta>

           
          </ProjectText>

          {/* IMAGE */}
          <ProjectImageWrapper>
            <ProjectImageLink
              href={urls[index]}
              target="_blank"
              rel="noreferrer"
            >
              <ProjectImage
                src={images[index]}
                alt={project.title}
              />
            </ProjectImageLink>
          </ProjectImageWrapper>

        </ProjectRow>
      ))}

    </Wrapper>
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
  font-family: "Inter", sans-serif;
  letter-spacing: 4px;
  text-transform: uppercase;
  opacity: 0.6;
`;

/* ===== PROJECT ROW ===== */

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

const ProjectTitle = styled.a`
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(110px, 9vw, 180px);
  line-height: 0.85;
  margin: 0;
  text-decoration: none;
  display: inline-block;
  position: relative;

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
`;

const ProjectImageLink = styled.a`
  display: block;
`;

const ProjectImage = styled.img`
  width: 100%;
  display: block;
  filter: grayscale(100%);
  transition: filter 0.6s ease;

  &:hover {
    filter: grayscale(0%);
  }
`;

