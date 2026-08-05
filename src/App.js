import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowLongRight, HiArrowUp, HiArrowUpRight } from "react-icons/hi2";
import Seo from "./Seo";
import ProjectDiagnostic from "./ProjectDiagnostic";
import "./App.css";

import taller from "./IMAGES/projectsmobile/tallerok-crop.png";
import tallerMobile from "./IMAGES/projectsmobile/taller-v2-crop-hq.png";
import finestra from "./IMAGES/projectsmobile/finestradesktop.png";
import finestraMobile from "./IMAGES/projectsmobile/finestraserveismobile.png";
import baseMendoza from "./IMAGES/projectsmobile/basebueno.svg";
import nidoCover from "./IMAGES/projectsmobile/nido-desktop-crop.png";
import nidoMobile from "./IMAGES/projectsmobile/nido.png";
import umbralCover from "./IMAGES/projectsmobile/umbralbuena.svg";
import umbralMobile from "./IMAGES/projectsmobile/umbral.png";
import baseMobile from "./IMAGES/projectsmobile/basemobile.png";
import nidoScene1 from "./IMAGES/projectsdesktop/nido generales/Captura de pantalla 2026-07-29 a las 18.17.59.png";
import nidoScene2 from "./IMAGES/projectsdesktop/nido generales/Captura de pantalla 2026-07-29 a las 18.18.25.png";
import nidoScene3 from "./IMAGES/projectsdesktop/nido generales/Captura de pantalla 2026-07-29 a las 18.18.44.png";
import nidoScene6 from "./IMAGES/projectsdesktop/nido generales/Captura de pantalla 2026-07-29 a las 18.20.02.png";
import umbralScene1 from "./IMAGES/projectsdesktop/umbral generales/Captura de pantalla 2026-07-29 a las 18.21.03.png";
import umbralScene2 from "./IMAGES/projectsdesktop/umbral generales/Captura de pantalla 2026-07-29 a las 18.21.31.png";
import umbralScene3 from "./IMAGES/projectsdesktop/umbral generales/Captura de pantalla 2026-07-29 a las 18.21.46.png";
import umbralScene4 from "./IMAGES/projectsdesktop/umbral generales/Captura de pantalla 2026-07-29 a las 18.22.16.png";
import umbralScene6 from "./IMAGES/projectsdesktop/umbral generales/Captura de pantalla 2026-07-29 a las 18.22.51.png";
import umbralScene7 from "./IMAGES/projectsdesktop/umbral generales/Captura de pantalla 2026-07-29 a las 18.22.59.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    title: "Nido Portal",
    coverTitle: "NIDO",
    type: "Producto digital · Plataforma",
    typeEn: "Digital product · Platform",
    year: "2026",
    url: "https://www.nidoportal.com",
    image: nidoCover,
    imageMobile: nidoMobile,
    tone: "nido",
    description: "Un portal pensado para convertir procesos dispersos en una experiencia simple, clara y útil.",
    descriptionEn: "A portal designed to turn scattered processes into a simple, clear and useful experience.",
    story: "Una plataforma inmobiliaria end-to-end. Diseñé y desarrollé el ecosistema completo: publicación y búsqueda de propiedades, perfiles, mensajería, automatización de correos, integraciones externas y cobros online.",
    storyEn: "An end-to-end real estate platform. I designed and developed the full ecosystem: property publishing and search, profiles, messaging, email automation, external integrations and online payments.",
    features: ["Búsqueda + filtros", "Perfiles + mensajería", "Automatizaciones", "APIs + integraciones", "Backend + pagos"],
    featuresEn: ["Search + filters", "Profiles + messaging", "Automations", "APIs + integrations", "Backend + payments"],
    scenes: [nidoCover, nidoScene1, nidoScene2, nidoScene3, nidoScene6],
    sceneCaptions: ["El portal inmobiliario de Cuyo", "Descubrimiento y búsqueda", "Filtros que reducen la fricción", "Fichas pensadas para decidir", "Un ecosistema conectado"],
    narrative: [
      ["Visión", "Un portal inmobiliario completo", "Una experiencia que reúne publicación, descubrimiento y gestión de propiedades en un único producto digital."],
      ["Problema", "Demasiados procesos dispersos", "Búsquedas, consultas y seguimiento vivían en canales separados, generando fricción para usuarios y operadores."],
      ["Solución", "Encontrar mejor, decidir antes", "Búsqueda avanzada, filtros, mapas y fichas claras organizan la información alrededor de decisiones reales."],
      ["Sistema", "Personas, mensajes y automatización", "Perfiles, favoritos, mensajería, correo, WhatsApp y pagos conectan el recorrido completo."],
      ["Resultado", "Un ecosistema preparado para crecer", "Una arquitectura modular en React y MongoDB que puede evolucionar junto al negocio."],
    ],
    tags: ["Frontend · React + JavaScript", "Backend · Node + MongoDB", "Media · Cloudinary", "Integraciones · APIs + EmailJS", "Infra · Render + Vercel", "Workflow · GitHub + IA"],
  },
  {
    index: "02",
    title: "Umbral Premium",
    coverTitle: "UMBRAL",
    type: "Identidad digital · Experiencia",
    typeEn: "Digital identity · Experience",
    year: "2026",
    url: "https://umbral-premium.com",
    image: umbralCover,
    imageMobile: umbralMobile,
    tone: "umbral",
    description: "Una presencia premium donde la percepción de marca, el ritmo y la conversión trabajan juntos.",
    descriptionEn: "A premium presence where brand perception, rhythm and conversion work as one.",
    story: "Una experiencia digital premium construida para transformar arquitectura y precisión técnica en deseo, confianza y consultas comerciales.",
    storyEn: "A premium digital experience built to turn architecture and technical precision into desire, trust and qualified enquiries.",
    features: ["Dirección de arte", "UX/UI", "Catálogo", "Multilingüe", "Conversión"],
    featuresEn: ["Art direction", "UX/UI", "Catalogue", "Multilingual", "Conversion"],
    scenes: [umbralCover, umbralScene1, umbralScene2, umbralScene3, umbralScene4, umbralCover, umbralScene6, umbralScene7],
    sceneCaptions: ["Arquitectura exterior para habitar", "Una entrada de marca precisa", "Producto y materialidad", "Sistemas explicados con claridad", "Diseño que genera confianza", "Detalle, ritmo y respiración", "Conversión sin romper la experiencia", "Una presencia premium completa"],
    narrative: [
      ["Visión", "Arquitectura exterior con presencia digital", "Una experiencia premium que traduce precisión constructiva, calma mediterránea y confianza."],
      ["Dirección", "La marca antes que la interfaz", "Tipografía, ritmo, fotografía y espacio trabajan juntos para elevar la percepción del producto."],
      ["Experiencia", "Comprender sin perder emoción", "La información técnica se organiza con claridad sin convertir la experiencia en un catálogo frío."],
      ["Conversión", "El contacto forma parte del relato", "Cada recorrido conduce hacia una consulta comercial sin interrumpir la atmósfera de marca."],
      ["Resultado", "Una presencia reconocible y coherente", "Un sistema visual y digital preparado para presentar productos, proyectos y nuevas colecciones."],
    ],
    tags: ["React", "Motion", "Art direction", "UX/UI"],
  },
  {
    index: "03",
    title: "Finestra Serveis",
    coverTitle: "FINESTRA",
    type: "Servicios · Web corporativa",
    typeEn: "Services · Corporate website",
    year: "2026",
    url: "https://finestraserveis.com",
    image: finestra,
    imageMobile: finestraMobile,
    tone: "finestra",
    description: "Una web de servicios directa y cercana, diseñada para hacer fácil lo que suele sentirse complejo.",
    descriptionEn: "A direct and approachable service website, designed to make complex things feel simple.",
    story: "Reorganicé una oferta técnica compleja en una experiencia clara, rápida y cercana, conectada con formularios, correo y captación de oportunidades.",
    storyEn: "I reorganised a complex technical offer into a clear, fast and approachable experience connected to forms, email and lead generation.",
    features: ["Arquitectura UX", "EmailJS", "Leads", "Multilingüe", "Responsive"],
    featuresEn: ["UX architecture", "EmailJS", "Lead generation", "Multilingual", "Responsive"],
    narrative: [
      ["Problema", "Servicios complejos, decisiones rápidas", "La oferta necesitaba ser entendida con facilidad por personas que buscan una solución concreta."],
      ["Solución", "Claridad, cercanía y acción", "Reorganicé contenidos y recorridos para convertir información técnica en oportunidades comerciales."],
      ["Resultado", "Una web útil para el negocio", "Formularios, EmailJS y una experiencia multilingüe conectan cada consulta con el equipo."],
    ],
    tags: ["React", "EmailJS", "Strategy", "Multilingual"],
  },
  {
    index: "04",
    title: "El Taller",
    coverTitle: "EL TALLER",
    type: "Artesanía · E-commerce",
    typeEn: "Craft · E-commerce",
    year: "2026",
    url: "https://eltaller-aguaymanto.com",
    image: taller,
    imageMobile: tallerMobile,
    tone: "taller",
    description: "Un espacio digital sensible y cálido para descubrir talleres, reservar y formar comunidad.",
    descriptionEn: "A warm, sensitive digital space to discover workshops, book and build community.",
    story: "Identidad, contenido y experiencia de reserva conviven en un espacio cálido que convierte la artesanía en una comunidad digital viva.",
    storyEn: "Identity, content and booking coexist in a warm space that turns craft into a living digital community.",
    features: ["Identidad", "E-commerce", "Reservas", "Contenido", "Comunidad"],
    featuresEn: ["Identity", "E-commerce", "Bookings", "Content", "Community"],
    narrative: [
      ["Visión", "Artesanía que también se vive online", "Una experiencia cálida para descubrir talleres, reservar y sentirse parte de una comunidad."],
      ["Experiencia", "Contenido, identidad y reserva", "Cada detalle acompaña el proceso desde la curiosidad inicial hasta la participación."],
      ["Resultado", "Un espacio digital con sensibilidad", "La plataforma convierte actividad, producto y comunidad en una experiencia coherente."],
    ],
    tags: ["E-commerce", "Booking", "Creative dev"],
  },
];

