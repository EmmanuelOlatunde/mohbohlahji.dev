import { useState, useEffect, useRef, useCallback } from "react";
import {
  Files, Search, GitBranch, Settings, X, Sun, Moon,
  Mail, ExternalLink, Terminal as TermIcon,
  ChevronRight, ChevronDown, Zap, Menu, Code2, Database,
  Wifi, GitCommit, AlertCircle
} from "lucide-react";

const Github = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);
const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
// ═══════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════
const T = {
  dark: {
    bg: "#1e1e2e", sidebar: "#181825", activity: "#11111b",
    tabBar: "#181825", activeTab: "#1e1e2e",
    text: "#cdd6f4", sub: "#6c7086", muted: "#45475a",
    border: "#313244", accent: "#89dceb", accentDim: "rgba(137,220,235,0.12)",
    green: "#a6e3a1", red: "#f38ba8", yellow: "#f9e2af",
    blue: "#89b4fa", purple: "#cba6f7", pink: "#f5c2e7", teal: "#94e2d5",
    surface: "#313244", hover: "rgba(203,166,247,0.05)",
    card: "#181825", cardHover: "#1e1e2e",
    statusBg: "#89dceb", statusText: "#11111b",
    term: "#0d0d1a", lineNum: "#2e2e3e",
    gradStart: "#89dceb", gradEnd: "#cba6f7",
    scrollThumb: "rgba(137,220,235,0.2)",
  },
  light: {
    bg: "#eff1f5", sidebar: "#e6e9ef", activity: "#dce0e8",
    tabBar: "#e6e9ef", activeTab: "#eff1f5",
    text: "#4c4f69", sub: "#9ca0b0", muted: "#bcc0cc",
    border: "#ccd0da", accent: "#04a5e5", accentDim: "rgba(4,165,229,0.1)",
    green: "#40a02b", red: "#d20f39", yellow: "#df8e1d",
    blue: "#1e66f5", purple: "#8839ef", pink: "#ea76cb", teal: "#179299",
    surface: "#ccd0da", hover: "rgba(76,79,105,0.06)",
    card: "#e6e9ef", cardHover: "#dce0e8",
    statusBg: "#04a5e5", statusText: "#eff1f5",
    term: "#dce0e8", lineNum: "#acb0be",
    gradStart: "#04a5e5", gradEnd: "#8839ef",
    scrollThumb: "rgba(4,165,229,0.25)",
  },
};

// ═══════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════
const FILES = [
  { id: "readme",     name: "README.md",       ext: "md",  dot: "#f9e2af" },
  { id: "about",      name: "about.tsx",        ext: "tsx", dot: "#cba6f7" },
  { id: "projects",   name: "projects.tsx",     ext: "tsx", dot: "#89dceb" },
  { id: "experience", name: "experience.tsx",   ext: "tsx", dot: "#a6e3a1" },
  { id: "contact",    name: "contact.tsx",      ext: "tsx", dot: "#f38ba8" },
];

const SKILLS = [
  { name: "Python / Django / DRF",  pct: 92, color: "#89b4fa" },
  { name: "REST API Design",        pct: 90, color: "#a6e3a1" },
  { name: "PostgreSQL / MySQL",     pct: 85, color: "#f9e2af" },
  { name: "JWT Auth & RBAC",        pct: 88, color: "#cba6f7" },
  { name: "Docker / CI/CD",         pct: 78, color: "#f38ba8" },
  { name: "React / TypeScript",     pct: 75, color: "#89dceb" },
  { name: "Cloud Deployment",       pct: 80, color: "#94e2d5" },
  { name: "Paystack Integration",   pct: 85, color: "#f5c2e7" },
];

const PROJECTS = [
  {
    id: "estatly", name: "Estatly", file: "estatly.py",
    tag: "SaaS · Founder & Solo Dev", featured: true, color: "#89dceb",
    desc: "Estate management SaaS for Nigerian residential communities. Replaces WhatsApp chaos with structured unit management, levy tracking, Paystack payments, and role-based access.",
    stack: ["Django REST Framework", "PostgreSQL", "Paystack", "JWT", "Docker"],
    github: "https://github.com/EmmanuelOlatunde/estatly",
    live: "https://estatly.com.ng",
  },
  {
    id: "cc", name: "CC Marketers", file: "cc_marketers.py",
    tag: "Backend · Task Marketplace", featured: false, color: "#a6e3a1",
    desc: "Full marketplace backend: task APIs, real-time WebSocket chat, subscription billing, Paystack gateway integration, and granular role-based permissions.",
    stack: ["DRF", "WebSockets", "Paystack", "PostgreSQL"],
    github: "https://github.com/EmmanuelOlatunde/cc_marketers",
  },
  {
    id: "ease", name: "EaseApply AI", file: "ease_apply.py",
    tag: "AI · Resume Processing", featured: false, color: "#cba6f7",
    desc: "AI-powered resume processing pipeline. Handles document ingestion, parsing, and intelligent analysis to automate job application workflows at scale.",
    stack: ["Python", "Django", "AI Pipeline", "PostgreSQL"],
    github: "https://github.com/EmmanuelOlatunde/EaseApply",
  },
  {
    id: "progress", name: "Progress API", file: "progress_api.py",
    tag: "Gamification · Productivity", featured: false, color: "#f9e2af",
    desc: "Gamified personal development tracker. Missions, XP progression, notifications, and relational achievement models with an extensible architecture.",
    stack: ["DRF", "PostgreSQL", "Python"],
    github: "https://github.com/EmmanuelOlatunde/progress_api",
  },
];

