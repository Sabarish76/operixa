"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FileX,
  RefreshCw,
  CalendarX,
  Boxes,
  Bug,
  UsersRound,
  ClipboardList,
  Box,
  Users,
  Code2,
  ShieldCheck,
  Zap,
  Database,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

type Item = { icon: LucideIcon; title: string; desc: string };

const problems: Item[] = [
  { icon: FileX, title: "PRD Missing", desc: "Unclear requirements lead to rework" },
  { icon: RefreshCw, title: "Requirements Changing", desc: "Frequent shifts derail progress" },
  { icon: CalendarX, title: "Missed Deadlines", desc: "Projects slip and opportunities lost" },
  { icon: Boxes, title: "Architecture Issues", desc: "Poor decisions early cause big problems" },
  { icon: Bug, title: "Bug Reports", desc: "Too many bugs, not enough context" },
  { icon: UsersRound, title: "Team Misalignment", desc: "Everyone on different pages" },
];

const solutions: Item[] = [
  { icon: ClipboardList, title: "AI Product Manager", desc: "Turns ideas into clear PRDs and product strategies" },
  { icon: Box, title: "AI Architect", desc: "Designs scalable architecture and technical specifications" },
  { icon: Users, title: "AI Team Lead", desc: "Breaks down work and aligns the entire team" },
  { icon: Code2, title: "AI Developer", desc: "Builds high-quality code faster and smarter" },
  { icon: ShieldCheck, title: "AI QA", desc: "Tests thoroughly and ensures seamless quality" },
];

const stats = [
  { icon: Zap, value: "95%", title: "Faster Planning", desc: "Go from idea to plan in minutes, not weeks" },
  { icon: RefreshCw, value: "80%", title: "Less Rework", desc: "AI agents get it right the first time" },
  { icon: Users, value: "5", title: "AI Agents", desc: "Specialized agents working together seamlessly" },
  { icon: Database, value: "1", title: "Single Source of Truth", desc: "All context, decisions, and progress in one place" },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function ProblemSolution() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)] blur-3xl" />

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
            The Product Development Reality
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Building Products Is Hard
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Too many moving parts. Constant changes. Manual handoffs. Operixa AI
            Agents bring order to chaos.
          </p>
        </motion.div>

        {/* ── comparison ─────────────────────────────────────── */}
        <div className="relative mt-14 grid items-start gap-12 lg:grid-cols-[1fr_0.72fr_1fr] lg:items-stretch lg:gap-4">
          {/* decorative connectors (desktop only) */}
          <Connectors />

          {/* LEFT — problems */}
          <div className="relative flex flex-col">
            <div className="mb-6 text-center lg:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-400">
                Without Operixa
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                Chaos &amp; Complexity
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex-1 lg:content-between">
              {problems.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-xl border border-card-border bg-card p-4 transition-colors hover:border-red-500/40"
                >
                  <AlertTriangle
                    size={12}
                    className="absolute right-2.5 top-2.5 text-red-500/40"
                  />
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-red-500/25 bg-red-500/10 text-red-400">
                      <p.icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-foreground">{p.title}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CENTER — core */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex flex-col items-center justify-center text-center lg:self-center"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
              With Operixa
            </span>
            <span className="mt-1 text-sm font-semibold text-foreground">
              AI-Powered Clarity
            </span>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative my-2 w-44 sm:w-52"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)] blur-2xl" />
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

            <span className="text-xl font-bold tracking-[0.28em] text-foreground">
              OPERIXA
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-muted">
              AI Agent Network
            </span>
          </motion.div>

          {/* RIGHT — solutions */}
          <div className="relative flex flex-col">
            <div className="mb-6 text-center lg:text-left">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                The Operixa Way
              </span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                Structured Execution
              </h3>
            </div>
            <div className="relative flex flex-col gap-3 lg:flex-1 lg:justify-between">
              {/* vertical connecting line */}
              <span className="pointer-events-none absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-brand/0 via-brand/40 to-brand/0" />
              {solutions.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group relative flex items-start gap-3 rounded-xl border border-card-border bg-card p-3.5 transition-colors hover:border-brand/40"
                >
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                    <s.icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── stats ──────────────────────────────────────────── */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-card-border bg-card p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-brand/20 bg-brand/10 text-brand">
                <s.icon size={18} />
              </span>
              <div className="mt-4 text-3xl font-bold">
                <span className="brand-gradient-text">{s.value}</span>
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">{s.title}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Decorative flow lines: chaotic red from the left, orderly blue to the right. */
function Connectors() {
  const right = [60, 175, 300, 425, 540];
  const left = [70, 150, 230, 370, 450, 530];
  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      aria-hidden
    >
      <defs>
        <linearGradient id="ps-blue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c3aed" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ps-red" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#ef4444" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* right structured lines */}
      {right.map((y, i) => (
        <path
          key={`r${i}`}
          d={`M500,300 C 660,300 720,${y} 1000,${y}`}
          fill="none"
          stroke="url(#ps-blue)"
          strokeWidth="1.4"
          strokeDasharray="4 9"
          className="orbit-flow"
        />
      ))}
      {/* left chaos lines */}
      {left.map((y, i) => (
        <path
          key={`l${i}`}
          d={`M500,300 C 360,${300 + (i % 2 ? 40 : -40)} 240,${y + (i % 2 ? -30 : 30)} 0,${y}`}
          fill="none"
          stroke="url(#ps-red)"
          strokeWidth="1.2"
          strokeDasharray="3 7"
          strokeOpacity="0.8"
        />
      ))}
    </svg>
  );
}
