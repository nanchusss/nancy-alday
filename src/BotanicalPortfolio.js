import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiArrowLongRight, HiArrowUpRight } from "react-icons/hi2";
import Seo from "./Seo";
import ProjectDiagnostic from "./ProjectDiagnostic";
import nido from "./IMAGES/projectsmobile/nido-desktop-crop.png";
import umbral from "./IMAGES/projectsmobile/umbralbuena.svg";
import umbralMobile from "./IMAGES/projectsmobile/umbralpc-v2-crop.png";
import baseMendoza from "./IMAGES/projectsmobile/basebueno.svg";
import finestra from "./IMAGES/projectsmobile/finestra-svg-clean.png";
import taller from "./IMAGES/projectsmobile/taller-v2-crop-hq.png";
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
  { name: "Nido Portal", latin: "Habitat digitalis", type: "Full-stack · End-to-end", description: "Producto inmobiliario completo: estrategia, diseño, frontend, backend y operación conectados.", features: ["Automatización", "Mensajería interna", "Perfiles por rol", "Pagos online", "Emails", "Dominios propios"], stack: ["React", "Node", "MongoDB", "Cloudinary", "APIs", "IA aplicada"], image: nido, flower: flowerProtea, url: "https://www.nidoportal.com", color: "coral" },
  { name: "Umbral Premium", latin: "Limen mediterraneum", type: "Full-stack · End-to-end", description: "Experiencia premium y herramienta comercial construidas como un único producto digital.", features: ["Gestor de presupuestos", "Envío desde la app", "Gestión de productos", "Backend", "Emails", "SEO"], stack: ["React", "APIs", "Backend", "Motion", "IA aplicada", "Dominio propio"], image: umbral, imageMobile: umbralMobile, flower: flowerDelphinium, url: "https://umbral-premium.com", color: "violet" },
  { name: "Base Mendoza", latin: "Logistica cuyana", type: "Plataforma web", description: "Una presencia clara y ágil para conectar servicios logísticos con nuevas oportunidades.", features: ["Arquitectura UX", "Servicios", "Contacto directo", "SEO", "Diseño responsive"], stack: ["React", "Motion", "Forms", "Analytics"], image: baseMendoza, flower: flowerDahlia, url: "https://www.base-mendoza.com", color: "blue" },
  { name: "Finestra Serveis", latin: "Fenestra clara", type: "Web empresarial · Multipágina", description: "Sitio corporativo que organiza servicios, genera confianza y conecta consultas con el negocio.", features: ["Varias páginas", "Integraciones", "Captación de leads", "Multilingüe", "Formularios", "SEO"], stack: ["React", "EmailJS", "Responsive", "Analytics"], image: finestra, flower: flowerPoppy, url: "https://finestraserveis.com", color: "yellow" },
  { name: "El Taller", latin: "Officina communis", type: "Full-stack · Reservas", description: "Una experiencia cálida con la lógica necesaria para gestionar la actividad diaria del taller.", features: ["Agenda online", "Gestor de reservas", "Pasarela de pago", "Talleres", "Contenido", "Comunidad"], stack: ["React", "Pagos", "Booking", "Backend", "Email", "Responsive"], image: taller, flower: flowerCosmos, url: "https://eltaller-aguaymanto.com", color: "pink" },
];

function VersionSwitch() {
  return <nav className="portfolio-switch botanical-switch" aria-label="Versión del portfolio"><a href="/v1">V1</a><a className="active" href="/v2">V2</a></nav>;
}