const EXPERIENCE = [
  {
    role: "Backend Software Engineer", company: "Considerate Club",
    period: "Sep 2025", type: "Contract", color: "#89dceb",
    bullets: [
      "Designed REST APIs with DRF for a multi-user task marketplace platform.",
      "Built JWT authentication and role-based access control from scratch.",
      "Integrated Paystack for subscription billing and payment verification.",
      "Designed PostgreSQL schemas for users, tasks, subscriptions, and payments.",
    ],
  },
  {
    role: "IT Support / Systems Technician", company: "Adeyemi Federal University, Ondo",
    period: "Mar 2020 – Present", type: "Full-time", color: "#a6e3a1",
    bullets: [
      "Installed and maintained computer systems, network infrastructure, and software.",
      "Diagnosed and resolved hardware/software issues across 5 operational labs.",
      "Supported network operations during institutional registration and exam cycles.",
    ],
  },
];

const CMDS = {
  help: `Available commands:
  whoami      — who is Emmanuel
  ls          — list portfolio files
  skills      — print tech stack
  projects    — list projects
  contact     — contact info
  cat readme  — display bio
  clear       — clear terminal`,
  whoami: `Emmanuel Olatunde (Moh)
Backend Software Engineer · Ondo, Nigeria
Building production-grade APIs and scalable systems.
Founder of Estatly — estate management SaaS for Nigerian communities.
Open to: Remote · Freelance · Contract`,
  ls: `./portfolio/
├── README.md
├── about.tsx
├── projects.tsx
├── experience.tsx
└── contact.tsx`,
  skills: `Python/DRF  ████████████████████░░  92%
REST APIs   ████████████████████░░  90%
JWT/RBAC    ████████████████████░░  88%
PostgreSQL  ████████████████░░░░░░  85%
Paystack    ████████████████░░░░░░  85%
Docker      ████████████████░░░░░░  78%
React/TS    ████████████████░░░░░░  75%`,
  projects: `[1] Estatly        → SaaS estate management (Founder)
[2] CC Marketers   → Task marketplace REST backend
[3] EaseApply AI   → Resume AI processing pipeline
[4] Progress API   → Gamified productivity tracker`,
  contact: `Email    → olatundemobolaji5@gmail.com
GitHub   → github.com/EmmanuelOlatunde
LinkedIn → linkedin.com/in/emmanuelolatundemobolaji`,
  "cat readme": `# Emmanuel Olatunde
> Backend Engineer · Python · Django · PostgreSQL

I build production-grade APIs for real problems.
3+ years designing scalable backends from scratch.
Founder of Estatly — built solo from 0 to production.
Deep expertise: auth systems · payments · DB design.

Open to: Remote | Freelance | Contract`,
};

// ═══════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function useTyping(text, speed = 38, delay = 300) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (i < text.length) { i++; setDisplayed(text.slice(0, i)); }
        else { setDone(true); clearInterval(iv); }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return { displayed, done };
}

function useInView(ref, threshold = 0.15) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return vis;
}

// ═══════════════════════════════════════════
// MICRO-COMPONENTS
// ═══════════════════════════════════════════
const mono = { fontFamily: "'JetBrains Mono', 'Fira Code', monospace" };

function Tag({ label, color, t }) {
  return (
    <span style={{
      ...mono, fontSize: 10, padding: "2px 8px", borderRadius: 4,
      background: color + "14", border: `1px solid ${color}30`,
      color: color, display: "inline-block",
    }}>{label}</span>
  );
}

