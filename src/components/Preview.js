import React, { useState } from "react"
import styled from "styled-components"

export default function Preview({ project, onClose, onEnter }) {
  const [index, setIndex] = useState(0)

  return (
    <Overlay>
      <Close onClick={onClose}>×</Close>

      <Content>
        <img src={project.image[index]} alt="" />
      </Content>

      <Controls>
        <button onClick={() => setIndex((i) => Math.max(i - 1, 0))}>
          ←
        </button>

        <button
          onClick={() =>
            setIndex((i) =>
              Math.min(i + 1, project.image.length - 1)
            )
          }
        >
          →
        </button>
      </Controls>

      <EnterButton onClick={onEnter}>
        View Project →
      </EnterButton>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #0b0b0c;
  z-index: 999999; /* 🔥 MUY ALTO */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  width: 90%;
  height: 70vh;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;

  button {
    padding: 10px 16px;
    cursor: pointer;
  }
`

const EnterButton = styled.button`
  margin-top: 40px;
  padding: 14px 24px;
  cursor: pointer;
`

const Close = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  font-size: 32px;
  color: white;
  cursor: pointer;
`