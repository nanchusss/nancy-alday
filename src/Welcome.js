import { motion } from "framer-motion";
import { HiArrowLongRight } from "react-icons/hi2";
import Seo from "./Seo";
import "./Welcome.css";

function MeadowFlower({ x, y, scale = 1, color = "#ef594f", delay = 0 }) {
  return (
    <motion.g className="welcome-flower" transform={`translate(${x} ${y}) scale(${scale})`} initial={{ rotate: -3 }} animate={{ rotate: 3 }} transition={{ duration: 2.6 + delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}>
      <path d="M0 98C1 62-1 31 0 0" className="welcome-stem"/>
      <path d="M0 63C-20 51-28 38-25 23-7 28 1 42 0 63ZM0 78c18-12 27-27 24-43C8 42 0 57 0 78Z" className="welcome-leaves"/>
      {[0,60,120,180,240,300].map((angle) => <ellipse key={angle} cx="0" cy="-20" rx="11" ry="25" transform={`rotate(${angle})`} fill={color}/>)}
      <circle r="9" fill="#f5bd38"/>
    </motion.g>
  );
}

function Donkey() {
  return (
    <motion.svg className="welcome-donkey" viewBox="0 0 620 460" initial={{ x: "75%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} transition={{ duration: 3.2, delay: .45, ease: [0.16, 1, 0.3, 1] }} aria-label="Burrito caminando entre flores" role="img">
      <g className="donkey-tail"><path d="M137 236C74 211 73 166 91 137"/><path d="M91 137c-18-7-28-1-35 15 17 12 32 8 35-15Z"/></g>
      <path className="donkey-body" d="M142 176c75-43 217-40 301 13 44 29 54 88 23 124-27 31-94 40-174 34-87-7-151-30-175-74-19-35-8-78 25-97Z"/>
      <path className="donkey-neck" d="M394 204c13-84 42-139 88-160 40-18 78 7 75 48-4 51-33 102-67 142Z"/>
      <path className="donkey-face" d="M468 57c22-35 88-30 111 11 24 43-10 93-66 94-42 1-69-24-63-57Z"/>
      <path className="donkey-muzzle" d="M509 114c35-14 74 0 77 26 4 28-35 43-72 28-22-9-27-44-5-54Z"/>
      <path className="donkey-ear" d="M476 61c-23-21-29-54-10-60 20-6 37 29 33 59ZM529 55c4-31 24-57 41-47 18 10 2 44-20 61Z"/>
      <path className="donkey-mane" d="M458 59c-36 42-47 93-51 153"/>
      <path className="donkey-leg" d="M165 297c-8 53-9 93-2 128h39c9-44 18-80 28-111ZM369 320c2 42 7 76 16 105h38c2-48 7-82 17-111Z"/>
      <path className="donkey-hoof" d="M158 423h49v18h-49zM380 423h48v18h-48z"/>
      <circle className="donkey-eye" cx="524" cy="83" r="6"/><path className="donkey-smile" d="M547 142c10 7 20 6 29-2"/>
      <path className="donkey-blanket" d="M218 153c62-17 131-11 181 14l-17 118c-68 15-125 8-183-18Z"/>
      <path className="donkey-blanket-detail" d="M217 185c58 25 116 30 176 15M211 224c58 25 113 28 176 12"/>
    </motion.svg>
  );
}

const flowers = [
  [18,365,1.1,"#ef594f",.1],[62,390,.8,"#4169d8",.5],[112,350,1.35,"#f4a8bd",.2],[165,402,.75,"#f5bd38",.8],[220,366,1,"#ef594f",.4],[278,402,.82,"#4169d8",.7],[338,352,1.4,"#f5bd38",.3],[400,392,.9,"#f4a8bd",.6],[458,354,1.25,"#ef594f",.1],[520,398,.78,"#4169d8",.9],[576,360,1.15,"#f5bd38",.45],[610,408,.7,"#f4a8bd",.2],
];

export function DonkeyMeadow({ className = "" }) {
  return (
    <div className={`welcome-meadow ${className}`} aria-hidden="true">
      <span className="welcome-sun"/><Donkey/>
      <svg className="welcome-flowers" viewBox="0 0 640 460">{flowers.map(([x,y,s,c,d], index) => <MeadowFlower key={index} x={x} y={y} scale={s} color={c} delay={d}/>)}</svg>
    </div>
  );
}

export default function Welcome() {
  return (
    <main className="welcome-page welcome-neutral">
      <Seo
        language="es"
        path="/"
        title="Nancy Alday | Diseño web, desarrollo full-stack y productos digitales"
        description="Nancy Alday diseña y desarrolla páginas web y productos digitales completos. Estrategia, UX/UI, React, backend, automatización e IA para profesionales y negocios que necesitan convertir una idea en una experiencia útil y memorable."
        pageName="Nancy Alday — Diseño y desarrollo digital"
      />
      <header><span>Nancy Alday</span><span>Portfolio / 2026</span></header>
      <section className="welcome-copy">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Hola, bienvenida</motion.span>
        <motion.h1 initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8 }}>Elige tu<br/><em>aventura.</em></motion.h1>
        <p>El mismo trabajo, dos universos visuales.</p>
        <div className="welcome-choices">
          <a className="choice-v1" href="/v1"><i/><small>01 / Original</small><strong>Portfolio V1</strong><HiArrowLongRight/></a>
          <a className="choice-v2" href="/v2"><i/><small>02 / Botánico</small><strong>Portfolio V2</strong><HiArrowLongRight/></a>
        </div>
      </section>
    </main>
  );
}