const umbralClone = {
  index: "03",
  title: "Base Mendoza",
  coverTitle: "BASE",
  type: "Logística · Plataforma web",
  typeEn: "Logistics · Web platform",
  year: "2026",
  url: "https://www.base-mendoza.com",
  image: baseMendoza,
  imageMobile: baseMobile,
  tone: "base-mendoza",
  description: "Una plataforma logística pensada para conectar empresas y mercancías en toda la región de Cuyo, con recorridos claros, respuesta ágil y operaciones sin fricción.",
  descriptionEn: "A logistics platform designed to connect businesses and goods across the Cuyo region through clear journeys, agile service and frictionless operations.",
  story: "Diseñé y desarrollé una presencia digital para ordenar la propuesta logística, explicar servicios con claridad y convertir consultas empresariales en oportunidades comerciales.",
  storyEn: "I designed and developed a digital presence that organises the logistics offer, explains services clearly and turns business enquiries into commercial opportunities.",
  features: ["Arquitectura UX", "Servicios logísticos", "Contacto directo", "Responsive", "SEO"],
  featuresEn: ["UX architecture", "Logistics services", "Direct contact", "Responsive", "SEO"],
  tags: ["UX/UI", "Development", "Logistics"],
};

const projectCards = [
  projects[0],
  projects[1],
  umbralClone,
  { ...projects[2], index: "04" },
  { ...projects[3], index: "05" },
];

const ease = [0.16, 1, 0.3, 1];

function Arrow({ diagonal = false }) {
  const Icon = diagonal ? HiArrowUpRight : HiArrowLongRight;
  return <Icon className="line-arrow" aria-hidden="true" focusable="false" />;
}

