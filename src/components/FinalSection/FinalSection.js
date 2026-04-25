import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import fondoblanco from "../proyectos/images/fondoblanco.png";

// Styled Components
const FinalSectionContainer = styled.section`
  height: 40vh;
  background-image: url(${fondoblanco});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
`;

const MainText = styled(motion.h2)`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 300;
  color: #1d1d1d;
  margin-bottom: 24px;
  line-height: 1.2;
  font-family: "Canela", serif;
`;

const ContactLink = styled(motion.a)`
  display: inline-block;
  font-size: 18px;
  color: #666;
  text-decoration: none;
  padding: 12px 24px;
  border: 1px solid #ddd;
  border-radius: 30px;
  transition: all 0.3s ease;
  background: transparent;
  
  &:hover {
    background: #1d1d1d;
    color: #f5f3ef;
    border-color: #1d1d1d;
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const contentVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Main Component
function FinalSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <FinalSectionContainer ref={ref}>
      <ContentWrapper
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <MainText variants={contentVariants}>
          Let's build something together
        </MainText>
        
        <ContactLink 
          href="mailto:contact@example.com"
          variants={contentVariants}
        >
          Get in touch
        </ContactLink>
      </ContentWrapper>
    </FinalSectionContainer>
  );
}

export default FinalSection;
