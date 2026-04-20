import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
  label: string;
  level: number;
}

interface Project {
  title: string;
  tag: string;
  url: string;
  desc: string;
  stack: string[];
  highlight: boolean;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

// ─── Font Loader ──────────────────────────────────────────────────────────────
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(texts: string[], speed = 60, pause = 1800): string {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length)
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    else if (!deleting && charIdx === current.length)
      timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return displayed;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ROLES: string[] = [
  "Backend Software Engineer",
  "Django REST Framework Dev",
  "API Architect",
  "SaaS Builder",
  "Python Engineer",
];

const SKILLS: Skill[] = [
  { label: "Python / Django / DRF", level: 92 },
  { label: "REST API Design", level: 90 },
  { label: "PostgreSQL / MySQL", level: 85 },
  { label: "JWT Auth & RBAC", level: 88 },
  { label: "Docker / GitHub Actions", level: 78 },
  { label: "React / TypeScript", level: 75 },
  { label: "Cloud Deployment (Render/DO)", level: 80 },
  { label: "Paystack Integration", level: 85 },
];

const EXPERIENCE: Experience[] = [
  {
    role: "Backend Software Engineer",
    company: "Considerate Club",
    period: "Sep 2025",
    bullets: [
      "Designed REST APIs with DRF for a multi-user task marketplace platform.",
      "Built JWT authentication and role-based access control from scratch.",
      "Integrated Paystack for subscription billing and payment verification.",
      "Designed PostgreSQL schemas for users, tasks, subscriptions, and payments.",
      "Deployed backend services to cloud; API testing and documentation via Postman.",
    ],
  },
  {
    role: "IT Support / Systems Technician",
    company: "Adeyemi Federal University, Ondo",
    period: "Mar 2020 – Present",
    bullets: [
      "Installed and maintained computer systems, network infrastructure, and software.",
      "Diagnosed and resolved hardware and software issues across operational labs.",
      "Supported network operations during institutional registration and exam processes.",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Estatly",
    tag: "SaaS · Founder & Solo Dev",
    url: "https://github.com/EmmanuelOlatunde/estatly",
    desc: "Estate management platform for Nigerian residential communities replacing WhatsApp and paper records. Handles unit management, fee tracking, payment processing, receipt generation, and role-based resident/admin access.",
    stack: ["Django REST Framework", "PostgreSQL", "JWT Auth", "Paystack", "Python"],
    highlight: true,
  },
  {
    title: "Task Marketplace Platform",
    tag: "Backend · CCMarketers",
    url: "https://github.com/EmmanuelOlatunde/cc_marketers",
    desc: "Full backend for a marketplace connecting advertisers and members. Includes task posting/assignment APIs, real-time chat, subscription plans, Paystack payment gateway, and role-based permissions.",
    stack: ["Django REST Framework", "PostgreSQL", "Paystack", "WebSockets"],
    highlight: false,
  },
  {
    title: "EaseApply AI",
    tag: "AI · Resume Processing",
    url: "https://github.com/EmmanuelOlatunde/EaseApply",
    desc: "AI-powered resume processing system. Backend handles document ingestion, parsing, and intelligent analysis pipelines to streamline job application workflows at scale.",
    stack: ["Python", "Django", "PostgreSQL", "AI Pipeline"],
    highlight: false,
  },
  {
    title: "Progress Tracking API",
    tag: "Gamified Productivity",
    url: "https://github.com/EmmanuelOlatunde/progress_api",
    desc: "Gamified personal development tracking backend. APIs for missions, tasks, notifications, and XP progression with relational models for achievements and extensible architecture.",
    stack: ["Django REST Framework", "PostgreSQL", "Python"],
    highlight: false,
  },
];

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ label, level, delay }: Skill & { delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref} style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: "#94a3b8",
          marginBottom: "6px",
        }}
      >
        <span>{label}</span>
        <span style={{ color: "#00f5c4" }}>{level}%</span>
      </div>
      <div
        style={{
          height: "3px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: "linear-gradient(90deg, #00f5c4, #0ea5e9)",
            borderRadius: "2px",
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 8px #00f5c480",
          }}
        />
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function Section({
  id,
  children,
  style = {},
}: {
  id: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,245,196,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "#00f5c440" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "12px",
        padding: "28px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {project.highlight && (
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(0,245,196,0.12)",
            border: "1px solid #00f5c440",
            borderRadius: "20px",
            padding: "3px 10px",
            fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#00f5c4",
            letterSpacing: "0.08em",
          }}
        >
          FLAGSHIP
        </div>
      )}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#64748b",
          marginBottom: "8px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {project.tag}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "20px",
            fontWeight: 700,
            color: "#f1f5f9",
            margin: 0,
          }}
        >
          {project.title}
        </h3>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#475569",
            fontSize: "11px",
            fontFamily: "'JetBrains Mono', monospace",
            textDecoration: "none",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
            (e.currentTarget.style.color = "#00f5c4")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
            (e.currentTarget.style.color = "#475569")
          }
        >
          [github↗]
        </a>
      </div>
      <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.8, margin: "0 0 20px" }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {project.stack.map((s: string) => (
          <span
            key={s}
            style={{
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.2)",
              color: "#7dd3fc",
              borderRadius: "6px",
              padding: "3px 10px",
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Experience Card ──────────────────────────────────────────────────────────
function ExpCard({ exp, index }: { exp: Experience; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "170px 1fr",
        gap: "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.5s ease",
      }}
    >
      <div style={{ paddingTop: "4px" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#00f5c4",
            marginBottom: "4px",
            letterSpacing: "0.08em",
          }}
        >
          {exp.period}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#64748b",
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.5,
          }}
        >
          {exp.company}
        </div>
      </div>
      <div style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: "24px" }}>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "17px",
            fontWeight: 700,
            color: "#f1f5f9",
            margin: "0 0 14px",
          }}
        >
          {exp.role}
        </h3>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {exp.bullets.map((b: string, i: number) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "13px",
                color: "#94a3b8",
                lineHeight: 1.75,
                marginBottom: "6px",
              }}
            >
              <span style={{ color: "#00f5c4", flexShrink: 0, marginTop: "3px" }}>▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ active }: { active: string }) {
  const links = ["about", "experience", "skills", "projects", "contact"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        background: "rgba(5,5,12,0.88)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13px",
          color: "#00f5c4",
          letterSpacing: "0.05em",
        }}
      >
        emmanuel.dev
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: active === l ? "#00f5c4" : "#64748b",
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
          >
            {l}
          </a>
        ))}
        <a
          href="/Emmanuel_Olatunde_CV.pdf"
          download
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: "rgba(0,245,196,0.1)",
            border: "1px solid #00f5c430",
            borderRadius: "6px",
            color: "#00f5c4",
            textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.05em",
          }}
        >
          CV ↓
        </a>
      </div>
    </nav>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const role = useTypewriter(ROLES);
  const [activeSection, setActiveSection] = useState("about");
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const h = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { threshold: 0.3 }
    );
    ["about", "experience", "skills", "projects", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const wrap: CSSProperties = { maxWidth: "780px", margin: "0 auto", padding: "100px 24px" };
  const lbl: CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    color: "#00f5c4",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: "16px",
    display: "block",
  };
  const h2: CSSProperties = {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(24px, 3.5vw, 34px)",
    fontWeight: 800,
    color: "#f1f5f9",
    margin: "0 0 32px",
    lineHeight: 1.2,
  };

  return (
    <div
      style={{
        background: "#05050c",
        color: "#e2e8f0",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      <FontLoader />

      {/* Grid bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(0,245,196,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,196,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Cursor glow */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x - 200,
          top: cursorPos.y - 200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,245,196,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "left 0.1s ease, top 0.1s ease",
        }}
      />

      <Nav active={activeSection} />

      {/* HERO */}
      <div
        style={{ ...wrap, paddingTop: "160px", paddingBottom: "80px", position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            color: "#00f5c4",
            marginBottom: "24px",
            opacity: 0.8,
          }}
        >
          // Hello, world
        </div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(38px, 7vw, 64px)",
            fontWeight: 800,
            color: "#f8fafc",
            margin: "0 0 8px",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Emmanuel
          <br />
          <span style={{ WebkitTextStroke: "1px rgba(248,250,252,0.28)", color: "transparent" }}>
            Olatunde.
          </span>
        </h1>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(12px, 1.8vw, 15px)",
            color: "#64748b",
            margin: "24px 0 32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#0ea5e9" }}>~$</span>
          <span style={{ color: "#94a3b8" }}>{role}</span>
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "15px",
              background: "#00f5c4",
              animation: "blink 1s step-end infinite",
              verticalAlign: "middle",
            }}
          />
        </div>
        <p
          style={{
            fontSize: "15px",
            color: "#94a3b8",
            maxWidth: "520px",
            lineHeight: 1.85,
            margin: "0 0 40px",
          }}
        >
          Specialising in production-grade APIs with Python, Django REST Framework, and PostgreSQL.
          I build payment platforms, AI-powered systems, and multi-user SaaS products that scale.
        </p>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              background: "linear-gradient(135deg, #00f5c4, #0ea5e9)",
              color: "#05050c",
              padding: "12px 26px",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            view_projects()
          </a>
          <a
            href="/Emmanuel_Olatunde_CV.pdf"
            download
            style={{
              background: "transparent",
              color: "#00f5c4",
              padding: "12px 26px",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              border: "1px solid rgba(0,245,196,0.4)",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.background = "rgba(0,245,196,0.05)")
            }
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            download_cv()
          </a>
          <a
            href="mailto:olatundemobolaji5@gmail.com"
            style={{
              background: "transparent",
              color: "#94a3b8",
              padding: "12px 26px",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              letterSpacing: "0.05em",
            }}
          >
            hire_me()
          </a>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" style={{ position: "relative", zIndex: 2 }}>
        <div style={wrap}>
          <span style={lbl}>01 / about</span>
          <h2 style={h2}>Who I Am</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            <div>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.85, margin: "0 0 16px" }}>
                Backend software engineer based in Ondo, Nigeria, specialising in scalable, secure
                REST APIs with Python and Django REST Framework. Deep experience in authentication
                systems, database design, Paystack integrations, and cloud deployment.
              </p>
              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.85, margin: 0 }}>
                Founder of{" "}
                <a
                  href="https://github.com/EmmanuelOlatunde/estatly"
                  style={{ color: "#00f5c4", textDecoration: "none" }}
                >
                  Estatly
                </a>
                , an estate management SaaS for Nigerian residential communities — designed, built,
                and deployed solo from the ground up.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "24px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                lineHeight: 2.2,
              }}
            >
              {(
                [
                  ["location", "Ondo, Nigeria"],
                  ["primary_stack", "Python · DRF · PostgreSQL"],
                  ["frontend", "React · TypeScript"],
                  ["degree", "B.Eng, LAUTECH '24"],
                  ["open_to", "Remote · Freelance · Contract"],
                  ["status", "✦ Available"],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "12px" }}>
                  <span style={{ color: "#0ea5e9", minWidth: "100px" }}>{k}</span>
                  <span style={{ color: "#94a3b8" }}>→ {v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" style={{ position: "relative", zIndex: 2 }}>
        <div style={wrap}>
          <span style={lbl}>02 / experience</span>
          <h2 style={h2}>Work History</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {EXPERIENCE.map((exp, i) => (
              <ExpCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" style={{ position: "relative", zIndex: 2 }}>
        <div style={wrap}>
          <span style={lbl}>03 / skills</span>
          <h2 style={h2}>Tech Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 56px" }}>
            {SKILLS.map((s, i) => (
              <SkillBar key={s.label} label={s.label} level={s.level} delay={i * 80} />
            ))}
          </div>
          <div
            style={{
              marginTop: "36px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#475569",
                marginBottom: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              also worked with
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                "Docker","GitHub Actions","Render","Heroku","DigitalOcean",
                "Postman","Git","SQLite","MySQL","C++","JavaScript",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#64748b",
                    borderRadius: "6px",
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" style={{ position: "relative", zIndex: 2 }}>
        <div style={wrap}>
          <span style={lbl}>04 / projects</span>
          <h2 style={h2}>Things I've Built</h2>
          <div style={{ display: "grid", gap: "18px" }}>
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ ...wrap, textAlign: "center" }}>
          <span style={{ ...lbl, display: "flex", justifyContent: "center" }}>05 / contact</span>
          <h2 style={{ ...h2, textAlign: "center" }}>Let's Build Something</h2>
          <p
            style={{
              fontSize: "14px",
              color: "#94a3b8",
              maxWidth: "420px",
              margin: "0 auto 40px",
              lineHeight: 1.85,
            }}
          >
            Open to freelance projects, remote backend roles, and interesting API challenges. I
            respond promptly.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            {[
              { label: "Email", href: "mailto:olatundemobolaji5@gmail.com", icon: "✉" },
              { label: "GitHub", href: "https://github.com/EmmanuelOlatunde", icon: "⌥" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/emmanuelolatundemobolaji",
                icon: "◈",
              },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 22px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  transition: "all 0.2s",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = "#00f5c440";
                  e.currentTarget.style.color = "#e2e8f0";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                <span style={{ color: "#00f5c4" }}>{icon}</span> {label}
              </a>
            ))}
          </div>
        </div>
      </Section>

      <div
        style={{
          textAlign: "center",
          padding: "40px 24px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#2d3748",
          position: "relative",
          zIndex: 2,
        }}
      >
        built with React + TypeScript · Emmanuel Olatunde © {new Date().getFullYear()}
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05050c; }
        ::-webkit-scrollbar-thumb { background: rgba(0,245,196,0.2); border-radius: 2px; }
      `}</style>
    </div>
  );
}