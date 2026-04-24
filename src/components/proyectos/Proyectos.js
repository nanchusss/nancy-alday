import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { projects } from "../../data/projects";
import { LanguageContext } from "../LanguageContext";

export default function ProjectsSection() {
  const [hovered, setHovered] = useState(null);
  const [hoveredListItem, setHoveredListItem] = useState(null);
  const [mode, setMode] = useState("gallery");
  const { t } = useContext(LanguageContext);

  const navigate = useNavigate();

  /* ================= CURSOR ================= */

  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  useEffect(() => {
    let raf;

    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.15;
      current.current.y += (mouse.current.y - current.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ================= SCROLL ================= */

  const track1 = useRef(null);
  const track2 = useRef(null);

  const offset1 = useRef(0);
  const offset2 = useRef(0);

  const ITEM_HEIGHT = 420;

  useEffect(() => {
    let raf;
    const isMobile = window.innerWidth < 768;

    let last = performance.now();
    const speed = isMobile ? 0.02 : 0.03;

    const loop = (now) => {
      const delta = now - last;
      last = now;

      // columna 1 SUBE
      offset1.current -= delta * speed * 0.5;

      // columna 2 BAJA
      if (!isMobile) {
        offset2.current += delta * speed;
      }

      const limit = 3 * ITEM_HEIGHT;

      if (offset1.current < -limit) offset1.current = 0;
      if (!isMobile && offset2.current > 0) offset2.current = -limit;

      if (track1.current) {
        track1.current.style.transform = `translateY(${offset1.current}px)`;
      }

      if (!isMobile && track2.current) {
        track2.current.style.transform = `translateY(${offset2.current}px)`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const activeProject = hovered || projects[0];

  return (
    <Wrapper>
      <Switch>
        <Toggle>
          <button
            className={mode === "gallery" ? "active" : ""}
            onClick={() => setMode("gallery")}
          >
            {t.projects.gallery}
          </button>
          <button
            className={mode === "list" ? "active" : ""}
            onClick={() => setMode("list")}
          >
            {t.projects.list}
          </button>
        </Toggle>
      </Switch>

      {mode === "gallery" ? (
        <Layout onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <Left>

            {/* COL 1 */}
            <Column>
              <Track ref={track1}>
                {[...projects, ...projects].map((p, i) => (
                  <ItemWrapper
                    key={i}
                    onMouseEnter={() => setHovered(p)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate(`/projects/${p.id}`)}
                  >
                    <Item style={{ backgroundImage: `url(${p.image[0]})` }} />
                    <ItemMeta>
                      <ItemTitle>{p.title}</ItemTitle>
                    </ItemMeta>
                  </ItemWrapper>
                ))}
              </Track>
            </Column>

            {/* COL 2 */}
            <Column>
              <Track ref={track2}>
                {[...projects, ...projects].map((p, i) => (
                  <ItemWrapper
                    key={i}
                    onMouseEnter={() => setHovered(p)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate(`/projects/${p.id}`)}
                  >
                    <Item style={{ backgroundImage: `url(${p.image[2]})` }} />
                    <ItemMeta>
                      <ItemTitle>{p.title}</ItemTitle>
                    </ItemMeta>
                  </ItemWrapper>
                ))}
              </Track>
            </Column>

          </Left>

          <Right>

            <TitleWrapper>
              <TitleTrack>
                <Title>{activeProject.title}</Title>
                <Title>{activeProject.title}</Title>
              </TitleTrack>
            </TitleWrapper>

            <Subtitle>{activeProject.title}</Subtitle>

            <Preview
              style={{
                backgroundImage: `url(${activeProject.image[0]})`,
              }}
            />

          </Right>
        </Layout>
      ) : (
        <ListView>
          {projects.map((p, i) => (
            <ListRow
              key={i}
              onClick={() => navigate(`/projects/${p.id}`)}
              onMouseEnter={() => setHoveredListItem(p)}
              onMouseLeave={() => setHoveredListItem(null)}
              isHovered={hoveredListItem === p}
            >
              <ProjectTitle>{p.title}</ProjectTitle>
              {hoveredListItem === p && (
                <AnimatedImage 
                  style={{ backgroundImage: `url(${p.image[0]})` }}
                />
              )}
            </ListRow>
          ))}
        </ListView>
      )}

      <Cursor
        ref={cursorRef}
        className={hovered !== null ? "active" : ""}
      >
        <CursorInner>
          {hovered !== null ? t.projects.viewProject : ""}
        </CursorInner>
      </Cursor>
    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;

  background: linear-gradient(
    180deg,
    ${props => props.theme.background} 0%,
    ${props => props.theme.background === "#0b0b0c" 
      ? "rgba(107, 70, 193, 0.15)" 
      : "rgba(139, 92, 246, 0.12)"} 30%,
    ${props => props.theme.background === "#0b0b0c" 
      ? "rgba(107, 70, 193, 0.25)" 
      : "rgba(139, 92, 246, 0.20)"} 70%,
    ${props => props.theme.background === "#0b0b0c" ? "#6B46C1" : "#8B5CF6"} 100%
  );
  transition: background 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(107, 70, 193, 0.06) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100%;

  @media (max-width: 768px) {
    display: block;      /* 👈 CLAVE */
    width: 100%;
    height: auto;
  }
`;

const Left = styled.div`
  display: flex;
  gap: 20px;
  padding: 40px 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    padding: 20px;        /* 👈 opcional: menos aire */
  }
`;

const Column = styled.div`
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;          /* 👈 CLAVE */
    
    &:nth-child(2) {
      display: none;
    }
  }
`;

const Track = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemWrapper = styled.div`
  cursor: pointer;
`;

const Item = styled.div`
  height: 400px;
  width: 100%;            /* 👈 AÑADE ESTO */
  background-size: cover;
  border-radius: 16px;
  background-position: center;
`;

const ItemMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.div`
  font-size: 28px;
  margin-top: 12px;
  text-transform: uppercase;
  color: ${props => props.theme.text};
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 6vw;
  container-type: inline-size;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  overflow: hidden;
`;

const TitleTrack = styled.div`
  display: flex;
  width: max-content;
  animation: scrollTitle 20s linear infinite;

  @keyframes scrollTitle {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

const Title = styled.h1`
  font-size: clamp(60px, 12cqw, 120px);
  padding-top: 100px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 0.9;
  color: ${props => props.theme.text};

  @supports not (font-size: clamp(1px, 1cqw, 1px)) {
    font-size: clamp(60px, 5rem, 120px);
  }
`;

const Subtitle = styled.p`
  margin: 40px 0;
  font-size: 28px;
  text-transform: uppercase;
  color: ${props => props.theme.secondaryText};
`;

const Preview = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  max-height: 400px;
  margin-top: 20px;
`;

const Switch = styled.div`
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const Toggle = styled.div`
  display: flex;
  background: ${props => props.theme.card};
  border-radius: 999px;
  padding: 6px;

  button {
    border: none;
    background: transparent;
    padding: 8px 18px;
    border-radius: 999px;
    cursor: pointer;
    color: ${props => props.theme.text};
  }

  .active {
    background: ${props => props.theme.accent};
  }
`;

const ListView = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 20px 0;
  transition: all 0.3s ease;
  
  ${props => props.isHovered && `
    transform: translateX(10px);
  `}
`;

const ProjectTitle = styled.div`
  font-size: clamp(40px, 6vw, 80px);
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => props.theme.text};
  transition: color 0.3s ease;
  
  ${ListRow}:hover & {
    color: ${props => props.theme.accent};
  }
`;

const AnimatedImage = styled.div`
  width: 120px;
  height: 80px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  
  @keyframes slideInRight {
    0% {
      opacity: 0;
      transform: translateX(30px) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
    }
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 60px;
  }
`;

const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;

  opacity: 0;
  transition: opacity 0.2s ease;

  &.active {
    opacity: 1;
  }
`;

const CursorInner = styled.div`
  background: ${props => props.theme.text};
  color: ${props => props.theme.background};
  padding: 8px 14px;
  border-radius: 999px;

  transform: translate(-50%, -50%) scale(0.8);
  transition: transform 0.2s ease;

  ${Cursor}.active & {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;