/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

export default function TechArsenal() {
  const [gameState, setGameState] = useState("intro");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // 👇 ahora guardamos transformaciones por cardId → image
  const [transformedMap, setTransformedMap] = useState({});

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
      {gameState === "intro" && (
        <CenterText onClick={startGame}>
          <h1>tap to play</h1>
        </CenterText>
      )}

      {gameStarted && (
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
      )}
    </Container>
  );
}

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

const CenterText = styled.div`
  position: absolute;
  font-size: 80px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  user-select: none;
`;