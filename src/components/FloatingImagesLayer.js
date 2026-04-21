import styled from "styled-components";

export default function FloatingImagesLayer({ images }) {
  return (
    <Layer>
      {images.map((img, index) => (
        <Image
          key={img.id}
          src={img.src}
          style={{
            top: `${1 + index * 2}%`,
            right: `${1 + index * 2}%`,
            zIndex: 1000 + index,
          }}
        />
      ))}
    </Layer>
  );
}

const Layer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
`;

const Image = styled.img`
  position: absolute;

  width: 45vw;
  max-width: 800px;

  border-radius: 4px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.25);

  transform: translate(120%, -120%) scale(0.6);
  opacity: 0;

  animation: enter 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  @keyframes enter {
    to {
      transform: translate(0%, 0%) scale(1);
      opacity: 1;
    }
  }
`;