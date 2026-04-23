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

  if (!project) return <div>{t.projects.notFound}</div>;

  const images =
    isMobile && project.imageMobile?.length > 0
      ? project.imageMobile
      : project.image;

  return (
    <Wrapper onMouseLeave={() => setHoveredSection(null)}>

      {/* DESKTOP IMAGE */}
      {!isMobile && (
        <FloatingImage
          isHovered={hoveredSection === 'image'}
          onMouseEnter={() => setHoveredSection('image')}
        >
          <img src={images[0]} alt="Project preview" />
        </FloatingImage>
      )}

      <SidePanel
        isHovered={hoveredSection === 'panel'}
        onMouseEnter={() => setHoveredSection('panel')}
      >

        <PanelHeader>
          <CloseText onClick={() => navigate(-1)}>Close</CloseText>
          <Visit href={project.url} target="_blank">
            Visit Site 
            Visit Site ↗
          </Visit>
        </PanelHeader>

        <PanelBody isHovered={hoveredSection === 'panel'}>

          <TagsRow>
            {project.tags.map((tag, i) => (
              <Tag key={i} isHovered={hoveredSection === 'panel'}>{tag}</Tag>
            ))}
          </TagsRow>

          <BigTitle isHovered={hoveredSection === 'panel'}>
            {content?.title || project.title}
          </BigTitle>

          {(content?.description || project.description || []).map((text, i) => (
            <Paragraph key={i} isHovered={hoveredSection === 'panel'}>{text}</Paragraph>
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
                <EditorialBlock key={i}>
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
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const FloatingImage = styled.div`
  position: relative;
  height: 100%;
  
  /*  */
  flex: ${({ isHovered }) => (isHovered ? "7" : "5")};

  transition: flex 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    
    /*  */
    object-fit: cover;
    object-position: center;

    transition: transform 0.6s ease;
  }

  ${({ isHovered }) =>
    isHovered &&
    `
    img {
      transform: scale(1.05); /*  */
    }
  `}

  @media (max-width: 768px) {
    height: 50vh;
    flex: none;
  }
`;

const SidePanel = styled.div`
  height: 100%;
  
  flex: ${({ isHovered }) => (isHovered ? "7" : "5")};

  background: #f6f3ef;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  transition: flex 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    flex: none;
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
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Visit = styled.a`
  text-decoration: none;
  border-bottom: 1px solid #000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

/* ================= BODY ================= */

const PanelBody = styled.div`
  padding: ${({ isHovered }) =>
    isHovered ? "clamp(24px, 3vw, 60px)" : "clamp(16px, 2vw, 32px)"};

  max-width: ${({ isHovered }) =>
    isHovered ? "720px" : "420px"};

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  transform: ${({ isHovered }) =>
    isHovered ? "scale(1)" : "scale(0.94)"};

  transform-origin: top center;

  opacity: ${({ isHovered }) => (isHovered ? 1 : 0.85)};

  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: ${({ isHovered }) => (isHovered ? "wrap" : "nowrap")};
  overflow-x: ${({ isHovered }) => (isHovered ? "visible" : "auto")};
  justify-content: flex-start;
  width: 100%;
  min-width: 400px;
  max-width: 100%;
  padding-right: 10px;
`;

const Tag = styled.span`
  font-size: ${({ isHovered }) =>
    isHovered ? "13px" : "11px"};

  padding: ${({ isHovered }) =>
    isHovered ? "8px 12px" : "6px 10px"};

  border-radius: 999px;
  background: #eae6df;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;

  transition: all 0.4s ease;
`;

const BigTitle = styled.h1`
  font-family: "Playfair Display", serif;

  font-size: ${({ isHovered }) =>
    isHovered
      ? "clamp(42px, 3.5vw, 56px)"
      : "clamp(32px, 2vw, 36px)"};

  line-height: 1.1;
  margin-bottom: 20px;

  transition: all 0.5s ease;
  text-align: left;
  max-width: ${({ isHovered }) => (isHovered ? "100%" : "80%")};
  width: ${({ isHovered }) => (isHovered ? "100%" : "auto")};
  text-transform: uppercase;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 56px;
    max-width: 100%;
    width: 100%;
  }
`;

const Paragraph = styled.p`
  font-size: ${({ isHovered }) =>
    isHovered ? "18px" : "14px"};

  line-height: 1.6;
  margin-bottom: 12px;

  color: #333;

  max-width: ${({ isHovered }) =>
    isHovered ? "100%" : "45ch"};

  width: ${({ isHovered }) => (isHovered ? "100%" : "auto")};

  transition: all 0.5s ease;
  text-align: left;
  text-transform: uppercase;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 16px;
    max-width: 100%;
    width: 100%;
  }
`;

/* ================= TOGGLE ================= */

const Toggle = styled.div`
  display: inline-flex;
  background: #1a1a1a;
  border-radius: 50px;
  padding: 3px;
  width: 240px;
  margin-top: 20px;
  margin-right: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    margin-right: 50%;
  }
`;

const Pill = styled.button`
  border: none;
  padding: 10px 18px;
  border-radius: 50px;
  flex: 1;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  background: ${({ active }) =>
    active ? "#ffffff" : "transparent"};

  color: ${({ active }) =>
    active ? "#1a1a1a" : "#ffffff"};

  &:hover {
    background: #ffffff;
    color: #1a1a1a;
    transform: translateY(-1px);
  }
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
  font-size: clamp(36px, 5vw, 52px);
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
  font-size: 18px;
  color: #666;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const EditorialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1400px;
  margin-left: 120px;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const EditorialBlock = styled.div`
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    img {
      height: 300px;
    }
  }
`;

const EditorialImage = styled.img`
  display: block;
`;