import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProjectsSection from "../proyectos/Proyectos";
import fondoverde from "../proyectos/images/fondoverde.png";
import pajaro from "../proyectos/images/pajaro.png";

// Styled Components
const ProjectsRevealContainer = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const DoorLeft = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background-image: url(${fondoverde});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 10;
  cursor: pointer;
`;

const DoorRight = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background-image: url(${fondoverde});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 10;
  cursor: pointer;
`;

const Bird = styled(motion.img)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  z-index: 15;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 350px;
  }

  @media (max-width: 480px) {
    width: 250px;
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s ease;
`;

// Animation Variants
const leftDoorVariants = {
  closed: { x: 0 },
  open: { x: "-100%" }
};

const rightDoorVariants = {
  closed: { x: 0 },
  open: { x: "100%" }
};

const birdVariants = {
  closed: { 
    x: "-50%", 
    y: "-50%",
    rotate: 0,
    scale: 1
  },
  open: { 
    x: "150%", 
    y: "-50%",
    rotate: 15,
    scale: 0.8
  }
};

// Main Component
function ProjectsReveal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleReveal = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <ProjectsRevealContainer>
      {/* Content Container - ProjectsSection estático sin animaciones */}
      <ContentContainer style={{ opacity: isOpen ? 1 : 0 }}>
        <ProjectsSection />
      </ContentContainer>

      {/* Left Door */}
      <DoorLeft
        variants={leftDoorVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ 
          duration: 1.0, 
          ease: [0.65, 0, 0.35, 1] 
        }}
        onClick={handleReveal}
      />

      {/* Right Door */}
      <DoorRight
        variants={rightDoorVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ 
          duration: 1.0, 
          ease: [0.65, 0, 0.35, 1] 
        }}
        onClick={handleReveal}
      />

      {/* Bird */}
      <Bird
        src={pajaro}
        variants={birdVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ 
          duration: 1.0, 
          ease: [0.65, 0, 0.35, 1] 
        }}
      />
    </ProjectsRevealContainer>
  );
}

export default ProjectsReveal;
