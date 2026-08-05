import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { HiArrowLongLeft, HiArrowLongRight, HiCheck, HiXMark } from "react-icons/hi2";
import "./ProjectDiagnostic.css";

const content = {
  es: {
    trigger: "¿Qué necesita tu negocio?",
    intro: "Diagnóstico digital · 2 minutos",
    title: <>Tu próximo paso no debería<br/>ser una <em>adivinanza.</em></>,
    description: "Descubre dónde se está perdiendo hoy la mayor oportunidad de tu negocio y qué conviene construir primero. Un resultado concreto, sin tecnicismos.",
    start: "Empezar diagnóstico",
    askName: "Antes de empezar, ¿cómo te llamas?",
    namePlaceholder: "Tu nombre",
    askBusiness: "¿Qué tipo de negocio tienes?",
    businessPlaceholder: "Por ejemplo: estudio, tienda, consultoría…",
    personalNote: "Vamos a encontrar el siguiente paso adecuado para ti.",
    back: "Atrás",
    progress: "Pregunta",
    close: "Cerrar diagnóstico",
    restart: "Repetir diagnóstico",
    ready: "Tu punto de partida",
    includes: "La propuesta debería incluir",
    leadTitle: "Recibe tu plan por email",
    email: "Tu email",
    send: "Recibir mi plan",
    sending: "Enviando…",
    sent: "Listo. Tu diagnóstico quedó registrado; te escribiré muy pronto.",
    fallback: "No se pudo enviar. Inténtalo de nuevo.",
    privacy: "Solo usaré estos datos para responder sobre tu proyecto. Nada de spam.",
    consent: "He leído la información de privacidad y autorizo el uso de mis datos para responder a mi solicitud y enviarme el diagnóstico.",
    privacyInfo: "Información sobre privacidad",
    review: "Revisar respuestas",
    mailSubject: "Quiero conversar sobre mi diagnóstico digital",
    questions: [
      { title: "¿En qué momento está tu proyecto?", options: [
        ["Tengo una idea y necesito darle forma", "strategy"], ["Mi negocio existe, pero todavía no tiene web", "presence"], ["Ya tengo web, pero no está funcionando", "optimize"], ["Necesito una herramienta digital a medida", "product"],
      ]},
      { title: "¿Cuál es hoy tu objetivo principal?", options: [
        ["Explicar mejor lo que hago", "presence"], ["Conseguir más consultas o ventas", "conversion"], ["Automatizar tareas y ahorrar tiempo", "product"], ["Diferenciar mi marca", "strategy"],
      ]},
      { title: "¿Qué debería poder hacer tu cliente?", options: [
        ["Conocerme y contactarme", "presence"], ["Comprar, reservar o solicitar presupuesto", "conversion"], ["Registrarse y gestionar información", "product"], ["Vivir una experiencia de marca memorable", "strategy"],
      ]},
      { title: "¿Qué te está frenando ahora?", options: [
        ["No sé por dónde empezar", "strategy"], ["Mi propuesta no se entiende", "presence"], ["Pierdo oportunidades o hago todo manual", "conversion"], ["La tecnología actual se quedó corta", "optimize"],
      ]},
    ],
    results: {
      strategy: { label: "Estrategia + dirección digital", text: "Antes de diseñar pantallas, necesitas ordenar la idea, definir a quién te diriges y convertir tu propuesta en un recorrido claro.", items: ["Estrategia y arquitectura", "Narrativa de marca", "Prototipo UX/UI", "Hoja de ruta por etapas"] },
      presence: { label: "Web estratégica de servicios", text: "Necesitas una presencia digital que explique tu valor con claridad, genere confianza y transforme visitas en conversaciones.", items: ["Arquitectura de contenidos", "Diseño UX/UI responsive", "Desarrollo web", "SEO y captación de consultas"] },
      conversion: { label: "Experiencia orientada a conversión", text: "Tu oportunidad está en acortar el camino entre el interés y la acción, conectando una experiencia clara con ventas, reservas o presupuestos.", items: ["Recorrido de conversión", "Formularios, pagos o reservas", "Automatizaciones y CRM", "Analítica para optimizar"] },
      product: { label: "Producto digital a medida", text: "Tu proyecto necesita más que una web: una herramienta con lógica, datos e integraciones que acompañe la operación del negocio.", items: ["Definición de producto", "Frontend + backend", "Perfiles, datos e integraciones", "Lanzamiento y evolución"] },
      optimize: { label: "Auditoría + evolución digital", text: "No hace falta empezar de cero sin revisar primero. Necesitas detectar fricciones y priorizar los cambios con mayor impacto.", items: ["Auditoría UX y técnica", "Prioridades de mejora", "Rediseño de recorridos clave", "Optimización y medición"] },
    },
  },
  en: {
    trigger: "What does your business need?", intro: "Digital diagnosis · 2 minutes", title: <>Your next step should not<br/>be a <em>guess.</em></>, description: "Find out where your business is losing its biggest opportunity and what to build first. A concrete answer, without jargon.", start: "Start diagnosis", askName: "Before we begin, what is your name?", namePlaceholder: "Your name", askBusiness: "What type of business do you run?", businessPlaceholder: "For example: studio, shop, consultancy…", personalNote: "Let’s find the right next step for you.", back: "Back", progress: "Question", close: "Close diagnosis", restart: "Restart diagnosis", ready: "Your starting point", includes: "Your proposal should include", leadTitle: "Get your plan by email", email: "Your email", send: "Get my plan", sending: "Sending…", sent: "Done. Your diagnosis is registered; I will be in touch soon.", fallback: "The message could not be sent. Please try again.", privacy: "I will only use these details to reply about your project. No spam.", consent: "I have read the privacy information and authorise the use of my data to respond to my request and send my diagnosis.", privacyInfo: "Privacy information", review: "Review answers", mailSubject: "I want to discuss my digital diagnosis",
    questions: [
      { title: "What stage is your project at?", options: [["I have an idea I need to shape", "strategy"], ["My business exists, but has no website", "presence"], ["I have a website, but it is not working", "optimize"], ["I need a custom digital tool", "product"]] },
      { title: "What is your main goal today?", options: [["Explain what I do more clearly", "presence"], ["Get more enquiries or sales", "conversion"], ["Automate tasks and save time", "product"], ["Differentiate my brand", "strategy"]] },
      { title: "What should your customer be able to do?", options: [["Learn about me and get in touch", "presence"], ["Buy, book or request a quote", "conversion"], ["Sign in and manage information", "product"], ["Enjoy a memorable brand experience", "strategy"]] },
      { title: "What is holding you back?", options: [["I don't know where to begin", "strategy"], ["My offer is unclear", "presence"], ["I lose opportunities or do everything manually", "conversion"], ["Our current technology falls short", "optimize"]] },
    ],
    results: {
      strategy: { label: "Strategy + digital direction", text: "Before designing screens, you need to organise the idea, define your audience and turn your offer into a clear journey.", items: ["Strategy and architecture", "Brand narrative", "UX/UI prototype", "Phased roadmap"] },
      presence: { label: "Strategic service website", text: "You need a digital presence that explains your value, builds trust and turns visits into conversations.", items: ["Content architecture", "Responsive UX/UI design", "Web development", "SEO and lead generation"] },
      conversion: { label: "Conversion-focused experience", text: "Your opportunity is to shorten the path from interest to action through sales, bookings or quotes.", items: ["Conversion journey", "Forms, payments or bookings", "Automation and CRM", "Analytics and optimisation"] },
      product: { label: "Custom digital product", text: "Your project needs more than a website: a tool with logic, data and integrations that supports daily operations.", items: ["Product definition", "Frontend + backend", "Profiles, data and integrations", "Launch and evolution"] },
      optimize: { label: "Digital audit + evolution", text: "You may not need to start over. First identify friction and prioritise the changes with the greatest impact.", items: ["UX and technical audit", "Improvement priorities", "Key journey redesign", "Optimisation and measurement"] },
    },
  },
};

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%?";

