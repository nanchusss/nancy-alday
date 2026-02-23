import React from "react";
import ReliefLanding from "../src/components/ReliefLanding";
import TechGrid from "./components/TechGrid";
import ProjectsShowcase from "./components/ProjectPanels";
import HowIBuild from "./components/HowIBuild";
import { LanguageProvider } from "./components/LanguageContext"; 
import GlobalStyles from "./styles/GlobalStyles";




function App() {
  return (
   <LanguageProvider>
  <GlobalStyles />
 
  <ReliefLanding />
  <TechGrid />
  <HowIBuild />
  <ProjectsShowcase />
</LanguageProvider>
  );
}

   


export default App;