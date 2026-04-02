import React from "react";
import styled from "styled-components";

export default function ProjectsShowcase({ project, onClose }) {
  if (!project) return null;

  return (
    <Overlay>
      <Container>
        <Left>
          <img src={project.image} alt={project.title} />
        </Left>

        <Right>
          <Close onClick={onClose}>Close</Close>

          <Meta>
            <span>INSPIRE</span>
            <small>({project.month})</small>
          </Meta>

          <Title>{project.title}</Title>

          <Text>{project.description}</Text>

          <Footer>
            <a href={project.link} target="_blank" rel="noreferrer">
              View Project ↗
            </a>
          </Footer>
        </Right>
      </Container>
    </Overlay>
  );
}

/* STYLES */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #f5f5f5;
  z-index: 999;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px;

  img {
    max-width: 100%;
    max-height: 80%;
    object-fit: cover;
  }
`;

const Right = styled.div`
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Close = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Meta = styled.div`
  margin-bottom: 20px;

  span {
    background: #e6d9ff;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 12px;
    margin-right: 10px;
  }

  small {
    font-size: 12px;
    color: #555;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  max-width: 500px;
  color: #333;
`;

const Footer = styled.div`
  margin-top: 40px;

  a {
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid black;
  }
`;