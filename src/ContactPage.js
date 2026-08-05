import { useState } from "react";
import emailjs from "@emailjs/browser";
import { HiArrowLongLeft, HiArrowLongRight, HiCheck } from "react-icons/hi2";
import Seo from "./Seo";
import "./ContactPage.css";

const needs = ["Crear una web", "Mejorar mi web", "Producto o automatización", "Aún no lo sé"];

export default function ContactPage() {
  const variant = new URLSearchParams(window.location.search).get("from") === "v2" ? "v2" : "v1";
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "", consent: false });
  const [status, setStatus] = useState("idle");
  const update = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const subject = `Nueva consulta web — ${form.name}`;
  const summary = `Nombre: ${form.name}\nEmail: ${form.email}\nNecesita: ${form.project}\nConsentimiento: Sí\n\nMensaje:\n${form.message || "—"}`;
  const submit = async (event) => {
    event.preventDefault();
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const ownerTemplate = process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID;
    const replyTemplate = process.env.REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !ownerTemplate || !publicKey) { setStatus("error"); return; }
    setStatus("sending");
    const variables = { ...form, subject, summary, from_name: form.name, from_email: form.email, message: summary, to_email: form.email, reply_to: form.email, source: `Formulario web ${variant.toUpperCase()}` };
    try {
      await emailjs.send(serviceId, ownerTemplate, variables, { publicKey });
      if (replyTemplate) await emailjs.send(serviceId, replyTemplate, variables, { publicKey });
      setStatus("sent");
    } catch (error) { setStatus("error"); }
  };
  return <main className={`contact-page contact-${variant}`}>
    <Seo title="Contacto | Nancy Alday — Diseño web y desarrollo digital" description="Cuéntame qué necesita tu negocio. Diseño web, desarrollo full-stack, SEO, automatización y productos digitales en Barcelona y de forma remota." path="/contacto" language="es" pageName="Contacto y solicitud de proyecto"/>
    <header><a href={`/${variant}`}><HiArrowLongLeft/> Portfolio</a><a className="contact-home" href={`/${variant}`}>Nancy Alday®</a><small>Contacto / 2026</small></header>
    <section>
      <div className="contact-intro"><span>Nuevo proyecto / 2026</span><h1>¿Qué quieres<br/><em>hacer posible?</em></h1><p>Cuéntame lo esencial. Yo me encargo de ayudarte a ordenar el siguiente paso.</p></div>
      <form className={status === "sent" ? "is-sent" : ""} onSubmit={submit}>
        <div className="contact-fields"><label><span>Nombre</span><input required autoComplete="name" name="name" value={form.name} onChange={update} placeholder="¿Cómo te llamas?"/></label><label><span>Email</span><input required autoComplete="email" type="email" name="email" value={form.email} onChange={update} placeholder="tu@email.com"/></label></div>
        <fieldset><legend>¿Qué tienes en mente?</legend><div>{needs.map((need, index) => <label className={form.project === need ? "selected" : ""} key={need}><input required type="radio" name="project" value={need} checked={form.project === need} onChange={update}/><small>0{index + 1}</small><span>{need}</span><i>{form.project === need ? <HiCheck/> : "+"}</i></label>)}</div></fieldset>
        <label className="contact-message"><span>Cuéntame un poco <small>Opcional</small></span><textarea rows="2" name="message" value={form.message} onChange={update} placeholder="Una idea, un problema o un objetivo…"/></label>
        <label className="contact-consent"><input required type="checkbox" checked={form.consent} onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}/><i/><span>He leído la información de privacidad y autorizo el uso de mis datos para responder a mi solicitud.</span></label>
        <details className="contact-privacy"><summary>Información sobre privacidad</summary><p>Responsable: Nancy Alday. Finalidad: responder a tu solicitud. No se usarán tus datos para publicidad ni se cederán, salvo a proveedores técnicos necesarios. Puedes solicitar acceso, rectificación o supresión mediante este formulario.</p></details>
        {status === "sent" ? <div className="contact-sent"><i><HiCheck/></i><small>Mensaje enviado</small><h2>Gracias, {form.name}.</h2><p>Tu mensaje ya está en camino. Te responderé pronto.</p><a href={`/${variant}`}>Volver al portfolio <HiArrowLongRight/></a></div> : status === "error" ? <div className="contact-error"><b>No se pudo enviar.</b><button type="button" onClick={() => setStatus("idle")}>Intentar de nuevo</button></div> : <button className="contact-submit" disabled={status === "sending" || !form.project || !form.consent}>{status === "sending" ? "Enviando…" : "Hablemos de tu proyecto"}<HiArrowLongRight/></button>}
      </form>
    </section>
  </main>;
}
