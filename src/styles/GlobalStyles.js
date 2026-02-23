import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  /* RESET BÁSICO */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #e9e4da;
    font-family: "Prata", serif;
    color: #2f2c27;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* TIPOGRAFÍA */

  h1, h2, h3, h4 {
    font-family: "Prata", serif;
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