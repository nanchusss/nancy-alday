import React, { useState } from "react";
import ReliefLanding from "./components/ReliefLandingviejo";
import Header from "./components/common/Header";
import ContactModal from "./components/Contact";
import { LanguageProvider } from "./components/LanguageContext";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./components/Home";
import { ThemeProvider } from "styled-components";

import CustomCursor from "./components/CustomCursor";

const lightTheme = {
  background: "#f5f1eb",
  text: "#1d1d1d",
  secondaryText: "#555",
  accent: "#c2a98a",
  card: "#ffffff",
};

const darkTheme = {
  background: "#0b0b0c", // más profundo y elegante
  text: "#F5F1EA", // blanco cálido (clave)
  secondaryText: "rgba(245,241,234,0.65)", // legible pero suave
  accent: "#d6bfa3",
  card: "#161616",
};

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
        <CustomCursor />
      <LanguageProvider>
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
          onContactClick={() => setContactOpen(true)}
          
        />

        <GlobalStyles />
        <Home />

        <ReliefLanding onContactClick={() => setContactOpen(true)} />

       

        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;