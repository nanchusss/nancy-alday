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
    background: #e9e4da;
    font-family: "Prata", serif; /* se mantiene */
    color: #2f2c27;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* ================= TIPOGRAFÍA ================= */

  h1, h2, h3, h4 {
    font-family: "Prata", serif; /* NO lo cambiamos */
    font-weight: 400;
    margin: 0;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }

  button, input, textarea {
    font-family: "IBM Plex Sans", sans-serif;
  }

`;

export default GlobalStyles;