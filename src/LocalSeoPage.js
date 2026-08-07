import { HiArrowLongRight, HiArrowUpRight, HiCheck } from "react-icons/hi2";
import Seo from "./Seo";
import "./LocalSeoPage.css";

export const seoLocations = {
  barcelona: {
    enSlug: "barcelona",
    es: { name: "Barcelona", region: "Barcelona", context: "negocios, estudios y profesionales que compiten en un entorno digital exigente", angle: "Una web en Barcelona necesita diferenciarse sin sacrificar claridad, velocidad ni conversión." },
    en: { name: "Barcelona", region: "Barcelona", context: "businesses, studios and independent professionals working in a highly competitive digital market", angle: "A Barcelona website needs to stand out without sacrificing clarity, speed or conversion." }
  },
  granollers: {
    enSlug: "granollers",
    es: { name: "Granollers", region: "Vallès Oriental", context: "empresas de servicios, comercio y proyectos B2B conectados con todo el Vallès Oriental", angle: "Transformo ofertas complejas en experiencias digitales claras que generan oportunidades comerciales." },
    en: { name: "Granollers", region: "Vallès Oriental", context: "service companies, retailers and B2B projects connected to the wider Vallès Oriental area", angle: "I turn complex offers into clear digital experiences that generate business opportunities." }
  },
  "vilanova-del-valles": {
    enSlug: "vilanova-del-valles",
    es: { name: "Vilanova del Vallès", region: "Vallès Oriental", context: "negocios locales, profesionales y empresas que necesitan visibilidad y captación digital en su zona", angle: "Diseño y desarrollo webs que convierten consultas locales en oportunidades reales de negocio." },
    en: { name: "Vilanova del Valles", region: "Valles Oriental", context: "local businesses and professionals looking for stronger visibility and local lead generation", angle: "I design and build websites that turn local enquiries into real business opportunities." }
  },
  "valles-oriental": {
    enSlug: "valles-oriental",
    es: { name: "Vallès Oriental", region: "Barcelona", context: "pymes, profesionales y empresas de Granollers, Vilanova del Vallès, Vallromanes y municipios cercanos", angle: "Creo sistemas digitales que permiten captar oportunidades locales y crecer hacia nuevos mercados." },
    en: { name: "Vallès Oriental", region: "Barcelona", context: "SMEs and professionals across Granollers, Vilanova del Vallès, Vallromanes and nearby towns", angle: "I build digital systems designed to capture local opportunities and support growth into wider markets." }
  },
  catalunya: {
    enSlug: "catalonia",
    es: { name: "Cataluña", region: "Cataluña", context: "empresas y profesionales que necesitan una presencia digital competitiva en todo el territorio catalán", angle: "Combino estrategia, diseño y desarrollo para escalar presencia digital en Cataluña con una base técnica sólida." },
    en: { name: "Catalonia", region: "Catalonia", context: "businesses and professionals who need a competitive digital presence across the Catalan territory", angle: "I combine strategy, design and development to scale digital presence in Catalonia on a solid technical foundation." }
  },
  maresme: {
    enSlug: "maresme",
    es: { name: "Maresme", region: "Barcelona", context: "negocios y profesionales de Alella, El Masnou y poblaciones cercanas", angle: "Combino dirección visual y desarrollo para que una marca local compita con una presencia digital de primer nivel." },
    en: { name: "Maresme", region: "Barcelona", context: "businesses and professionals across Alella, El Masnou and nearby coastal towns", angle: "I combine art direction and development so local brands can compete with a first-class digital presence." }
  },
  espana: {
    enSlug: "spain",
    es: { name: "España", region: "España", context: "empresas y profesionales que buscan una única responsable para estrategia, diseño y desarrollo", angle: "Trabajo de forma remota de principio a fin, con procesos claros y una ejecución digital completa." },
    en: { name: "Spain", region: "Spain", context: "companies and independent professionals looking for one partner across strategy, design and development", angle: "I work remotely from strategy to launch, with a clear process and complete digital delivery." }
  },
  europa: {
    enSlug: "europe",
    es: { name: "Europa", region: "Europa", context: "equipos y negocios europeos que necesitan colaboración digital remota, directa y flexible", angle: "Diseño y desarrollo productos digitales online para Europa desde Barcelona, con comunicación clara y procesos adaptados a equipos distribuidos." },
    en: { name: "Europe", region: "Europe", context: "European teams and businesses looking for direct, flexible and fully remote digital collaboration", angle: "I design and build digital products for European clients from Barcelona, with clear communication and a process made for distributed teams." }
  }
};

