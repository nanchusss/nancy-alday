import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import taller1 from "./images/taller1.png";
import taller2 from "./images/taller2.png";
import taller3 from "./images/taller3.png";


export default function ProjectsSection() {
  const [hovered, setHovered] = useState(null);
  const [mode, setMode] = useState("gallery");

  const projects = [
    { title: "El Taller — Aguaymanto", image: taller1, subtitle: "Lorem ipsum dolor sit amet." },
    { title: "Finestra Serveis", image: taller2, subtitle: "Lorem ipsum dolor sit amet." },
    { title: "Base Mendoza", image: taller3, subtitle: "Lorem ipsum dolor sit amet." },
  ];

  /* ================= CURSOR ================= */

  const cursorRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;

    if (cursorRef.current) {
      cursorRef.current.style.opacity = hovered !== null ? 1 : 0;
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = 0;
  };

  useEffect(() => {
    let raf;
    const animate = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.15;
      current.current.y += (mouse.current.y - current.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px) translate(-50%, -50%)`;
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

  const ITEM_HEIGHT = 260;

  useEffect(() => {
    let raf;
    const isMobile = window.innerWidth < 768;

    // ===== DESKTOP LOOP
    if (!isMobile) {
      let last = performance.now();
      const speed = 0.03;

      const loop = (now) => {
        const delta = now - last;
        last = now;

        // izquierda más lenta
        offset1.current -= delta * speed * 0.5;

        // derecha normal
        offset2.current += delta * speed;

        const limit = 3 * ITEM_HEIGHT;

        if (offset1.current < -limit) offset1.current = 0;
        if (offset2.current > 0) offset2.current = -limit;

        if (track1.current) {
          track1.current.style.transform = `translateY(${offset1.current}px)`;
        }

        if (track2.current) {
          track2.current.style.transform = `translateY(${offset2.current}px)`;
        }

        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }

    // ===== MOBILE (scroll + inercia)
    let target = 0;
    let currentY = 0;

    const handleScroll = () => {
      target = window.scrollY;
    };

    const animate = () => {
      currentY += (target - currentY) * 0.08;

      if (track1.current) {
        track1.current.style.transform = `translateY(${-currentY * 0.4}px)`;
      }

      if (track2.current) {
        track2.current.style.transform = `translateY(${currentY * 0.4}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper>

      <Switch>
        <button className={mode === "gallery" ? "active" : ""} onClick={() => setMode("gallery")}>
          GALLERY
        </button>
        <button className={mode === "list" ? "active" : ""} onClick={() => setMode("list")}>
          LIST
        </button>
      </Switch>

      {mode === "gallery" ? (

        <Layout onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

          <Left>

            <Column>
              <Track ref={track1}>
                {[...projects, ...projects].map((p, i) => (
                  <ItemWrapper
  key={i}
  onMouseEnter={() => setHovered(i)}
  onMouseLeave={() => setHovered(null)}
>
                    <Item style={{ backgroundImage: `url(${p.image})` }} />
                    <ItemMeta>
                      <ItemTitle>{p.title}</ItemTitle>
                      <ItemSubtitle>{p.subtitle}</ItemSubtitle>
                    </ItemMeta>
                  </ItemWrapper>
                ))}
              </Track>
            </Column>

            <Column>
              <Track ref={track2}>
                {[...projects, ...projects].map((p, i) => (
                  <ItemWrapper key={i}>
                    <Item style={{ backgroundImage: `url(${p.image})` }} />
                    <ItemMeta>
                      <ItemTitle>{p.title}</ItemTitle>
                      <ItemSubtitle>{p.subtitle}</ItemSubtitle>
                    </ItemMeta>
                  </ItemWrapper>
                ))}
              </Track>
            </Column>

          </Left>

          <Right>
            <TitleWrapper>
              <Title>LOREM IPSUM LOREM IPSUM</Title>
            </TitleWrapper>

            <Subtitle>
              A curated ceramic experience blending craft, material and space.
            </Subtitle>

            <Video />
          </Right>

        </Layout>

      ) : (
        <ListView>
          {projects.map((p, i) => (
            <ListRow key={i}>{p.title}</ListRow>
          ))}
        </ListView>
      )}

      <Cursor ref={cursorRef}>VIEW ↗</Cursor>

    {hovered !== null && projects[hovered % projects.length] && (
  <Preview style={{ transform: `translate(${mouse.current.x + 60}px, ${mouse.current.y}px)` }}>
    <img src={projects[hovered % projects.length].image} alt="" />
  </Preview>
)}

    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  background: #fff;
  overflow: hidden;


  @media (max-width: 768px) {
    height: auto;
    overflow: visible;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  height: 100%;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Left = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200vh;
  }
`;

const Column = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  font-size: 18px;
`;

const ItemSubtitle = styled.div`
  font-size: 14px;
  color: #666;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 6vw;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TitleWrapper = styled.div`
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: clamp(80px, 8vw, 140px);
  white-space: nowrap;
`;

const Subtitle = styled.p`
  margin: 40px 0;
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
`;

const ListView = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListRow = styled.div`
  font-size: 60px;
`;

const Cursor = styled.div`
  position: fixed;
  pointer-events: none;
  background: #111;
  color: #fff;
  padding: 8px 14px;
  border-radius: 999px;
  opacity: 0;
`;

const Preview = styled.div`
  position: fixed;
  width: 260px;
  height: 280px;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;