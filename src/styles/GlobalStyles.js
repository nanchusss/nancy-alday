import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  /* ================= FONTS ================= */

  @font-face {
    font-family: "Canela";
    src: url("/fonts/Canela-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Canela";
    src: url("/fonts/Canela-Medium.woff2") format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  /* ================= RESET ================= */

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;

    background: ${({ theme }) => theme.background || "#0b0b0c"};

    /* 🔥 FORZAMOS CONTRASTE REAL */
    color: ${({ theme }) => theme.text || "#F5F1EA"};

    font-family: "Prata", serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    transition: background 0.3s ease, color 0.3s ease;
  }

  /* ================= TIPOGRAFÍA ================= */

  h1, h2, h3, h4 {
    font-family: "Canela", serif;
    font-weight: 400;
    margin: 0;

    /* 🔥 CLAVE: no gris, casi blanco */
    color: ${({ theme }) => theme.text || "#F5F1EA"};
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    line-height: 1.6;

    /* 🔥 secundario visible (no muerto) */
    color: ${({ theme }) => theme.secondaryText || "rgba(245,241,234,0.7)"};
  }

  button, input, textarea {
    font-family: "IBM Plex Sans", sans-serif;
    color: ${({ theme }) => theme.text || "#F5F1EA"};
  }

`;

export default GlobalStyles;