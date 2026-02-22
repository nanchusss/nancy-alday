import React, { useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../components/LanguageContext";

export default function HowIBuild() {
  const { t } = useContext(LanguageContext);

  if (!t?.howIBuild?.blocks) return null;

  return (
    <Section>
      <Container>
        <Title>{t.howIBuild.title}</Title>

        <Grid>
          {t.howIBuild.blocks.map((block, index) => (
            <Block key={index}>
              <BlockTitle>{block.title}</BlockTitle>
              <BlockText>{block.text}</BlockText>
            </Block>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

/* ================= STYLES ================= */

const Section = styled.section`
  background: #f8f5ef;
  padding: 180px 0;
`;

const Container = styled.div`
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: 48px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 120px;
  color: #2f2c27;
  letter-spacing: 3px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const Block = styled.div`
  max-width: 480px;
`;

const BlockTitle = styled.h3`
  font-family: "Cormorant Garamond", serif;
  font-size: 28px;
  margin-bottom: 20px;
  color: #3a3732;
`;

const BlockText = styled.p`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #4a4741;
`;