export const englishSeoSlugs = Object.fromEntries(Object.entries(seoLocations).map(([slug, item]) => [item.enSlug, slug]));

const services = {
  es: [["Estrategia y UX", "Ordeno la propuesta, los contenidos y el recorrido para que las personas entiendan rápidamente por qué elegirte."], ["Diseño web", "Creo una identidad digital propia, responsive y coherente con el nivel real de tu negocio."], ["Desarrollo full-stack", "Construyo interfaces, lógica, datos, formularios, reservas, pagos e integraciones en un único sistema."], ["SEO y medición", "Preparo estructura, rendimiento, contenido y analítica para que la web pueda encontrarse y mejorar."]],
  en: [["Strategy and UX", "I organise the offer, content and journey so people quickly understand why they should choose you."], ["Web design", "I create distinctive, responsive digital identities aligned with the real quality of your business."], ["Full-stack development", "I connect interfaces, logic, data, forms, bookings, payments and integrations in one system."], ["SEO and measurement", "I prepare structure, performance, content and analytics so the website can be found and continuously improved."]]
};

const getFaqs = (place, language) => language === "en" ? [
  { question: `Do you work with businesses in ${place}?`, answer: "Yes. Projects can run fully remotely, from initial strategy and UX through development, testing and launch." },
  { question: "Do you design and develop the complete website?", answer: "Yes. I cover strategy, UX/UI, frontend, backend, integrations, automation, technical SEO and production." },
  { question: "Can you improve an existing website?", answer: "Yes. I first audit experience, content, performance and technology to decide what should be retained, improved or rebuilt." },
  { question: "How much does a web project cost?", answer: "It depends on scope, integrations and the starting point. The initial diagnosis defines priorities before a tailored proposal is prepared." }
] : [
  { question: `¿Trabajas con negocios de ${place}?`, answer: "Sí. Puedo trabajar de forma presencial según el proyecto y de forma remota durante todo el proceso, desde la estrategia hasta el lanzamiento." },
  { question: "¿Diseñas y desarrollas la web completa?", answer: "Sí. Me encargo de estrategia, UX/UI, frontend, backend, integraciones, automatización, SEO técnico y puesta en producción." },
  { question: "¿También mejoras páginas web existentes?", answer: "Sí. Primero realizo una auditoría de experiencia, contenido, rendimiento y tecnología para decidir qué conviene conservar, optimizar o reconstruir." },
  { question: "¿Cuánto cuesta un proyecto web?", answer: "Depende del alcance, las integraciones y el punto de partida. El diagnóstico inicial permite definir prioridades y preparar una propuesta ajustada al negocio." }
];

const ui = {
  es: { nav:["Servicios","Proceso","Preguntas"], talk:"Hablemos", eyebrow:"Diseño + desarrollo digital", proof:"De la idea al producto en marcha", proofEnd:"Una sola dirección para estrategia, diseño, código, SEO y evolución.", services:"01 / Servicios", serviceTitle:<>Lo que tu negocio necesita,<br/><em>conectado de principio a fin.</em></>, process:"02 / Cómo trabajo", processTitle:"Claridad antes que complejidad.", processText:"No empiezo eligiendo colores. Empiezo entendiendo el negocio, el cliente y la acción que debe provocar la web.", steps:[["Diagnóstico","Objetivos, audiencia y oportunidades."],["Dirección","Arquitectura, contenido y diseño UX/UI."],["Construcción","Desarrollo, integraciones y pruebas."],["Evolución","SEO, medición y mejoras continuas."]], faq:"03 / Preguntas frecuentes", faqTitle:"Antes de empezar.", also:"También trabajo en", contact:"04 / Contacto", contactTitle:"Construyamos una web que haga avanzar tu negocio.", cta:"Cuéntame tu proyecto", portfolio:"Ver portfolio" },
  en: { nav:["Services","Process","Questions"], talk:"Let's talk", eyebrow:"Digital design + development", proof:"From idea to working product", proofEnd:"One direction across strategy, design, code, SEO and evolution.", services:"01 / Services", serviceTitle:<>What your business needs,<br/><em>connected from end to end.</em></>, process:"02 / How I work", processTitle:"Clarity before complexity.", processText:"I do not begin by choosing colours. I begin by understanding the business, its audience and the action the website needs to create.", steps:[["Diagnosis","Goals, audience and opportunities."],["Direction","Architecture, content and UX/UI design."],["Build","Development, integrations and testing."],["Evolution","SEO, measurement and continuous improvement."]], faq:"03 / Frequently asked questions", faqTitle:"Before we begin.", also:"Also working across", contact:"04 / Contact", contactTitle:"Let's build a website that moves your business forward.", cta:"Tell me about your project", portfolio:"View portfolio" }
};

