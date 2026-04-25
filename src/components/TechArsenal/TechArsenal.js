/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LanguageContext } from "../LanguageContext";

// animales
import bird from "./images/bird.png";
import elefante from "./images/elefante.png";
import gato from "./images/gato.png";
import jirafa from "./images/jirafa.png";
import leon from "./images/leon.png";
import serpiente from "./images/serpiente.png";

// tech images
import gitImg from "./images/git.png";
import githubImg from "./images/github.png";
import reactImg from "./images/react.png";
import vercelImg from "./images/vercel.png";
import cssImg from "./images/css.png";
import styledImg from "./images/styled.png";
import nodeImage from "./images/node.png";
import jsImage from "./images/js.png";
import figmaImg from "./images/figma.png";
import mongoImg from "./images/mongo.png";
import typescriptImg from "./images/typescript.png";
import visualImg from "./images/visual.png";

import cardBack from "./images/carta.png";
import fondobajo from "./images/fondobajo.png";
import fondobajomobile from "./images/fondobajomobile.png";
import element from "./images/element.png";
import element2 from "./images/element2.png";
import element3 from "./images/element3.png";
import reloj from "./images/reloj.png";

export default function TechArsenal() {
  const { t } = useContext(LanguageContext);
  const [gameState, setGameState] = useState("intro");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // 👇 ahora guardamos transformaciones por cardId → image
  const [transformedMap, setTransformedMap] = useState({});

  // Sistema de score basado en tiempo
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finalScore, setFinalScore] = useState(null);

  const TRANSFORM_MAP = {
    0: [figmaImg, mongoImg],      // pájaros
    1: [reactImg, vercelImg],     // elefantes
    2: [gitImg, githubImg],       // gatos
    3: [cssImg, styledImg],       // jirafas
    4: [nodeImage, jsImage],      // leones
    5: [typescriptImg, visualImg], // serpientes
  };

  const techCards = useMemo(() => [
    { id: 1, image: bird },
    { id: 2, image: bird },

    { id: 3, image: elefante },
    { id: 4, image: elefante },

    { id: 5, image: gato },
    { id: 6, image: gato },

    { id: 7, image: jirafa },
    { id: 8, image: jirafa },

    { id: 9, image: leon },
    { id: 10, image: leon },

    { id: 11, image: serpiente },
    { id: 12, image: serpiente },
  ], []);

  useEffect(() => {
    const gameCards = techCards.map((card, index) => ({
      ...card,
      pairId: Math.floor(index / 2),
      cardId: index,
    }));

    const shuffled = [...gameCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  // Efecto para medir el tiempo durante el juego
  useEffect(() => {
    let interval;
    
    if (gameStarted && gameState === "playing" && !finalScore) {
      if (!startTime) {
        setStartTime(Date.now());
      }
      
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameState, startTime, finalScore]);

  const startGame = useCallback(() => {
    setGameStarted(true);

    setTimeout(() => {
      setGameState("playing");
      setFlippedCards(cards.map((c) => c.cardId));

      setTimeout(() => setFlippedCards([]), 800);
    }, 600);
  }, [cards]);

  // 👇 devuelve imagen final
  const getImage = (card) => {
    if (transformedMap[card.cardId]) {
      return transformedMap[card.cardId];
    }
    return card.image;
  };

  // 👇 calcular score simpático según tiempo
  const calculateScore = (timeInSeconds) => {
    if (timeInSeconds < 30) return { points: 1000, message: t.techArsenal.score.lightning };
    if (timeInSeconds < 45) return { points: 750, message: t.techArsenal.score.master };
    if (timeInSeconds < 60) return { points: 500, message: t.techArsenal.score.great };
    if (timeInSeconds < 90) return { points: 250, message: t.techArsenal.score.good };
    return { points: 100, message: t.techArsenal.score.didIt };
  };

  // 👇 formatear tiempo para win state
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 👇 reiniciar el juego
  const resetGame = () => {
    setGameState("intro");
    setCards([]);
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsChecking(false);
    setGameStarted(false);
    setTransformedMap({});
    setStartTime(null);
    setElapsedTime(0);
    setFinalScore(null);
    
    // Re-mezclar las cartas
    const gameCards = techCards.map((card, index) => ({
      ...card,
      pairId: Math.floor(index / 2),
      cardId: index,
    }));
    const shuffled = [...gameCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleCardClick = (cardId) => {
    if (gameState === "intro") {
      startGame();
      return;
    }

    if (gameState !== "playing" || isChecking) return;

    const clicked = cards.find((c) => c.cardId === cardId);

    if (matchedPairs.includes(clicked.pairId)) return;
    if (flippedCards.includes(cardId)) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);

      const [a, b] = newFlipped;
      const cardA = cards.find((c) => c.cardId === a);
      const cardB = cards.find((c) => c.cardId === b);

      if (cardA.pairId === cardB.pairId) {
        setTimeout(() => {
          // guardar match
          setMatchedPairs((prev) => [...prev, cardA.pairId]);

          // 👇 TRANSFORMACIONES usando TRANSFORM_MAP
          if (TRANSFORM_MAP[cardA.pairId]) {
            const [firstTransform, secondTransform] = TRANSFORM_MAP[cardA.pairId];
            setTransformedMap((prev) => ({
              ...prev,
              [a]: firstTransform,
              [b]: secondTransform,
            }));
          }

          setFlippedCards([]);
          setIsChecking(false);

          // win
          if (matchedPairs.length + 1 === 6) {
            const scoreData = calculateScore(elapsedTime);
            setFinalScore(scoreData);
            setTimeout(() => setGameState("finished"), 500);
          }
        }, 600);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 600);
      }
    }
  };

  return (
    <Container>
      {/* Elementos flotantes - solo en desktop */}
      <FloatingElement
        src={element}
        style={{
          position: "absolute",
          left: "5%",
          top: "30%",
          width: "250px",
          zIndex: 2,
        }}
      />
      <FloatingElement2
        src={element2}
        style={{
          position: "absolute",
          right: "8%",
          top: "25%",
          width: "250px",
          zIndex: 2,
        }}
      />
      {/* Elementos más grandes y más abajo */}
      <FloatingElement3
        src={element3}
        style={{
          position: "absolute",
          left: "7%",
          bottom: "20%",
          width: "320px",
          zIndex: 2,
        }}
      />
      <FloatingElement
        src={element}
        style={{
          position: "absolute",
          right: "6%",
          bottom: "15%",
          width: "300px",
          zIndex: 2,
        }}
      />

      <GameContainer>
          {gameState === "intro" && (
            <TitleSection>
              <IntroContainer
                onClick={startGame}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  duration: 1.2, 
                  ease: "easeOut"
                }}
              >
                <IntroTitle
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "easeOut",
                    delay: 0.1
                  }}
                >
                  Match the system.
                </IntroTitle>
                <IntroSubtitle
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "easeOut",
                    delay: 0.2
                  }}
                >
                  Find the pairs and reveal my tech stack.
                </IntroSubtitle>
                <IntroCTA
                  onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "easeOut",
                    delay: 0.3
                  }}
                >
                  Start →
                </IntroCTA>
              </IntroContainer>
            </TitleSection>
          )}

          {gameStarted && (
            <>
              {/* Display del score durante el juego */}
              {gameState === "playing" && (
                <ScoreDisplay>
                  <div><img src={reloj} alt="reloj" style={{width: "18px", height: "18px", marginRight: "5px", verticalAlign: "middle"}} /> {t.techArsenal.time}: {elapsedTime}s</div>
                </ScoreDisplay>
              )}

              <TitleSection>
                <GameInstructions>
                  {gameState === "finished" && finalScore ? (
                    <WinContainer>
                      <WinTitle
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ 
                          duration: 0.8, 
                          ease: "easeOut",
                          delay: 0.1
                        }}
                      >
                        That was fast.
                      </WinTitle>
                      <WinSubtitle
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ 
                          duration: 0.8, 
                          ease: "easeOut",
                          delay: 0.3
                        }}
                      >
                        You matched them all.
                      </WinSubtitle>
                      <WinTime
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ 
                          duration: 0.8, 
                          ease: "easeOut",
                          delay: 0.5
                        }}
                      >
                        {formatTime(elapsedTime)}
                      </WinTime>
                      <WinPlayAgain
                        onClick={resetGame}
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ 
                          duration: 0.8, 
                          ease: "easeOut",
                          delay: 0.7
                        }}
                      >
                        Play again →
                      </WinPlayAgain>
                    </WinContainer>
                  ) : (
                    t.techArsenal.instructions
                  )}
                </GameInstructions>
              </TitleSection>

              <Grid>
            {cards.map((card, index) => {
              const isMatched = matchedPairs.includes(card.pairId);
              const isFlipped =
                flippedCards.includes(card.cardId) || isMatched;

              return (
                <CardWrapper
                  key={card.cardId}
                  layout
                  initial={{
                    x: Math.random() * 600 - 300,
                    y: Math.random() * 600 - 300,
                    rotate: Math.random() * 40 - 20,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 18,
                    delay: gameStarted ? index * 0.05 : 0,
                  }}
                  onClick={() => handleCardClick(card.cardId)}
                >
                  <FlipCard
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Front>
                      <BackImage />
                    </Front>

                    <Back>
                      <Animal src={getImage(card)} />
                    </Back>
                  </FlipCard>
                </CardWrapper>
              );
            })}
          </Grid>
            </>
          )}
      </GameContainer>
    </Container>
  );
}

