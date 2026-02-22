import React, { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

import finestracat from "../IMAGES/finestracat.png";
import aguaymanto from "../IMAGES/eltaller-aguaymanto.png";
import base from "../IMAGES/base-mendoza.png";

export default function ProjectsShowcase() {
  const { t } = useContext(LanguageContext);

  const images = [finestracat, aguaymanto, base];

  console.log("T PROJECTS:", t);

  return (
    <Section>
      {t.projects.items.map((project, index) => (
        <ProjectRow key={index} reverse={index % 2 !== 0}>
          <ImageWrapper>
            <img src={images[index]} alt={project.title} />
          </ImageWrapper>

          <Content>
            <ProjectTitle>{project.title}</ProjectTitle>
            <Description>{project.description}</Description>
            <Stack>{project.stack}</Stack>
            <ProjectLink
              href={
                index === 0
                  ? "https://www.finestracat.com"
                  : index === 1
                  ? "https://www.aguaymanto-taller.com"
                  : "https://www.base-mendoza.com"
              }
              target="_blank"
              rel="noreferrer"
            >
              {t.projects.viewProject}
            </ProjectLink>
          </Content>
        </ProjectRow>
      ))}
    </Section>
  );
}

/* ================= STYLES ================= */

const Section = styled.section`
  background: #f3efe7;
  padding: 180px 0;
`;

const ProjectRow = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto 180px auto;
  display: flex;
  align-items: center;
  gap: 120px;
  flex-direction: ${props => (props.reverse ? "row-reverse" : "row")};

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 60px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;

  img {
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }
`;

const Content = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-family: "Cormorant Garamond", serif;
  font-size: 42px;
  font-weight: 400;
  margin-bottom: 25px;
  color: #2f2c27;
`;

const Description = styled.p`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 25px;
  color: #4a4741;
`;

const Stack = styled.p`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  opacity: 0.7;
  margin-bottom: 40px;
`;

const ProjectLink = styled.a`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  text-decoration: none;
  color: #3a3732;
  border-bottom: 1px solid #3a3732;
  padding-bottom: 4px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
`;