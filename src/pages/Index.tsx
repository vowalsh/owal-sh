import { useState, useEffect, useRef, useCallback } from "react";
import { Github, Mail, Linkedin } from "lucide-react";

const COMMANDS = [
  { cmd: "cat about.md", section: "about", type: "cat" },
  { cmd: "python experience.py", section: "experience", type: "python" },
  { cmd: "./education.sh", section: "education", type: "shell" },
  { cmd: "ls -la skills/", section: "skills", type: "ls" },
  { cmd: "cat research.md", section: "research", type: "cat" },
  { cmd: "./links.sh", section: "links", type: "shell" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const navigateToSection = useCallback((index: number) => {
    if (index < 0 || index >= COMMANDS.length || index === activeSection) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, [activeSection]);

  const handleCommand = (cmd: string) => {
    const commandIndex = COMMANDS.findIndex(c => c.cmd === cmd);
    if (commandIndex !== -1) {
      navigateToSection(commandIndex);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue) {
      handleCommand(inputValue);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find(c => c.cmd.startsWith(inputValue));
      if (match) {
        setInputValue(match.cmd);
      }
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  // Global arrow key navigation (left/right only, up/down for scroll)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current && inputValue) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateToSection(activeSection + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateToSection(activeSection - 1);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeSection, inputValue, navigateToSection]);

  // Check if content is scrollable and track scroll position
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkScroll = () => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
      setCanScroll(hasScroll);
      setIsAtBottom(atBottom);
    };

    // Check after animations complete and focus for scrolling
    const timeout = setTimeout(() => {
      checkScroll();
      el.focus();
    }, 500);
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      clearTimeout(timeout);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [activeSection]);

  // Touch swipe handling for mobile
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      const threshold = 50;

      if (diff > threshold) {
        navigateToSection(activeSection + 1);
      } else if (diff < -threshold) {
        navigateToSection(activeSection - 1);
      }
      touchStartX.current = null;
    };

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, navigateToSection]);

  const filteredCommands = inputValue
    ? COMMANDS.filter(c => c.cmd.includes(inputValue))
    : COMMANDS;

  const currentCommand = COMMANDS[activeSection];

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Fixed Terminal Header */}
      <header className="flex-shrink-0 bg-background z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center font-mono text-sm">
            <button
              onClick={() => navigateToSection(0)}
              className="text-[hsl(var(--accent))] hover:opacity-80 transition-opacity"
            >
              vowalsh@nyc:~$
            </button>
            <span className="ml-2 text-foreground">{inputValue || currentCommand.cmd}</span>
            <span className="prompt-cursor"></span>
            <div className="relative flex-1 ml-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={handleKeyDown}
                placeholder=""
                className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none"
                spellCheck={false}
                autoComplete="off"
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 mt-3 w-full max-w-md bg-[hsl(var(--bg-card))] border border-border rounded-md overflow-hidden shadow-lg">
                  {filteredCommands.map((cmd, i) => (
                    <button
                      key={cmd.cmd}
                      onClick={() => handleCommand(cmd.cmd)}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2 ${
                        i === activeSection
                          ? "bg-[hsl(var(--bg-elevated))] text-foreground"
                          : "hover:bg-[hsl(var(--bg-elevated))]"
                      }`}
                    >
                      <span className="text-[hsl(var(--accent))]">$</span>
                      <span className="text-[hsl(var(--text-secondary))]">{cmd.cmd}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Single Section View */}
      <main className="flex-1 overflow-hidden font-mono text-xs sm:text-sm">
        <div className="max-w-4xl mx-auto px-6 h-full flex flex-col pt-4">
          {/* Section Content with Fade */}
          <div
            ref={contentRef}
            tabIndex={0}
            className={`flex-1 overflow-y-auto terminal-section outline-none ${isTransitioning ? "fade-out" : "fade-in"}`}
          >
            {activeSection === 0 && <AboutSection />}
            {activeSection === 1 && <ExperienceSection />}
            {activeSection === 2 && <EducationSection />}
            {activeSection === 3 && <SkillsSection />}
            {activeSection === 4 && <ResearchSection />}
            {activeSection === 5 && <LinksSection />}
          </div>

          {/* Scroll Controls */}
          {canScroll && (
            <div className="flex justify-center items-center gap-4 py-1 text-[hsl(var(--text-muted))] text-xs">
              <button
                onClick={() => contentRef.current?.scrollBy({ top: -100, behavior: "smooth" })}
                className="hover:text-foreground transition-colors"
              >
                ↑
              </button>
              <span className="animate-pulse">{!isAtBottom ? "scroll for more" : "end"}</span>
              <button
                onClick={() => contentRef.current?.scrollBy({ top: 100, behavior: "smooth" })}
                className="hover:text-foreground transition-colors"
              >
                ↓
              </button>
            </div>
          )}

          {/* Navigation Hint */}
          <div className="py-3 text-[hsl(var(--text-muted))] text-xs flex items-center justify-between">
            <span>
              {activeSection > 0 && (
                <button
                  onClick={() => navigateToSection(activeSection - 1)}
                  className="hover:text-foreground transition-colors"
                >
                  ← {COMMANDS[activeSection - 1].section}
                </button>
              )}
            </span>
            <span className="text-[hsl(var(--text-muted))]">
              [{activeSection + 1}/{COMMANDS.length}]<span className="hidden sm:inline"> use ←→ arrows</span><span className="sm:hidden"> swipe to navigate</span>
            </span>
            <span>
              {activeSection < COMMANDS.length - 1 && (
                <button
                  onClick={() => navigateToSection(activeSection + 1)}
                  className="hover:text-foreground transition-colors"
                >
                  {COMMANDS[activeSection + 1].section} →
                </button>
              )}
            </span>
          </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="flex-shrink-0 border-t border-border bg-background z-50">
        <div className="max-w-4xl mx-auto px-6 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2 text-xs">
          <p className="text-[hsl(var(--text-muted))]">vowalsh ~/ 2026</p>
          <p className="text-[hsl(var(--text-muted))]">last_deploy: 2026-02-06 18:46 EST</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vowalsh/owal-sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--text-muted))] hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Github size={12} />
              source
            </a>
            <a
              href="https://github.com/vowalsh/owal-sh/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--text-muted))] hover:text-foreground transition-colors"
            >
              MIT
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Section Components

const AboutSection = () => (
  <div className="terminal-output animate-section">
    <p className="text-2xl text-foreground mb-2 typing-line font-semibold" style={{ animationDelay: "0s" }}>
      V. Oliver Walsh
    </p>
    <p className="text-base text-[hsl(var(--text-secondary))] mb-5 typing-line" style={{ animationDelay: "0.1s" }}>
      applied ai engineer building intelligent systems from research to production.
    </p>

    <div className="typing-line mb-6" style={{ animationDelay: "0.2s" }}>
      <a
        href="https://github.com/vowalsh"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[hsl(var(--text-muted))] hover:text-foreground transition-colors mb-3"
      >
        <span className="text-[hsl(var(--accent))]">→</span> github.com/vowalsh
      </a>
      <a
        href="https://github.com/vowalsh"
        target="_blank"
        rel="noopener noreferrer"
        className="block opacity-90 hover:opacity-100 transition-opacity"
      >
        <img
          src="https://ghchart.rshah.org/6b9dad/vowalsh"
          alt="vowalsh's GitHub contribution graph"
          className="w-full github-chart"
        />
      </a>
    </div>

    <div className="typing-line" style={{ animationDelay: "0.3s" }}>
      <p className="text-[hsl(var(--text-muted))] mb-2">what i'm working on (outside of job)</p>
      <div className="text-[hsl(var(--text-secondary))] pl-2 space-y-1">
        <p>→ building agent frameworks</p>
        <p>→ building a personal agentic "life OS"</p>
        <p>→ learning guitar</p>
        <p>→ traveling</p>
        <p>→ photography</p>
        <p className="mt-2">→ reading:</p>
        <div className="pl-4 text-[hsl(var(--text-muted))] space-y-0.5">
          <a href="https://www.amazon.com/Singularity-Near-Humans-Transcend-Biology/dp/0670033847" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ the singularity is near (Kurzweil)</a>
          <a href="https://www.amazon.com/dp/0399562761" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ the singularity is nearer (Kurzweil)</a>
          <a href="https://www.amazon.com/dp/0691118809" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ the princeton companion to mathematics (Gowers)</a>
          <a href="https://www.amazon.com/dp/0674013735" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ what is ancient philosophy? (Hadot)</a>
          <a href="https://www.amazon.com/dp/014044517X" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ conversations of socrates (Xenophon)</a>
          <a href="https://www.amazon.com/dp/0143107216" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ the art of happiness (Epicurus)</a>
          <a href="https://www.amazon.com/dp/B0CV6R443J" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ dokkodo: the way of walking alone (Musashi)</a>
          <a href="https://www.amazon.com/dp/0142437239" target="_blank" rel="noopener noreferrer" className="block hover:text-foreground transition-colors">↳ don quixote (Cervantes)</a>
        </div>
      </div>
    </div>

  </div>
);

const ExperienceSection = () => (
  <div className="terminal-output space-y-6 pb-4">
    <TerminalJob
      company="Expin"
      subtitle="The Exposome Intelligence Company"
      role="member of technical staff"
      period="dec 2025 – present"
      location="nyc"
      bullets={[
        "lead engineering and research for ai platform architecture.",
        "building evidence ingestion, interview agents, and matching system."
      ]}
      delay={0}
    />
    <TerminalJob
      company="Tabs"
      role="member of technical staff"
      period="aug 2025 – dec 2025"
      location="nyc"
      bullets={[
        "led ai/ml research and established engineering processes.",
        "built ml platform: llm workflows, agentic systems, classical ml.",
        "developed transaction matching and contract extraction models."
      ]}
      delay={1}
    />
    <TerminalJob
      company="OpenGradient"
      role="lead machine learning engineer"
      period="jul 2024 – aug 2025"
      location="nyc"
      bullets={[
        "lead mle for decentralized ml inference layer on Ethereum.",
        "designed storage layer, model infra, and extensible Python sdk.",
        "built volatility and spot forecasting with linear models and lstms.",
        "established partnerships with Coinbase and major web3 firms."
      ]}
      delay={2}
    />
    <TerminalJob
      company="Coinbase"
      role="machine learning engineer"
      period="jun 2022 – may 2024"
      location="nyc"
      bullets={[
        "maintained and developed Coinbase's ml platform.",
        "integrated model explainability: Shapley, Fiddler AI, integrated gradients.",
        "architected explainability audit pipeline to Kafka and Snowflake.",
        "migrated models from Sagemaker to Anyscale Ray training and serving.",
        "ml observability dri: Datadog monitoring across pipelines and serving."
      ]}
      delay={3}
    />
    <TerminalJob
      company="Coinbase"
      role="machine learning engineering intern"
      period="jun 2021 – aug 2021"
      location="sf"
      bullets={[
        "built observability pipeline for ml model lifecycle metrics.",
        "created performance summaries for stakeholder model investigation."
      ]}
      delay={4}
    />
  </div>
);

const SkillsSection = () => {
  const aiMl = ["Python", "PyTorch", "TensorFlow", "JAX", "vLLM", "Hugging Face", "Ray", "Anyscale", "Databricks", "Spark", "XGBoost", "LightGBM", "W&B", "mlflow", "Fiddler", "Airflow 2", "Kafka", "Snowflake", "Delta Lake", "Docker", "Kubernetes", "AWS (SageMaker)", "GCP (Vertex)", "ZK-ML", "Confidential Compute (H100, TEEs)"];
  const langTools = ["Linux", "Bash", "C/C++", "Rust", "Go", "Java", "TypeScript", "JavaScript", "SQL", "PostgreSQL", "MongoDB", "React", "Node.js", "Ethereum", "Web3"];
  const total = aiMl.length + langTools.length + 2;
  const aiMlMid = Math.ceil(aiMl.length / 2);
  const langMid = Math.ceil(langTools.length / 2);

  return (
    <div className="terminal-output text-[hsl(var(--text-secondary))]">
      <div className="text-[hsl(var(--text-muted))] mb-2 typing-line">total {total}</div>
      <div className="typing-line mb-1" style={{ animationDelay: "0.05s" }}>
        <span className="text-[hsl(var(--accent))]">drwxr-xr-x</span>  ai_ml/
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2">
        <div>
          {aiMl.slice(0, aiMlMid).map((skill, i) => (
            <div key={skill} className="typing-line" style={{ animationDelay: `${0.1 + i * 0.03}s` }}>
              <span className="text-[hsl(var(--text-muted))]">-rw-r--r--</span>  {skill}
            </div>
          ))}
        </div>
        <div>
          {aiMl.slice(aiMlMid).map((skill, i) => (
            <div key={skill} className="typing-line" style={{ animationDelay: `${0.1 + (i + aiMlMid) * 0.03}s` }}>
              <span className="text-[hsl(var(--text-muted))]">-rw-r--r--</span>  {skill}
            </div>
          ))}
        </div>
      </div>
      <div className="typing-line mt-3 mb-1" style={{ animationDelay: `${0.1 + aiMl.length * 0.03 + 0.05}s` }}>
        <span className="text-[hsl(var(--accent))]">drwxr-xr-x</span>  systems_languages_infra/
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 pl-2">
        <div>
          {langTools.slice(0, langMid).map((skill, i) => (
            <div key={skill} className="typing-line" style={{ animationDelay: `${0.1 + aiMl.length * 0.03 + 0.1 + i * 0.03}s` }}>
              <span className="text-[hsl(var(--text-muted))]">-rw-r--r--</span>  {skill}
            </div>
          ))}
        </div>
        <div>
          {langTools.slice(langMid).map((skill, i) => (
            <div key={skill} className="typing-line" style={{ animationDelay: `${0.1 + aiMl.length * 0.03 + 0.1 + (i + langMid) * 0.03}s` }}>
              <span className="text-[hsl(var(--text-muted))]">-rw-r--r--</span>  {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EducationSection = () => (
  <div className="terminal-output">
    <div className="space-y-5">
      <div className="typing-line" style={{ animationDelay: "0.2s" }}>
        <span className="text-foreground font-semibold">Johns Hopkins University</span>
        <span className="text-[hsl(var(--text-muted))]"> · baltimore</span>
        <p className="text-[hsl(var(--text-secondary))]">m.s. applied and computational mathematics</p>
        <p className="text-[hsl(var(--text-muted))] mb-2">present</p>
        <div className="text-[hsl(var(--text-secondary))] pl-4 space-y-0.5">
          <p>↳ statistical methods & data analysis</p>
          <p>↳ multivariable calculus & complex analysis</p>
          <p>↳ introduction to ordinary and partial differential equations</p>
        </div>
      </div>

      <div className="typing-line" style={{ animationDelay: "0.3s" }}>
        <span className="text-foreground font-semibold">Lehigh University</span>
        <span className="text-[hsl(var(--text-muted))]"> · bethlehem</span>
        <p className="text-[hsl(var(--text-secondary))]">m.s. computer science and engineering <span className="text-[hsl(var(--text-muted))]">· gpa: 3.3</span></p>
        <p className="text-[hsl(var(--text-muted))] mb-2">may 2022</p>
        <div className="text-[hsl(var(--text-secondary))] pl-4 space-y-0.5">
          <p>↳ machine learning</p>
          <p>↳ computer vision</p>
          <p>↳ natural language processing</p>
          <p>↳ parallel computing</p>
        </div>
      </div>

      <div className="typing-line" style={{ animationDelay: "0.4s" }}>
        <span className="text-foreground font-semibold">Lehigh University</span>
        <span className="text-[hsl(var(--text-muted))]"> · bethlehem</span>
        <p className="text-[hsl(var(--text-secondary))]">b.s. computer science and business (csb) <span className="text-[hsl(var(--text-muted))]">· gpa: 3.3</span></p>
        <p className="text-[hsl(var(--text-muted))] mb-2">may 2021</p>
        <div className="text-[hsl(var(--text-secondary))] pl-4 space-y-0.5">
          <p>↳ intro to programming <span className="text-[hsl(var(--accent))]">(TA)</span></p>
          <p>↳ programming & data structures <span className="text-[hsl(var(--accent))]">(TA)</span></p>
          <p>↳ systems software <span className="text-[hsl(var(--accent))]">(TA)</span></p>
          <p>↳ database systems & applications</p>
          <p>↳ discrete structures & algorithms</p>
          <p>↳ design & analysis of algorithms</p>
          <p>↳ software engineering <span className="text-[hsl(var(--accent))]">(TA)</span></p>
          <p>↳ programming languages <span className="text-[hsl(var(--accent))]">(head TA)</span></p>
          <p>↳ computer architecture & organization</p>
          <p>↳ blockchain concepts & applications</p>
          <p>↳ blockchain algorithms</p>
        </div>
      </div>
    </div>
  </div>
);

const ResearchSection = () => (
  <div className="terminal-output">
    <p className="text-foreground typing-line">SSS-RP, Scalable Systems Software Research</p>
    <p className="text-[hsl(var(--text-muted))] mb-3 typing-line" style={{ animationDelay: "0.1s" }}>
      jun 2020 – may 2022 @ lehigh university
    </p>
    <div className="text-[hsl(var(--text-secondary))] space-y-1">
      <p className="typing-line" style={{ animationDelay: "0.2s" }}>
        → drafted decentralized voting system on Ethereum with Prof. Hank Korth
      </p>
      <p className="typing-line" style={{ animationDelay: "0.3s" }}>
        → researched hardware acceleration and parallel computing optimization with Prof. Roberto Palmieri
      </p>
      <p className="typing-line" style={{ animationDelay: "0.4s" }}>
        → designed automatic differentiation techniques for MECH programming language with Prof. Corey Montella
      </p>
    </div>
  </div>
);

const LinksSection = () => (
  <div className="terminal-output">
    <div className="space-y-3">
      <a
        href="mailto:vowalsh@pm.me"
        className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-foreground transition-colors typing-line"
        style={{ animationDelay: "0.2s" }}
      >
        <Mail size={16} className="text-[hsl(var(--accent))]" />
        <span>email</span>
      </a>
      <a
        href="https://github.com/vowalsh"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-foreground transition-colors typing-line"
        style={{ animationDelay: "0.3s" }}
      >
        <Github size={16} className="text-[hsl(var(--accent))]" />
        <span>github</span>
      </a>
      <a
        href="https://linkedin.com/in/vowalsh"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-foreground transition-colors typing-line"
        style={{ animationDelay: "0.4s" }}
      >
        <Linkedin size={16} className="text-[hsl(var(--accent))]" />
        <span>linkedin</span>
      </a>
    </div>
  </div>
);

// Reusable Components

interface TerminalJobProps {
  company: string;
  subtitle?: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  delay: number;
}

const TerminalJob = ({ company, subtitle, role, period, location, bullets, delay }: TerminalJobProps) => (
  <div className="typing-line" style={{ animationDelay: `${delay * 0.15}s` }}>
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-foreground font-semibold">{company}</span>
      {subtitle && <span className="text-[hsl(var(--text-muted))]">({subtitle})</span>}
      <span className="text-[hsl(var(--accent))]">{role}</span>
    </div>
    <p className="text-[hsl(var(--text-muted))] mb-2">{period} @ {location}</p>
    <div className="text-[hsl(var(--text-secondary))] space-y-1">
      {bullets.map((bullet, i) => (
        <p key={i}>→ {bullet}</p>
      ))}
    </div>
  </div>
);

export default Index;
