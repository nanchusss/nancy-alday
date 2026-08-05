import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BotanicalPortfolio from './BotanicalPortfolio';
import Welcome from './Welcome';
import LocalSeoPage, { englishSeoSlugs, seoLocations } from './LocalSeoPage';
import ContactPage from './ContactPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const path = window.location.pathname.replace(/\/$/, "");
const isEnglishV1 = path === "/en/v1";
const englishLocalSlug = path.startsWith("/en/web-design/") ? englishSeoSlugs[path.split("/").pop()] : null;
const localSeoSlug = englishLocalSlug || (path.startsWith("/diseno-web/") ? path.split("/").pop() : null);
const localSeoLanguage = englishLocalSlug ? "en" : "es";
const Portfolio = path === "/contacto" ? ContactPage : localSeoSlug && seoLocations[localSeoSlug] ? LocalSeoPage : path === "/v2" ? BotanicalPortfolio : path === "/v1" || isEnglishV1 ? App : Welcome;
root.render(
  <React.StrictMode>
    <Portfolio initialLanguage={isEnglishV1 || localSeoLanguage === "en" ? "en" : "es"} slug={localSeoSlug}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
