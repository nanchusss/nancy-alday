import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { projects } from "../data/projects";
import { useContext } from "react";
import { LanguageContext } from "../components/LanguageContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  

  const project = projects.find(p => p.id === id);
  const content = t?.projectsData?.[project.id];

  if (!project) return <div>Not found</div>;

  return (
    <Wrapper>

      

      <FloatingImage>
        <img src={project.image[0]} alt="" />
      </FloatingImage>

      <SidePanel>

        <PanelHeader>
          <span></span>
<CloseText onClick={() => navigate(-1)}>
        Close
      </CloseText>
          <Visit href={project.url} target="_blank">
            Visit Site ↗
          </Visit>
        </PanelHeader>

        <PanelBody>

         {project.tags.map((tag, i) => (
  <Tag key={i} index={i}>
    {tag}
  </Tag>
))}

          <BigTitle>{content?.title || project.title}</BigTitle>

          {(content?.description || project.description).map((text, i) => (
  <Paragraph key={i}>{text}</Paragraph>
))}

        </PanelBody>

        <ProjectGallery>
          {project.image.map((img, i) => (
            <GalleryBlock
              key={i}
              className={
                i === 0 ? "main" :
                i === 1 ? "vertical" :
                i === 2 ? "horizontal" :
                "small"
              }
            >
              <img src={img} alt="" />
            </GalleryBlock>
          ))}
        </ProjectGallery>

      </SidePanel>

    </Wrapper>
  );
}





/* ================= galeria  ================= */

const ProjectGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 80px;
  gap: 12px;
  padding: 40px 60px 60px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }
`;

const GalleryBlock = styled.div`
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &.main {
    grid-column: span 3;
    grid-row: span 4;
  }

  &.vertical {
    grid-column: span 2;
    grid-row: span 4;
  }

  &.horizontal {
    grid-column: span 4;
    grid-row: span 2;
  }

  &.small {
    grid-column: span 2;
    grid-row: span 2;
  }

  /* 🔥 MOBILE RESET TOTAL */
  @media (max-width: 768px) {
    width: 100%;
    height: auto;

    grid-column: unset !important;
    grid-row: unset !important;

    img {
      height: 220px;
      object-fit: cover;
    }
  }
`;




/* ================= STYLES ================= */


const SidePanel = styled.div`
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;

  background: ${({ theme }) => theme.card};

  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1001;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 0;
  }
`;

const PanelHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px 40px;

  border-bottom: 1px solid
    ${({ theme }) =>
      theme.background === "#0b0b0c"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.06)"};
`;

const CloseText = styled.span`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;
  font-size: 14px;
  letter-spacing: 1px;

  color: ${({ theme }) => theme.secondaryText};

  display: inline-flex;
  align-items: center;
  gap: 6px;

  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-50%) translateX(-3px);
  }

  &::before {
    content: "←";
    font-size: 14px;
    opacity: 0.6;
  }
`;
const Visit = styled.a`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);

  text-decoration: none;

  color: ${({ theme }) => theme.text};

  border-bottom: 1px solid
    ${({ theme }) =>
      theme.background === "#0b0b0c"
        ? "rgba(255,255,255,0.3)"
        : "rgba(0,0,0,0.4)"};

  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;
const PanelBody = styled.div`
  padding: 0 60px;
  flex: 1;

  color: ${({ theme }) => theme.text};

 @media (max-width: 768px) {
  padding: 20px;

  background: ${({ theme }) => theme.highlight || "#e6d9ff"};
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;

   /* Efecto de vidrio esmerilado */
  background: rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(6px);
}
`;

const Tag = styled.span`
  position: relative;
  display: inline-block;

  padding: 10px 16px;
  font-size: 13px;

  color: ${({ theme }) => theme.text};

  /* 👇 FORMA ORGÁNICA */
  border-radius: 40% 60% 55% 45% / 60% 40% 60% 40%;

  /* 👇 COLORES VARIADOS */
  background: ${({ index, theme }) =>
    [
      theme.highlight || "#e6d9ff",
      "#d9f5e6",
      "#fde2e4",
      "#e0f0ff",
      "#fef3c7"
    ][index % 5]
  };

  /* 👇 MOVIMIENTO SUAVE */
  animation: float 6s ease-in-out infinite;

  /* cada uno distinto */
  animation-delay: ${({ index }) => index * 0.5}s;

  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
`;

const BigTitle = styled.h1`
  font-size: clamp(32px, 6vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  margin-top: 30px;
  margin-bottom: 16px;

  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 52px;
    
    margin-top: 20px;
  }
`;

const Paragraph = styled.p`
  font-size: 25px;
  line-height: 1.6;
  margin-bottom: 16px;

  color: ${({ theme }) => theme.secondaryText};
`;



const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    height: auto;

    /* 👇 CLAVE */
    flex-direction: column-reverse;
  }
`;





const FloatingImage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  overflow: hidden;
  z-index: 1000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;

    padding: 0;

    img {
      width: 100%;
      height: auto;
      max-height: 60vh;
      object-fit: cover;
    }
  }
`;


