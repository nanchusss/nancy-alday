import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";
import retrato from "../IMAGES/retrato.jpg";
import TechEcosystem from "./TechGrid";


import taller1 from "../IMAGES/eltaller1.png";
import taller2 from "../IMAGES/eltaller2.png";
import taller3 from "../IMAGES/eltaller3.png";
import taller4 from "../IMAGES/eltaller4.png";
import proyecto2 from "../IMAGES/finestra-serveis.png";

import base1 from "../IMAGES/base1.png";
import base2 from "../IMAGES/base2.png";
import base3 from "../IMAGES/base3.png";
import base4 from "../IMAGES/base4.png";
import base5 from "../IMAGES/base5.png";
import base6 from "../IMAGES/base6.png";

export default function ReliefLanding() {
  const { t } = useContext(LanguageContext);

  const horizontalRef = useRef(null);
  const galleryRef = useRef(null);

  const [scrollX, setScrollX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [aboutProgress, setAboutProgress] = useState(0);

  const [revealed, setRevealed] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = t.landing.editorialSlides;

  const [view, setView] = useState("gallery");
// "intro" | "gallery" | "detail"

  const [showScrollHint, setShowScrollHint] = useState(true);

 const projects = [
  {
    title: "El Taller Aguaymanto",
    image: [ taller1, taller2, taller3, taller4],
    url: "https://eltaller-aguaymanto.com",
    description: [
      "Plataforma digital para un estudio artístico centrado en cerámica contemporánea.",
      "Diseñé una experiencia visual que mezcla narrativa editorial con navegación clara.",
      "Desarrollado en React priorizando rendimiento y estética."
    ], 
    tags: ["React", "UX/UI", "Design", "Styled Components", "Calendar"]
  },
  {
    title: "Finestra Serveis",
    image: [proyecto2],
    url: "https://finestraserveis.com",
    description: [
      "Web corporativa enfocada en conversión para servicios de aluminio y PVC.",
      "Optimicé la jerarquía visual para mejorar la comprensión del usuario.",
      "Implementación en React con foco en claridad y estructura."
    ], 
      tags: ["React", "UX/UI", "Design", "Styled Components"]
  },
  {
    title: "Base Mendoza",
    image: [base1, base2, base3, base4, base5, base6],
    url: "https://base-mendoza.com",
    description: [
      "Proyecto para empresa de logística y transporte.",
      "Exploración de interacción, tipografía y ritmo visual.",
      "Desarrollo frontend orientado a experiencia de usuario."
    ],
    tags: ["React", "UX/UI", "Design", "Styled Components"]
  }
];
const scrollData = useRef({
  accumulator: 0,
  locked: false
});

useEffect(() => {
  if (activeProject !== null) {
    setShowScrollHint(true);
  }
}, [activeProject]);

useEffect(() => {
  if (activeProject === null) return;

  let isThrottled = false;

  const handleWheel = (e) => {
    if (isThrottled) return;

   const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY)
  ? e.deltaX
  : e.deltaY;

    if (Math.abs(delta) < 20) return;

    isThrottled = true;

    if (delta > 0) {
      // siguiente proyecto
      setActiveProject((prev) =>
        Math.min(prev + 1, projects.length - 1)
      );
      setSelectedIndex((prev) =>
        Math.min(prev + 1, projects.length - 1)
      );
    } else {
      // anterior proyecto
      setActiveProject((prev) =>
        Math.max(prev - 1, 0)
      );
      setSelectedIndex((prev) =>
        Math.max(prev - 1, 0)
      );
    }

    setTimeout(() => {
      isThrottled = false;
    }, 500);
  };

  window.addEventListener("wheel", handleWheel, { passive: true });

  return () => {
    window.removeEventListener("wheel", handleWheel);
  };
}, [activeProject, projects.length]);


useEffect(() => {
  if (!showScrollHint) return;

  const handleScroll = () => {
    setShowScrollHint(false);
  };

  window.addEventListener("wheel", handleScroll);
  window.addEventListener("touchstart", handleScroll);

  return () => {
    window.removeEventListener("wheel", handleScroll);
    window.removeEventListener("touchstart", handleScroll);
  };
}, [showScrollHint]);


useEffect(() => {
  if (!revealed) return;

  const threshold = 100;

  const handleWheel = (e) => {
    e.preventDefault();

    const data = scrollData.current;

    if (data.locked) return;

    data.accumulator += e.deltaY;

    if (Math.abs(data.accumulator) > threshold) {
      data.locked = true;

      if (data.accumulator > 0) {
        setSelectedIndex((prev) =>
          Math.min(prev + 1, projects.length - 1)
        );
      } else {
        setSelectedIndex((prev) =>
          Math.max(prev - 1, 0)
        );
      }

      data.accumulator = 0;

      // 🔥 desbloqueo limpio
      setTimeout(() => {
        data.locked = false;
      }, 500);
    }
  };

  window.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    window.removeEventListener("wheel", handleWheel);
  };
}, [revealed, projects.length]);
  /* ================= SCROLL HORIZONTAL ================= */
  useEffect(() => {
    const el = horizontalRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (window.innerWidth > 768) {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.1;
        }
      }
    };

    

    const handleScroll = () => {
      setScrollX(el.scrollLeft);

      const panels = Array.from(el.children);
      let closestIndex = 0;
      let closestDistance = Infinity;

      panels.forEach((panel, i) => {
        const rect = panel.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(window.innerWidth / 2 - center);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= ABOUT ================= */
  useEffect(() => {
    if (activeIndex !== 0) return;

    const handleScroll = () => {
      const rect = document.getElementById("about")?.getBoundingClientRect();
      if (!rect) return;

      const progress = Math.min(1, Math.max(0, 1 - rect.top / window.innerHeight));
      setAboutProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  /* ================= GALLERY SCROLL ================= */
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const handleScroll = () => {
      const children = Array.from(el.children);

      let closest = 0;
      let min = Infinity;

      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(window.innerWidth / 2 - center);

        if (dist < min) {
          min = dist;
          closest = i;
        }
      });

      setSelectedIndex(closest);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>

      {/* TOP */}
      <TopSection>
        <HorizontalTrack ref={horizontalRef}>
          {slides.map((slide, index) => {
            const depthShift = scrollX * 0.03;
            const frontShift = scrollX * 0.015;

            return (
              <Panel key={index}>
                <PanelContent>
                  <TitleWrapper>
                    <OutlineTitle style={{ transform: `translateX(${depthShift}px)` }}>
                      {index === 0 ? "About Me" : slide.title}
                    </OutlineTitle>

                    <MainTitle style={{ transform: `translateX(${frontShift}px)` }}>
                      {index === 0 ? "About Me" : slide.title}
                    </MainTitle>
                  </TitleWrapper>
                </PanelContent>
              </Panel>
            );
          })}
        </HorizontalTrack>
      </TopSection>

      {/* BOTTOM */}
      <BottomSection>

        {/* ABOUT */}
       {activeIndex === 0 && (
  <AboutStage id="about">

    <PortraitSmall src={retrato} />

    <AboutContent>
      <AboutParagraph delay={0}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
        nunc sit amet varius luctus, nunc erat volutpat nunc, eget facilisis 
        nunc nisl eget nunc.
      </AboutParagraph>

      <AboutParagraph delay={0.2}>
        Vivamus luctus, elit sit amet tristique sollicitudin, velit libero 
        cursus justo, sed feugiat lorem ipsum nec sapien. Integer vitae 
        fermentum lorem.
      </AboutParagraph>

      <AboutParagraph delay={0.4}>
        Curabitur sit amet magna quis elit consequat varius. Proin ut augue 
        nec nisl volutpat tincidunt sed eget purus.
      </AboutParagraph>
    </AboutContent>

  </AboutStage>
)}

        {/* TECH */}
        {activeIndex === 1 && <TechEcosystem />}

        {/* PROJECTS */}
        {activeIndex === 2 && (
          <ProjectStage>

            {!revealed && (
              <Discover onClick={() => setRevealed(true)}>
                <Dot />
                <span>Click to Discover</span>
              </Discover>
            )}

            {revealed && (
             <GalleryOverlay onClick={() => setActiveProject(null)}>
           

              {activeProject !== null && showScrollHint && (
  <ScrollHint>
    Scroll to continue →
  </ScrollHint>
)}

                {/* BLUR */}
                <BlurBackground />

                {/* GALLERY */}


                
               <StackGallery>
  {projects.map((project, i) => {
    const isActive = selectedIndex === i;

    return (

      
 <StackItem
  key={i}
  className={isActive ? "active" : ""}
  style={{
    transform: `
     translateX(${(i - selectedIndex) * (window.innerWidth < 768 ? 70 : 140)}px)
     scale(${i === selectedIndex ? 1 : (window.innerWidth < 768 ? 0.96 : 0.75)})
    `,
    zIndex: i === selectedIndex ? 10 : 5,
    opacity: i === selectedIndex ? 1 : 0.4,
    filter: i === selectedIndex ? "none" : "blur(2px)",
    position: "relative"
  }}
  onClick={(e) => {
    e.stopPropagation();

    // 🔥 SI YA ESTÁS EN DETAIL → CIERRA
    if (activeProject !== null && i === selectedIndex) {
      setActiveProject(null);
      setSelectedIndex(0);
      setRevealed(false);
      return;
    }

    // 🔥 SI NO → ABRE
    setSelectedIndex(i);
    setActiveProject(i);
    setView("detail");
  }}
>
  <StackItemContainer>

    {/* BOTÓN */}
    {activeProject !== null && i === selectedIndex && (
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          setActiveProject(null);
          setSelectedIndex(0);
          setRevealed(false);
        }}
      >
        ×
      </CloseButton>
    )}

    <img src={project.image[0]} alt="miniatura de proyecto" />

  </StackItemContainer>
</StackItem>
    );
  })}
</StackGallery>

                {/* SELECTED IMAGE MOVE */}
                {activeProject !== null && (

                  
                <FloatingImage onClick={() => setActiveProject(null)}>
  <img
    src={projects[activeProject].image[0]}
    alt=""
    onClick={(e) => e.stopPropagation()}
  />
</FloatingImage>
                )}

                {/* PANEL */}
             {activeProject !== null && (
  <SidePanel>

    <PanelHeader>
      <CloseText onClick={() => setActiveProject(null)}>
        Close
      </CloseText>

     <Visit href={projects[activeProject].url} target="_blank">
  Visit Site ↗
</Visit>
    </PanelHeader>

    <PanelBody>

     <Tags>
  {projects[activeProject].tags.map((tag, i) => (
    <Tag key={i}>{tag}</Tag>
  ))}
</Tags>

  <BigTitle>
  {projects[activeProject].title}
</BigTitle>

{projects[activeProject].description.map((text, i) => (
  <Paragraph key={i}>{text}</Paragraph>
))}

    </PanelBody>

 <ProjectGallery>
  {projects[activeProject].image.map((img, i) => (
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
  
)}



              </GalleryOverlay>
            )}

          </ProjectStage>
        )}

      </BottomSection>

    </Wrapper>
  );
}



const StackItemContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -14px;
  right: -14px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  z-index: 30;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
`;

const ScrollHint = styled.div`
  position: fixed;
  top: 55%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 10001;

  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 10px;
  letter-spacing: 1.4px;

  color: rgba(0,0,0,0.5);

  pointer-events: none;

  animation: floatX 2.2s ease-in-out infinite;

  @keyframes floatX {
    0% { transform: translateY(-50%) translateX(0px); }
    50% { transform: translateY(-50%) translateX(-8px); }
    100% { transform: translateY(-50%) translateX(0px); }
  }

  span {
    font-size: 14px;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    top: auto;
    bottom: 20px;
    right: 50%;
    transform: translateX(50%);
  }
`;
/* ================= galeria  ================= */

const ProjectGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 80px;
  gap: 12px;
  padding: 40px 60px 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 20px;
    grid-auto-rows: 120px;
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column: span 2 !important;
  }
`;

const StackGallery = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    height: 300px;
  }
`;


const StackItem = styled.div`
  position: absolute;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  cursor: pointer;

  img {
    width: 300px;
    height: 420px;
    object-fit: cover;
    border-radius: 4px;
  }

  &.active img {
    width: 380px;
    height: 520px;
  }
@media (max-width: 768px) {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
 
`;


/* ================= STYLES ================= */


const SidePanel = styled.div`
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  background: #f7f7f5;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50vh; /* 🔥 panel tipo app */
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 40px;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CloseText = styled.span`
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 1px;

  color: rgba(0,0,0,0.7);

  position: relative;

  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateX(-3px);
  }

  &::before {
    content: "←";
    margin-right: 6px;
    font-size: 14px;
    opacity: 0.6;
  }
`;

const Visit = styled.a`
  text-decoration: none;
  border-bottom: 1px solid black;
`;

const PanelBody = styled.div`
  padding: 0 60px;
  flex: 1;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 4px 8px;
  background: #e6d9ff;
  border-radius: 4px;
`;

const BigTitle = styled.h1`
  font-size: clamp(42px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
`;


const AboutStage = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutContent = styled.div`
  max-width: 500px;
`;

const AboutParagraph = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
  animation-delay: ${({ delay }) => delay}s;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  height: 50%;
`;

const BottomSection = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  padding: 4vh 6vw;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }
`;

const HorizontalTrack = styled.div`
  display: flex;
  height: 100%;
  overflow-x: auto;
`;

const Panel = styled.div`
  flex: 0 0 100vw;
  display: flex;
  align-items: center;
  padding: 0 8vw;
`;

const PanelContent = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  position: relative;
`;

const OutlineTitle = styled.h1`
  position: absolute;
  font-size: clamp(60px, 10vw, 140px);
  color: transparent;
  -webkit-text-stroke: 1px black;
  opacity: 0.2;
`;

const MainTitle = styled.h1`
  font-size: clamp(60px, 10vw, 140px);
`;

/* PROJECTS */

const ProjectStage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const GalleryOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999; /* MÁS ALTO que header */
`;

const BlurBackground = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.4);
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
    position: fixed; /* 🔥 antes relative → MAL */
    inset: 0;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;

    img {
      width: 100%;
      height: auto;
      max-height: 70vh;
      object-fit: contain;
    }
  }
`;


/* ABOUT */



const PortraitSmall = styled.img`
  width: 200px;
`;

const Discover = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: black;
  border-radius: 50%;
`;