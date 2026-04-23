import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { projects } from "../data/projects";
import { LanguageContext } from "../components/LanguageContext";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  const project = projects.find(p => p.id === id);  
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!project) return <div>Not found</div>;

  const content = t?.projectsData?.[project.id];



  const images =
    isMobile && project.imageMobile && project.imageMobile.length > 0
      ? project.imageMobile
      : project.image;

  return (
    <Wrapper>

      <FloatingImage>
        <img src={images[0]} alt="" />
      </FloatingImage>

      <SidePanel>

        <PanelHeader>
          <CloseText onClick={() => navigate(-1)}>
            Close
          </CloseText>

          <Visit href={project.url} target="_blank">
            Visit Site ↗
          </Visit>
        </PanelHeader>

        <PanelBody>

          <TagsRow>
            {project.tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </TagsRow>

          <BigTitle>
            {content?.title || project.title}
          </BigTitle>

          {(content?.description || project.description).map((text, i) => (
            <Paragraph key={i}>{text}</Paragraph>
          ))}

        </PanelBody>

        <ProjectGallery>
          {images.map((img, i) => (
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

/* ================= LAYOUT ================= */

const Wrapper = styled.div`
  height: 100vh;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    height: auto;
  }
`;

const FloatingImage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;

    img {
      height: 60vh;
    }
  }
`;

const SidePanel = styled.div`
  margin-left: 50%;
  width: 50%;
  height: 100%;
  background: #f6f3ef;

  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

/* ================= HEADER ================= */

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-size: 12px;
`;

const CloseText = styled.span`
  cursor: pointer;
  letter-spacing: 0.5px;
`;

const Visit = styled.a`
  text-decoration: none;
  border-bottom: 1px solid #000;
  padding-bottom: 2px;
`;

/* ================= BODY ================= */

const PanelBody = styled.div`
  padding: 30px 24px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Tag = styled.span`
  font-size: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eae6df;
  color: #3a3a3a;
  letter-spacing: 0.5px;
`;

const BigTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: clamp(72px, 7vw, 72px);
  font-weight: 400;
  line-height: 1.05;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: -0.02em;


  @media (max-width: 768px) {
    font-size: 68px;
    text-align: center;
    letter-spacing: -4px;
    margin-top: 60px;
    margin-bottom: 40px;
    text-transform: uppercase;
  }
`;

const Paragraph = styled.p`
  font-size: 34px;
  line-height: 1.6;
  margin-bottom: 12px;
  max-width: auto;
  color: #555;
  text-transform: uppercase;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
    max-width: 100%;
    
  }
`;

/* ================= GALLERY ================= */

const ProjectGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 80px;
  gap: 12px;
  padding: 40px 24px 60px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const GalleryBlock = styled.div`
  overflow: hidden;


  

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  @media (max-width: 768px) {
  img {
    width: 100%;
    height: auto;
  }
}
  
`;