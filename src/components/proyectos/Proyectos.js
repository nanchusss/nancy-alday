import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { projects } from "../../data/projects";

export default function ProjectsSection() {
  const [hovered, setHovered] = useState(null);
  const [mode, setMode] = useState("gallery");

  const navigate = useNavigate();

  /* ================= CURSOR ================= */

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

      offset1.current -= delta * speed * 0.5;

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

  return (
    <Wrapper>
      <Switch>
        <Toggle>
          <button
            className={mode === "gallery" ? "active" : ""}
            onClick={() => setMode("gallery")}
          >
            GALLERY
          </button>
          <button
            className={mode === "list" ? "active" : ""}
            onClick={() => setMode("list")}
          >
            LIST
          </button>
        </Toggle>
      </Switch>

      {mode === "gallery" ? (
        <Layout onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <Left>
            <Column>
              <Track ref={track1}>
                {[...projects, ...projects].map((_, i) => {
                  const p = projects[i % projects.length];

                  return (
                    <ItemWrapper
                      key={i}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => navigate(`/projects/${p.id}`)}
                    >
                      <Item style={{ backgroundImage: `url(${p.image[0]})` }} />
                      <ItemMeta>
                        <ItemTitle>{p.title}</ItemTitle>
                        <ItemSubtitle>{p.subtitle}</ItemSubtitle>
                      </ItemMeta>
                    </ItemWrapper>
                  );
                })}
              </Track>
            </Column>

            <Column>
              <Track ref={track2}>
                {[...projects, ...projects].map((_, i) => {
                  const p = projects[i % projects.length];

                  return (
                   <ItemWrapper
  key={i}
  onMouseEnter={() => setHovered(i)}
  onMouseLeave={() => setHovered(null)}
  onClick={() => navigate(`/projects/${p.id}`)}
>
                      <Item style={{ backgroundImage: `url(${p.image[2]})` }} />
                      <ItemMeta>
                        <ItemTitle>{p.title}</ItemTitle>
                        <ItemSubtitle>{p.subtitle}</ItemSubtitle>
                      </ItemMeta>
                    </ItemWrapper>
                  );
                })}
              </Track>
            </Column>
          </Left>

          <Right>
            <TitleWrapper>
              <TitleTrack>
                <Title>{projects[0]?.title}</Title>
                <Title>{projects[hovered]?.title}</Title>
              </TitleTrack>
            </TitleWrapper>

            <Subtitle>{projects[1]?.subtitle}</Subtitle>

            <Video />
          </Right>
        </Layout>
      ) : (
        <ListView>
          {projects.map((p, i) => (
            <ListRow
              key={i}
              onClick={() => navigate(`/project/${p.id}`)}
            >
              {p.title}
            </ListRow>
          ))}
        </ListView>
      )}

   <Cursor
  ref={cursorRef}
  className={hovered !== null ? "active" : ""}
>
  <CursorInner>
    {hovered !== null ? "VIEW ↗" : ""}
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
    to bottom,
    #E4572E 20%,
    #ffffff 40%
  );
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100%;

  @media (max-width: 768px) {
    display: block;
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
    height: auto;
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
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
`;

const ItemSubtitle = styled.div`
  font-size: 24px;
  color: #666;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 6vw;
  height: 100%;

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
  font-size: clamp(80px, 8vw, 140px);
  white-space: nowrap;
  padding-top: 100px;
`;

const Subtitle = styled.p`
  margin: 40px 0;
  font-size: 28px;
  color: black;
  text-transform: uppercase;
`;

const Video = styled.div`
  height: 500px;
  background: #ddd;
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
  background: #eee;
  border-radius: 999px;
  padding: 6px;

  button {
    border: none;
    background: transparent;
    padding: 8px 18px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .active {
    background: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
  font-size: clamp(40px, 6vw, 80px);
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.3;
    transform: translateX(10px);
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const CursorInner = styled.div`
  background: #111;
  color: #fff;
  padding: 8px 14px;
  border-radius: 999px;

  transform: translate(-50%, -50%) scale(0.8);
  transition: transform 0.2s ease;

  ${Cursor}.active & {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;