function ScrambleText({ text, className = "" }) {
  const [output, setOutput] = useState(text);
  useEffect(() => {
    let frame = 0;
    const total = Math.max(14, text.length * 2);
    const timer = window.setInterval(() => {
      const reveal = Math.floor((frame / total) * text.length);
      setOutput(text.split("").map((letter, index) => index < reveal || letter === " " ? letter : glyphs[Math.floor(Math.random() * glyphs.length)]).join(""));
      frame += 1;
      if (frame > total) { window.clearInterval(timer); setOutput(text); }
    }, 24);
    return () => window.clearInterval(timer);
  }, [text]);
  return <span className={className} aria-label={text}>{output}</span>;
}

export default function ProjectDiagnostic({ variant = "v1", language = "es" }) {
  const copy = content[language === "en" ? "en" : "es"];
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [pastHero, setPastHero] = useState(false);
  const [lead, setLead] = useState({ name: "", business: "", email: "", consent: false });
  const [leadStatus, setLeadStatus] = useState("idle");
  const [transitioning, setTransitioning] = useState(false);
  const panelRef = useRef(null);
  const selected = answers[step];

  const diagnosisKey = useMemo(() => {
    const scores = answers.reduce((total, key) => ({ ...total, [key]: (total[key] || 0) + 1 }), {});
    return Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0] || "strategy";
  }, [answers]);
  const diagnosis = copy.results[diagnosisKey];

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const hero = document.querySelector(variant === "v2" ? ".bot-garden" : ".hero");
      if (hero) setPastHero(hero.getBoundingClientRect().bottom <= 80);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [variant]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [open]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen, step]);

  const choose = (key) => setAnswers((current) => {
    const next = [...current]; next[step] = key; return next;
  });
  const chooseAndAdvance = (key) => {
    if (transitioning) return;
    choose(key);
    setTransitioning(true);
    window.setTimeout(() => {
      if (step === copy.questions.length - 1) setScreen("result");
      else setStep((current) => current + 1);
      setTransitioning(false);
    }, 240);
  };
  const mailBody = `${copy.ready}: ${diagnosis.label}\n\nNombre: ${lead.name}\nNegocio: ${lead.business}\nEmail: ${lead.email}\nConsentimiento: Sí\n\n${diagnosis.text}\n\n${copy.includes}:\n- ${diagnosis.items.join("\n- ")}`;
  const updateLead = ({ target }) => setLead((current) => ({ ...current, [target.name]: target.value }));
  const submitLead = async (event) => {
    event.preventDefault();
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_DIAGNOSTIC_TEMPLATE_ID;
    const replyTemplate = process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) { setLeadStatus("error"); return; }
    setLeadStatus("sending");
    try {
      const variables = { ...lead, diagnosis: mailBody, subject: copy.mailSubject, from_name: lead.name, from_email: lead.email, message: mailBody, to_email: lead.email, reply_to: lead.email, source: `Portfolio ${variant.toUpperCase()}` };
      await emailjs.send(serviceId, templateId, variables, { publicKey });
      if (replyTemplate) await emailjs.send(serviceId, replyTemplate, variables, { publicKey });
      setLeadStatus("sent");
    } catch (error) { setLeadStatus("error"); }
  };

  return <>
    {pastHero && !open && <button className={`diagnostic-trigger diagnostic-trigger-${variant}`} type="button" onClick={() => setOpen(true)}><ScrambleText text={copy.trigger}/><HiArrowLongRight/></button>}
    {open && <div className={`diagnostic-shell diagnostic-${variant}`} role="dialog" aria-modal="true" aria-labelledby="diagnostic-title">
      <button className="diagnostic-backdrop" type="button" aria-label={copy.close} onClick={() => setOpen(false)}/>
      <section className="diagnostic-panel" ref={panelRef}>
        <button className="diagnostic-close" type="button" aria-label={copy.close} onClick={() => setOpen(false)}><HiXMark/></button>
        <div className="diagnostic-brand"><span>NANCY ALDAY®</span><span>PROJECT FINDER / 2026</span></div>

        {screen === "intro" && <div className="diagnostic-intro">
          <span>{copy.intro}</span><h2 id="diagnostic-title">{copy.title}</h2><p>{copy.description}</p>
          <div className="diagnostic-intro-fields"><label className="diagnostic-name"><span>{copy.askName}</span><input autoFocus autoComplete="given-name" name="name" placeholder={copy.namePlaceholder} value={lead.name} onChange={updateLead}/></label><label className="diagnostic-name"><span>{copy.askBusiness}</span><input name="business" placeholder={copy.businessPlaceholder} value={lead.business} onChange={updateLead} onKeyDown={(event) => { if (event.key === "Enter" && lead.name.trim() && lead.business.trim()) setScreen("questions"); }}/></label></div>
          <button type="button" className="diagnostic-primary" disabled={!lead.name.trim() || !lead.business.trim()} onClick={() => setScreen("questions")}>{copy.start}<HiArrowLongRight/></button>
        </div>}

        {screen === "questions" && <div className={`diagnostic-question${transitioning ? " is-transitioning" : ""}`}>
          <p className="diagnostic-personal"><b>{lead.name},</b> {copy.personalNote}</p>
          <div className="diagnostic-progress"><span>{copy.progress} {step + 1} / {copy.questions.length}</span><i><b style={{ width: `${((step + 1) / copy.questions.length) * 100}%` }}/></i></div>
          <h2 id="diagnostic-title">{copy.questions[step].title}</h2>
          <div className="diagnostic-options" key={`options-${step}`}>{copy.questions[step].options.map(([label, key], index) => <button type="button" disabled={transitioning} style={{ "--card-index": index }} className={selected === key ? "selected" : ""} key={label} onClick={() => chooseAndAdvance(key)}><small>0{index + 1}</small><span>{label}</span><i>{selected === key ? <HiCheck/> : "+"}</i></button>)}</div>
          <div className="diagnostic-nav"><button type="button" onClick={() => step === 0 ? setScreen("intro") : setStep((current) => current - 1)}><HiArrowLongLeft/>{copy.back}</button></div>
        </div>}

        {screen === "result" && <div className="diagnostic-result">
          <span>{lead.name}, {copy.ready.toLowerCase()}</span><h2 id="diagnostic-title">{diagnosis.label}</h2><p>{diagnosis.text}</p>
          <div><small>{copy.includes}</small><ul>{diagnosis.items.map((item) => <li key={item}><HiCheck/>{item}</li>)}</ul></div>
          <form className="diagnostic-lead" onSubmit={submitLead}>
            <h3>{copy.leadTitle}</h3>
            <div><label><span>{copy.email}</span><input required autoComplete="email" type="email" name="email" value={lead.email} onChange={updateLead}/></label></div>
            <label className="diagnostic-consent"><input required type="checkbox" checked={lead.consent} onChange={(event) => setLead((current) => ({ ...current, consent: event.target.checked }))}/><i/><span>{copy.consent}</span></label>
            <details className="diagnostic-privacy"><summary>{copy.privacyInfo}</summary><p>Responsable: Nancy Alday. Finalidad: responder a tu solicitud y enviarte el diagnóstico. No se usarán tus datos para publicidad ni se cederán, salvo a los proveedores técnicos necesarios para prestar el servicio. Puedes solicitar acceso, rectificación o supresión mediante el formulario de contacto.</p></details>
            {leadStatus === "sent" ? <p className="diagnostic-success">{copy.sent}</p> : leadStatus === "error" ? <button className="diagnostic-error" type="button" onClick={() => setLeadStatus("idle")}>{copy.fallback}</button> : <button className="diagnostic-primary" disabled={leadStatus === "sending" || !lead.consent}>{leadStatus === "sending" ? copy.sending : copy.send}<HiArrowLongRight/></button>}
          </form>
          <div className="diagnostic-result-nav"><button type="button" onClick={() => { setStep(copy.questions.length - 1); setScreen("questions"); }}><HiArrowLongLeft/>{copy.review}</button></div>
        </div>}
      </section>
    </div>}
  </>;
}
