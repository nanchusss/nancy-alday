import { useEffect } from "react";

const SITE_URL = "https://nancyalday.com";
const SOCIAL_IMAGE = `${SITE_URL}/logonan-social.jpg`;
const DEFAULT_AREA_SERVED = [
  "Barcelona",
  "Catalunya",
  "Granollers",
  "Vilanova del Valles",
  "Valles Oriental",
  "Maresme",
  "Espana",
  "Europe"
];

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

function setLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
  if (hreflang) element.hreflang = hreflang;
}

function normalizeAreaServed(areaServed) {
  const values = Array.isArray(areaServed) && areaServed.length ? areaServed : DEFAULT_AREA_SERVED;
  return values.map((name) => ({ "@type": "AdministrativeArea", name }));
}

export default function Seo({ title, description, path, language = "es", alternatePath, pageName, areaServed, faqs = [] }) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    const normalizedAreaServed = normalizeAreaServed(areaServed);

    document.title = title;
    document.documentElement.lang = language;

    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="keywords"]', {
      name: "keywords",
      content: "diseno web barcelona, desarrollo web barcelona, seo local barcelona, diseno web granollers, diseno web valles oriental, diseno web vilanova del valles, diseno web catalunya, automatizacion digital"
    });
    setMeta('meta[name="author"]', { name: "author", content: "Nancy Alday" });
    setMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" });
    setMeta('meta[name="geo.region"]', { name: "geo.region", content: "ES-CT" });
    setMeta('meta[name="geo.placename"]', { name: "geo.placename", content: "Barcelona, Granollers, Vilanova del Valles" });

    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Nancy Alday" });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: language === "es" ? "es_ES" : "en_GB" });
    setMeta('meta[property="og:image"]', { property: "og:image", content: SOCIAL_IMAGE });

    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: SOCIAL_IMAGE });

    setLink("canonical", canonical);

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
    if (alternatePath) {
      const esPath = language === "es" ? path : alternatePath;
      const enPath = language === "en" ? path : alternatePath;
      setLink("alternate", `${SITE_URL}${esPath}`, "es-ES");
      setLink("alternate", `${SITE_URL}${esPath}`, "es");
      setLink("alternate", `${SITE_URL}${esPath}`, "ca-ES");
      setLink("alternate", `${SITE_URL}${enPath}`, "en-GB");
      setLink("alternate", `${SITE_URL}${enPath}`, "en");
      setLink("alternate", `${SITE_URL}${esPath}`, "x-default");
    }

    let schema = document.getElementById("nancy-seo-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "nancy-seo-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }

    const graph = [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Nancy Alday",
        inLanguage: ["es", "en"],
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/diseno-web/{search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "NaN Estudio Digital",
        legalName: "NaN Estudio Digital",
        url: SITE_URL,
        logo: SOCIAL_IMAGE,
        sameAs: ["https://github.com/nanchusss"],
        areaServed: normalizedAreaServed
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#nancy-alday`,
        name: "Nancy Alday",
        url: SITE_URL,
        image: SOCIAL_IMAGE,
        email: "mailto:hola@nancyalday.com",
        jobTitle: language === "es" ? "Disenadora digital y desarrolladora full-stack" : "Digital designer and full-stack developer",
        worksFor: { "@id": `${SITE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressRegion: "Catalunya",
          addressCountry: "ES"
        },
        knowsAbout: [
          "Diseno web",
          "Desarrollo frontend",
          "Desarrollo full-stack",
          "React",
          "JavaScript",
          "UX/UI",
          "SEO",
          "Auditoria SEO",
          "Automatizacion",
          "Inteligencia artificial",
          "APIs",
          "Productos digitales"
        ],
        sameAs: ["https://github.com/nanchusss"]
      },
      {
        "@type": "ProfessionalService",
        "@id": `${canonical}#services`,
        name: "NaN Estudio Digital - Diseno y desarrollo digital",
        url: canonical,
        description,
        areaServed: normalizedAreaServed,
        provider: { "@id": `${SITE_URL}/#organization` },
        founder: { "@id": `${SITE_URL}/#nancy-alday` },
        availableLanguage: ["es", "en", "ca"],
        serviceType: language === "es"
          ? ["Diseno web", "Desarrollo de paginas web", "Auditoria SEO", "SEO tecnico", "Desarrollo frontend y full-stack", "Automatizacion e IA", "Producto digital end-to-end"]
          : ["Web design", "Website development", "SEO audit", "Technical SEO", "Frontend and full-stack development", "Automation and AI", "End-to-end digital products"]
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageName || title,
        description,
        inLanguage: language,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [{ "@id": `${SITE_URL}/#nancy-alday` }, { "@id": `${SITE_URL}/#organization` }]
      }
    ];

    if (faqs.length) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      });
    }

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph
    });
  }, [alternatePath, areaServed, description, faqs, language, pageName, path, title]);

  return null;
}
