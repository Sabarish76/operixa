"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  // Triangle,
  // Box,
  // Cloud,
  // Leaf,
  CheckCircle2,
} from "lucide-react";
import { HeroVisual } from "./hero-visual";

// const logos = [
//   { icon: Triangle, name: "Acme Corp" },
//   { icon: Box, name: "Nexus" },
//   { icon: Cloud, name: "Cloudify" },
//   { icon: Leaf, name: "Leaflet" },
// ];

const highlights = [
  "AI PRD Generation",
  "Scalable Architecture",
  "Production-Ready Code",
  "Automated QA & Tests",
];

const stats = [
  { value: "5", label: "Specialized Agents" },
  { value: "10x", label: "Faster Delivery" },
  { value: "100%", label: "Production-Ready" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-full max-w-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2 lg:gap-6 lg:px-10">
        {/* ── left copy ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand sm:text-[11px]"
          >
            <Sparkles size={12} />
            AI-Native Product Development Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-foreground sm:mt-6 sm:text-6xl xl:text-7xl"
          >
            Build Software
            <br />
            with <span className="brand-gradient-text">AI Teams</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted sm:mt-6 sm:text-base lg:mx-0 lg:max-w-xl"
          >
            From idea to production-ready software. Operixa orchestrates AI
            agents to build better products faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
          >
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-8px_var(--brand)] transition-all hover:bg-brand-hover hover:scale-[1.03]"
            >
              Get Started Free
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand">
                <Play size={10} className="translate-x-px fill-current" />
              </span>
              Watch Demo
            </a>
          </motion.div>

          {/* feature checklist */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 text-left sm:grid-cols-2 lg:mx-0"
          >
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <CheckCircle2 size={16} className="shrink-0 text-brand" />
                {h}
              </li>
            ))}
          </motion.ul>

          {/* quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-6 sm:gap-10 lg:justify-start"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 sm:gap-10">
                {i > 0 && <span className="h-9 w-px bg-border" />}
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold sm:text-3xl">
                    <span className="brand-gradient-text">{s.value}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 sm:mt-12"
          >
            <p className="text-xs text-muted">Trusted by innovative teams worldwide</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-7 lg:justify-start">
              {logos.map(({ icon: Icon, name }) => (
                <span key={name} className="inline-flex items-center gap-1.5 text-muted/70 grayscale">
                  <Icon size={16} />
                  <span className="text-sm font-medium">{name}</span>
                </span>
              ))}
            </div>
          </motion.div> */}
        </div>

        {/* ── right visual ──────────────────────────────────────── */}
        <div className="mt-4 w-full lg:mt-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
