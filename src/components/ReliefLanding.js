import React, { useState, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

export default function ReliefLanding() {
  const { t, setLanguage } = useContext(LanguageContext);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeFacet, setActiveFacet] = useState(null);
  const [showBio, setShowBio] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleBackgroundClick = (e) => {
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

  // Dimensiones ahora salen del diccionario
  const dimensions = t.landing.dimensions;

  const facets = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    rotate: i * (360 / 16),
    dimension: dimensions[i % dimensions.length]
  }));

  return (
    <Wrapper onMouseMove={handleMouseMove} onClick={handleBackgroundClick}>
      
      {/* Idioma izquierda */}
      <LangLeft>
        <LangButton onClick={() => setLanguage("en")}>
          {t.landing.languageEN}
        </LangButton>
        <LangButton onClick={() => setLanguage("es")}>
          {t.landing.languageES}
        </LangButton>
      </LangLeft>

      {/* Contact derecha */}
      <ContactButton onClick={() => setShowContact(true)}>
        {t.landing.contact}
      </ContactButton>

      <Sculpture
        viewBox="0 0 1000 1000"
        style={{
          transform: `
            rotateX(${mouse.y * 5}deg)
            rotateY(${mouse.x * -5}deg)
          `
        }}
      >
        <g transform="translate(450 450) scale(1.3) translate(-450 -450)">
          <defs>
            <linearGradient id="facetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6f3ec" />
              <stop offset="100%" stopColor="#ddd7cc" />
            </linearGradient>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="25" stdDeviation="35" floodOpacity="0.12"/>
            </filter>
          </defs>

          {facets.map((facet) => {
            const isActive =
              activeFacet && activeFacet.title === facet.dimension.title;

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
                  onClick={() => {
                    setShowBio(false);
                    setActiveFacet(facet.dimension);
                  }}
                  style={{
                    cursor: "pointer",
                    opacity: isActive ? 0.95 : 0.55,
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "all 0.6s ease"
                  }}
                />
              </g>
            );
          })}

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
              textAnchor="middle"
              fontSize="24"
              fill="#5a574f"
              onClick={handleNameClick}
              style={{
                letterSpacing: "6px",
                fontWeight: 300,
                cursor: "pointer"
              }}
            >
              NANCY ALDAY
            </text>
          )}
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
  );
}

/* STYLES */
const LangLeft = styled.div`
  position: absolute;
  top: 40px;

  left: 60px;
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    left: 20px;
    top: 20px;
    gap: 10px;
  }
`;

const LangButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 17px;
  letter-spacing: 1px;
  color: #3a3732;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  background: #e9e4da;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1400px;
  overflow: hidden;
  position: relative;
`;

const Sculpture = styled.svg`
  width: 80vw;
  height: 80vh;
  transition: transform 0.15s ease-out;

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
    font-family: "Cormorant Garamond", serif;
    font-size: 25px;
    margin-bottom: 12px;
    color: #2f2c27;
  }

  p {
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 17px;
    line-height: 1.6;
    color: #4a4741;
  }
`;

const ContactButton = styled.button`
  position: absolute;
  top: 40px;
  right: 60px;
  background: transparent;
  border: 1px solid rgba(60, 56, 50, 0.4);
  padding: 10px 22px;
  border-radius: 40px;
  font-family: "Cormorant Garamond", serif;
  font-size: 19px;
  letter-spacing: 1px;
  color: #3a3732;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(60, 56, 50, 0.8);
  }

  @media (max-width: 768px) {
    right: 20px;
    top: 20px;
    padding: 8px 16px;
    font-size: 12px;
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
  box-shadow: 0 40px 100px rgba(0,0,0,0.08);

  h2 {
    font-family: "Cormorant Garamond", serif;
    font-size: 30px;
    margin-bottom: 24px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 18px;
  padding: 12px 18px;
  border-radius: 30px;
  border: 1px solid rgba(60,56,50,0.3);
  background: transparent;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 22px;
  padding: 14px 18px;
  border-radius: 24px;
  border: 1px solid rgba(60,56,50,0.3);
  background: transparent;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: none;
  background: #dcd5c7;
  font-family: "Cormorant Garamond", serif;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #cfc6b5;
  }
`;