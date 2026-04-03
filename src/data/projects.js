import taller1 from "../IMAGES/eltaller1.png";
import taller2 from "../IMAGES/eltaller2.png";
import taller3 from "../IMAGES/eltaller3.png";
import taller4 from "../IMAGES/eltaller4.png";

import proyecto2 from "../IMAGES/finestra-serveis.png";

import base1 from "../IMAGES/base1.png";
import base2 from "../IMAGES/base2.png";
import base3 from "../IMAGES/base3.png";
import base4 from "../IMAGES/base4.png";
import base5 from "../IMAGES/base5.png";
import base6 from "../IMAGES/base6.png";

export const projects = [
  {
    title: "El Taller Aguaymanto",
    image: [taller1, taller2, taller3, taller4],
    url: "https://eltaller-aguaymanto.com",
    description: [
      "Plataforma digital para un estudio artístico centrado en cerámica contemporánea.",
      "Diseñé una experiencia visual que mezcla narrativa editorial con navegación clara.",
      "Desarrollado en React priorizando rendimiento y estética."
    ],
    tags: ["React", "UX/UI", "Design", "Styled Components", "Calendar"]
  },
  {
    title: "Finestra Serveis",
    image: [proyecto2],
    url: "https://finestraserveis.com",
    description: [
      "Web corporativa enfocada en conversión para servicios de aluminio y PVC.",
      "Optimicé la jerarquía visual para mejorar la comprensión del usuario.",
      "Implementación en React con foco en claridad y estructura."
    ],
    tags: ["React", "UX/UI", "Design", "Styled Components"]
  },
  {
    title: "Base Mendoza",
    image: [base1, base2, base3, base4, base5, base6],
    url: "https://base-mendoza.com",
    description: [
      "Proyecto para empresa de logística y transporte.",
      "Exploración de interacción, tipografía y ritmo visual.",
      "Desarrollo frontend orientado a experiencia de usuario."
    ],
    tags: ["React", "UX/UI", "Design", "Styled Components"]
  }
];