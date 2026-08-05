import { HiArrowLongRight, HiArrowUpRight, HiCheck } from "react-icons/hi2";
import Seo from "./Seo";
import "./LocalSeoPage.css";

export const seoLocations = {
  barcelona: { name: "Barcelona", region: "Barcelona", context: "negocios, estudios y profesionales que compiten en un entorno digital exigente", angle: "Una web en Barcelona necesita diferenciarse sin sacrificar claridad, velocidad ni conversión." },
  granollers: { name: "Granollers", region: "Vallès Oriental", context: "empresas de servicios, comercio y proyectos B2B conectados con todo el Vallès Oriental", angle: "Diseño presencias digitales que ayudan a explicar ofertas complejas y convertir búsquedas locales en oportunidades." },
  "vilanova-del-valles": { name: "Vilanova del Vallès", region: "Vallès Oriental", context: "profesionales y empresas que necesitan ganar visibilidad dentro y fuera del municipio", angle: "Una presencia digital sólida permite competir más allá del mercado local sin perder cercanía." },
  vallromanes: { name: "Vallromanes", region: "Vallès Oriental", context: "proyectos de servicios, bienestar, restauración y negocios con una propuesta cuidada", angle: "Trabajo la identidad, la experiencia y la tecnología para trasladar el valor del negocio a cada pantalla." },
  alella: { name: "Alella", region: "Maresme", context: "marcas, profesionales y negocios de servicios que necesitan una presencia digital diferenciada", angle: "Convierto una propuesta con personalidad en una experiencia web clara, memorable y preparada para captar consultas." },
  "el-masnou": { name: "El Masnou", region: "Maresme", context: "negocios locales, proyectos creativos y empresas conectadas con Barcelona y el Maresme", angle: "La web debe generar confianza rápidamente y facilitar el paso desde la búsqueda hasta el contacto." },
  "valles-oriental": { name: "Vallès Oriental", region: "Barcelona", context: "pymes, profesionales y empresas de Granollers, Vilanova del Vallès, Vallromanes y municipios cercanos", angle: "Creo sistemas digitales que permiten captar oportunidades locales y crecer hacia nuevos mercados." },
  maresme: { name: "Maresme", region: "Barcelona", context: "negocios y profesionales de Alella, El Masnou y poblaciones cercanas", angle: "Combino dirección visual y desarrollo para que una marca local pueda competir con una presencia digital de primer nivel." },
  espana: { name: "España", region: "España", context: "empresas y profesionales que buscan colaboración remota con una única responsable de diseño y desarrollo", angle: "Trabajo de forma remota de principio a fin, con procesos claros y una ejecución digital completa." },
  portugal: { name: "Portugal", region: "Portugal", context: "negocios y equipos que necesitan diseño web y desarrollo digital con colaboración remota desde la península", angle: "Diseño y desarrollo productos digitales para proyectos en Portugal con comunicación cercana y procesos completamente remotos." },
};

const services = [
  ["Estrategia y UX", "Ordeno la propuesta, los contenidos y el recorrido para que las personas entiendan rápidamente por qué elegirte."],
  ["Diseño web", "Creo una identidad digital propia, responsive y coherente con el nivel real de tu negocio."],
  ["Desarrollo full-stack", "Construyo interfaces, lógica, datos, formularios, reservas, pagos e integraciones en un único sistema."],
  ["SEO y medición", "Preparo estructura, rendimiento, contenido y analítica para que la web pueda encontrarse y mejorar."],
];

const faqs = (place) => [
  { question: `¿Trabajas con negocios de ${place}?`, answer: `Sí. Puedo trabajar de forma presencial según el proyecto y de forma remota durante todo el proceso, desde la estrategia hasta el lanzamiento.` },
  { question: "¿Diseñas y desarrollas la web completa?", answer: "Sí. Me encargo de estrategia, UX/UI, frontend, backend, integraciones, automatización, SEO técnico y puesta en producción." },
  { question: "¿También mejoras páginas web existentes?", answer: "Sí. Primero realizo una auditoría de experiencia, contenido, rendimiento y tecnología para decidir qué conviene conservar, optimizar o reconstruir." },
  { question: "¿Cuánto cuesta un proyecto web?", answer: "Depende del alcance, las integraciones y el punto de partida. El diagnóstico inicial permite definir prioridades y preparar una propuesta ajustada al negocio." },
];

export default function LocalSeoPage({ slug }) {
  const location = seoLocations[slug];
  if (!location) return null;
  const path = `/diseno-web/${slug}`;
  const title = `Diseño web en ${location.name} | Desarrollo, SEO y automatización`;
  const description = `Diseño web en ${location.name}: estrategia, UX/UI, React, desarrollo full-stack, SEO y automatización para negocios que necesitan captar clientes y crecer.`;
  const questions = faqs(location.name);
  return <main className="local-seo-page">
    <Seo title={title} description={description} path={path} language="es" pageName={`Servicios de diseño web en ${location.name}`} areaServed={[location.name, location.region, "España", "Portugal"]} faqs={questions}/>
    <header className="local-nav"><a href="/">Nancy Alday</a><nav><a href="#servicios">Servicios</a><a href="#proceso">Proceso</a><a href="#preguntas">Preguntas</a></nav><a href="/contacto">Hablemos <HiArrowUpRight/></a></header>
    <section className="local-hero">
      <div><span>Diseño + desarrollo digital · {location.name}</span><h1>Diseño web en<br/><em>{location.name}.</em></h1></div>
      <div><p>{location.angle}</p><a href="#contacto">Cuéntame tu proyecto <HiArrowLongRight/></a></div>
    </section>
    <section className="local-proof"><span>De la idea al producto en marcha</span><p>Trabajo con {location.context}. Una sola dirección para estrategia, diseño, código, SEO y evolución.</p></section>
    <section className="local-services" id="servicios"><header><span>01 / Servicios</span><h2>Lo que tu negocio necesita,<br/><em>conectado de principio a fin.</em></h2></header><div>{services.map(([title,text],index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="local-process" id="proceso"><div><span>02 / Cómo trabajo</span><h2>Claridad antes que complejidad.</h2><p>No empiezo eligiendo colores. Empiezo entendiendo el negocio, el cliente y la acción que debe provocar la web.</p></div><ol>{[["Diagnóstico","Objetivos, audiencia y oportunidades."],["Dirección","Arquitectura, contenido y diseño UX/UI."],["Construcción","Desarrollo, integraciones y pruebas."],["Evolución","SEO, medición y mejoras continuas."]].map(([title,text]) => <li key={title}><HiCheck/><div><b>{title}</b><p>{text}</p></div></li>)}</ol></section>
    <section className="local-faq" id="preguntas"><header><span>03 / Preguntas frecuentes</span><h2>Antes de empezar.</h2></header><div>{questions.map(({question,answer}) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="local-areas"><span>También trabajo en</span><div>{Object.entries(seoLocations).filter(([key]) => key !== slug).map(([key,item]) => <a href={`/diseno-web/${key}`} key={key}>{item.name}<HiArrowUpRight/></a>)}</div></section>
    <footer id="contacto"><span>04 / Contacto</span><h2>Construyamos una web que haga avanzar tu negocio.</h2><a href="/contacto">hola@nancyalday.com <HiArrowLongRight/></a><div><span>© 2026 Nancy Alday</span><a href="/v1">Ver portfolio</a></div></footer>
  </main>;
}
