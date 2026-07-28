import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import "./App.css";

import taller from "./IMAGES/projectsdesktop/portada-el-taller.jpg";
import tallerMobile from "./IMAGES/projectsmobile/portadaeltallermobile.jpg";
import finestra from "./IMAGES/projectsdesktop/finestracat.jpg";
import finestraMobile from "./IMAGES/projectsmobile/finestracatmobile2.jpg";
import nidoCover from "./IMAGES/projectsdesktop/nidoportada.jpg";
import nidoMobile from "./IMAGES/projectsmobile/nidomobile.jpg";
import umbralCover from "./IMAGES/projectsdesktop/umbralportada.jpg";
import umbralMobile from "./IMAGES/projectsmobile/umbralmobile.jpg";

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
    tags: ["React", "MongoDB", "Cloudinary", "Product design"],
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
    tags: ["React", "Motion", "Art direction", "UX/UI"],
  },
  {
    index: "03",
    title: "Finestra Serveis",
    coverTitle: "FINESTRA",
    type: "Servicios · Web corporativa",
    typeEn: "Services · Corporate website",
    year: "2026",
    url: "https://finestra-serveis.com",
    image: finestra,
    imageMobile: finestraMobile,
    tone: "finestra",
    description: "Una web de servicios directa y cercana, diseñada para hacer fácil lo que suele sentirse complejo.",
    descriptionEn: "A direct and approachable service website, designed to make complex things feel simple.",
    tags: ["React", "EmailJS", "Strategy", "Multilingual"],
  },
  {
    index: "04",
    title: "Base Mendoza",
    coverTitle: "BASE",
    type: "Logística · Plataforma web",
    typeEn: "Logistics · Web platform",
    year: "2026",
    url: "https://base-mendoza.com",
    image: null,
    imageMobile: null,
    tone: "base",
    description: "Una interfaz robusta para una empresa logística: confianza, velocidad y contacto sin fricción.",
    descriptionEn: "A robust interface for a logistics company: trust, speed and frictionless contact.",
    tags: ["UX/UI", "Development", "Performance"],
  },
  {
    index: "05",
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
    tags: ["E-commerce", "Booking", "Creative dev"],
  },
];

