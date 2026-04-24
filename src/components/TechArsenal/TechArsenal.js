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
      {/* Elementos flotantes en los costados - solo en TechArsenal */}
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

      {gameState === "intro" && (
        <CenterText onClick={startGame}>
          <h1>{t.techArsenal.tapToPlay}</h1>
        </CenterText>
      )}

      {/* Display del score durante el juego */}
      {gameState === "playing" && (
        <ScoreDisplay>
          <div><img src={reloj} alt="reloj" style={{width: "18px", height: "18px", marginRight: "5px", verticalAlign: "middle"}} /> {t.techArsenal.time}: {elapsedTime}s</div>
        </ScoreDisplay>
      )}

      
      {gameStarted && (
        <>
          <GameInstructions>
            {gameState === "finished" && finalScore ? (
              <>
                <div className="time"><img src={reloj} alt="reloj" style={{width: "18px", height: "18px", marginRight: "5px", verticalAlign: "middle"}} /> {t.techArsenal.time}: {elapsedTime}s</div>
                <div className="score">🏆 {t.techArsenal.scoreText}: {finalScore.points}</div>
                <div className="message">{finalScore.message}</div>
                <PlayAgainButton onClick={resetGame}>
                  🔄 {t.techArsenal.playAgain}
                </PlayAgainButton>
              </>
            ) : (
              t.techArsenal.instructions
            )}
          </GameInstructions>
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
      transform: translate(50%, -50%) rotate(8deg) translateY(0px);
    }
    75% {
      transform: translate(50%, -50%) rotate(12deg) translateY(-6px);
    }
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

  @media (max-width: 768px) {
    background-image: url(${fondobajomobile});
    background-attachment: fixed;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 160px);
  gap: 20px;
`;

const CardWrapper = styled(motion.div)`
  width: 160px;
  height: 160px;
  perspective: 1000px;
  cursor: pointer;
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
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.85);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  backdrop-filter: blur(4px);
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
`;

const VictoryScreen = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 100;

  h1 {
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
    animation: victoryPulse 1s ease-in-out infinite;
  }

  .score-info {
    background: rgba(255, 255, 255, 0.9);
    padding: 15px 25px;
    border-radius: 15px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(4px);

    div {
      margin: 8px 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .time {
      color: #666;
    }

    .score {
      color: #4CAF50;
      font-size: 18px;
    }

    .message {
      color: #FF6B35;
      font-size: 16px;
      margin-top: 10px;
    }
  }

  @keyframes victoryPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
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
`;