function SkillBar({ name, pct, color, delay, t }) {
  const ref = useRef(null);
  const vis = useInView(ref, 0.2);
  return (
    <div ref={ref} style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", ...mono, fontSize: 11, marginBottom: 5 }}>
        <span style={{ color: t.sub }}><span style={{ color: t.muted }}>//</span> {name}</span>
        <span style={{ color: color }}>{pct}</span>
      </div>
      <div style={{ height: 2, background: t.border, borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: vis ? `${pct}%` : "0%",
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${delay}ms`,
          boxShadow: `0 0 8px ${color}50`,
        }} />
      </div>
    </div>
  );
}

function CodeLine({ children, style }) {
  return <div style={{ ...mono, fontSize: 13, lineHeight: "1.9", ...style }}>{children}</div>;
}

const kw = (c, t) => <span style={{ color: t.blue }}>{c}</span>;
const str = (c, t) => <span style={{ color: t.green }}>"{c}"</span>;
const key = (c, t) => <span style={{ color: t.teal }}>{c}</span>;
const cmt = (c, t) => <span style={{ color: t.muted, fontStyle: "italic" }}>{c}</span>;
const op = (c, t) => <span style={{ color: t.sub }}>{c}</span>;

// ═══════════════════════════════════════════
// SECTION: README
// ═══════════════════════════════════════════
function ReadmeSection({ t }) {
  const { displayed, done } = useTyping("Emmanuel Olatunde", 60, 400);
  const [showSub, setShowSub] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (done) {
      setTimeout(() => setShowSub(true), 300);
      setTimeout(() => setShowCards(true), 700);
    }
  }, [done]);

  const stat = (val, label) => (
    <div style={{
      textAlign: "center", padding: "16px 20px", borderRadius: 8,
      background: t.accentDim, border: `1px solid ${t.accent}30`,
      minWidth: 90,
    }}>
      <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: t.accent }}>{val}</div>
      <div style={{ ...mono, fontSize: 10, color: t.sub, marginTop: 3 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ padding: "36px 32px", maxWidth: 720 }}>
      {/* Terminal prompt line */}
      <div style={{ ...mono, fontSize: 12, color: t.sub, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: t.green }}>➜</span>
        <span style={{ color: t.blue }}>~/portfolio</span>
        <span style={{ color: t.purple }}>git:(main)</span>
        <span style={{ color: t.sub }}>cat README.md</span>
      </div>

      {/* Typing header */}
      <div style={{ marginBottom: 6 }}>
        <span style={{ ...mono, fontSize: 13, color: t.muted }}># </span>
        <span style={{ ...mono, fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: "-0.02em" }}>
          {displayed}
        </span>
        <span style={{
          display: "inline-block", width: 3, height: 32, background: t.accent,
          marginLeft: 2, verticalAlign: "text-bottom",
          animation: done ? "blink 1s step-end infinite" : "none",
        }} />
      </div>

      {/* Subtitle */}
      <div style={{ overflow: "hidden", height: showSub ? "auto" : 0, transition: "height 0.4s ease" }}>
        <div style={{ ...mono, fontSize: 14, color: t.purple, marginBottom: 8 }}>
          <span style={{ color: t.muted }}>&gt; </span>
          Backend Software Engineer · Python · Django · PostgreSQL
        </div>
        <div style={{ ...mono, fontSize: 13, color: t.sub, lineHeight: 1.8, marginBottom: 24, borderLeft: `3px solid ${t.border}`, paddingLeft: 16 }}>
          Building production-grade APIs for real problems. Founder of{" "}
          <span style={{ color: t.accent }}>Estatly</span> — estate management SaaS built solo, from 0 to production.
          Deep in auth systems, payment integrations, and database design.
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {["Remote", "Freelance", "Contract", "✦ Available"].map((b, i) => (
            <span key={b} style={{
              ...mono, fontSize: 11, padding: "4px 12px", borderRadius: 20,
              background: i === 3 ? t.accentDim : t.hover,
              border: `1px solid ${i === 3 ? t.accent + "50" : t.border}`,
              color: i === 3 ? t.accent : t.sub,
            }}>{b}</span>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div style={{
        opacity: showCards ? 1 : 0, transform: showCards ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.5s ease", display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32,
      }}>
        {stat("3+", "years")}
        {stat("4", "APIs shipped")}
        {stat("99.9%", "uptime")}
        {stat("Ondo,NG", "location")}
      </div>

      {/* CTA buttons */}
      <div style={{
        opacity: showCards ? 1 : 0, transition: "opacity 0.5s ease 0.2s",
        display: "flex", gap: 10, flexWrap: "wrap",
      }}>
        <a href="#" onClick={e => e.preventDefault()} style={{
          background: `linear-gradient(135deg, ${t.gradStart ?? t.accent}, ${t.gradEnd ?? t.purple})`,
          color: "#11111b", padding: "10px 22px", borderRadius: 6,
          textDecoration: "none", ...mono, fontSize: 12, fontWeight: 700,
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <Zap size={13} /> view_projects()
        </a>
        <a href="https://github.com/EmmanuelOlatunde" target="_blank" rel="noreferrer" style={{
          background: "transparent", color: t.text, padding: "10px 22px", borderRadius: 6,
          textDecoration: "none", ...mono, fontSize: 12,
          border: `1px solid ${t.border}`, display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <Github size={13} /> github()
        </a>
        <a href="mailto:olatundemobolaji5@gmail.com" style={{
          background: "transparent", color: t.accent, padding: "10px 22px", borderRadius: 6,
          textDecoration: "none", ...mono, fontSize: 12,
          border: `1px solid ${t.accent}35`, display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <Mail size={13} /> hire_me()
        </a>
      </div>

      {/* Markdown divider */}
      <div style={{ margin: "36px 0", borderTop: `1px solid ${t.border}` }} />
      <div style={{ ...mono, fontSize: 12, color: t.muted }}>
        <span style={{ color: t.yellow }}>##</span> Tech Stack
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          {["Python", "Django", "DRF", "PostgreSQL", "JWT", "Docker", "Paystack", "React", "TypeScript"].map(s => (
            <Tag key={s} label={s} color={t.accent} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SECTION: ABOUT
// ═══════════════════════════════════════════
function AboutSection({ t }) {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 720 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Code block */}
        <div style={{
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 8,
          overflow: "hidden", marginBottom: 20,
        }}>
          <div style={{ padding: "8px 16px", borderBottom: `1px solid ${t.border}`, display: "flex", gap: 6, alignItems: "center", background: t.activity }}>
            {["#ef4444","#f9e2af","#a6e3a1"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }} />)}
            <span style={{ ...mono, fontSize: 11, color: t.sub, marginLeft: 8 }}>about.tsx</span>
          </div>
          <div style={{ padding: "20px 24px", display: "flex" }}>
            <div style={{ minWidth: 36, ...mono, fontSize: 11, color: t.lineNum, lineHeight: 1.9, textAlign: "right", paddingRight: 16, userSelect: "none" }}>
              {Array.from({ length: 16 }, (_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div style={{ flex: 1 }}>
              {[
                <CodeLine t={t}>{kw("import", t)} <span style={{ color: t.text }}>type</span> {op("{ Developer }", t)} {kw("from", t)} {str("./types", t)}{op(";", t)}</CodeLine>,
                <CodeLine t={t}>&nbsp;</CodeLine>,
                <CodeLine t={t}>{kw("const", t)} <span style={{ color: t.purple }}>me</span>{op(":", t)} Developer = {op("{", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("name", t)}{op(": ", t)}{str("Emmanuel Olatunde", t)}{op(",", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("alias", t)}{op(": ", t)}{str("Moh", t)}{op(",", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("location", t)}{op(": ", t)}{str("Ondo, Nigeria", t)}{op(",", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("role", t)}{op(": ", t)}{str("Backend Software Engineer", t)}{op(",", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("stack", t)}{op(": [", t)}{str("Python", t)}{op(", ", t)}{str("Django", t)}{op(", ", t)}{str("DRF", t)}{op(", ", t)}{str("PostgreSQL", t)}{op("],", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("degree", t)}{op(": ", t)}{str("B.Eng, LAUTECH 2024", t)}{op(",", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("openTo", t)}{op(": [", t)}{str("Remote", t)}{op(", ", t)}{str("Freelance", t)}{op(", ", t)}{str("Contract", t)}{op("],", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("status", t)}{op(": ", t)}<span style={{ color: t.green }}>"✦ Available"</span>{op(",", t)}</CodeLine>,
                <CodeLine t={t}>&nbsp;</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{cmt("/** Founder of Estatly — estate SaaS for Nigerian communities.", t)}</CodeLine>,
                <CodeLine style={{ paddingLeft: 20 }} t={t}>{cmt(" *  Built solo: 0 → production. Deep in auth + payments + DB. */", t)}</CodeLine>,
                <CodeLine t={t}>{op("}", t)}{op(";", t)}</CodeLine>,
                <CodeLine t={t}>&nbsp;</CodeLine>,
              ].map((el, i) => <div key={i}>{el}</div>)}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{
          background: t.card, border: `1px solid ${t.border}`, borderRadius: 8,
          padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ ...mono, fontSize: 11, color: t.muted, marginBottom: 16 }}>
            {cmt("// Proficiency — hover for details", t)}
          </div>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} {...s} delay={i * 70} t={t} />
          ))}
        </div>

        {/* Tools */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, padding: "16px 24px" }}>
          <div style={{ ...mono, fontSize: 11, color: t.muted, marginBottom: 12 }}>
            {cmt("// Tools & ecosystem", t)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Docker", "GitHub Actions", "Render", "Heroku", "DigitalOcean", "Postman", "Git", "MySQL", "SQLite", "C++", "JavaScript", "Figma"].map(tool => (
              <span key={tool} style={{
                ...mono, fontSize: 10, padding: "3px 9px", borderRadius: 4,
                background: t.hover, border: `1px solid ${t.border}`, color: t.sub,
              }}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SECTION: PROJECTS
// ═══════════════════════════════════════════
function ProjectCard({ p, t, delay }) {
  const ref = useRef(null);
  const vis = useInView(ref, 0.1);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.5s ease ${delay}ms`,
      background: hov ? t.cardHover : t.card,
      border: `1px solid ${hov ? p.color + "40" : t.border}`,
      borderRadius: 8, overflow: "hidden", marginBottom: 14,
      transition: `all 0.3s ease ${delay}ms, border-color 0.2s ease, background 0.2s ease`,
      cursor: "default",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        padding: "8px 16px", borderBottom: `1px solid ${t.border}`,
        background: t.activity, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.featured ? p.color : t.muted, display: "block", boxShadow: p.featured ? `0 0 8px ${p.color}` : "none" }} />
          <span style={{ ...mono, fontSize: 11, color: p.featured ? p.color : t.sub }}>{p.file}</span>
          {p.featured && <span style={{ ...mono, fontSize: 9, padding: "1px 6px", borderRadius: 3, background: p.color + "18", border: `1px solid ${p.color}35`, color: p.color }}>FLAGSHIP</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ ...mono, fontSize: 10, color: t.accent, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}><ExternalLink size={10} />live</a>}
          <a href={p.github} target="_blank" rel="noreferrer" style={{ ...mono, fontSize: 10, color: t.sub, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}><Github size={10} />repo</a>
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ ...mono, fontSize: 10, color: t.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{p.tag}</div>
        <p style={{ ...mono, fontSize: 13, color: t.sub, lineHeight: 1.75, margin: "0 0 14px" }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.stack.map(s => <Tag key={s} label={s} color={p.color} t={t} />)}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({ t }) {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 720 }}>
      <div style={{ ...mono, fontSize: 11, color: t.muted, marginBottom: 16 }}>
        {cmt(`// ${PROJECTS.length} projects · sorted by impact`, t)}
      </div>
      {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} t={t} delay={i * 80} />)}
    </div>
  );
}

