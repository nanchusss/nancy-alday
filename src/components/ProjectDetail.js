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

  // Scroll to top on mobile when component mounts
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

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
        {mode === "video" && (project.videoDesktop || project.videoMobile) ? (
          <MobileVideo onClick={() => !isMobile && setIsVideoModalOpen(true)}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              onClick={(e) => e.stopPropagation()}
            >
              <source
                src={isMobile ? project.videoMobile?.src : project.videoDesktop?.src}
                type={isMobile ? project.videoMobile?.type : project.videoDesktop?.type}
              />
              Tu navegador no soporta el video.
            </video>
            {!isMobile && (
              <VideoOverlay>
                <PlayIcon></PlayIcon>
                <ClickText>Click para ver con controles</ClickText>
              </VideoOverlay>
            )}
          </MobileVideo>
        ) : (
          <EditorialGallery>
            <GalleryHeader>
              <GalleryTitle>Project Gallery</GalleryTitle>
              <GallerySubtitle>Discover the design process</GallerySubtitle>
            </GalleryHeader>
            
            <EditorialGrid>
              {images.map((img, i) => (
                <React.Fragment key={i}>
                  <EditorialBlock>
                    <EditorialImage src={img} alt={`Gallery image ${i + 1}`} />
                  </EditorialBlock>
                  {content?.features && content.features[i] && (
                    <FeatureBlock>
                      <FeatureTitle>{content.features[i].title}</FeatureTitle>
                      <FeatureDescription>{content.features[i].description}</FeatureDescription>
                    </FeatureBlock>
                  )}
                </React.Fragment>
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
              autoPlay={false}
              preload="metadata"
              playsInline
            >
              <source
                src={isMobile ? project.videoMobile?.src : project.videoDesktop?.src}
                type={isMobile ? project.videoMobile?.type : project.videoDesktop?.type}
              />
              Tu navegador no soporta el video.
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

  @media (max-width: 768px) {
    display: block;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const Visit = styled.a`
  text-decoration: none;
  border-bottom: 1px solid #000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
    border-bottom: none;
    padding: 8px 16px;
    background: #000;
    color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
  }
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

  @media (max-width: 768px) {
    padding: clamp(16px, 2vw, 32px);
    max-width: 420px;
    transform: scale(1);
    opacity: 1;
    transition: none;
  }
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

  @media (max-width: 768px) {
    flex-wrap: wrap;
    overflow-x: visible;
    min-width: auto;
    padding-right: 0;
    justify-content: center;
    gap: 6px;
  }
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

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 6px 10px;
    transition: none;
  }
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
    font-size: clamp(40px, 8vw, 52px);
    max-width: 100%;
    width: 100%;
    line-height: 1.1;
    transition: none;
  }

  @media (max-width: 480px) {
    font-size: clamp(36px, 9vw, 48px);
    line-height: 1.0;
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
    font-size: clamp(15px, 3.5vw, 17px);
    max-width: 100%;
    width: 100%;
    line-height: 1.5;
    transition: none;
  }

  @media (max-width: 480px) {
    font-size: clamp(14px, 4vw, 16px);
    line-height: 1.4;
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
    display: flex;
    justify-content: center;
    margin: 30px auto;
    width: 200px;
  }

  @media (max-width: 480px) {
    margin: 25px auto;
    width: 180px;
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
    max-width: 600px;
    height: auto;
    aspect-ratio: 16/9;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    object-fit: cover;
    display: block;
    margin: 0 auto;
    transition: transform 0.3s ease;
  }

  &:hover video {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 16px;
    
    video {
      max-width: 100%;
      aspect-ratio: 9/19.5;
      border-radius: 8px;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;
    
    video {
      max-width: 100%;
      aspect-ratio: 9/19.5;
      border-radius: 6px;
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
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const VideoModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  width: 100%;
  max-height: 90vh;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 80vh;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    max-width: 98vw;
    max-height: 70vh;
    border-radius: 8px;
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
  max-height: 80vh;
  display: block;
  object-fit: contain;
  background: #000;

  @media (max-width: 768px) {
    max-height: 70vh;
  }

  @media (max-width: 480px) {
    max-height: 60vh;
  }
`;

/* ================= EDITORIAL GALLERY ================= */

const EditorialGallery = styled.div`
  padding: 60px 40px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  @media (max-width: 480px) {
    padding: 20px 12px;
  }
`;

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const GalleryTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: clamp(42px, 3.5vw, 56px);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  transition: all 0.5s ease;
  text-align: center;
  text-transform: uppercase;
  color: #000;

  @media (max-width: 768px) {
    font-size: clamp(36px, 7vw, 48px);
    line-height: 1.1;
    transition: none;
  }

  @media (max-width: 480px) {
    font-size: clamp(32px, 8vw, 42px);
    line-height: 1.0;
  }
`;

const GallerySubtitle = styled.p`
  font-size: 18px;
  color: #666;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: clamp(16px, 3.5vw, 18px);
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: clamp(14px, 4vw, 16px);
    margin-bottom: 25px;
  }
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
    gap: 20px;
    margin-left: 16px;
    margin-right: 16px;
  }

  @media (max-width: 480px) {
    gap: 16px;
    margin-left: 12px;
    margin-right: 12px;
  }
`;

const EditorialBlock = styled.div`
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  @media (max-width: 768px) {
    img {
      height: auto;
      object-fit: cover;
    }
  }
`;

const EditorialImage = styled.img`
  display: block;
`;

const FeatureBlock = styled.div`
  padding: 60px 40px;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 25px 16px;
  }
`;

const FeatureTitle = styled.h3`
  font-family: "Space Grotesk", "Helvetica Neue", sans-serif;
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1.2;
  color: #000;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: clamp(18px, 4.5vw, 26px);
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: clamp(16px, 5vw, 22px);
    margin-bottom: 8px;
  }
`;

const FeatureDescription = styled.p`
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.6;
  color: #666;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: clamp(14px, 3vw, 16px);
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: clamp(13px, 3.5vw, 15px);
  }
`;