export default function BotanicalPortfolio() {
  const [activeCard, setActiveCard] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleCard = (index) => setActiveCard((current) => current === index ? null : index);
  const handleCardTap = (index) => {
    if (window.matchMedia("(hover: none)").matches) toggleCard(index);
  };
  const gardenRef = useRef(null);
  const { scrollYProgress: gardenProgress } = useScroll({ target: gardenRef, offset: ["start end", "end start"] });
  const gardenY = useTransform(gardenProgress, [0, 1], ["-7%", "7%"]);
  const gardenScale = useTransform(gardenProgress, [0, .5, 1], [1.08, 1, 1.08]);
  useEffect(() => {
    if (!mobileMenu) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event) => { if (event.key === "Escape") setMobileMenu(false); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [mobileMenu]);

  return (
    <main className="botanical-page">
      <Seo
        language="es"
        path="/v2"
        title="Nancy Alday | Diseño web creativo, desarrollo full-stack y automatización"
        description="Portfolio creativo de Nancy Alday, diseñadora digital y desarrolladora full-stack en Barcelona. Diseño páginas web con identidad y construyo la tecnología que las hace funcionar: React, backend, APIs, reservas, pagos, automatización e IA."
        pageName="Portfolio creativo de diseño y desarrollo digital"
      />
      <VersionSwitch />
      <ProjectDiagnostic variant="v2" language="es"/>
      <header className="bot-nav">
        <a className="bot-logo" href="#bot-top">Nancy Alday</a>
        <p>Diseño digital con naturaleza propia</p>
        <nav className="bot-desktop-nav"><a href="#bot-work">Proyectos</a><a href="#bot-about">Sobre mí</a><a href="/contacto?from=v2">Contacto</a></nav>
        <button className={`bot-menu-toggle${mobileMenu ? " open" : ""}`} type="button" aria-label={mobileMenu ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileMenu} aria-controls="bot-mobile-menu" onClick={() => setMobileMenu((open) => !open)}><span/><span/></button>
      </header>
      <motion.aside id="bot-mobile-menu" className="bot-mobile-menu" aria-hidden={!mobileMenu} animate={{ clipPath: mobileMenu ? "inset(0% 0% 0% 0% round 0px)" : "inset(0% 0% 100% 0% round 0px)" }} transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }}>
        <span>Explorar / Portfolio 2026</span>
        <nav>{[["01","Proyectos","#bot-work"],["02","Qué hago","#bot-capabilities"],["03","Sobre mí","#bot-about"],["04","Contacto","/contacto?from=v2"]].map(([number,label,href]) => <a key={href} href={href} onClick={() => setMobileMenu(false)}><small>{number}</small><b>{label}</b><HiArrowUpRight/></a>)}</nav>
        <div><a href="/contacto?from=v2">Cuéntame tu proyecto</a><span>Barcelona · Disponible</span></div>
      </motion.aside>

      <section className="bot-garden" id="bot-top" ref={gardenRef} aria-label="Jardín imaginario">
        <motion.img src={botanicalGarden} alt="Paisaje botánico imaginario con flores, hojas y pequeñas casas" style={{ y: gardenY, scale: gardenScale }}/>
        <div className="bot-garden-wash"/>
        <motion.div className="bot-garden-title" initial={{ x: -35, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .9, delay: .15, ease: [0.16, 1, 0.3, 1] }}><span>Entre estrategia y sensibilidad</span><h2>Entra al<br/><em>jardín.</em></h2></motion.div>
        <motion.p initial={{ y: 24, opacity: 0, rotate: -2 }} animate={{ y: 0, opacity: 1, rotate: -2 }} transition={{ duration: .75, delay: .7 }}>Las ideas también necesitan<br/>suelo, tiempo y cuidado.</motion.p>
      </section>

      <section className="bot-work" id="bot-work">
        <div className="bot-work-botanics" aria-hidden="true"><motion.img className="organic-foliage-one" src={botanicalFoliage} initial={{ y: 80, rotate: 8 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true }}/><motion.img className="organic-flowers-one" src={botanicalFlowers} initial={{ y: 90, rotate: -9 }} whileInView={{ y: 0, rotate: -2 }} viewport={{ once: true }}/></div>
        <header><span>01 / Especies seleccionadas</span><h2>Proyectos<br/><em>en flor.</em></h2></header>
        <div className="bot-project-grid">
          {botanicalProjects.map((project, index) => (
            <motion.article className={`bot-project bot-${project.color}${activeCard === index ? " is-flipped" : ""}`} key={project.name} initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} whileHover={{ y: -14, scale: 1.012 }} whileTap={{ scale: .985 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .8, delay: index * .04, ease: [0.16, 1, 0.3, 1] }}>
              <div className="bot-card-link" role="button" tabIndex="0" aria-label={`Descubrir ${project.name}`} aria-pressed={activeCard === index} onClick={() => handleCardTap(index)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); toggleCard(index); } }}>
                <div className="bot-card-inner">
                  <div className="bot-card-face bot-card-front">
                    <img src={project.flower} alt={`Ilustración botánica de ${project.latin}`}/>
                    <span className="bot-card-number">0{index + 1}</span>
                    <div className="bot-specimen-copy"><small>{project.latin}</small><h3>{project.name}</h3><span>Descubrir ↻</span></div>
                  </div>
                  <div className="bot-card-face bot-card-back">
                    <div className="bot-card-back-media"><picture>{project.imageMobile && <source media="(max-width: 800px)" srcSet={project.imageMobile}/>}<img src={project.image} alt={`Vista del proyecto ${project.name}`}/></picture></div>
                    <div className="bot-card-back-copy">
                      <small>{project.type}</small><h3>{project.name}</h3><p>{project.description}</p>
                      <div className="bot-card-details"><div className="bot-feature-list"><b>Lo que vive adentro</b><ul>{project.features.map((feature, featureIndex) => <li key={feature}><span>0{featureIndex + 1}</span>{feature}</li>)}</ul></div><div className="bot-stack-list"><b>Construido con</b><p>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</p></div></div>
                      <a className="bot-visit" href={project.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Visitar proyecto <HiArrowUpRight/></a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bot-capabilities" id="bot-capabilities" aria-labelledby="bot-capabilities-title">
        <header><span>02 / Qué hago</span><h2 id="bot-capabilities-title">Cultivo ideas.<br/><em>Construyo sistemas.</em></h2><p>Diseño lo visible y desarrollo la estructura que permite que una experiencia funcione, conecte y evolucione.</p></header>
        <div className="bot-capability-list">
          {[["01","Dirección digital","Concepto, narrativa, UX/UI e identidad para convertir una idea en una presencia reconocible."],["02","Desarrollo full-stack","Interfaces React, backend, datos, APIs e integraciones trabajando como un solo producto."],["03","Automatización & IA","Flujos, formularios, CRM, emails y asistentes que reducen tareas y multiplican posibilidades."],["04","Producto end-to-end","De la estrategia al lanzamiento: diseño, código, medición, mantenimiento y evolución continua."]].map(([number, title, text], index) => <motion.article key={title} initial={{ y: 45, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .55 }} transition={{ duration: .7, delay: index * .08, ease: [0.16, 1, 0.3, 1] }}><span>{number}</span><h3>{title}</h3><p>{text}</p><HiArrowUpRight/></motion.article>)}
        </div>
      </section>

      <section className="bot-herbarium" id="bot-about">
        <div className="herbarium-art"><motion.img className="herbarium-foliage" src={botanicalFoliage} alt="" initial={{ y: 70, rotate: -7, opacity: 0 }} whileInView={{ y: 0, rotate: -2, opacity: 1 }} viewport={{ once: true, amount: .48 }} transition={{ duration: .9, delay: .18, ease: [0.16, 1, 0.3, 1] }}/><motion.img className="herbarium-flowers" src={botanicalFlowers} alt="" initial={{ x: 70, rotate: 8, opacity: 0 }} whileInView={{ x: 0, rotate: 2, opacity: 1 }} viewport={{ once: true, amount: .48 }} transition={{ duration: .9, delay: .34, ease: [0.16, 1, 0.3, 1] }}/><span className="specimen-label">N.A / DIGITAL<br/>SPECIMEN 2026</span></div>
        <div className="herbarium-copy">
          <span>03 / Cómo trabajo</span>
          <h2>De la semilla<br/><em>al sistema.</em></h2>
          {[["01","Estrategia","Entender el terreno, las personas y el objetivo."],["02","Diseño","Dar forma a una experiencia clara y memorable."],["03","Desarrollo","Construir con código sólido, accesible y vivo."],["04","Evolución","Medir, aprender y dejar espacio para crecer."]].map(([n,title,text], index) => <motion.div className="herbarium-row" key={n} initial={{ y: 26, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .7 }} transition={{ duration: .65, delay: .12 + index * .08, ease: [0.16, 1, 0.3, 1] }}><b>{n}</b><h3>{title}</h3><p>{text}</p></motion.div>)}
        </div>
      </section>


      <footer className="bot-footer" id="bot-contact">
        <img className="bot-footer-landscape" src={botanicalGarden} alt="" aria-hidden="true"/>
        <div className="bot-footer-wash"/>
        <motion.img className="footer-village" src={botanicalVillage} alt="" aria-hidden="true" initial={{ y: 90, rotate: 3 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}/><span>04 / Contacto</span>
        <motion.h2 initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>¿Plantamos<br/><em>algo juntas?</em></motion.h2>
        <a href="/contacto?from=v2">Cuéntame tu proyecto <HiArrowLongRight/></a>
        <div><span>2026 NaN Estudio Digital</span><span>Barcelona / Disponible</span><a href="#bot-top">Volver arriba ↑</a></div>
      </footer>
    </main>
  );
}
