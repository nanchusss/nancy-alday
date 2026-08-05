import { useState } from "react";
import emailjs from "@emailjs/browser";
import { HiArrowLongLeft, HiArrowLongRight, HiCheck } from "react-icons/hi2";
import Seo from "./Seo";
import "./ContactPage.css";

const needs = ["Una web", "Vender o reservar", "Un producto digital", "Mejorar mi web", "Automatizar", "Necesito orientación"];

export default function ContactPage() {
  const variant = new URLSearchParams(window.location.search).get("from") === "v2" ? "v2" : "v1";
  const [form, setForm] = useState({ name: "", email: "", city: "", project: "", message: "", consent: false });
  const [status, setStatus] = useState("idle");
  const update = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const subject = `Nueva consulta web — ${form.name}`;
  const summary = `Nombre: ${form.name}\nEmail: ${form.email}\nCiudad: ${form.city}\nNecesita: ${form.project}\nConsentimiento: Sí\n\nMensaje:\n${form.message || "—"}`;
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
    <header><a href={`/${variant}`}><HiArrowLongLeft/> Portfolio</a><span>Nancy Alday®</span><small>Contacto / 2026</small></header>
    <section>
      <div className="contact-intro"><span>Empecemos por lo esencial</span><h1>¿Qué quieres<br/><em>hacer posible?</em></h1><p>Cuéntame lo mínimo. Te responderé personalmente para definir el siguiente paso.</p><div><span>Barcelona</span><span>España + Portugal</span><span>Remoto</span></div></div>
      <form onSubmit={submit}>
        <div className="contact-fields"><label><span>Tu nombre</span><input required autoComplete="name" name="name" value={form.name} onChange={update} placeholder="Nombre"/></label><label><span>Tu correo</span><input required autoComplete="email" type="email" name="email" value={form.email} onChange={update} placeholder="nombre@correo.com"/></label><label><span>Tu ciudad</span><input required autoComplete="address-level2" name="city" value={form.city} onChange={update} placeholder="Ciudad"/></label></div>
        <fieldset><legend>¿Qué necesitas?</legend><div>{needs.map((need) => <label className={form.project === need ? "selected" : ""} key={need}><input required type="radio" name="project" value={need} checked={form.project === need} onChange={update}/><span>{need}</span><i>{form.project === need ? <HiCheck/> : "+"}</i></label>)}</div></fieldset>
        <label className="contact-message"><span>Si quieres, añade contexto</span><textarea rows="3" name="message" value={form.message} onChange={update} placeholder="Una frase es suficiente…"/></label>
        <label className="contact-consent"><input required type="checkbox" checked={form.consent} onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}/><i/><span>He leído la información de privacidad y autorizo el uso de mis datos para responder a mi solicitud.</span></label>
        <details className="contact-privacy"><summary>Información sobre privacidad</summary><p>Responsable: Nancy Alday. Finalidad: responder a tu solicitud. No se usarán tus datos para publicidad ni se cederán, salvo a proveedores técnicos necesarios. Puedes solicitar acceso, rectificación o supresión mediante este formulario.</p></details>
        {status === "sent" ? <div className="contact-sent"><HiCheck/><div><b>Mensaje recibido.</b><span>Gracias, {form.name}. Te responderé pronto.</span></div></div> : status === "error" ? <div className="contact-error"><b>No se pudo enviar.</b><button type="button" onClick={() => setStatus("idle")}>Intentar de nuevo</button></div> : <button className="contact-submit" disabled={status === "sending" || !form.project || !form.consent}>{status === "sending" ? "Enviando…" : "Enviar consulta"}<HiArrowLongRight/></button>}
      </form>
    </section>
  </main>;
}
