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
import TechArsenal from "./components/TechArsenal/TechArsenal";
import ProjectsSection from "./components/proyectos/Proyectos";



const lightTheme = {
  background: "#f5f1eb",
  text: "#1d1d1d",
  secondaryText: "#555",
  accent: "#c2a98a",
  card: "#ffffff",
  bubbleColor: "#ffffff",
  overlayColors: ["#F8E71C", "#FF6B35", "#4A90E2"],
  gradientStart: "#4A90E2",
  gradientEnd: "#FCF1E7",
  shapes: ["#E4572E", "#4A90E2", "#F2C94C", "#3A7D44", "#9B59B6"],
};

const darkTheme = {
  background: "#0b0b0c",
  text: "#ffffff",
  secondaryText: "rgba(255,255,255,0.7)",
  accent: "#888888",
  card: "#1a1a1a",
  bubbleColor: "#ffffff",
  overlayColors: ["#333333", "#555555", "#000000"],
  gradientStart: "#333333",
  gradientEnd: "#0b0b0c",
  shapes: ["#ffffff", "#cccccc", "#999999", "#666666", "#333333"],
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
                       <TechArsenal />
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