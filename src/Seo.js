import { useEffect } from "react";

const SITE_URL = "https://nancyalday.com";
const SOCIAL_IMAGE = `${SITE_URL}/logonan-social.jpg`;

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

export default function Seo({ title, description, path, language = "es", alternatePath, pageName, areaServed, faqs = [] }) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    document.title = title;
    document.documentElement.lang = language;

    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="author"]', { name: "author", content: "Nancy Alday" });
    setMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" });
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
      setLink("alternate", `${SITE_URL}${esPath}`, "es");
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
          inLanguage: ["es", "en"]
        },
      {
        "@type": "Person",
          "@id": `${SITE_URL}/#nancy-alday`,
        name: "Nancy Alday",
        url: SITE_URL,
        image: SOCIAL_IMAGE,
          email: "mailto:hola@nancyalday.com",
          jobTitle: language === "es" ? "Diseñadora digital y desarrolladora full-stack" : "Digital designer and full-stack developer",
          address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
          knowsAbout: ["Diseño web", "Desarrollo frontend", "Desarrollo full-stack", "React", "JavaScript", "UX/UI", "SEO", "Auditoría SEO", "Automatización", "Inteligencia artificial", "APIs", "Productos digitales"],
          sameAs: ["https://github.com/nanchusss"]
        },
        {
          "@type": "ProfessionalService",
          "@id": `${canonical}#services`,
          name: "Nancy Alday — Diseño y desarrollo digital",
          url: canonical,
          description,
          areaServed: areaServed || ["Barcelona", "Vallès Oriental", "Maresme", "España", "Portugal"],
          provider: { "@id": `${SITE_URL}/#nancy-alday` },
          serviceType: language === "es"
            ? ["Diseño web", "Desarrollo de páginas web", "Auditoría SEO", "SEO técnico", "Desarrollo frontend y full-stack", "Automatización e IA", "Producto digital end-to-end"]
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
          about: { "@id": `${SITE_URL}/#nancy-alday` }
        }
      ];
    if (faqs.length) graph.push({ "@type": "FAQPage", "@id": `${canonical}#faq`, mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph
    });
  }, [alternatePath, areaServed, description, faqs, language, pageName, path, title]);

  return null;
}
