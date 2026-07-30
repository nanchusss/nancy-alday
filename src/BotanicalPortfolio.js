import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowLongRight, HiArrowUpRight } from "react-icons/hi2";
import nido from "./IMAGES/projectsdesktop/movil nido.png";
import umbral from "./IMAGES/projectsdesktop/umbral generales/umbralfotolinda.png";
import baseMendoza from "./IMAGES/base-mendoza.png";
import finestra from "./IMAGES/finestraserveis.png";
import taller from "./IMAGES/projectsdesktop/portada-el-taller.jpg";
import botanicalGarden from "./IMAGES/botanical-garden-v2.jpg";
import botanicalFoliage from "./IMAGES/botanical-foliage.png";
import botanicalFlowers from "./IMAGES/botanical-flowers.png";
import botanicalVillage from "./IMAGES/botanical-village.png";
import flowerProtea from "./IMAGES/flower-protea.jpg";
import flowerDelphinium from "./IMAGES/flower-delphinium.jpg";
import flowerDahlia from "./IMAGES/flower-dahlia.jpg";
import flowerPoppy from "./IMAGES/flower-poppy.jpg";
import flowerCosmos from "./IMAGES/flower-cosmos.jpg";
import "./BotanicalPortfolio.css";

const botanicalProjects = [
  { name: "Nido Portal", latin: "Habitat digitalis", type: "Producto digital", description: "Una plataforma que reúne hogares, profesionales y servicios en una experiencia simple y cercana.", image: nido, flower: flowerProtea, url: "https://www.nidoportal.com", color: "coral" },
  { name: "Umbral Premium", latin: "Limen mediterraneum", type: "Identidad & experiencia", description: "Identidad y experiencia digital para descubrir propiedades singulares con calma, claridad y carácter.", image: umbral, flower: flowerDelphinium, url: "https://umbral-premium.com", color: "violet" },
  { name: "Base Mendoza", latin: "Logistica cuyana", type: "Plataforma web", description: "Una presencia digital clara para una empresa de logística que conecta Mendoza con todo el país.", image: baseMendoza, flower: flowerDahlia, url: "https://www.base-mendoza.com", color: "blue" },
  { name: "Finestra Serveis", latin: "Fenestra clara", type: "Web corporativa", description: "Web corporativa enfocada en explicar servicios, transmitir confianza y convertir consultas en oportunidades.", image: finestra, flower: flowerPoppy, url: "https://finestraserveis.com", color: "yellow" },
  { name: "El Taller", latin: "Officina communis", type: "Artesanía & reservas", description: "Una experiencia cálida para conocer el espacio, explorar la cerámica y reservar una plaza en el taller.", image: taller, flower: flowerCosmos, url: "https://eltaller-aguaymanto.com", color: "pink" },
];

function VersionSwitch() {
  return <nav className="portfolio-switch botanical-switch" aria-label="Versión del portfolio"><a href="/v1">V1</a><a className="active" href="/v2">V2</a></nav>;
}