// Componente FloatingElement con animación flotante
const FloatingElement = styled.img`
  pointer-events: none;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translate(-50%, -50%) rotate(-15deg) translateY(0px);
    }
    25% {
      transform: translate(-50%, -50%) rotate(-12deg) translateY(-10px);
    }
    50% {
      transform: translate(-50%, -50%) rotate(-18deg) translateY(0px);
    }
    75% {
      transform: translate(-50%, -50%) rotate(-13deg) translateY(-8px);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingElement2 = styled.img`
  pointer-events: none;
  animation: float2 7s ease-in-out infinite;

  @keyframes float2 {
    0%, 100% {
      transform: translate(50%, -50%) rotate(10deg) translateY(0px);
    }
    25% {
      transform: translate(50%, -50%) rotate(13deg) translateY(-12px);
    }
    50% {
      transform: translate(50%, -50%) rotate(7deg) translateY(0px);
    }
    75% {
      transform: translate(50%, -50%) rotate(12deg) translateY(-8px);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingElement3 = styled.img`
  pointer-events: none;
  animation: float3 8s ease-in-out infinite;

  @keyframes float3 {
    0%, 100% {
      transform: translate(-50%, 50%) rotate(5deg) translateY(0px);
    }
    25% {
      transform: translate(-50%, 50%) rotate(8deg) translateY(-15px);
    }
    50% {
      transform: translate(-50%, 50%) rotate(2deg) translateY(0px);
    }
    75% {
      transform: translate(-50%, 50%) rotate(7deg) translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ---------- STYLES ---------- */

const Container = styled.div`
  min-height: 100vh;
  background-image: url(${fondobajo});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    background-image: url(${fondobajomobile});
    background-attachment: scroll;
    min-height: 100vh;
  }

  @media (max-width: 480px) {
    background-size: cover;
    background-position: center;
    min-height: 100vh;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 160px);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 120px);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 100px);
    gap: 10px;
  }

  @media (min-width: 421px) and (max-width: 480px) {
    grid-template-columns: repeat(3, 110px);
    gap: 12px;
  }
