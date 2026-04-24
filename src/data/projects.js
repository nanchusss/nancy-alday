import taller1 from "../IMAGES/eltaller1.png";
import taller2 from "../IMAGES/eltaller2.png";
import taller3 from "../IMAGES/eltaller3.png";
import taller4 from "../IMAGES/eltaller4.png";

import mobiletaller1 from "../IMAGES/taller1.png";
import mobiletaller2 from "../IMAGES/taller2.png";
import mobiletaller3 from "../IMAGES/taller3.png";
import mobiletaller4 from "../IMAGES/taller4.png";    
import mobiletaller5 from "../IMAGES/taller5.png";
import mobiletaller6 from "../IMAGES/taller6.png";
import mobiletaller7 from "../IMAGES/taller7.png";

import proyecto2 from "../IMAGES/finestra-serveis.png";


import base1 from "../IMAGES/base2.png";
import base3 from "../IMAGES/base3.png";
import base4 from "../IMAGES/base4.png";
import base5 from "../IMAGES/base5.png";
import base6 from "../IMAGES/base6.png";

import basemobile1 from "../IMAGES/basemobile1.jpg";
import basemobile2 from "../IMAGES/basemobile2.jpg";
import basemobile3 from "../IMAGES/basemobile3.jpg";
import basemobile4 from "../IMAGES/basemobile4.jpg";
import basemobile5 from "../IMAGES/basemobile5.jpg";
import basemobile6 from "../IMAGES/basemobile6.jpg";


import finestra1 from "../IMAGES/finestra1.png";
import finestra2 from "../IMAGES/finestra2.png";
import finestra3 from "../IMAGES/finestra3.png";
import finestra4 from "../IMAGES/finestra4.png";
import finestra5 from "../IMAGES/finestra5.png";
import finestra6 from "../IMAGES/finestra6.png";

export const projects = [
  {
    id: "taller",
    title: "EL TALLER de Aguaymanto",
    image: [taller1, taller2, taller3, taller4],
    imageMobile: [mobiletaller1, mobiletaller2, mobiletaller3, mobiletaller4, mobiletaller5, mobiletaller6, mobiletaller7],
    url: "https://eltaller-aguaymanto.com",
    tags: ["React", "UX/UI", "Design", "Styled Components", "Calendar"],
    videoMobile: {
  src: "/videos/videoeltallermobile.mp4",
  type: "video/mp4"
},
videoDesktop: {
  src: "/videos/videoeltallerdesktop.mp4",
  type: "video/mp4"
}
  },
  {
    id: "finestra",
    title: "Finestra Serveis",
    image: [finestra1, finestra2, finestra3, finestra4, finestra5, finestra6, proyecto2],
    imageMobile: [],
    url: "https://finestraserveis.com",
    tags: ["React", "UX/UI", "Design", "Styled Components"]
  },
  {
    id: "base",
    title: "Base Mendoza",
    image: [base1, base3, base4, base5, base6],
    imageMobile: [basemobile1, basemobile2, basemobile3, basemobile4, basemobile5, basemobile6],
    url: "https://base-mendoza.com",
    tags: ["React", "UX/UI", "Design", "Styled Components"]
  }
];