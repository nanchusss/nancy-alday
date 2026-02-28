import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { LanguageContext } from "../components/LanguageContext";
import Header from "../components/common/Header";

export default function ReliefLanding() {
  const { t } = useContext(LanguageContext);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeFacet, setActiveFacet] = useState(null);
  const [hoveredFacet, setHoveredFacet] = useState(null);
  const [showBio, setShowBio] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleBackgroundClick = (e) => {
    if (showContact) return;
    if (e.target === e.currentTarget) {
      setActiveFacet(null);
      setShowBio(false);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  const handleNameClick = () => {
    setActiveFacet(null);
    setShowBio(true);
  };

  const dimensions = t.landing.dimensions;

  const facets = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    rotate: i * (360 / 16),
    dimension: dimensions[i % dimensions.length],
  }));

  return (
    <>
      <Header onContactClick={() => setShowContact(true)} />

      <Wrapper onMouseMove={handleMouseMove} onClick={handleBackgroundClick}>
        <Sculpture
          viewBox="0 0 1000 1000"
          style={{
            transform: `
              rotateX(${mouse.y * 5}deg)
              rotateY(${mouse.x * -5}deg)
            `,
          }}
        >
          <defs>
            <linearGradient
              id="facetGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e2dccf" />
              <stop offset="100%" stopColor="#4040a1ff" />
            </linearGradient>

            <filter id="softShadow">
              <feDropShadow
                dx="0"
                dy="25"
                stdDeviation="35"
                floodOpacity="0.12"
              />
            </filter>
          </defs>

          <g transform="translate(450 450) scale(1.3) translate(-450 -450)">
            
            {/* ===== PETALOS ROTANDO ===== */}
            <RotatingGroup>
              {facets.map((facet) => {
                const isActive =
                  activeFacet && activeFacet.title === facet.dimension.title;

                const isHovered =
                  hoveredFacet &&
                  hoveredFacet.title === facet.dimension.title;

                return (
                  <g
                    key={facet.id}
                    transform={`translate(500 500) rotate(${facet.rotate})`}
                  >
                    <path
                      d="
                        M 0 -360
                        Q -70 -280 -170 40
                        Q 0 120 170 40
                        Q 70 -280 0 -360
                      "
                      fill="url(#facetGradient)"
                      filter="url(#softShadow)"
                      onMouseEnter={() =>
                        setHoveredFacet(facet.dimension)
                      }
                      onMouseLeave={() => setHoveredFacet(null)}
                      onClick={() => {
                        setShowBio(false);
                        setActiveFacet(facet.dimension);
                      }}
                      style={{
                        cursor: "pointer",
                        opacity: isActive || isHovered ? 1 : 0.5,
                        filter: isHovered
                          ? "brightness(1.2) drop-shadow(0 0 18px rgba(255,255,255,0.5))"
                          : "none",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "center",
                        transition: "all 0.25s ease",
                      }}
                    />
                  </g>
                );
              })}
            </RotatingGroup>

            {/* ===== CENTRO FIJO ===== */}
            <g>
              <circle
                cx="500"
                cy="500"
                r={activeFacet || showBio ? 190 : 150}
                fill={activeFacet ? activeFacet.glow : "#ebe6dc"}
                filter="url(#softShadow)"
                style={{ transition: "all 0.6s ease" }}
              />

              {(activeFacet || showBio) && (
                <foreignObject x="380" y="380" width="240" height="240">
                  <CoreContent>
                    {showBio ? (
                      <>
                        <h3>{t.landing.aboutTitle}</h3>
                        <p>{t.landing.aboutText}</p>
                      </>
                    ) : (
                      <>
                        <h3>{activeFacet.title}</h3>
                        <p>{activeFacet.description}</p>
                      </>
                    )}
                  </CoreContent>
                </foreignObject>
              )}

              {!activeFacet && !showBio && (
                <text
                  x="500"
                  y="505"
                  fontFamily="Coromant Garamond, serif"
                  textAnchor="middle"
                  fontSize="24"
                  fill="#5a574f"
                  onClick={handleNameClick}
                  style={{
                    letterSpacing: "6px",
                    fontWeight: 300,
                    cursor: "pointer",
                  }}
                >
                  NANCY ALDAY
                </text>
              )}
            </g>
          </g>
        </Sculpture>

        {showContact && (
          <ModalOverlay onClick={() => setShowContact(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h2>{t.landing.modalTitle}</h2>
              <form
                action="mailto:nanchusss@icloud.com"
                method="POST"
                encType="text/plain"
              >
                <Input
                  name="Name"
                  placeholder={t.landing.namePlaceholder}
                  required
                />
                <Input
                  name="Email"
                  type="email"
                  placeholder={t.landing.emailPlaceholder}
                  required
                />
                <Textarea
                  name="Message"
                  placeholder={t.landing.messagePlaceholder}
                  required
                />
                <SubmitButton type="submit">
                  {t.landing.send}
                </SubmitButton>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
      </Wrapper>
    </>
  );
}

/* ================== ANIMATION ================== */

const slowRotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;
const HeroName = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(42px, 6vw, 64px);
  font-weight: 500;
  letter-spacing: 8px;
  text-align: center;
  color: #2f2c28;
`;

const RotatingGroup = styled.g`
  transform-origin: 500px 500px;
  animation: ${slowRotate} 120s linear infinite;
`;

/* ================== STYLES ================== */

const Wrapper = styled.div`
  height: 100vh;
  padding-top: 90px;
  background: #e9e4da;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1400px;
  overflow: visible;
  position: relative;
`;

const Sculpture = styled.svg`
  width: 80vw;
  height: 80vh;
  transition: transform 0.15s ease-out;
  overflow: visible;
  will-change: transform;

  @media (max-width: 768px) {
    width: 95vw;
    height: 95vh;
  }
`;

const CoreContent = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-size: 26px;
    margin-bottom: 14px;
    color: #2f2c27;
    letter-spacing: 1px;
  }

  p {
    font-size: 17px;
    line-height: 1.6;
    color: #4a4741;
  }
`;

const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(230, 225, 215, 0.6);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: rgba(248, 244, 238, 0.95);
  padding: 60px;
  border-radius: 40px;
  text-align: center;
  width: 420px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.08);

  h2 {
    font-family: "Prata", serif;
    font-size: 32px;
    margin-bottom: 28px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 18px;
  padding: 12px 18px;
  border-radius: 30px;
  border: 1px solid rgba(60, 56, 50, 0.3);
  background: transparent;
`;

const Textarea = styled.textarea`
  width: 100%;
  font-family: "Sora", sans-serif;
  height: 100px;
  margin-bottom: 22px;
  padding: 14px 18px;
  border-radius: 24px;
  border: 1px solid rgba(60, 56, 50, 0.3);
  background: transparent;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  background: #dcd5c7;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #cfc6b5;
  }
`;