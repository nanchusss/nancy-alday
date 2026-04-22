import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProjectDetail from "./components/ProjectDetail"; // 👈 NUEVO

import Header from "./components/common/Header";
import ContactModal from "./components/Contact";
import { LanguageProvider } from "./components/LanguageContext";
import GlobalStyles from "./styles/GlobalStyles";


import HowIThink from "./components/HowIThink/Images/HowIThink";

import { ThemeProvider } from "styled-components";
import CustomCursor from "./components/cursor/CustomCursor";
import CursorTrail from "./components/cursor/CursorTrail";

import ScrollRevealSection from "./components/Home/Home";
import ProjectsSection from "./components/proyectos/Proyectos";



const lightTheme = {
  background: "#f5f1eb",
  text: "#1d1d1d",
  secondaryText: "#555",
  accent: "#c2a98a",
  card: "#ffffff",
};

const darkTheme = {
  background: "#0b0b0c",
  text: "#F5F1EA",
  secondaryText: "rgba(245,241,234,0.65)",
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
      <BrowserRouter>
<CursorTrail />
        <CustomCursor />

        <LanguageProvider>
         

          <GlobalStyles />

          <Routes>
            {/* LANDING */}
            <Route
              path="/"
              element={
                <>
               
                 
                    <ScrollRevealSection /> {/* 🔥 AQUÍ */}
                      
                       <HowIThink />
<ProjectsSection />
                        <Header
            isDark={isDark}
            toggleTheme={toggleTheme}
            onContactClick={() => setContactOpen(true)}
          />
                </>
              }
            />

           

            {/* DETALLE */}
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>

          <ContactModal
            isOpen={contactOpen}
            onClose={() => setContactOpen(false)}
          />
        </LanguageProvider>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;