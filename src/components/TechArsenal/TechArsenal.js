import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useSpring, animated } from '@react-spring/web';
import { LanguageContext } from '../LanguageContext';

// Import animal images directly
import bird from "./images/bird.png";
import elefante from "./images/elefante.png";
import gato from "./images/gato.png";
import jirafa from "./images/jirafa.png";
import leon from "./images/leon.png";
import serpiente from "./images/serpiente.png";
import cardBack from "./images/carta.png";
import element from "./images/element.png";
import element2 from "./images/element2.png";
import element3 from "./images/element3.png";
import fondobajo from "./images/fondobajo.png";

export default function TechArsenal() {
  const { t } = React.useContext(LanguageContext);
  const ref = useRef();
  
  const [gameStarted, setGameStarted] = useState(false);

  // Scroll-based animations for blobs
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const scrollProgress = useSpring({
    p: scrollYProgress,
    config: { tension: 120, friction: 30 },
  });

  // Home style blob shapes - same size, colors and behavior
  const backgroundShapes = [
    { color: '#667eea', size: 120, x: 20, y: 15 },
    { color: '#f093fb', size: 80, x: 70, y: 60 },
    { color: '#4facfe', size: 100, x: 40, y: 80 },
    { color: '#43e97b', size: 90, x: 85, y: 25 },
  ];

  // Scroll-reactive animations like in Home
  const shape1X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = backgroundShapes[0].x;
      const autonomousMovement = Math.sin(Date.now() * 0.001) * 5;
      const scrollMovement = Math.sin(p * Math.PI * 2) * 15;
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape1Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = backgroundShapes[0].y;
      const autonomousMovement = Math.cos(Date.now() * 0.0008) * 3;
      const scrollMovement = p * 400;
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape1Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.0012) * 0.05;
      const scrollScale = Math.sin(p * Math.PI * 4) * 0.2;
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape1Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.0001;
      const scrollRotation = p * 360;
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });

  // Shape 2 - scroll-reactive animations
  const shape2X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = backgroundShapes[1].x;
      const autonomousMovement = Math.sin(Date.now() * 0.001 + 1) * 4;
      const scrollMovement = Math.sin(p * Math.PI * 2 + 1) * 15;
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape2Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = backgroundShapes[1].y;
      const autonomousMovement = Math.cos(Date.now() * 0.0009 + 1) * 4;
      const scrollMovement = p * 350;
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape2Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.0011 + 1) * 0.06;
      const scrollScale = Math.sin(p * Math.PI * 4 + 1) * 0.2;
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape2Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.0001 + 1;
      const scrollRotation = p * 360 + 90;
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });

  // Shape 3 - scroll-reactive animations
  const shape3X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = backgroundShapes[2].x;
      const autonomousMovement = Math.sin(Date.now() * 0.001 + 2) * 4;
      const scrollMovement = Math.sin(p * Math.PI * 2 + 2) * 15;
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape3Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = backgroundShapes[2].y;
      const autonomousMovement = Math.cos(Date.now() * 0.0009 + 2) * 4;
      const scrollMovement = p * 350;
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape3Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.0011 + 2) * 0.06;
      const scrollScale = Math.sin(p * Math.PI * 4 + 2) * 0.2;
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape3Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.0001 + 2;
      const scrollRotation = p * 360 + 180;
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });

  // Shape 4 - scroll-reactive animations
  const shape4X = useSpring({
    x: scrollYProgress.to((p) => {
      const baseX = backgroundShapes[3].x;
      const autonomousMovement = Math.sin(Date.now() * 0.001 + 3) * 4;
      const scrollMovement = Math.sin(p * Math.PI * 2 + 3) * 15;
      return baseX + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape4Y = useSpring({
    y: scrollYProgress.to((p) => {
      const baseY = backgroundShapes[3].y;
      const autonomousMovement = Math.cos(Date.now() * 0.0009 + 3) * 4;
      const scrollMovement = p * 350;
      return baseY + autonomousMovement + scrollMovement;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape4Scale = useSpring({
    scale: scrollYProgress.to((p) => {
      const baseScale = 1 + Math.sin(Date.now() * 0.0011 + 3) * 0.06;
      const scrollScale = Math.sin(p * Math.PI * 4 + 3) * 0.2;
      return baseScale + scrollScale;
    }),
    config: { tension: 120, friction: 30 }
  });

  const shape4Rotate = useSpring({
    rotate: scrollYProgress.to((p) => {
      const baseRotation = Date.now() * 0.0001 + 3;
      const scrollRotation = p * 360 + 270;
      return baseRotation + scrollRotation;
    }),
    config: { tension: 120, friction: 30 }
  });
  
  const [gameState, setGameState] = useState("intro"); // "intro" | "playing" | "finished"
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [introPositions, setIntroPositions] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastMatchedPair, setLastMatchedPair] = useState(null);

  
  // Color palette for card backs
  const cardColors = [
    "#FFE5E5", // Soft pink
    "#E5F5FF", // Soft blue  
    "#F0FFE5", // Soft green
    "#FFF5E5", // Soft peach
    "#F5E5FF", // Soft lavender
    "#E5FFF5", // Soft mint
  ];

  // Generate random offsets for each card
  const generateRandomOffset = () => ({
    x: Math.random() * 400 - 200, // -200 to 200
    y: Math.random() * 400 - 200, // -200 to 200
    rotate: Math.random() * 50 - 25, // -25 to 25
    scale: 0.7 + Math.random() * 0.3, // 0.7 to 1.0
    zIndex: Math.floor(Math.random() * 10)
  });

  const [randomOffsets, setRandomOffsets] = useState([]);

  // Animation variants for cards
  const cardVariants = {
    intro: {
      initial: (index) => ({
        opacity: 0,
        scale: 0.8,
        rotate: randomOffsets[index]?.rotate || 0,
        x: randomOffsets[index]?.x || 0,
        y: randomOffsets[index]?.y || 0,
      }),
      animate: (index) => ({
        opacity: 1,
        scale: gameStarted ? 1 : 1,
        rotate: gameStarted ? 0 : (randomOffsets[index]?.rotate || 0),
        x: gameStarted ? 0 : (randomOffsets[index]?.x || 0),
        y: gameStarted ? 0 : (randomOffsets[index]?.y || 0),
        transition: {
          type: gameStarted ? "tween" : "tween",
          duration: gameStarted ? 5.0 : 0.8,
          delay: gameStarted ? index * 0.1 : index * 0.05,
          ease: gameStarted ? [0.25, 0.46, 0.45, 0.94] : "easeOut"
        }
      }),
      hover: {
        scale: 1.05,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      },
      tap: {
        scale: 0.95,
        transition: {
          duration: 0.1,
          ease: "easeInOut"
        }
      }
    },
    playing: {
      animate: (isFlipped) => ({
        rotateY: isFlipped ? 180 : 0,
        transition: {
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        }
      }),
      hover: {
        scale: 1.02,
        translateY: -4,
        transition: {
          duration: 0.25,
          ease: "easeOut"
        }
      },
      tap: {
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: "easeInOut"
        }
      },
      match: {
        scale: [1, 1.15, 1.08],
        boxShadow: [
          "0 0 0 rgba(255, 255, 255, 0)",
          "0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)",
          "0 0 20px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.15)"
        ],
        transition: {
          duration: 0.6,
          ease: "easeOut",
          times: [0, 0.5, 1]
        }
      }
    }
  };

  const techCards = [
    { id: 1, name: "React", techIcon: "https://img.icons8.com/color/96/react-native.png", image: bird, category: "frontend" },
    { id: 2, name: "TypeScript", techIcon: "https://img.icons8.com/color/96/typescript.png", image: bird, category: "frontend" },
    { id: 3, name: "Node.js", techIcon: "https://img.icons8.com/color/96/nodejs.png", image: elefante, category: "backend" },
    { id: 4, name: "JavaScript", techIcon: "https://img.icons8.com/color/96/javascript--v1.png", image: elefante, category: "backend" },
    { id: 5, name: "Python", techIcon: "https://img.icons8.com/color/96/python--v1.png", image: gato, category: "design" },
    { id: 6, name: "Django", techIcon: "https://img.icons8.com/color/96/django.png", image: gato, category: "design" },
    { id: 7, name: "HTML5", techIcon: "https://img.icons8.com/color/96/html-5--v1.png", image: jirafa, category: "frontend" },
    { id: 8, name: "CSS3", techIcon: "https://img.icons8.com/color/96/css3.png", image: jirafa, category: "frontend" },
    { id: 9, name: "Docker", techIcon: "https://img.icons8.com/color/96/docker.png", image: leon, category: "backend" },
    { id: 10, name: "Kubernetes", techIcon: "https://img.icons8.com/color/96/kubernetes.png", image: leon, category: "backend" },
    { id: 11, name: "Git", techIcon: "https://img.icons8.com/color/96/git.png", image: serpiente, category: "ai" },
    { id: 12, name: "GitHub", techIcon: "https://img.icons8.com/color/96/github--v1.png", image: serpiente, category: "ai" }
  ];

  useEffect(() => {
    const gameCards = techCards.map((tech, index) => ({
      ...tech,
      pairId: Math.floor(index / 2),
      cardId: index
    }));
    
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    
    // Generate random offsets for each card
    const offsets = shuffled.map(() => generateRandomOffset());
    setRandomOffsets(offsets);
    
    // Generate organic intro positions (full viewport)
    const positions = shuffled.map((_, index) => ({
      top: `${Math.random() * 60 + 10}%`, // 10% to 70% from top
      left: `${Math.random() * 60 + 10}%`, // 10% to 70% from left
      rotation: Math.random() * 10 - 5, // -5deg to 5deg
      scale: 0.8 + Math.random() * 0.4, // 0.8 to 1.2 scale
      zIndex: Math.floor(Math.random() * 10) + 1
    }));
    setIntroPositions(positions);
  }, []);

  // Add Enter key listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && gameState === 'intro') {
        startGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  const handleCardClick = (cardId) => {
    console.log('Card clicked:', cardId, 'gameState:', gameState, 'isChecking:', isChecking);
    
    // Start game if clicking any card during intro
    if (gameState === "intro") {
      startGame();
      return;
    }
    
    if (gameState !== "playing" || isChecking) return;
    
    // Check if this card is already matched - if so, do nothing
    const clickedCard = cards.find(c => c.id === cardId);
    if (clickedCard && matchedPairs.includes(clickedCard.pairId)) {
      return; // Don't allow clicking matched cards
    }
    
    if (flippedCards.includes(cardId)) {
      setFlippedCards(prev => prev.filter(id => id !== cardId));
      return;
    }

    setFlippedCards(prev => [...prev, cardId]);

    const newFlipped = [...flippedCards, cardId];
    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.pairId === secondCard.pairId) {
        // Trigger celebration!
        setLastMatchedPair(firstCard.pairId);
        setShowCelebration(true);
        
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, firstCard.pairId]);
          // Remove matched cards from flippedCards to prevent interference
          setFlippedCards(prev => prev.filter(id => {
            const card = cards.find(c => c.id === id);
            return card && card.pairId !== firstCard.pairId;
          }));
          setIsChecking(false);
          
          // Hide celebration after animation
          setTimeout(() => {
            setShowCelebration(false);
          }, 1500);
          
          // Check for win
          if (matchedPairs.length + 1 === 6) {
            setTimeout(() => {
              setGameState("finished");
              // Trigger transformation animation
              setTimeout(() => {
                const cards = document.querySelectorAll('[data-transform="true"]');
                cards.forEach((card, index) => {
                  setTimeout(() => {
                    card.style.animation = 'transforming 1.2s ease-out';
                  }, index * 100);
                });
              }, 500);
            }, 500);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const startGame = () => {
    console.log('Starting grid arrangement animation...');
    setGameStarted(true);
    
    // After cards arrange in grid, start gameplay
    setTimeout(() => {
      setGameState("playing");
      // Flip all cards to show backs briefly
      setFlippedCards(cards.map(card => card.id));
      
      // Then flip back to start gameplay
      setTimeout(() => {
        setFlippedCards([]);
      }, 800);
    }, 6000); // Wait for 5-second animation to complete
  };

  return (
    <Container ref={ref}>
      {/* Floating elements in sides */}
      <FloatingElement
        style={{
          left: '-100px',
          top: '20%',
        }}
        animate={{
          y: [-20, 20, -20],
          rotate: [-5, 5, -5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingElement
        style={{
          right: '-100px',
          top: '60%',
        }}
        animate={{
          y: [-15, 15, -15],
          rotate: [5, -5, 5],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 7 + Math.random() * 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingElement2
        style={{
          left: '10%',
          bottom: '15%',
        }}
        animate={{
          y: [-10, 10, -10],
          rotate: [3, -3, 3],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 6 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingElement3
        style={{
          right: '-100px', // Beyond the right edge to override padding
          top: '45%',
          transform: 'rotate(-15deg)', // Tilt slightly to the left
        }}
        animate={{
          x: [-100, -110, -105], // Movement beyond the edge
          y: [0, -3, 0], // Minimal vertical movement
          rotate: [-15, -13, -17, -15], // Maintain left tilt with slight variation
          scale: [0.9, 1, 1.05, 1], // Less scale variation
        }}
        transition={{
          duration: 12, // Slower animation
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Home style blobs - behind cards */}
      <animated.div
        style={{
          position: "absolute",
          top: shape1Y.y.to(y => `${y}%`),
          left: shape1X.x.to(x => `${x}%`),
          transform: shape1Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape1Scale.scale})`),
          width: `${backgroundShapes[0].size}px`,
          height: `${backgroundShapes[0].size}px`,
          borderRadius: "50%",
          backgroundColor: backgroundShapes[0].color,
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <animated.div
        style={{
          position: "absolute",
          top: shape2Y.y.to(y => `${y}%`),
          left: shape2X.x.to(x => `${x}%`),
          transform: shape2Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape2Scale.scale})`),
          width: `${backgroundShapes[1].size}px`,
          height: `${backgroundShapes[1].size}px`,
          borderRadius: "50%",
          backgroundColor: backgroundShapes[1].color,
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <animated.div
        style={{
          position: "absolute",
          top: shape3Y.y.to(y => `${y}%`),
          left: shape3X.x.to(x => `${x}%`),
          transform: shape3Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape3Scale.scale})`),
          width: `${backgroundShapes[2].size}px`,
          height: `${backgroundShapes[2].size}px`,
          borderRadius: "50%",
          backgroundColor: backgroundShapes[2].color,
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <animated.div
        style={{
          position: "absolute",
          top: shape4Y.y.to(y => `${y}%`),
          left: shape4X.x.to(x => `${x}%`),
          transform: shape4Rotate.rotate.to(r => `rotate(${r}deg) scale(${shape4Scale.scale})`),
          width: `${backgroundShapes[3].size}px`,
          height: `${backgroundShapes[3].size}px`,
          borderRadius: "50%",
          backgroundColor: backgroundShapes[3].color,
          opacity: 0.7,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {gameState === "playing" && flippedCards.length > 0 && (
        <GameStats>
          <Stat>Pairs: {matchedPairs.length}/6</Stat>
        </GameStats>
      )}

      <SceneContainer gameState={gameState}>
        {gameState === "intro" && (
          <CenterText>
            <MainTitle>tap to play</MainTitle>
            <Subtitle>or press any key</Subtitle>
          </CenterText>
        )}
        
        <AnimatePresence>
        {cards.map((card, index) => {
          const isMatched = matchedPairs.includes(card.pairId);

          const isFlipped =
            flippedCards.includes(card.id) ||
            isMatched;
          const introPos = introPositions[index];
          
          console.log(`Card ${card.id}: isFlipped=${isFlipped}, isMatched=${isMatched}, gameState=${gameState}, totalCards=${cards.length}`);
          
          return (
            <motion.div
              key={card.id}
              variants={gameState === "playing" ? cardVariants.playing : cardVariants.intro}
              initial={gameState === "playing" ? undefined : "initial"}
              animate={gameState === "playing" ? cardVariants.playing.animate(isFlipped) : "animate"}
              whileHover={gameState === "intro" ? "hover" : (gameState === "playing" ? "hover" : undefined)}
              whileTap={gameState === "intro" ? "tap" : (gameState === "playing" ? "tap" : undefined)}
              custom={index}
              style={{
                position: gameState === "intro" ? "absolute" : "static",
                width: "100%",
                height: "200px",
                cursor: (gameState === "playing" || gameState === "intro") && !isMatched ? "pointer" : "default",
                transformStyle: "preserve-3d",
                ...(gameState === "intro" && introPos && {
                  top: introPos.top,
                  left: introPos.left,
                  zIndex: introPos.zIndex,
                  width: "400px",
                  height: "400px",
                }),
                ...(isMatched && {
                  opacity: 0.9,
                  boxShadow: "0 0 24px rgba(0, 0, 0, 0.1)",
                  transform: "rotateY(0deg) !important"
                })
              }}
              onClick={() => handleCardClick(card.id)}
            >
              <CardFront isFlipped={isFlipped} gameState={gameState}>
                {gameState === "intro" ? (
                  <AnimalImage 
                    src={card.image} 
                    alt={card.category}
                  />
                ) : (
                  <CardBackPlaceholder pairId={card.pairId} />
                )}
              </CardFront>
              <CardBack isFlipped={isFlipped} gameState={gameState}>
                {(gameState === "finished" && isMatched) ? (
                  <>
                    <TechIcon src={card.techIcon} alt={card.name} />
                    <TechName gameState={gameState}>{card.name}</TechName>
                    <Category gameState={gameState}>{card.category}</Category>
                  </>
                ) : (
                  <AnimalImage 
                    src={card.image} 
                    alt={card.category}
                  />
                )}
              </CardBack>
            </motion.div>
          );
        })}
      </AnimatePresence>
      </SceneContainer>

      {showCelebration && (
        <Celebration
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <MatchText
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            MATCH!
          </MatchText>
          {createConfetti().map((particle) => (
            <Confetti
              key={particle.id}
              style={{ backgroundColor: particle.color }}
              initial={{ 
                x: 0, 
                y: 0, 
                rotate: 0,
                scale: 0
              }}
              animate={{ 
                x: particle.x, 
                y: particle.y + 200,
                rotate: particle.rotate + 180,
                scale: particle.scale,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5,
                delay: particle.id * 0.05,
                ease: "easeOut"
              }}
            />
          ))}
        </Celebration>
      )}

      {gameState === "finished" && (
        <WinMessage>
          <WinText>Technology Ecosystem Revealed</WinText>
          <PlayAgain onClick={() => window.location.reload()}>
            Play Again
          </PlayAgain>
        </WinMessage>
      )}
    </Container>
  );
}

// Styled components
const Container = styled.div`
  min-height: 100vh;
  height: 120vh; // Reduced height
  background-image: url(${fondobajo});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
`;

// How I Think style blob shapes with SVG paths
const OrganicShape = styled(motion.div)`
  position: absolute;
  pointer-events: none;
  z-index: 1;
`;

const BlobSVG = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

// Floating element background
const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  background-image: url(${element});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  pointer-events: none;
  z-index: 0;
`;

// Second floating element
const FloatingElement2 = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 250px;
  background-image: url(${element2});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  pointer-events: none;
  z-index: 0;
`;

// Third floating element - enters from right to center
const FloatingElement3 = styled(motion.div)`
  position: absolute;
  width: 280px;
  height: 280px;
  background-image: url(${element3});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
  filter: saturate(1.5) contrast(1.1);
`;

// How I Think style shapes data
const shapes = [
  {
    path: "M30,20 Q50,10 70,20 T90,40 Q80,60 60,70 T30,60 Q10,40 30,20",
    color: "#667eea",
    size: 200
  },
  {
    path: "M20,30 Q40,15 60,25 T80,45 Q70,65 50,75 T20,65 Q5,45 20,30",
    color: "#f093fb", 
    size: 180
  },
  {
    path: "M25,25 Q45,10 65,25 T85,50 Q70,70 45,75 T25,70 Q10,50 25,25",
    color: "#4facfe",
    size: 220
  },
  {
    path: "M35,20 Q55,5 75,20 T95,45 Q80,65 60,70 T35,65 Q15,45 35,20",
    color: "#43e97b",
    size: 190
  },
  {
    path: "M30,15 Q50,5 70,15 T90,35 Q75,55 55,65 T30,60 Q10,40 30,15",
    color: "#fa709a",
    size: 210
  },
  {
    path: "M25,30 Q45,15 65,30 T85,55 Q70,75 45,80 T25,75 Q5,55 25,30",
    color: "#30cfd0",
    size: 170
  }
];

const PlayButton = styled.button`
  font-family: "Canela", serif;
  font-size: 24px;
  font-weight: 300;
  color: #1d1d1d;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 16px 48px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.01em;
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const GameStats = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  text-align: center;
`;

const Stat = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.secondaryText || props.theme.text};
  opacity: 0.7;
  transition: opacity 0.3s ease;
`;

const SceneContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  
  ${props => props.gameState === "intro" && `
    // No grid, organic layout
  `}
  
  ${props => (props.gameState === "playing" || props.gameState === "finished") && `
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 20px;
    min-height: 100vh;
    align-content: center;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 12px;
      padding: 60px 20px;
    }
  `}
`;

const CenterText = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1000;
  pointer-events: none;
  background: rgba(245, 239, 230, 0.8);
  padding: 40px 60px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const MainTitle = styled.h1`
  font-family: "Canela", serif;
  font-size: clamp(64px, 8vw, 96px);
  font-weight: 300;
  letter-spacing: -0.02em;
  color: #1d1d1d;
  margin-bottom: 24px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: "Canela", serif;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 300;
  color: #555;
  opacity: 0.7;
`;

const CinematicCard = styled.div`
  position: ${props => props.gameState === "intro" ? "absolute" : "relative"};
  width: ${props => props.gameState === "intro" ? "400px" : "100%"};
  height: ${props => props.gameState === "intro" ? "400px" : "0"};
  padding-bottom: ${props => props.gameState === "intro" ? "0" : "100%"};
  cursor: ${props => (props.gameState === "playing" || props.gameState === "intro") ? "pointer" : "default"};
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${props => props.gameState === "intro" ? "floating 6s ease-in-out infinite" : "none"};
  
  ${props => props.gameState === "intro" && props.introPos && `
    top: ${props.introPos.top};
    left: ${props.introPos.left};
    transform: rotate(${props.introPos.rotation}deg) scale(${props.introPos.scale});
    z-index: ${props.introPos.zIndex};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  `}
  
  ${props => (props.gameState === "playing" || props.gameState === "finished") && `
    transform: rotate(0deg) scale(1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  `}
  
  ${props => props.isFlipped && `
    transform: rotateY(180deg);
  `}
  
  ${props => props.isMatched && `
    opacity: 0.9;
    transform: rotateY(180deg) scale(0.98);
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
  `}
  
  @media (max-width: 768px) {
    ${props => props.gameState === "intro" && `
      width: 300px;
      height: 300px;
    `}
  }
  
  @keyframes floating {
    0%, 100% { transform: translateY(0px) rotate(${props => props.introPos?.rotation || 0}deg) scale(${props => props.introPos?.scale || 1}); }
    50% { transform: translateY(-8px) rotate(${props => props.introPos?.rotation || 0}deg) scale(${props => props.introPos?.scale || 1}); }
  }
`;

const CardFace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: transparent;
  transition: all 0.4s ease;
  border-radius: 8px;
`;

const CardFront = styled(CardFace)`
  transform: rotateY(0deg);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background: rgba(255, 255, 255, 0.4);
`;

const CardBackPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${cardBack});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 8px;
    pointer-events: none;
  }
`;

const TechIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  object-fit: contain;
  opacity: 0.9;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const TechName = styled.div`
  font-family: "Canela", serif;
  font-size: 16px;
  font-weight: 400;
  color: #1d1d1d;
  text-align: center;
  margin-bottom: 4px;
  line-height: 1.2;
  opacity: 0;

  ${props => props.gameState === "finished" && `
    opacity: 1;
    animation: fadeInScale 0.6s ease-out forwards;
  `}

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Category = styled.div`
  font-size: 11px;
  font-style: italic;
  color: #555;
  opacity: 0;

  ${props => props.gameState === "finished" && `
    opacity: 0.7;
    animation: fadeInScale 0.6s ease-out 0.2s forwards;
  `}
`;

const AnimalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.4s ease;
`;

const Celebration = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  pointer-events: none;
  text-align: center;
`;

const MatchText = styled(motion.h2)`
  font-family: "Canela", serif;
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 300;
  color: #1d1d1d;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
`;

const Confetti = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const createConfetti = () => {
  const colors = ["#FF5229", "#FFC910", "#1C58F2", "#F865A3", "#179E6B", "#8053E5"];
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 400,
    rotate: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5
  }));
};

const WinMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(245, 239, 230, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 48px;
  text-align: center;
  z-index: 1000;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
`;

const WinText = styled.h2`
  font-family: "Canela", serif;
  font-size: 32px;
  font-weight: 300;
  color: #1d1d1d;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
`;

const PlayAgain = styled.button`
  font-family: "Canela", serif;
  font-size: 16px;
  font-weight: 400;
  color: #1d1d1d;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 12px 28px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  letter-spacing: -0.01em;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;