const ease = [0.16, 1, 0.3, 1];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("es");
  const [activeSystem, setActiveSystem] = useState(0);
  const [time, setTime] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const smoothX = useSpring(cursorX, { stiffness: 700, damping: 45 });
  const smoothY = useSpring(cursorY, { stiffness: 700, damping: 45 });
  const smoothScale = useSpring(cursorScale, { stiffness: 500, damping: 28 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const update = () =>
      setTime(new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    update();
    const timer = setInterval(update, 30000);
    const pointer = (event) => {
      cursorX.set(event.clientX - 7);
      cursorY.set(event.clientY - 7);
    };
    window.addEventListener("pointermove", pointer);
    return () => {
      clearInterval(timer);
      window.removeEventListener("pointermove", pointer);
    };
  }, [cursorX, cursorY]);

  const hover = (active) => cursorScale.set(active ? 3.4 : 1);
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
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
      <motion.div className="cursor" style={{ x: smoothX, y: smoothY, scale: smoothScale }} />

      <header className="nav">
        <button className="wordmark" onClick={() => scrollTo("#top")} onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
          N<span>·</span>A
        </button>
        <div className="nav-meta">
          <span>Barcelona · {time}</span>
          <span className="availability"><i /> {copy.available}</span>
        </div>
        <div className="language-switch" aria-label="Selector de idioma">
          <button className={es ? "active" : ""} onClick={() => setLanguage("es")}>ES</button>
          <span>/</span>
          <button className={!es ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
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
            ["04", copy.nav[3], "#contact"],
          ].map(([n, label, href]) => (
            <button key={href} onClick={() => scrollTo(href)}><small>{n}</small>{label}<Arrow /></button>
          ))}
        </nav>
        <div className="menu-foot"><span>{copy.role}</span><a href="mailto:hola@nancyalday.com">hola@nancyalday.com</a></div>
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

      <section className="work" id="work">
        <div className="section-head">
          <div><span>01</span><h2>{es ? "Trabajo seleccionado" : "Selected work"}</h2></div>
          <p>{es ? "Una selección de plataformas, marcas y negocios a los que he ayudado a ocupar mejor su espacio digital." : "A selection of platforms, brands and businesses I have helped claim a stronger digital presence."}</p>
        </div>

        <div className="project-list">
          {projects.map((project, i) => (
            <motion.article className={`project ${project.tone}`} key={project.title} initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.9, ease }}>
              <a href={project.url} target="_blank" rel="noreferrer" onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
                <div className="project-meta"><span>{project.index}</span><span>{es ? project.type : project.typeEn}</span><span>{project.year}</span></div>
                <div className="project-visual">
                  {project.image ? (
                    <div className="cover-stage editorial-cover" style={{ "--cover-image": `url("${project.image}")` }}>
                      <div className="cover-backdrop" />
                      <div className="cover-label"><span>{project.title}</span><span>nancy alday® / 2026</span></div>
                      <div className="browser-frame">
                        <div className="editorial-meta"><span>{project.index} / {es ? project.type : project.typeEn}</span><span>{project.year}</span></div>
                        <picture>
                          <source media="(max-width: 600px) and (orientation: portrait)" srcSet={project.imageMobile || project.image} />
                          <img src={project.image} alt={`Vista del proyecto ${project.title}`} loading={i > 1 ? "lazy" : "eager"} />
                        </picture>
                        <div className="editorial-foot"><span>{project.url.replace("https://", "")}</span><span>{es ? "Diseño & desarrollo" : "Design & development"}</span></div>
                      </div>
                      <strong className="cover-word">{project.coverTitle}</strong>
                    </div>
                  ) : (
                    <div className="project-art base-art" aria-hidden="true">
                      <span className="route-line"/><span className="route-dot dot-a"/><span className="route-dot dot-b"/>
                      <b>BASE</b><small>Mendoza · Logística en movimiento</small>
                    </div>
                  )}
                  <div className="view-pill">{es ? "Visitar proyecto" : "Visit project"} <Arrow diagonal /></div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{es ? project.description : project.descriptionEn}</p>
                  <div className="project-stack">
                    <small>{es ? "Stack + aportación" : "Stack + contribution"}</small>
                    <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </section>

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
                <span>0{i + 1}</span><strong>{title}</strong><small>{stack}</small><i>↗</i>
              </button>
            ))}
          </div>
          <div className={`editorial-system editorial-${activeSystem}`}>
            <span className="editorial-count">0{activeSystem + 1} / 06</span>
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
          <a href="mailto:hola@nancyalday.com">{es ? "Hablemos de tu proyecto" : "Let's talk about your project"} <Arrow /></a>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-head inverse">
          <div><span>04</span><h2>{es ? "Lo que puedo construir" : "What I can build"}</h2></div>
          <p>{es ? "Una mezcla poco habitual: sensibilidad visual, código sólido y mentalidad de producto." : "An uncommon blend: visual sensitivity, solid code and a product mindset."}</p>
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
              <span>0{i + 1}</span><h3>{title}</h3><p>{text}</p><i>↗</i>
            </motion.div>
          ))}
        </div>
        <div className="automation">
          <div className="automation-copy"><span>Build smarter</span><h3>{es ? <>Una web bonita.<br />Y mucho más detrás.</> : <>A beautiful website.<br />And much more behind it.</>}</h3><p>{es ? "Puedo conectar cada proyecto con reservas, seguimiento de leads, correos, bases de datos o asistentes inteligentes. La interfaz atrae; el sistema hace avanzar el negocio." : "I can connect every project to bookings, lead tracking, email, databases or intelligent assistants. The interface attracts; the system moves the business forward."}</p><ul>{["MongoDB", "Render", "Cloudinary", "EmailJS", "APIs"].map(item => <li key={item}>{item}</li>)}</ul></div>
          <div className="automation-screen">
            <div className="automation-browser"><i/><i/><i/><span>nidoportal.com / live system</span></div>
            <img src={nidoCover} alt="Plataforma Nido Portal conectada a automatizaciones" loading="lazy" />
            <div className="flow-chip chip-a">{es ? "Nuevo lead" : "New lead"}</div>
            <div className="flow-chip chip-b">CRM {es ? "actualizado" : "updated"} ✓</div>
            <div className="flow-chip chip-c">{es ? "Email enviado" : "Email sent"}</div>
          </div>
        </div>
      </section>

      <section className="ai-statement">
        <div className="ai-orbit" aria-hidden="true"><span>AI</span><i/><i/><i/></div>
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
        <a className="mail-link" href="mailto:hola@nancyalday.com" onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>hola@nancyalday.com <Arrow diagonal /></a>
        <div className="footer-bottom"><span>© 2026 Nancy Alday</span><div><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/nanchusss" target="_blank" rel="noreferrer">GitHub</a></div><button onClick={() => scrollTo("#top")}>{es ? "Volver arriba" : "Back to top"} ↑</button></div>
      </footer>
    </main>
  );
}

export default App;
