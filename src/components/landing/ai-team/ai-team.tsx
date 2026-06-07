"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ClipboardList,
  Box,
  Users,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  FileText,
  Network,
  ListChecks,
  Rocket,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Agent = {
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
};

const pm: Agent = {
  icon: ClipboardList,
  title: "AI Product Manager",
  desc: "Turns ideas into clear PRDs and products people love.",
  features: ["PRD Generation", "User Stories", "Product Roadmap", "Market Analysis"],
};
const architect: Agent = {
  icon: Box,
  title: "AI Architect",
  desc: "Designs scalable, secure and future-proof systems.",
  features: ["System Architecture", "Database Design", "API Design", "Tech Stack Decisions"],
};
const lead: Agent = {
  icon: Users,
  title: "AI Team Lead",
  desc: "Plans, organizes, and aligns the entire development flow.",
  features: ["Sprint Planning", "Task Breakdown", "Resource Allocation", "Team Coordination"],
};
const developer: Agent = {
  icon: Code2,
  title: "AI Developer",
  desc: "Writes clean, efficient, and production-ready code.",
  features: ["Frontend Development", "Backend Development", "Code Refactoring", "Performance Optimization"],
};
const qa: Agent = {
  icon: ShieldCheck,
  title: "AI QA",
  desc: "Ensures quality, reliability, and flawless user experience.",
  features: ["Test Case Generation", "Bug Detection", "Regression Testing", "Quality Validation"],
};

const journey = [
  { n: 1, icon: Lightbulb, title: "Idea", desc: "A spark of possibility" },
  { n: 2, icon: FileText, title: "PRD", desc: "Structured product requirements" },
  { n: 3, icon: Network, title: "Architecture", desc: "Scalable & secure design" },
  { n: 4, icon: ListChecks, title: "100 Tasks", desc: "AI breaks it down into actionable tasks" },
  { n: 5, icon: Code2, title: "1000+ Lines of Code", desc: "Built with precision and quality" },
  { n: 6, icon: Rocket, title: "Production Ready", desc: "Launch. Scale. Make impact." },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function AgentCard({ agent, delay = 0 }: { agent: Agent; delay?: number }) {
  const { icon: Icon, title, desc, features } = agent;
  return (
    <motion.div
      data-conn-card
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative z-10 rounded-2xl border border-card-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_18px_50px_-24px_var(--glow)]"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-[0_0_24px_-6px_var(--brand)]">
          <Icon size={20} />
        </span>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
      <ul className="mt-4 grid gap-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-muted">
            <CheckCircle2 size={15} className="shrink-0 text-brand" />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/** position + size of `el` relative to `root`, ignoring CSS transforms (uses offset*) */
function boxIn(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

export function AiTeam() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const root = gridRef.current;
    const cube = cubeRef.current;
    if (!root || !cube) return;

    const g = boxIn(cube, root);
    const sx = g.x + g.w / 2;
    const sy = g.y + g.h / 2;

    const cards = root.querySelectorAll<HTMLElement>("[data-conn-card]");
    const next: string[] = [];
    for (const card of cards) {
      const c = boxIn(card, root);
      const cx = c.x + c.w / 2;
      const cy = c.y + c.h / 2;
      const dx = cx - sx;
      const dy = cy - sy;

      let ex: number;
      let ey: number;
      if (Math.abs(dx) >= Math.abs(dy)) {
        // horizontal: anchor to the card's near vertical edge
        ex = dx < 0 ? c.x + c.w : c.x;
        ey = cy;
        const mx = (sx + ex) / 2;
        next.push(`M ${sx} ${sy} C ${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`);
      } else {
        // vertical: anchor to the card's near horizontal edge
        ex = cx;
        ey = dy < 0 ? c.y + c.h : c.y;
        const my = (sy + ey) / 2;
        next.push(`M ${sx} ${sy} C ${sx} ${my} ${ex} ${my} ${ex} ${ey}`);
      }
    }

    setSize({ w: root.offsetWidth, h: root.offsetHeight });
    setPaths(next);
  }, []);

  useEffect(() => {
    measure();
    const root = gridRef.current;
    const ro = new ResizeObserver(() => measure());
    if (root) ro.observe(root);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    // re-measure after fonts/images settle
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 900);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measure]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        {/* ── header ─────────────────────────────────────────── */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            Your AI Product Development Team
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Meet Your AI Team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Five specialized AI agents working together like a world-class
            product team.
          </p>
        </motion.div>

        {/* ── team grid ──────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="relative mt-14 grid gap-6 lg:grid-cols-3 lg:items-center"
        >
          {/* dynamic connector lines (desktop) */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            {paths.map((d, i) => (
              <path
                key={`glow-${i}`}
                d={d}
                fill="none"
                stroke="var(--brand)"
                strokeOpacity="0.18"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--brand)"
                strokeOpacity="0.6"
                strokeWidth="1.6"
                strokeDasharray="5 8"
                strokeLinecap="round"
                className="orbit-flow"
              />
            ))}
          </svg>

          {/* left column */}
          <div className="relative z-10 flex flex-col gap-6 lg:order-1">
            <AgentCard agent={pm} />
            <AgentCard agent={lead} delay={0.1} />
          </div>

          {/* center column */}
          <div className="relative z-10 order-first flex flex-col items-center gap-6 lg:order-2">
            <div className="flex flex-col items-center">
              <div ref={cubeRef} className="relative w-36 sm:w-44">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-2xl" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/cube-dark2.png"
                    alt="Operixa AI core"
                    width={1369}
                    height={1149}
                    className="relative hidden h-auto w-full dark:block"
                  />
                  <Image
                    src="/cube-light1.png"
                    alt="Operixa AI core"
                    width={1402}
                    height={1122}
                    className="relative block h-auto w-full mix-blend-multiply dark:hidden"
                  />
                </motion.div>
              </div>
              <span className="text-lg font-bold tracking-[0.28em] text-foreground">
                OPERIXA
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.34em] text-muted">
                AI Core
              </span>
            </div>
            <AgentCard agent={qa} delay={0.15} />
          </div>

          {/* right column */}
          <div className="relative z-10 flex flex-col gap-6 lg:order-3">
            <AgentCard agent={architect} />
            <AgentCard agent={developer} delay={0.1} />
          </div>
        </div>

        {/* ── journey timeline ───────────────────────────────── */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl border border-card-border bg-card/50 p-6 sm:p-8"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            From Idea to Impact
          </span>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-2">
            {journey.map((step, i) => (
              <Fragment key={step.title}>
                <div className="flex items-start gap-3 lg:flex-1 lg:flex-col lg:items-center lg:gap-2 lg:text-center">
                  <div className="relative shrink-0">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                      <step.icon size={20} />
                    </span>
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                      {step.n}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted lg:mx-auto lg:max-w-[140px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {i < journey.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="mt-3 hidden shrink-0 text-brand/40 lg:block"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