export default function LocalSeoPage({ slug, initialLanguage = "es" }) {
  const language = initialLanguage === "en" ? "en" : "es";
  const base = seoLocations[slug];
  if (!base) return null;
  const location = base[language];
  const copy = ui[language];
  const path = language === "en" ? `/en/web-design/${base.enSlug}` : `/diseno-web/${slug}`;
  const alternatePath = language === "en" ? `/diseno-web/${slug}` : `/en/web-design/${base.enSlug}`;
  const title = language === "en" ? `Web design in ${location.name} | Development, SEO and automation` : `Diseño web en ${location.name} | Desarrollo, SEO y automatización`;
  const description = language === "en" ? `Web design in ${location.name}: strategy, UX/UI, React, full-stack development, SEO and automation for businesses ready to grow.` : `Diseño web en ${location.name}: estrategia, UX/UI, React, desarrollo full-stack, SEO y automatización para negocios que necesitan captar clientes y crecer.`;
  const questions = getFaqs(location.name, language);
  const links = Object.entries(seoLocations).filter(([key]) => key !== slug);
  return <main className="local-seo-page">
    <Seo title={title} description={description} path={path} alternatePath={alternatePath} language={language} pageName={title} areaServed={[location.name, location.region, "Spain", "Europe"]} faqs={questions}/>
    <header className="local-nav"><a href={language === "en" ? "/en/v1" : "/"}>Nancy Alday</a><nav>{copy.nav.map((label,index)=><a key={label} href={["#servicios","#proceso","#preguntas"][index]}>{label}</a>)}</nav><a href="/contacto">{copy.talk} <HiArrowUpRight/></a></header>
    <section className="local-hero"><div><span>{copy.eyebrow} · {location.name}</span><h1>{language === "en" ? "Web design in" : "Diseño web en"}<br/><em>{location.name}.</em></h1></div><div><p>{location.angle}</p><a href="#contacto">{copy.cta} <HiArrowLongRight/></a></div></section>
    <section className="local-proof"><span>{copy.proof}</span><p>{language === "en" ? `I work with ${location.context}.` : `Trabajo con ${location.context}.`} {copy.proofEnd}</p></section>
    <section className="local-services" id="servicios"><header><span>{copy.services}</span><h2>{copy.serviceTitle}</h2></header><div>{services[language].map(([heading,text],index)=><article key={heading}><span>0{index+1}</span><h3>{heading}</h3><p>{text}</p></article>)}</div></section>
    <section className="local-process" id="proceso"><div><span>{copy.process}</span><h2>{copy.processTitle}</h2><p>{copy.processText}</p></div><ol>{copy.steps.map(([heading,text])=><li key={heading}><HiCheck/><div><b>{heading}</b><p>{text}</p></div></li>)}</ol></section>
    <section className="local-faq" id="preguntas"><header><span>{copy.faq}</span><h2>{copy.faqTitle}</h2></header><div>{questions.map(({question,answer})=><details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="local-areas"><span>{copy.also}</span><div>{links.map(([key,item])=><a href={language === "en" ? `/en/web-design/${item.enSlug}` : `/diseno-web/${key}`} key={key}>{item[language].name}<HiArrowUpRight/></a>)}</div></section>
    <footer id="contacto"><span>{copy.contact}</span><h2>{copy.contactTitle}</h2><a href="/contacto">{copy.cta} <HiArrowLongRight/></a><div><span>© 2026 Nancy Alday</span><a href={language === "en" ? "/en/v1" : "/v1"}>{copy.portfolio}</a></div></footer>
  </main>;
}
