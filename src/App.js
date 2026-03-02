import React, { useState } from "react";
import ReliefLanding from "../src/components/ReliefLanding";
import TechGrid from "./components/TechGrid";
import ProjectsShowcase from "./components/ProjectPanels";
import HowIBuild from "./components/HowIBuild";
import InterestSection from "./components/InterestSection";
import ContactModal from "./components/Contact";
import { LanguageProvider } from "./components/LanguageContext";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <LanguageProvider>
      <GlobalStyles />

      <ReliefLanding onContactClick={() => setContactOpen(true)} />
      <TechGrid />
      <HowIBuild />
      <ProjectsShowcase />
      <InterestSection onContactClick={() => setContactOpen(true)}/>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </LanguageProvider>
  );
}

export default App;