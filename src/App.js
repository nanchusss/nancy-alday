import React from "react";
import ReliefLanding from "../src/components/ReliefLanding";
import TechGrid from "./components/TechGrid";
import ProjectsShowcase from "./components/ProjectPanels";
import HowIBuild from "./components/HowIBuild";
import { LanguageProvider } from "./components/LanguageContext"; 



function App() {
  return (
    <LanguageProvider>
      <ReliefLanding />
      <TechGrid />
      <HowIBuild />
      <ProjectsShowcase />
    </LanguageProvider>
  );
}

   


export default App;