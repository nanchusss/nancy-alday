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
  const [hoveredSection, setHoveredSection] = useState(null); // 👈 hover state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
        <FloatingImage
          isHovered={hoveredSection === 'image'}
          onMouseEnter={() => setHoveredSection('image')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <img src={images[0]} alt="" />
        </FloatingImage>
      )}

      <SidePanel
        isHovered={hoveredSection === 'panel'}
        onMouseEnter={() => setHoveredSection('panel')}
        onMouseLeave={() => setHoveredSection(null)}
      >

        <PanelHeader>
          <CloseText onClick={() => navigate(-1)}>Close</CloseText>
          <Visit href={project.url} target="_blank">
            Visit Site ↗
          </Visit>
        </PanelHeader>

        <PanelBody isHovered={hoveredSection === 'image'}>

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
          <MobileVideo onClick={() => setIsVideoModalOpen(true)}>
            <video autoPlay muted loop playsInline preload="auto">
              <source
                src={project.videoMobile.src}
                type={project.videoMobile.type}
              />
            </video>
            <VideoOverlay>
              <PlayIcon>▶</PlayIcon>
              <ClickText>Click to play with controls</ClickText>
            </VideoOverlay>
          </MobileVideo>
        ) : (
          <EditorialGallery>
            <GalleryHeader>
              <GalleryTitle>Project Gallery</GalleryTitle>
              <GallerySubtitle>Discover the design process</GallerySubtitle>
            </GalleryHeader>
            
            <EditorialGrid>
              {images.map((img, i) => (
                <EditorialBlock
                  key={i}
                  className={
                    i === 0 ? "hero" :
                    i === 1 ? "large" :
                    i === 2 ? "wide" :
                    i === 3 ? "tall" :
                    i === 4 ? "medium" :
                    i === 5 ? "full" :
                    "small"
                  }
                >
                  <EditorialImage src={img} alt={`Gallery image ${i + 1}`} />
                </EditorialBlock>
              ))}
            </EditorialGrid>
          </EditorialGallery>
        )}

      </SidePanel>

      {/* VIDEO MODAL */}
      {isVideoModalOpen && (
        <VideoModal onClick={() => setIsVideoModalOpen(false)}>
          <VideoModalContent onClick={(e) => e.stopPropagation()}>
            <CloseModal onClick={() => setIsVideoModalOpen(false)}>×</CloseModal>
            <VideoPlayer
              controls
              autoPlay
              preload="auto"
            >
              <source
                src={project.videoMobile.src}
                type={project.videoMobile.type}
              />
            </VideoPlayer>
          </VideoModalContent>
        </VideoModal>
      )}
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
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${({ isHovered }) => (isHovered ? 10 : 1)};

  ${({ isHovered }) =>
    isHovered &&
    `
    width: 62.5%;
  `}

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
  transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: ${({ isHovered }) => (isHovered ? 11 : 2)};
  container-type: inline-size;

  ${({ isHovered }) =>
    isHovered &&
    `
    margin-left: 37.5%;
    width: 62.5%;
  `}

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
  max-width: 100%;
  width: 100%;
  transform: scale(${({ isHovered }) => (isHovered ? 1 : 0.6)});
  transform-origin: top center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: ${({ isHovered }) => (isHovered ? 'auto' : '166vh')};
  overflow: visible;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0.9)};
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
  font-size: clamp(24px, 15cqw, 56px);
  line-height: 1.05;
  margin-bottom: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: break-word;
  max-width: 100%;
  display: block;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 56px;
  }
  
  @supports not (font-size: clamp(1px, 1cqw, 1px)) {
    font-size: clamp(24px, 3.5rem, 56px);
    max-width: 100%;
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
  position: relative;
  cursor: pointer;

  video {
    width: 100%;
    max-width: 400px;
    height: auto;
    aspect-ratio: 9/19.5;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    object-fit: cover;
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    padding: 16px;
    
    video {
      max-width: 280px;
      aspect-ratio: 9/19.5;
    }
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  margin: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MobileVideo}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin: 16px;
  }
`;

const PlayIcon = styled.div`
  font-size: 48px;
  color: white;
  margin-bottom: 8px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
`;

const ClickText = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const VideoModalContent = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 320px;
  }
`;

const CloseModal = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

/* ================= EDITORIAL GALLERY ================= */

const EditorialGallery = styled.div`
  padding: 60px 40px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  
  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const GalleryTitle = styled.h2`
  font-family: "Space Grotesk", "Helvetica Neue", sans-serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 0.9;
  color: #000;
  margin-bottom: 12px;
  text-transform: uppercase;
  background: linear-gradient(45deg, #000 25%, #333 50%, #000 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const GallerySubtitle = styled.p`
  font-size: 16px;
  color: #666;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 120px;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const EditorialBlock = styled.div`
  overflow: hidden;
  position: relative;
  
  &.hero {
    grid-column: span 8;
    grid-row: span 3;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      height: 300px;
    }
  }
  
  &.large {
    grid-column: span 6;
    grid-row: span 2;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      height: 240px;
    }
  }
  
  &.wide {
    grid-column: span 7;
    grid-row: span 2;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      height: 200px;
    }
  }
  
  &.tall {
    grid-column: span 4;
    grid-row: span 3;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      height: 320px;
    }
  }
  
  &.medium {
    grid-column: span 5;
    grid-row: span 2;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      height: 220px;
    }
  }
  
  &.full {
    grid-column: span 10;
    grid-row: span 2;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      height: 180px;
    }
  }
  
  &.small {
    grid-column: span 3;
    grid-row: span 2;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      height: 200px;
    }
  }
`;

const EditorialImage = styled.img`
  display: block;
`;