// ═══════════════════════════════════════════
// SECTION: EXPERIENCE
// ═══════════════════════════════════════════
function ExperienceSection({ t }) {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 720 }}>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        {/* Vertical line */}
        <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, background: t.border, borderRadius: 1 }} />

        {EXPERIENCE.map((exp, ei) => (
          <div key={exp.company} style={{ position: "relative", marginBottom: ei < EXPERIENCE.length - 1 ? 36 : 0 }}>
            {/* Dot */}
            <div style={{
              position: "absolute", left: -24 + 4, top: 6, width: 10, height: 10,
              borderRadius: "50%", background: exp.color, border: `2px solid ${t.bg}`,
              boxShadow: `0 0 10px ${exp.color}60`,
            }} />

            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${t.border}`, background: t.activity }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ ...mono, fontSize: 14, fontWeight: 600, color: t.text }}>{exp.role}</div>
                    <div style={{ ...mono, fontSize: 12, color: exp.color, marginTop: 2 }}>{exp.company}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ ...mono, fontSize: 11, color: t.sub }}>{exp.period}</div>
                    <Tag label={exp.type} color={exp.color} t={t} />
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {exp.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: "flex", gap: 10, marginBottom: bi < exp.bullets.length - 1 ? 10 : 0, ...mono, fontSize: 12, color: t.sub, lineHeight: 1.7 }}>
                    <span style={{ color: exp.color, flexShrink: 0 }}>▸</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Education node */}
        <div style={{ position: "relative", marginTop: 36 }}>
          <div style={{ position: "absolute", left: -24 + 4, top: 6, width: 10, height: 10, borderRadius: "50%", background: t.purple, border: `2px solid ${t.bg}`, boxShadow: `0 0 10px ${t.purple}60` }} />
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, padding: "14px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ ...mono, fontSize: 14, fontWeight: 600, color: t.text }}>B.Eng, Computer Engineering</div>
                <div style={{ ...mono, fontSize: 12, color: t.purple, marginTop: 2 }}>LAUTECH, Ogbomoso</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ ...mono, fontSize: 11, color: t.sub }}>2024</div>
                <Tag label="Education" color={t.purple} t={t} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SECTION: CONTACT
// ═══════════════════════════════════════════
function ContactSection({ t }) {
  return (
    <div style={{ padding: "28px 32px", maxWidth: 720 }}>
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ padding: "8px 16px", borderBottom: `1px solid ${t.border}`, background: t.activity, display: "flex", gap: 6 }}>
          {["#ef4444","#f9e2af","#a6e3a1"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }} />)}
          <span style={{ ...mono, fontSize: 11, color: t.sub, marginLeft: 8 }}>contact.tsx</span>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <CodeLine t={t}>{cmt("// Let's build something that ships.", t)}</CodeLine>
          <CodeLine t={t}>&nbsp;</CodeLine>
          <CodeLine t={t}>{kw("const", t)} <span style={{ color: t.purple }}>contactInfo</span> {op("= {", t)}</CodeLine>
          {[
            ["email", "olatundemobolaji5@gmail.com", "mailto:olatundemobolaji5@gmail.com"],
            ["github", "github.com/EmmanuelOlatunde", "https://github.com/EmmanuelOlatunde"],
            ["linkedin", "linkedin.com/in/emmanuelolatundemobolaji", "https://www.linkedin.com/in/emmanuelolatundemobolaji"],
          ].map(([k, v, href]) => (
            <CodeLine key={k} style={{ paddingLeft: 20 }} t={t}>
              {key(k, t)}{op(": ", t)}
              <a href={href} target="_blank" rel="noreferrer" style={{ color: t.blue, textDecoration: "none" }}>"{v}"</a>{op(",", t)}
            </CodeLine>
          ))}
          <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("responseTime", t)}{op(": ", t)}{str("within 24 hours", t)}{op(",", t)}</CodeLine>
          <CodeLine style={{ paddingLeft: 20 }} t={t}>{key("timezone", t)}{op(": ", t)}{str("WAT (UTC+1)", t)}{op(",", t)}</CodeLine>
          <CodeLine t={t}>{op("};", t)}</CodeLine>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: t.accentDim, border: `1px solid ${t.accent}30`, borderRadius: 8, padding: "20px 24px" }}>
        <div style={{ ...mono, fontSize: 12, color: t.muted, marginBottom: 14 }}>
          {cmt("/** Ready to start a project? Drop me a message. */", t)}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="mailto:olatundemobolaji5@gmail.com" style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.purple ?? t.blue})`, color: "#11111b", padding: "10px 22px", borderRadius: 6, textDecoration: "none", ...mono, fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Mail size={13} /> send_email()
          </a>
          <a href="https://github.com/EmmanuelOlatunde" target="_blank" rel="noreferrer" style={{ background: "transparent", color: t.text, padding: "10px 22px", borderRadius: 6, textDecoration: "none", ...mono, fontSize: 12, border: `1px solid ${t.border}`, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Github size={13} /> view_github()
          </a>
          <a href="https://www.linkedin.com/in/emmanuelolatundemobolaji" target="_blank" rel="noreferrer" style={{ background: "transparent", color: t.accent, padding: "10px 22px", borderRadius: 6, textDecoration: "none", ...mono, fontSize: 12, border: `1px solid ${t.accent}35`, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Linkedin size={13} /> connect()
          </a>
        </div>
      </div>
    </div>
  );
}

const SECTIONS = { readme: ReadmeSection, about: AboutSection, projects: ProjectsSection, experience: ExperienceSection, contact: ContactSection };

// ═══════════════════════════════════════════
// TERMINAL PANEL
// ═══════════════════════════════════════════
function TerminalPanel({ t, onClose }) {
  const [history, setHistory] = useState([{ type: "system", text: "Welcome to Emmanuel's portfolio. Type 'help' for commands." }]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const submit = useCallback(() => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    const newHistory = [...history, { type: "input", text: cmd }];
    if (cmd === "clear") { setHistory([]); setInput(""); return; }
    const result = CMDS[cmd];
    if (result) newHistory.push({ type: "output", text: result });
    else newHistory.push({ type: "error", text: `Command not found: '${cmd}'. Try 'help'.` });
    setHistory(newHistory);
    setCmdHistory(prev => [cmd, ...prev.slice(0, 19)]);
    setHistIdx(-1);
    setInput("");
  }, [input, history]);

  const handleKey = (e) => {
    if (e.key === "Enter") submit();
    if (e.key === "ArrowUp") { const idx = histIdx + 1; if (idx < cmdHistory.length) { setHistIdx(idx); setInput(cmdHistory[idx]); } }
    if (e.key === "ArrowDown") { const idx = histIdx - 1; if (idx >= 0) { setHistIdx(idx); setInput(cmdHistory[idx]); } else { setHistIdx(-1); setInput(""); } }
  };

  const textColor = { system: t.sub, input: t.accent, output: t.text, error: t.red };

  return (
    <div style={{ background: t.term, borderTop: `1px solid ${t.border}`, height: 200, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "6px 14px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: t.tabBar }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TermIcon size={12} style={{ color: t.sub }} />
          <span style={{ ...mono, fontSize: 10, color: t.sub, letterSpacing: "0.1em" }}>TERMINAL</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.green, display: "block", boxShadow: `0 0 6px ${t.green}` }} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.muted, display: "flex", alignItems: "center" }}><X size={13} /></button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }} onClick={() => inputRef.current?.focus()}>
        {history.map((h, i) => (
          <div key={i} style={{ ...mono, fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-wrap", color: textColor[h.type] }}>
            {h.type === "input" && <span style={{ color: t.green }}>❯ </span>}
            {h.text}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", ...mono, fontSize: 12 }}>
          <span style={{ color: t.green, marginRight: 6 }}>❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            style={{
              background: "transparent", border: "none", outline: "none",
              color: t.accent, ...mono, fontSize: 12, flex: 1, caret: t.accent,
              caretColor: t.accent,
            }}
            placeholder="type a command..."
            spellCheck={false}
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [activeTab, setActiveTab] = useState("readme");
  const [openTabs, setOpenTabs] = useState(["readme"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [termOpen, setTermOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState("files");
  const w = useWindowWidth();
  const isMobile = w < 768;
  const t = T[theme];

  const openTab = (id) => {
    if (!openTabs.includes(id)) setOpenTabs(prev => [...prev, id]);
    setActiveTab(id);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== id);
    setOpenTabs(newTabs);
    if (activeTab === id) setActiveTab(newTabs[newTabs.length - 1] || "readme");
    if (newTabs.length === 0) { setOpenTabs(["readme"]); setActiveTab("readme"); }
  };

  const ActiveSection = SECTIONS[activeTab] || ReadmeSection;

  const fileColor = (id) => FILES.find(f => f.id === id)?.dot ?? t.sub;

  // ─── ACTIVITY BAR ─────────────────────────
  const activityItems = [
    { id: "files", icon: <Files size={20} />, label: "Explorer" },
    { id: "search", icon: <Search size={20} />, label: "Search" },
    { id: "git", icon: <GitBranch size={20} />, label: "Source Control" },
    { id: "settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  // ─── SIDEBAR FILE TREE ─────────────────────
  const SidebarPanel = () => (
    <div style={{ background: t.sidebar, borderRight: `1px solid ${t.border}`, width: isMobile ? "100%" : 220, flexShrink: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 16px 8px", ...mono, fontSize: 10, color: t.sub, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: `1px solid ${t.border}` }}>
        Explorer
      </div>
      <div style={{ padding: "4px 0", flex: 1 }}>
        <div style={{ padding: "4px 8px 4px 16px", display: "flex", alignItems: "center", gap: 4, ...mono, fontSize: 11, color: t.sub }}>
          <ChevronDown size={12} /><span>PORTFOLIO</span>
        </div>
        {FILES.map(f => (
          <div key={f.id}
            onClick={() => { openTab(f.id); if (isMobile) setSidebarOpen(false); }}
            style={{
              padding: "5px 16px 5px 28px", display: "flex", alignItems: "center", gap: 8,
              cursor: "pointer", background: activeTab === f.id ? t.accentDim : "transparent",
              borderLeft: activeTab === f.id ? `2px solid ${f.dot}` : "2px solid transparent",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (activeTab !== f.id) e.currentTarget.style.background = t.hover; }}
            onMouseLeave={e => { if (activeTab !== f.id) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: f.dot, display: "block", flexShrink: 0 }} />
            <span style={{ ...mono, fontSize: 12, color: activeTab === f.id ? t.text : t.sub }}>{f.name}</span>
          </div>
        ))}

        {/* Git section */}
        <div style={{ marginTop: 16, padding: "4px 8px 4px 16px", display: "flex", alignItems: "center", gap: 4, ...mono, fontSize: 11, color: t.sub }}>
          <ChevronDown size={12} /><span>GIT</span>
        </div>
        <div style={{ padding: "5px 16px 5px 28px", display: "flex", alignItems: "center", gap: 8 }}>
          <GitCommit size={11} style={{ color: t.green }} />
          <span style={{ ...mono, fontSize: 11, color: t.sub }}>main</span>
          <span style={{ ...mono, fontSize: 10, padding: "1px 5px", borderRadius: 3, background: t.green + "20", color: t.green }}>✓ clean</span>
        </div>
        <div style={{ padding: "5px 16px 5px 28px" }}>
          <span style={{ ...mono, fontSize: 10, color: t.muted }}>4 deployments</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 4px currentColor} 50%{box-shadow:0 0 12px currentColor} }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 3px; }
      `}</style>

      <div style={{ background: t.bg, color: t.text, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'JetBrains Mono', monospace" }}>

        {/* ── TOP MENU BAR ── */}
        <div style={{ height: 28, background: t.activity, borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0, zIndex: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {isMobile ? (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: t.sub, cursor: "pointer", display: "flex" }}><Menu size={14} /></button>
            ) : null}
            <span style={{ ...mono, fontSize: 12, color: t.accent, fontWeight: 700 }}>◈ EmmanuelOlatunde.dev</span>
            {!isMobile && ["File", "Edit", "View", "Terminal", "Help"].map(m => (
              <span key={m} style={{ ...mono, fontSize: 11, color: t.muted }}>{m}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={{ background: "none", border: "none", cursor: "pointer", color: t.sub, display: "flex", alignItems: "center" }}>
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <a href="mailto:olatundemobolaji5@gmail.com" style={{ ...mono, fontSize: 11, color: t.accent, background: t.accentDim, border: `1px solid ${t.accent}35`, padding: "3px 12px", borderRadius: 4, textDecoration: "none" }}>hire_me()</a>
          </div>
        </div>

        {/* ── TABS ROW ── */}
        <div style={{ height: 35, background: t.tabBar, borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "stretch", flexShrink: 0, overflowX: "auto" }}>
          {openTabs.map(id => {
            const file = FILES.find(f => f.id === id);
            if (!file) return null;
            const isActive = activeTab === id;
            return (
              <div key={id} onClick={() => setActiveTab(id)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "0 14px",
                cursor: "pointer", background: isActive ? t.activeTab : "transparent",
                borderBottom: isActive ? `2px solid ${file.dot}` : "2px solid transparent",
                borderRight: `1px solid ${t.border}`, flexShrink: 0,
                transition: "background 0.15s",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: file.dot, display: "block", flexShrink: 0 }} />
                <span style={{ ...mono, fontSize: 12, color: isActive ? t.text : t.sub, whiteSpace: "nowrap" }}>{file.name}</span>
                <button onClick={(e) => closeTab(id, e)} style={{
                  background: "none", border: "none", cursor: "pointer", color: t.muted,
                  display: "flex", alignItems: "center", padding: "1px", borderRadius: 2,
                  opacity: isActive ? 1 : 0, transition: "opacity 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.parentElement.querySelector("button").style.opacity = 1; }}
                >
                  <X size={11} />
                </button>
              </div>
            );
          })}
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

          {/* Activity Bar — desktop only */}
          {!isMobile && (
            <div style={{ width: 48, background: t.activity, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8, gap: 4, flexShrink: 0 }}>
              {activityItems.map(item => (
                <button key={item.id} title={item.label}
                  onClick={() => { setActiveActivity(item.id); if (item.id !== "settings") setSidebarOpen(true); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "10px 0", width: "100%", display: "flex", justifyContent: "center",
                    color: activeActivity === item.id ? t.text : t.muted,
                    borderLeft: activeActivity === item.id ? `2px solid ${t.accent}` : "2px solid transparent",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = t.text}
                  onMouseLeave={e => { if (activeActivity !== item.id) e.currentTarget.style.color = t.muted; }}
                >
                  {item.icon}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button onClick={() => setTermOpen(!termOpen)} title="Toggle Terminal"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 0", width: "100%", display: "flex", justifyContent: "center", color: termOpen ? t.accent : t.muted, marginBottom: 8 }}>
                <TermIcon size={20} />
              </button>
            </div>
          )}

          {/* Sidebar — mobile overlay or desktop panel */}
          {sidebarOpen && (
            <>
              {isMobile && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 30 }} onClick={() => setSidebarOpen(false)} />}
              <div style={{ ...(isMobile ? { position: "fixed", left: 0, top: 63, bottom: 0, zIndex: 40, width: 240 } : {}), display: "flex", flexShrink: 0 }}>
                <SidebarPanel />
              </div>
            </>
          )}

          {/* Editor + Terminal */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Breadcrumb */}
            <div style={{ height: 28, background: t.bg, borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0 }}>
              <span style={{ ...mono, fontSize: 11, color: t.muted }}>portfolio</span>
              <ChevronRight size={10} style={{ color: t.muted, margin: "0 4px" }} />
              <span style={{ ...mono, fontSize: 11, color: t.text }}>{FILES.find(f => f.id === activeTab)?.name}</span>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex" }}>
              {/* Line numbers */}
              {!isMobile && (
                <div style={{ width: 44, background: t.bg, borderRight: `1px solid ${t.border}05`, paddingTop: 28, flexShrink: 0, textAlign: "right", paddingRight: 10, userSelect: "none" }}>
                  {Array.from({ length: 80 }, (_, i) => <div key={i} style={{ ...mono, fontSize: 11, color: t.lineNum, lineHeight: "1.9" }}>{i + 1}</div>)}
                </div>
              )}
              {/* Section content */}
              <div key={activeTab} style={{ flex: 1, animation: "fadeUp 0.25s ease" }}>
                <ActiveSection t={t} />
              </div>
            </div>

            {/* Terminal */}
            {termOpen && <TerminalPanel t={t} onClose={() => setTermOpen(false)} />}
          </div>
        </div>

        {/* ── MOBILE BOTTOM NAV ── */}
        {isMobile && (
          <div style={{ height: 52, background: t.activity, borderTop: `1px solid ${t.border}`, display: "flex", alignItems: "center", flexShrink: 0 }}>
            {FILES.map(f => (
              <button key={f.id} onClick={() => openTab(f.id)} style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "6px 0",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: activeTab === f.id ? f.dot : t.muted, display: "block", boxShadow: activeTab === f.id ? `0 0 8px ${f.dot}` : "none", transition: "all 0.2s" }} />
                <span style={{ ...mono, fontSize: 9, color: activeTab === f.id ? f.dot : t.muted, letterSpacing: "0.04em" }}>
                  {f.name.replace(".tsx", "").replace(".md", "")}
                </span>
              </button>
            ))}
            <button onClick={() => setTermOpen(!termOpen)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0" }}>
              <TermIcon size={14} style={{ color: termOpen ? t.accent : t.muted }} />
              <span style={{ ...mono, fontSize: 9, color: termOpen ? t.accent : t.muted }}>terminal</span>
            </button>
          </div>
        )}

        {/* ── STATUS BAR ── */}
        <div style={{ height: 22, background: t.statusBg, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ ...mono, fontSize: 10, color: t.statusText, fontWeight: 700 }}>⎇ main</span>
            <span style={{ ...mono, fontSize: 10, color: t.statusText }}>✓ 4 APIs deployed</span>
            {!isMobile && <span style={{ ...mono, fontSize: 10, color: t.statusText }}>⚡ Available for hire</span>}
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {!isMobile && <>
              <span style={{ ...mono, fontSize: 10, color: t.statusText }}>Python 3.12</span>
              <span style={{ ...mono, fontSize: 10, color: t.statusText }}>Django 5.0</span>
            </>}
            <span style={{ ...mono, fontSize: 10, color: t.statusText }}>UTF-8</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Wifi size={9} style={{ color: t.statusText }} />
              <span style={{ ...mono, fontSize: 10, color: t.statusText }}>WAT</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}