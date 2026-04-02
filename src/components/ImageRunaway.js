import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f6f3ef;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Track = styled.div`
  display: flex;
  gap: 40px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 20vw;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  flex: 0 0 auto;
  width: 320px;
  height: 420px;

  scroll-snap-align: center;

  transition: all 0.5s ease;

  transform: ${({ active }) =>
    active ? "scale(1)" : "scale(0.8)"};

  opacity: ${({ active }) => (active ? 1 : 0.4)};
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: center;

  border-radius: 18px;
  overflow: hidden;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  padding: 16px;
  width: 100%;
  color: white;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.6),
    transparent
  );
`;

export default function ImageRunway() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
  ];

  // Detectar centro en scroll
  useEffect(() => {
    const track = trackRef.current;

    const handleScroll = () => {
      const children = Array.from(track.children);

      let closest = 0;
      let closestOffset = Infinity;

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const offset = Math.abs(
          window.innerWidth / 2 - (rect.left + rect.width / 2)
        );

        if (offset < closestOffset) {
          closestOffset = offset;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    track.addEventListener("scroll", handleScroll);
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (index) => {
    const track = trackRef.current;
    const child = track.children[index];

    child.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  return (
    <Wrapper>
      <Track ref={trackRef}>
        {images.map((src, i) => (
          <Item
            key={i}
            active={i === activeIndex}
            onClick={() => handleClick(i)}
          >
            <Image src={src}>
              <Overlay>
                <h4>Proyecto {i + 1}</h4>
              </Overlay>
            </Image>
          </Item>
        ))}
      </Track>
    </Wrapper>
  );
}