`;

const CardWrapper = styled(motion.div)`
  width: 180px;
  height: 180px;
  perspective: 1000px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }

  @media (min-width: 421px) and (max-width: 480px) {
    width: 110px;
    height: 110px;
  }
`;

const FlipCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
`;

const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  overflow: hidden;
`;

const Front = styled(Face)`
  transform: rotateY(0deg);
`;

const Back = styled(Face)`
  transform: rotateY(180deg);
`;

const BackImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${cardBack});
  background-size: cover;
`;

const Animal = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ScoreDisplay = styled.div`
  position: absolute;
  top: 60px;
  right: 60px;
  background: rgba(255, 255, 255, 0.85);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  backdrop-filter: blur(4px);
  
  @media (max-width: 768px) {
    top: 30px;    // ↑ 30px más arriba
    right: 30px;  // ← 30px más a la derecha
  }
`;

const GameInstructions = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  color: rgba(8, 8, 8, 0.8);
  padding: 12px 10px;
  
  border-radius: 8px;
  max-width: 700px;
  line-height: 1.3;
  white-space: pre-line;
  z-index: 60;

  .time {
    font-size: 18px;
    color: rgba(8, 8, 8, 0.7);
    margin: 5px 0;
  }

  .score {
    font-size: 20px;
    color: #4CAF50;
    font-weight: bold;
    margin: 5px 0;
  }

  .message {
    font-size: 18px;
    color: #FF6B35;
    margin: 5px 0;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    top: 80px;
    max-width: 500px;
    padding: 10px 15px;

    .time {
      font-size: 16px;
    }

    .score {
      font-size: 18px;
    }

    .message {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    font-size: 16px;
    top: 60px;
    max-width: 350px;
    padding: 8px 12px;

    .time {
      font-size: 14px;
    }

    .score {
      font-size: 16px;
    }

    .message {
      font-size: 14px;
    }
  }

  @media (min-width: 421px) and (max-width: 480px) {
    font-size: 18px;
    top: 80px;
    max-width: 400px;
    padding: 10px 15px;

    .time {
      font-size: 16px;
    }

    .score {
      font-size: 18px;
    }

    .message {
      font-size: 16px;
    }
  }
`;


const PlayAgainButton = styled.button`
  margin-top: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 800px;
  min-height: 600px;
  gap: 30px;
  padding: 20px 0;
  
  @media (max-width: 768px) {
    max-width: 90%;
    min-height: 500px;
    gap: 25px;
    padding: 15px 0;
  }
  
  @media (max-width: 480px) {
    max-width: 95%;
    min-height: 400px;
    gap: 20px;
    padding: 10px 0;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  gap: 15px;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 70px;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 50px;
  }
`;

const IntroContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

const IntroTitle = styled(motion.h1)`
  font-family: "Canela", serif;
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: rgba(34, 34, 34, 0.9);
  margin: 0;
`;

const IntroSubtitle = styled(motion.h2)`
  font-family: "Canela", serif;
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: rgba(34, 34, 34, 0.65);
  margin: 0;
  margin-top: 10px;
`;

const IntroCTA = styled(motion.a)`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(16px, 2.5vw, 18px);
  font-weight: 400;
  color: rgba(34, 34, 34, 0.8);
  text-decoration: none;
  letter-spacing: 0.04em;
  margin-top: 30px;
  transition: transform 0.3s ease;
  display: inline-block;
  
  &:hover {
    transform: translateX(6px);
  }
`;

const CenterText = styled.div`
  position: absolute;
  font-size: clamp(42px, 6vw, 88px);
  font-family: "Canela", serif;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  text-align: center;
  line-height: 1.05;
  letter-spacing: -0.03em;
  
  @media (max-width: 768px) {
    font-size: clamp(48px, 7vw, 96px);
    font-weight: 600;
    letter-spacing: -0.02em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 480px) {
    font-size: clamp(52px, 8vw, 104px);
    font-weight: 700;
    letter-spacing: -0.01em;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  }
`;

// Win state ONLY - New components for game finished state
const WinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const WinTitle = styled(motion.h1)`
  font-family: "Canela", serif;
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: rgba(34, 34, 34, 0.9);
  margin: 0;
  margin-bottom: 12px;
`;

const WinSubtitle = styled(motion.h2)`
  font-family: "Canela", serif;
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: rgba(34, 34, 34, 0.65);
  margin: 0;
  margin-bottom: 24px;
`;

const WinTime = styled(motion.div)`
  font-family: "Canela", serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0.02em;
  color: rgba(34, 34, 34, 0.8);
  margin: 0;
  margin-bottom: 32px;
`;

const WinPlayAgain = styled(motion.a)`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: clamp(16px, 2.5vw, 18px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.04em;
  color: rgba(34, 34, 34, 0.8);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(6px);
  }
`;