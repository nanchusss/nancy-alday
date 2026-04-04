import styled from "styled-components";


export default function ScrollHint({ direction }) {
  return (
    <HintWrapper>
      <Arrow direction={direction} />
    </HintWrapper>
  );
}

const HintWrapper = styled.div`
  position: fixed;

  top: 25%;
  right: 80px;
  transform: translateY(-50%);

  z-index: 999;
  pointer-events: none;

  /* 📱 MOBILE CORRECTO */
  @media (max-width: 768px) {
    top: 25%;
    bottom: 24px;

    left: 95%;
    right: auto;

    transform: translateX(-50%);
  }
`;

const Arrow = styled.div`
  width: 22px;
  height: 22px;

  border-right: 2px solid black;
  border-bottom: 2px solid black;

  /* 🔥 magia real */
  mix-blend-mode: difference;

  transform: rotate(-45deg);

  animation: bounceRight 1.2s infinite;

  opacity: 0.9;

  @keyframes bounceRight {
    0%, 100% {
      transform: translateX(0) rotate(-45deg);
    }
    50% {
      transform: translateX(8px) rotate(-45deg);
    }
  }
`;