function SequenceFrame({ image, caption, index, timelineIndex, timelineTotal, progress, title }) {
  const step = 1 / Math.max(timelineTotal - 1, 1);
  const revealEnd = timelineIndex === 0 ? .001 : timelineIndex * step;
  const revealStart = timelineIndex === 0 ? 0 : Math.max(0, revealEnd - step * .64);
  const nextStart = timelineIndex === timelineTotal - 1 ? 1 : Math.min(1, (timelineIndex + 1) * step - step * .64);
  const nextEnd = timelineIndex === timelineTotal - 1 ? 1 : Math.min(1, (timelineIndex + 1) * step);
  const clipPath = useTransform(
    progress,
    [revealStart, Math.max(revealStart + .001, revealEnd)],
    timelineIndex === 0 ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const imageY = useTransform(progress, [revealStart, Math.max(revealStart + .001, revealEnd)], timelineIndex === 0 ? ["0%", "0%"] : ["9%", "0%"]);
  const scale = useTransform(progress, [revealStart, Math.max(revealStart + .001, revealEnd)], [1.055, 1]);
  const isLast = timelineIndex === timelineTotal - 1;
  const captionInput = isLast
    ? [revealStart, 1]
    : [revealStart, Math.max(revealStart + .001, revealEnd), Math.max(revealEnd + .002, nextStart), Math.max(revealEnd + .003, nextEnd)];
  const captionOpacity = useTransform(progress, captionInput, isLast ? [0, 1] : [0, 1, 1, 0]);
  const captionY = useTransform(progress, [revealStart, Math.max(revealStart + .001, revealEnd)], [24, 0]);

  return (
    <motion.figure className="sequence-frame" style={{ clipPath, zIndex: timelineIndex + 1 }} aria-hidden={index > 0}>
      <motion.img src={image} alt={`${title} — ${caption}`} style={{ scale, y: imageY }} draggable="false"/>
      <motion.figcaption style={{ y: captionY, opacity: captionOpacity }}>
        <b>{String(index + 1).padStart(2, "0")}</b>
        <span>{caption}</span>
      </motion.figcaption>
    </motion.figure>
  );
}

function SequenceReview({ project, es, progress, timelineTotal }) {
  const step = 1 / Math.max(timelineTotal - 1, 1);
  const revealEnd = step;
  const revealStart = revealEnd - step * .64;
  const clipPath = useTransform(progress, [revealStart, revealEnd], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const contentY = useTransform(progress, [revealStart, revealEnd], [70, 0]);
  const contentOpacity = useTransform(progress, [revealStart, revealStart + (revealEnd - revealStart) * .68, revealEnd], [0, 0, 1]);
  const story = es ? project.story : project.storyEn;

  return (
    <motion.section className="sequence-review" style={{ clipPath, zIndex: 2 }}>
      <motion.div className="sequence-review-inner" style={{ y: contentY, opacity: contentOpacity }}>
        <p className="sequence-review-kicker">{es ? "Producto digital completo" : "Complete digital product"}</p>
        <h4>{es ? "Un portal completo. Un negocio conectado." : "A complete portal. A connected business."}</h4>
        <div className="sequence-review-copy">
          <p>{story}</p>
          <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// eslint-disable-next-line no-unused-vars
function ProjectSequence({ project, es, onEnter, onLeave }) {
  const sequenceRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });
  const scenes = project.scenes || [project.image];
  const timelineTotal = scenes.length + 1;
  const captions = project.sceneCaptions || scenes.map(() => es ? "Vista del proyecto" : "Project view");
  const type = es ? project.type : project.typeEn;

  return (
    <article
      ref={sequenceRef}
      className={`project-sequence sequence-${project.tone}`}
      style={{ height: `${Math.max(420, scenes.length * 78)}svh` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="sequence-sticky">
        <a className="sequence-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`${es ? "Visitar" : "Visit"} ${project.title}`}>
          <div className="sequence-images">
            {scenes.map((image, index) => (
              <SequenceFrame
                key={image}
                image={image}
                caption={captions[index]}
                index={index}
                timelineIndex={index === 0 ? 0 : index + 1}
                timelineTotal={timelineTotal}
                progress={scrollYProgress}
                title={project.title}
              />
            ))}
            <SequenceReview project={project} es={es} progress={scrollYProgress} timelineTotal={timelineTotal}/>
          </div>
          <header className="sequence-title">
            <span>{project.index} / {project.year}</span>
            <h3>{project.title}</h3>
            <small>{type}</small>
          </header>
          <div className="sequence-progress">
            <motion.i style={{ scaleX: scrollYProgress }}/>
          </div>
        </a>
      </div>
    </article>
  );
}

// eslint-disable-next-line no-unused-vars
function ProjectSection({ project, index, es, onEnter, onLeave }) {
  const tileRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: tileRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], [1.07, 1.02, 1.07]);
  const description = es ? project.description : project.descriptionEn;
  const type = es ? project.type : project.typeEn;
  const portrait = index === 0 || index === 2 || index === 4;
  const displayImage = portrait && project.imageMobile ? project.imageMobile : project.image;

  return (
    <motion.article
      ref={tileRef}
      className={`project-tile tile-${index + 1} ${portrait ? "tile-portrait" : "tile-landscape"}`}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .16 }}
      transition={{ duration: .9, ease }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <a className="tile-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`${es ? "Visitar" : "Visit"} ${project.title}`}>
        <div className="tile-media">
          {displayImage ? (
            <motion.picture style={{ y: imageY, scale: imageScale }}>
              <source media="(max-width: 800px) and (orientation: portrait)" srcSet={project.imageMobile || displayImage}/>
              <img src={displayImage} alt={`Portada del proyecto ${project.title}`} loading={index > 1 ? "lazy" : "eager"}/>
            </motion.picture>
          ) : (
            <motion.div className="tile-base-visual" style={{ y: imageY, scale: imageScale }} aria-hidden="true">
              <span>BASE</span><i/><i/><i/>
            </motion.div>
          )}
          <span className="tile-number">{project.index}</span>
        </div>
        <div className="tile-heading">
          <h3>{project.title}</h3>
          <Arrow diagonal/>
        </div>
      </a>
      <p className="tile-description">{description}</p>
      <div className="tile-meta"><span>{type}</span><span>{project.year}</span></div>
      <ul className="tile-tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </motion.article>
  );
}

function ImmersiveProject({ project, index, total, progress, es }) {
  const center = index / Math.max(total - 1, 1);
  const segment = 1 / Math.max(total - 1, 1);
  const start = Math.max(0, center - segment * .82);
  const enter = Math.max(.001, center - segment * .34);
  const exit = Math.min(.999, center + segment * .34);
  const end = Math.min(1, center + segment * .82);
  const opacityInput = index === 0
    ? [0, .001, exit, end]
    : index === total - 1
      ? [start, enter, .999, 1]
      : [start, enter, exit, end];
  const opacity = useTransform(progress, opacityInput, index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const imageY = useTransform(progress, [start, Math.max(start + .001, end)], ["4.5%", "-4.5%"]);
  const imageScale = useTransform(progress, [start, enter, exit, end], [1.07, 1, 1, .965]);
  const titleY = useTransform(progress, [start, enter, exit, end], [45, 0, 0, -32]);
  const copyY = useTransform(progress, [start, enter, exit, end], [30, 0, 0, -18]);
  const description = es ? project.description : project.descriptionEn;
  const type = es ? project.type : project.typeEn;

  return (
    <motion.article className={`immersive-project immersive-${project.tone} ${index % 2 ? "immersive-reverse" : ""}`} style={{ opacity }}>
      <motion.header className="immersive-title" style={{ y: titleY }}>
        <span>{project.index}</span>
        <h3>{project.title}</h3>
      </motion.header>
      <span className="immersive-type">{type}</span>
      <span className="immersive-year">{project.year}</span>
      <div className="immersive-media">
        {project.image ? (
          <motion.picture style={{ y: imageY, scale: imageScale }}>
            <source media="(max-width: 800px)" srcSet={project.imageMobile || project.image}/>
            <img src={project.image} alt={`Proyecto ${project.title}`} loading={index > 1 ? "lazy" : "eager"}/>
          </motion.picture>
        ) : (
          <motion.div className="immersive-base-visual" style={{ y: imageY, scale: imageScale }} aria-hidden="true"><span>BASE</span><i/><i/></motion.div>
        )}
      </div>
      <motion.div className="immersive-copy" style={{ y: copyY }}>
        <p>{description}</p>
        <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </motion.div>
      <div className="immersive-count">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
    </motion.article>
  );
}

// eslint-disable-next-line no-unused-vars
function ProjectExperience({ es, onEnter, onLeave }) {
  const experienceRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(projects.length - 1, Math.max(0, Math.round(latest * (projects.length - 1))));
    setActiveProject((current) => current === next ? current : next);
  });

  return (
    <div ref={experienceRef} className="project-experience">
      <div className="project-experience-sticky" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {projects.map((project, index) => (
          <ImmersiveProject project={project} index={index} total={projects.length} progress={scrollYProgress} es={es} key={project.title}/>
        ))}
        <a
          className="project-experience-link"
          href={projects[activeProject].url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${es ? "Visitar" : "Visit"} ${projects[activeProject].title}`}
        />
        <div className="experience-progress" aria-hidden="true"><motion.i style={{ scaleX: scrollYProgress }}/></div>
      </div>
    </div>
  );
}

function NarrativePanel({ panel, index, project }) {
  return (
    <section className={`narrative-panel narrative-panel-${panel.kind}`}>
      <div className="narrative-panel-content">
        <div className="narrative-panel-head"><span>{String(index + 1).padStart(2, "0")}</span><small>{panel.eyebrow}</small></div>
        {panel.title && <h4>{panel.title}</h4>}
        {panel.copy && <p>{panel.copy}</p>}
        {panel.kind === "system" && (
          <div className="narrative-system">
            <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        )}
        {panel.kind === "cta" && <span className="narrative-cta-label">Visitar proyecto</span>}
      </div>
    </section>
  );
}

function NarrativeBackdrop({ image, index, count, progress, title }) {
  const boundary = index / count;
  const start = index === 0 ? 0 : Math.max(0, boundary - .025);
  const end = index === 0 ? .001 : Math.min(1, boundary + .025);
  const clipPath = useTransform(progress, [start, end], index === 0
    ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
    : ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(progress, [start, Math.max(end, .999)], [1.035, 1]);
  return <motion.img className="narrative-backdrop" src={image} alt={`${title} — vista ${index + 1}`} style={{ clipPath, scale, zIndex: index + 1 }}/>;
}

// eslint-disable-next-line no-unused-vars
function ProjectNarrative({ project, es, onEnter, onLeave }) {
  const narrativeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ["start start", "end end"],
  });
  const blocks = project.narrative || [["Proyecto", project.title, es ? project.description : project.descriptionEn]];
  const availableScenes = project.scenes || [project.image];
  const scenes = availableScenes.filter(Boolean);
  const type = es ? project.type : project.typeEn;
  const description = es ? project.description : project.descriptionEn;
  const panels = [
    { kind: "hero", eyebrow: es ? "Introducción" : "Introduction", image: scenes[0], title: project.title },
    { kind: "system", eyebrow: es ? "Rol + tecnologías" : "Role + technologies", image: scenes[0], title: blocks[0]?.[1] || type, copy: blocks[0]?.[2] || description },
    { kind: "visual", eyebrow: es ? "Producto en uso" : "Product in use", image: scenes[1] || scenes[0] },
    { kind: "statement", eyebrow: blocks[1]?.[0] || (es ? "El problema" : "The problem"), image: scenes[1] || scenes[0], title: blocks[1]?.[1] || type, copy: blocks[1]?.[2] || description },
    { kind: "visual", eyebrow: es ? "Detalle de interfaz" : "Interface detail", image: scenes[2] || project.imageMobile || scenes[0] },
    { kind: "result", eyebrow: blocks[blocks.length - 1]?.[0] || (es ? "Resultado" : "Result"), title: blocks[blocks.length - 1]?.[1], copy: blocks[blocks.length - 1]?.[2] || description, image: scenes[3] },
    { kind: "cta", eyebrow: `${type} · ${project.year}`, title: es ? "Explorar el proyecto completo." : "Explore the complete project.", image: scenes[4] || scenes[scenes.length - 1] },
  ];
  const trackY = useTransform(scrollYProgress, [0, 1], ["0svh", `-${(panels.length - 1) * 100}svh`]);

  return (
    <article
      ref={narrativeRef}
      className={`project-narrative narrative-${project.tone}`}
      style={{ height: "480svh", backgroundImage: `url("${scenes[0]}")`, backgroundSize: "cover", backgroundPosition: "center top" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="narrative-sticky" style={{ backgroundImage: `url("${scenes[0]}")`, backgroundSize: "cover", backgroundPosition: "center top" }}>
        <a className="narrative-project-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`${es ? "Visitar" : "Visit"} ${project.title}`}/>
        <div className="narrative-backdrops">
          {scenes.map((image, index) => <NarrativeBackdrop key={image} image={image} index={index} count={scenes.length} progress={scrollYProgress} title={project.title}/>)}
        </div>
        <div className="narrative-panels">
          <motion.div className="narrative-track" style={{ y: trackY }}>
            {panels.map((panel, index) => <NarrativePanel key={`${project.title}-${index}`} panel={panel} index={index} project={project}/>)}
          </motion.div>
        </div>
        <header className="narrative-project-title">
          <span>{project.index}</span>
          <h3>{project.title}</h3>
          <small>{type} · {project.year}</small>
        </header>
        <div className="narrative-progress"><motion.i style={{ scaleX: scrollYProgress }}/></div>
      </div>
    </article>
  );
}

function GsapProjects({ es, onEnter, onLeave }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 801px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(".gsap-project-card", track);
        const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
        // Keep the horizontal story consistent across standard and ultrawide
        // displays. Using `travel()` as vertical distance made wide Macs
        // produce several screens of empty-feeling pinned space.
        const scrollDistance = () => Math.max(3000, document.documentElement.clientHeight * 4.25);

        const horizontal = gsap.fromTo(track, {
          x: 0,
        }, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        cards.forEach((card) => {
          const image = card.querySelector(".gsap-project-image");
          const copy = card.querySelector(".gsap-project-copy");
          gsap.fromTo(image, { xPercent: -7, scale: 1.08 }, {
            xPercent: 7,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontal,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
          gsap.from(copy, {
            y: 70,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontal,
              start: "left 65%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      media.add("(max-width: 800px), (prefers-reduced-motion: reduce)", () => {
        gsap.utils.toArray(".gsap-project-card", track).forEach((card) => {
          gsap.from(card, {
            y: 55,
            autoAlpha: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              once: true,
            },
          });
        });
      });

      return () => media.revert();
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    section.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", refresh, { once: true });
    });

    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, [es]);

  return (
    <section ref={sectionRef} className="gsap-projects" id="work" aria-labelledby="projects-title">
      <header className="gsap-projects-head">
        <p className="section-no">01 / {es ? "Proyectos seleccionados" : "Selected projects"}</p>
        <p>{es ? "Desliza para recorrer" : "Scroll to explore"} <Arrow/></p>
      </header>
      <div ref={trackRef} className="gsap-projects-track">
        <div className="gsap-projects-intro">
          <span>{es ? "Trabajo" : "Work"}</span>
          <h2 id="projects-title">{es ? <>Ideas que se vuelven <em>experiencias.</em></> : <>Ideas turned into <em>experiences.</em></>}</h2>
          <p>{es ? "Diseño y desarrollo productos digitales completos: desde la dirección visual hasta la lógica que los hace funcionar." : "I design and build complete digital products, from visual direction to the logic that makes them work."}</p>
        </div>
        {projectCards.map((project, index) => {
          const type = es ? project.type : project.typeEn;
          const story = es ? project.story || project.description : project.storyEn || project.descriptionEn;
          const features = es ? project.features || [] : project.featuresEn || project.features || [];
          return (
            <article
              className={`gsap-project-card gsap-project-${project.tone}`}
              key={`${project.title}-${index}`}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <a href={project.url} target="_blank" rel="noreferrer" aria-label={`${es ? "Visitar" : "Visit"} ${project.title}`}>
                <div className="gsap-project-media">
                  <picture className="gsap-project-image">
                    <source media="(max-width: 800px)" srcSet={project.imageMobile || project.image}/>
                    <img src={project.image} alt={`${project.title} — ${type}`} loading={index > 1 ? "lazy" : "eager"}/>
                  </picture>
                  <span className="gsap-project-index">{project.index} / {project.year}</span>
                </div>
                <div className="gsap-project-copy">
                  <div>
                    <h3>{project.title}</h3>
                    <span>{type}</span>
                  </div>
                  <div className="gsap-project-scope">
                    <b>{es ? "Qué construí" : "What I built"}</b>
                    <p>{story}</p>
                    <ul>{features.slice(0, 5).map((feature, featureIndex) => <li key={feature}><span>0{featureIndex + 1}</span>{feature}</li>)}</ul>
                  </div>
                  <ul className="gsap-project-tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </div>
              </a>
            </article>
          );
        })}
        <div className="gsap-projects-outro">
          <p>{es ? "Cinco proyectos. Un mismo criterio:" : "Five projects. One principle:"}</p>
          <h3>{es ? "que se vea bien y funcione mejor." : "look good, work better."}</h3>
          <a href="#contact">{es ? "Hablemos" : "Let's talk"} <Arrow/></a>
        </div>
      </div>
      <div className="gsap-scroll-line" aria-hidden="true"><i/></div>
    </section>
  );
}

function App({ initialLanguage = "es" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);
  const [activeSystem, setActiveSystem] = useState(0);
  const [projectCursor, setProjectCursor] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [time, setTime] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const smoothX = useSpring(cursorX, { stiffness: 700, damping: 45 });
  const smoothY = useSpring(cursorY, { stiffness: 700, damping: 45 });
  const smoothScale = useSpring(cursorScale, { stiffness: 500, damping: 28 });
  const heroRef = useRef(null);
  const systemTouchX = useRef(0);
  const cursorTimer = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const update = () =>
      setTime(new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update();
    const timer = setInterval(update, 30000);
    const pointer = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setCursorVisible(true);
      clearTimeout(cursorTimer.current);
      cursorTimer.current = setTimeout(() => setCursorVisible(false), 1100);
    };
    const pointerOut = (event) => { if (!event.relatedTarget) setCursorVisible(false); };
    window.addEventListener("pointermove", pointer);
    window.addEventListener("mouseout", pointerOut);
    return () => {
      clearInterval(timer);
      clearTimeout(cursorTimer.current);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("mouseout", pointerOut);
    };
  }, [cursorX, cursorY]);

  const hover = (active) => cursorScale.set(active ? 3.4 : 1);
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    window.history.replaceState({}, "", nextLanguage === "en" ? "/en/v1" : "/v1");
  };
  const es = language === "es";
  const copy = {
    available: es ? "Disponible para proyectos" : "Available for projects",
    menu: es ? "Menú" : "Menu",
    close: es ? "Cerrar" : "Close",
    nav: es ? ["Trabajo", "Sobre mí", "Servicios", "Contacto"] : ["Work", "About", "Services", "Contact"],
    role: es ? "Desarrolladora frontend & diseñadora digital" : "Frontend developer & digital designer",
  };
  const systemItems = es ? [
    ["Experiencia", "React · JavaScript · Motion", "Interfaces sensibles, accesibles y rápidas."],
    ["Lógica", "APIs · Node · Full-stack", "La arquitectura que convierte pantallas en productos."],
    ["Datos", "MongoDB · Cloudinary", "Información organizada, disponible y segura."],
    ["Operaciones", "Render · EmailJS", "Infraestructura que trabaja aunque nadie la mire."],
    ["Automatización", "Workflows · CRM · AI", "Menos tareas repetidas. Más tiempo para decidir."],
    ["Evolución", "Measure · Learn · Iterate", "Productos vivos que aprenden con el negocio."],
  ] : [
    ["Experience", "React · JavaScript · Motion", "Sensitive, accessible and fast interfaces."],
    ["Logic", "APIs · Node · Full-stack", "The architecture that turns screens into products."],
    ["Data", "MongoDB · Cloudinary", "Information that stays organised, available and safe."],
    ["Operations", "Render · EmailJS", "Infrastructure that works when nobody is watching."],
    ["Automation", "Workflows · CRM · AI", "Fewer repeated tasks. More time to make decisions."],
    ["Evolution", "Measure · Learn · Iterate", "Living products that learn with the business."],
  ];

  return (
    <main>
      <Seo
        language={language}
        path={es ? "/v1" : "/en/v1"}
        alternatePath={es ? "/en/v1" : "/v1"}
        title={es ? "Nancy Alday | Diseñadora web y desarrolladora full-stack en Barcelona" : "Nancy Alday | Web Designer & Full-Stack Developer in Barcelona"}
        description={es ? "Diseño y desarrollo páginas web y productos digitales de principio a fin: estrategia, UX/UI, React, backend, automatización e IA. Ayudo a negocios y profesionales a convertir sus ideas en experiencias rápidas, claras y preparadas para crecer." : "I design and develop websites and digital products end to end: strategy, UX/UI, React, backend, automation and AI. I help businesses and professionals turn ideas into fast, clear experiences built to grow."}
        pageName={es ? "Portfolio de diseño web y desarrollo full-stack" : "Web design and full-stack development portfolio"}
      />
      <nav className="portfolio-switch" aria-label="Versión del portfolio"><a className="active" href="/v1">V1</a><a href="/v2">V2</a></nav>
      <ProjectDiagnostic variant="v1" language={language}/>
      <motion.div className={`cursor ${projectCursor ? "cursor-project" : ""} ${cursorVisible ? "" : "cursor-hidden"}`} style={{ x: smoothX, y: smoothY, scale: smoothScale }}>
        <span>{es ? "Visitar proyecto" : "Visit project"}</span>
      </motion.div>

      <header className="nav">
        <button className="wordmark" onClick={() => scrollTo("#top")} onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
          N<span>·</span>A
        </button>
        <div className="nav-meta">
          <span>Barcelona · {time}</span>
          <span className="availability"><i /> {copy.available}</span>
        </div>
        <div className="language-switch" aria-label="Selector de idioma">
          <button className={es ? "active" : ""} onClick={() => changeLanguage("es")}>ES</button>
          <span>/</span>
          <button className={!es ? "active" : ""} onClick={() => changeLanguage("en")}>EN</button>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          <span>{menuOpen ? copy.close : copy.menu}</span>
          <i className={menuOpen ? "open" : ""} />
        </button>
      </header>

      <motion.aside className="menu-panel" animate={{ clipPath: menuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }} transition={{ duration: 0.7, ease }}>
        <nav>
          {[
            ["01", copy.nav[0], "#work"],
            ["02", copy.nav[1], "#about"],
            ["03", copy.nav[2], "#services"],
            ["04", copy.nav[3], "/contacto?from=v1"],
          ].map(([n, label, href]) => (
            <button key={href} onClick={() => href.startsWith("/") ? window.location.assign(href) : scrollTo(href)}><small>{n}</small>{label}<Arrow /></button>
          ))}
        </nav>
        <div className="menu-foot"><span>{copy.role}</span><a href="/contacto?from=v1">{es ? "Cuéntame tu proyecto" : "Tell me about your project"}</a></div>
      </motion.aside>

      <section className="hero" id="top" ref={heroRef}>
        <div className="grain" />
        <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease }}>
            Portfolio · 2026
          </motion.p>
          <div className="hero-title">
            <div className="title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.08, duration: 1.05, ease }}>{es ? "Diseño lo que" : "I design what"}</motion.span></div>
            <div className="title-line title-indent"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.16, duration: 1.05, ease }}>{es ? <><em>ves.</em> Construyo</> : <><em>you see.</em> I build</>}</motion.span></div>
            <div className="title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.24, duration: 1.05, ease }}>{es ? "lo que lo hace vivir." : "what makes it live."}</motion.span></div>
          </div>
          <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }}>
            <p>{es ? "Diseñadora digital y desarrolladora full-stack. Convierto ideas en productos cálidos, inteligentes y conectados." : "Digital designer and full-stack developer. I turn ideas into warm, intelligent and connected products."}</p>
            <button onClick={() => scrollTo("#work")}>{es ? "Ver proyectos" : "View projects"} <Arrow /></button>
          </motion.div>
        </motion.div>
        <div className="scroll-cue"><span>{es ? "Scroll para explorar" : "Scroll to explore"}</span><i /></div>
      </section>

      <section className="statement">
        <p className="section-no">00 / {es ? "En una frase" : "In one sentence"}</p>
        <motion.h2 initial={{ opacity: 0.15 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.65 }} transition={{ duration: 1.2 }}>
          {es ? <>Me gustan las interfaces que se entienden, los sistemas que <em>ahorran trabajo</em> y los detalles que hacen sonreír.</> : <>I love interfaces that make sense, systems that <em>save real work</em> and details that make people smile.</>}
        </motion.h2>
      </section>

      <GsapProjects es={es} onEnter={() => setProjectCursor(true)} onLeave={() => setProjectCursor(false)}/>

      <section className="under-the-hood" id="systems">
        <div className="systems-intro">
          <p className="section-no">02 / {es ? "Lo que no se ve" : "Under the hood"}</p>
          <h2>{es ? <>Una interfaz bonita es solo <em>el principio.</em></> : <>A beautiful interface is only <em>the beginning.</em></>}</h2>
          <p>{es ? "También construyo la lógica, los datos y las conexiones que convierten una web en una herramienta real." : "I also build the logic, data and connections that turn a website into a real tool."}</p>
        </div>
        <div
          className="system-stage"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width - 0.5) * 24}px`);
            event.currentTarget.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height - 0.5) * 24}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--mx", "0px");
            event.currentTarget.style.setProperty("--my", "0px");
          }}
        >
          <div className="system-menu">
            {systemItems.map(([title, stack], i) => (
              <button
                className={activeSystem === i ? "active" : ""}
                key={title}
                onMouseEnter={() => setActiveSystem(i)}
                onFocus={() => setActiveSystem(i)}
                onClick={() => setActiveSystem(i)}
              >
                <span>0{i + 1}</span><strong>{title}</strong><small>{stack}</small><HiArrowUpRight className="action-arrow" aria-hidden="true" focusable="false"/>
              </button>
            ))}
          </div>
          <div
            className={`editorial-system editorial-${activeSystem}`}
            onTouchStart={(event) => { systemTouchX.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => {
              const distance = event.changedTouches[0].clientX - systemTouchX.current;
              if (Math.abs(distance) > 45) {
                setActiveSystem((current) => distance < 0 ? (current + 1) % systemItems.length : (current - 1 + systemItems.length) % systemItems.length);
              }
            }}
          >
            <span className="editorial-count">0{activeSystem + 1} / 06</span>
            <span className="swipe-hint">{es ? "Deslizá" : "Swipe"} <i aria-hidden="true"/></span>
            <motion.div className="editorial-word" key={`${language}-${activeSystem}`} initial={{ x: "22%", rotate: 3 }} animate={{ x: 0, rotate: 0 }} transition={{ duration: .75, ease }}>
              {systemItems[activeSystem][0]}
            </motion.div>
            <div className="editorial-window">
              <span>NANCY® / SYSTEM</span>
              <motion.strong key={`stack-${language}-${activeSystem}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{systemItems[activeSystem][1]}</motion.strong>
              <div className="signal-bars"><i/><i/><i/><i/><i/></div>
            </div>
            <motion.p key={`desc-${language}-${activeSystem}`} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{systemItems[activeSystem][2]}</motion.p>
            <div className="editorial-cross">+</div>
            <div className="editorial-rail"><span>DESIGN</span><span>CODE</span><span>INTELLIGENCE</span></div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div
          className="about-mark identity-machine"
          aria-hidden="true"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--ix", `${((event.clientX - rect.left) / rect.width - 0.5) * 34}px`);
            event.currentTarget.style.setProperty("--iy", `${((event.clientY - rect.top) / rect.height - 0.5) * 34}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--ix", "0px");
            event.currentTarget.style.setProperty("--iy", "0px");
          }}
        >
          <div className="identity-grid"/>
          <span className="identity-letter letter-n">N</span>
          <span className="identity-letter letter-a">A</span>
          <div className="identity-stamp"><b>Full—stack</b><span>Design / Code / AI</span></div>
          <div className="identity-ticker"><span>Nancy Alday — digital systems — human ideas — </span><span>Nancy Alday — digital systems — human ideas — </span></div>
          <small>{es ? "Diseño × Código × IA" : "Design × Code × AI"}</small>
        </div>
        <div className="about-copy">
          <p className="section-no">03 / Nancy Alday</p>
          <h2>{es ? <>No decoro pantallas.<br /><em>Diseño sistemas vivos.</em></> : <>I don't decorate screens.<br /><em>I design living systems.</em></>}</h2>
          <div className="about-columns">
            <p>{es ? "Soy desarrolladora frontend y diseñadora digital. Me interesa el punto exacto donde una idea de negocio se convierte en algo que la gente entiende, recuerda y quiere usar." : "I am a frontend developer and digital designer. I care about the exact point where a business idea becomes something people understand, remember and want to use."}</p>
            <p>{es ? "Trabajo de principio a fin: estrategia, interfaz, código, animación, integraciones y automatizaciones. Eso me permite cuidar la experiencia completa, no solo su superficie." : "I work end to end: strategy, interface, code, animation, integrations and automation. That lets me shape the complete experience, not only its surface."}</p>
          </div>
          <a href="#contact">{es ? "Hablemos de tu proyecto" : "Let's talk about your project"} <Arrow /></a>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-head inverse">
          <div><span>04</span><h2>{es ? "Lo que puedo construir" : "What I can build"}</h2></div>
          <p>{es ? "Diseño la experiencia y construyo la tecnología que la sostiene, de la primera idea al producto en marcha." : "I design the experience and build the technology behind it, from the first idea to a product in motion."}</p>
        </div>
        <div className="service-list">
          {(es ? [
            ["Dirección digital", "Concepto, narrativa, UI/UX y sistemas visuales que hacen reconocible una marca."],
            ["Creative development", "Interfaces React rápidas, responsivas y accesibles, con animación de nivel editorial."],
            ["Automatización & IA", "Flujos, formularios, CRM, asistentes e integraciones que ahorran trabajo real."],
            ["Producto end-to-end", "De la primera idea al lanzamiento: prototipo, desarrollo, medición y evolución."],
          ] : [
            ["Digital direction", "Concept, narrative, UI/UX and visual systems that make a brand recognizable."],
            ["Creative development", "Fast, responsive and accessible React interfaces with editorial-level motion."],
            ["Automation & AI", "Workflows, forms, CRM, assistants and integrations that save real work."],
            ["End-to-end product", "From first idea to launch: prototype, development, measurement and evolution."],
          ]).map(([title, text], i) => (
            <motion.div className="service-row" key={title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.7 }}>
              <span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><HiArrowUpRight className="action-arrow" aria-hidden="true" focusable="false"/>
            </motion.div>
          ))}
        </div>
        <div className="automation">
          <div className="automation-copy"><span>Build smarter</span><h3>{es ? <>Lo visible atrae.<br /><em>Lo invisible trabaja.</em></> : <>What’s visible attracts.<br /><em>What’s invisible works.</em></>}</h3><p>{es ? "Conecto formularios, reservas y consultas con APIs, bases de datos, CRM y respuestas automáticas. Menos tareas repetidas; más tiempo para hacer crecer el negocio." : "I connect forms, bookings and enquiries with APIs, databases, CRM and automatic responses. Less repetitive work; more time to grow the business."}</p><ul>{["MongoDB", "Render", "Cloudinary", "EmailJS", "APIs"].map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="automation-lab">
            <div className="lab-head"><span>NA / AUTOMATION ENGINE</span><span><i/> LIVE</span></div>
            <div className="lab-metric"><small>{es ? "TIEMPO RECUPERADO" : "TIME RECOVERED"}</small><strong>+12<em>h</em></strong><span>{es ? "por semana" : "per week"}</span></div>
            <div className="lab-events">
              <div><span>19:42:08</span><b>{es ? "Formulario recibido" : "Form received"}</b><i>200</i></div>
              <div><span>19:42:09</span><b>MongoDB / lead.created</b><i>OK</i></div>
              <div><span>19:42:10</span><b>{es ? "CRM sincronizado" : "CRM synchronised"}</b><i>OK</i></div>
              <div><span>19:42:11</span><b>EmailJS / confirmation</b><i>SENT</i></div>
            </div>
            <div className="lab-flow">
              <span>FORM</span><i/><span>API</span><i/><span>DATA</span><i/><span>ACTION</span>
            </div>
            <div className="lab-signal" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>
          </div>
        </div>
      </section>

      <section className="ai-statement">
        <div className="ai-copy">
          <p className="section-no">05 / {es ? "Inteligencia amplificada" : "Augmented intelligence"}</p>
          <h2>{es ? <>Trabajo con IA.<br />El criterio sigue siendo <em>humano.</em></> : <>I work with AI.<br />The judgement stays <em>human.</em></>}</h2>
          <p>{es ? "La uso como copiloto creativo y técnico para investigar, prototipar, programar, probar y automatizar. No sustituye lo que sé: potencia hasta dónde puedo llegar." : "I use it as a creative and technical copilot to research, prototype, code, test and automate. It does not replace what I know; it expands how far I can go."}</p>
          <div className="ai-steps">
            {(es ? ["Investigar mejor", "Prototipar rápido", "Construir con rigor", "Optimizar siempre"] : ["Research deeper", "Prototype faster", "Build with rigour", "Always optimise"]).map((step, i) => <span key={step}><b>0{i + 1}</b>{step}</span>)}
          </div>
        </div>
      </section>


      <footer id="contact">
        <div className="footer-kicker"><span>06 / {es ? "Contacto" : "Contact"}</span><span>{es ? "¿Tienes una idea?" : "Have an idea?"}</span></div>
        <h2>{es ? <>Hagámosla<br /><em>imposible de ignorar.</em></> : <>Let's make it<br /><em>impossible to ignore.</em></>}</h2>
        <a className="mail-link" href="/contacto?from=v1" onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>{es ? "Cuéntame tu proyecto" : "Tell me about your project"} <Arrow diagonal /></a>
        <div className="footer-bottom"><span>NaN Estudio Digital / 2026</span><div><a href="https://www.linkedin.com/in/nancy-alday-rubio-5678a9235" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/nan.estudioweb" target="_blank" rel="noreferrer">Instagram ↗</a></div><button onClick={() => scrollTo("#top")}>{es ? "Inicio" : "Home"} <HiArrowUp className="line-arrow" aria-hidden="true" focusable="false"/></button></div>
      </footer>
    </main>
  );
}

export default App;