export default function BotanicalPortfolio() {
  const [activeCard, setActiveCard] = useState(null);
  const toggleCard = (index) => setActiveCard((current) => current === index ? null : index);
  const handleCardTap = (index) => {
    if (window.matchMedia("(hover: none)").matches) toggleCard(index);
  };
  const gardenRef = useRef(null);
  const { scrollYProgress: gardenProgress } = useScroll({ target: gardenRef, offset: ["start end", "end start"] });
  const gardenY = useTransform(gardenProgress, [0, 1], ["-7%", "7%"]);
  const gardenScale = useTransform(gardenProgress, [0, .5, 1], [1.08, 1, 1.08]);

  return (
    <main className="botanical-page">
      <VersionSwitch />
      <header className="bot-nav">
        <a className="bot-logo" href="#bot-top">Nancy Alday</a>
        <p>Diseño digital<br/>con naturaleza propia</p>
        <nav><a href="#bot-work">Proyectos</a><a href="#bot-about">Sobre mí</a><a href="#bot-contact">Contacto</a></nav>
      </header>

      <section className="bot-garden" id="bot-top" ref={gardenRef} aria-label="Jardín imaginario">
        <motion.img src={botanicalGarden} alt="Paisaje botánico imaginario con flores, hojas y pequeñas casas" style={{ y: gardenY, scale: gardenScale }}/>
        <div className="bot-garden-wash"/>
        <motion.div className="bot-garden-title" initial={{ x: -35, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .9, delay: .15, ease: [0.16, 1, 0.3, 1] }}><span>Entre estrategia y sensibilidad</span><h2>Entra al<br/><em>jardín.</em></h2></motion.div>
        <motion.p initial={{ y: 24, opacity: 0, rotate: -2 }} animate={{ y: 0, opacity: 1, rotate: -2 }} transition={{ duration: .75, delay: .7 }}>Las ideas también necesitan<br/>suelo, tiempo y cuidado.</motion.p>
      </section>

      <section className="bot-work" id="bot-work">
        <div className="bot-work-botanics" aria-hidden="true"><motion.img className="organic-foliage-one" src={botanicalFoliage} initial={{ y: 80, rotate: 8 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true }}/><motion.img className="organic-flowers-one" src={botanicalFlowers} initial={{ y: 90, rotate: -9 }} whileInView={{ y: 0, rotate: -2 }} viewport={{ once: true }}/></div>
        <header><span>01 / Especies seleccionadas</span><h2>Proyectos<br/><em>en flor.</em></h2><p>Cada proyecto pide su propio clima: estrategia, identidad, tecnología y cuidado continuo.</p></header>
        <div className="bot-project-grid">
          {botanicalProjects.map((project, index) => (
            <motion.article className={`bot-project bot-${project.color}${activeCard === index ? " is-flipped" : ""}`} key={project.name} initial={{ y: 80, opacity: 0, rotate: index % 2 ? 3 : -3 }} whileInView={{ y: 0, opacity: 1, rotate: index % 2 ? 1.4 : -1.2 }} whileHover={{ y: -14, rotate: 0, scale: 1.012 }} whileTap={{ scale: .985 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .8, delay: index * .04, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bot-card-link" role="button" tabIndex="0" aria-label={`Descubrir ${project.name}`} aria-pressed={activeCard === index} onClick={() => handleCardTap(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleCard(index); } }}>
                <div className="bot-card-inner">
                  <div className="bot-card-face bot-card-front">
                    <img src={project.flower} alt={`Ilustración botánica de ${project.latin}`}/>
                    <span className="bot-card-number">0{index + 1}</span>
                    <div className="bot-specimen-copy"><small>{project.latin}</small><h3>{project.name}</h3><span>Descubrir ↻</span></div>
                  </div>
                  <div className="bot-card-face bot-card-back">
                    <div className="bot-card-back-media"><img src={project.image} alt={`Vista del proyecto ${project.name}`}/></div>
                    <div className="bot-card-back-copy"><small>{project.type}</small><h3>{project.name}</h3><p>{project.description}</p><a className="bot-visit" href={project.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Visitar proyecto <HiArrowUpRight/></a></div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bot-herbarium" id="bot-about">
        <div className="herbarium-art"><motion.img className="herbarium-foliage" src={botanicalFoliage} alt="" initial={{ y: 70, rotate: -7, opacity: 0 }} whileInView={{ y: 0, rotate: -2, opacity: 1 }} viewport={{ once: true, amount: .48 }} transition={{ duration: .9, delay: .18, ease: [0.16, 1, 0.3, 1] }}/><motion.img className="herbarium-flowers" src={botanicalFlowers} alt="" initial={{ x: 70, rotate: 8, opacity: 0 }} whileInView={{ x: 0, rotate: 2, opacity: 1 }} viewport={{ once: true, amount: .48 }} transition={{ duration: .9, delay: .34, ease: [0.16, 1, 0.3, 1] }}/><span className="specimen-label">N.A / DIGITAL<br/>SPECIMEN 2026</span></div>
        <div className="herbarium-copy">
          <span>02 / Cómo trabajo</span>
          <h2>De la semilla<br/><em>al sistema.</em></h2>
          {[["01","Estrategia","Entender el terreno, las personas y el objetivo."],["02","Diseño","Dar forma a una experiencia clara y memorable."],["03","Desarrollo","Construir con código sólido, accesible y vivo."],["04","Evolución","Medir, aprender y dejar espacio para crecer."]].map(([n,title,text], index) => <motion.div className="herbarium-row" key={n} initial={{ y: 26, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .7 }} transition={{ duration: .65, delay: .12 + index * .08, ease: [0.16, 1, 0.3, 1] }}><b>{n}</b><h3>{title}</h3><p>{text}</p></motion.div>)}
        </div>
      </section>

      <footer className="bot-footer" id="bot-contact">
        <img className="bot-footer-landscape" src={botanicalGarden} alt="" aria-hidden="true"/>
        <div className="bot-footer-wash"/>
        <motion.img className="footer-village" src={botanicalVillage} alt="" aria-hidden="true" initial={{ y: 90, rotate: 3 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}/><span>03 / Contacto</span>
        <motion.h2 initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>¿Plantamos<br/><em>algo juntas?</em></motion.h2>
        <a href="mailto:hola@nancyalday.com">hola@nancyalday.com <HiArrowLongRight/></a>
        <div><span>© 2026 Nancy Alday</span><span>Barcelona / Disponible</span><a href="#bot-top">Volver arriba ↑</a></div>
      </footer>
    </main>
  );
}
