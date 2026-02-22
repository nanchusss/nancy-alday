import React from "react";
import ReliefLanding from "../src/components/ReliefLanding";
import TechGrid from "./components/TechGrid";
import ProjectsShowcase from "./components/ProjectPanels";
import HowIBuild from "./components/HowIBuild";
import { LanguageProvider } from "./components/LanguageContext"; 
import Header from "./components/common/Header";



function App() {
  return (
    <LanguageProvider>
      <Header />
      <ReliefLanding />
      <TechGrid />
      <HowIBuild />
      <ProjectsShowcase />
    </LanguageProvider>
  );
}

   


export default App;