import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BotanicalPortfolio from './BotanicalPortfolio';
import Welcome from './Welcome';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const path = window.location.pathname.replace(/\/$/, "");
const Portfolio = path === "/v2" ? BotanicalPortfolio : path === "/v1" ? App : Welcome;
root.render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
