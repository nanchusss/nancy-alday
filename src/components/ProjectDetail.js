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
  const content = t?.projectsData?.[project?.id];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mode, setMode] = useState("ficha"); // 👈 toggle

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!project) return <div>Not found</div>;

  const images =
    isMobile && project.imageMobile?.length > 0
      ? project.imageMobile
      : project.image;

  return (
    <Wrapper>

      {/* DESKTOP IMAGE */}
      {!isMobile && (
        <FloatingImage>
          <img src={images[0]} alt="" />
        </FloatingImage>
      )}

      <SidePanel>

        <PanelHeader>
          <CloseText onClick={() => navigate(-1)}>Close</CloseText>
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

          {/* TOGGLE */}
          {project.videoMobile && (
            <Toggle>
              <Pill
                active={mode === "ficha"}
                onClick={() => setMode("ficha")}
              >
                Gallery
              </Pill>
              <Pill
                active={mode === "video"}
                onClick={() => setMode("video")}
              >
                Video
              </Pill>
            </Toggle>
          )}

        </PanelBody>

        {/* CONTENT SWITCH */}
        {mode === "video" && project.videoMobile ? (
          <MobileVideo>
            <video autoPlay muted loop playsInline preload="auto">
              <source
                src={project.videoMobile.src}
                type={project.videoMobile.type}
              />
            </video>
          </MobileVideo>
        ) : (
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
        )}

      </SidePanel>
    </Wrapper>
  );
}

/* ================= LAYOUT ================= */

const Wrapper = styled.div`
  height: 100vh;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
`;

const Visit = styled.a`
  text-decoration: none;
  border-bottom: 1px solid #000;
`;

/* ================= BODY ================= */

const PanelBody = styled.div`
  padding: 30px 24px;
`;

const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eae6df;
`;

const BigTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: clamp(32px, 7vw, 72px);
  line-height: 1.05;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 56px;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #555;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 16px;
  }
`;

/* ================= TOGGLE ================= */

const Toggle = styled.div`
  display: inline-flex;
  background: #2b1a12;
  border-radius: 999px;
  padding: 4px;
  margin-top: 20px;
  margin-right: 50%;
  
  @media (max-width: 768px) {
    margin-right: 50%;
  }
`;

const Pill = styled.button`
  border: none;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;

  background: ${({ active }) =>
    active ? "#f6f3ef" : "transparent"};

  color: ${({ active }) =>
    active ? "#000" : "#fff"};

  transition: 0.3s;
`;

/* ================= VIDEO ================= */

const MobileVideo = styled.div`
  padding: 20px;

  video {
    width: 100%;
    border-radius: 6px;
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
      height: auto;
    }
  }
`;