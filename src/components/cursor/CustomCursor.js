import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const addHoverEvents = () => {
      const hoverables = document.querySelectorAll("a, button");

      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    addHoverEvents();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Cursor
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
      $hover={isHovering}
      $visible={isVisible}
    />
  );
}

const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #111;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;

  transition: 
    transform 0.15s ease-out,
    width 0.2s ease,
    height 0.2s ease,
    opacity 0.3s ease;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  ${({ $hover }) =>
    $hover &&
    `
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,0.1);
    backdrop-filter: blur(4px);
  `};

  @media (max-width: 768px) {
    display: none;
  }
`;