"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Users,
  LayoutGrid,
  Sparkles,
  TrendingUp,
  Building2,
  Lock,
  ShieldCheck,
  Cloud,
  Globe,
  Heart,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon, GithubIcon, DiscordIcon } from "./brand-icons";

const brandFeatures: { icon: LucideIcon; label: string }[] = [
  { icon: Users, label: "AI Product Team" },
  { icon: LayoutGrid, label: "Unified Workspace" },
  { icon: Sparkles, label: "Everything Generated" },
  { icon: TrendingUp, label: "Built for Scale" },
  { icon: ShieldCheck, label: "Enterprise Ready" },
];

const columns: { title: string; links: { label: string; badge?: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features" },
      { label: "How It Works" },
      { label: "AI Agents" },
      { label: "Use Cases" },
      { label: "Roadmap" },
      { label: "Changelog" },
      { label: "Integrations" },
      { label: "Pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Product Managers" },
      { label: "For Engineering Teams" },
      { label: "For Startups" },
      { label: "For Enterprises" },
      { label: "Agile Teams" },
      { label: "Scaling Teams" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation" },
      { label: "Help Center" },
      { label: "Blog" },
      { label: "Guides" },
      { label: "Templates" },
      { label: "API Reference" },
      { label: "Community" },
      { label: "Webinars" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Careers", badge: "We're Hiring" },
      { label: "Customers" },
      { label: "Partners" },
      { label: "Contact Us" },
      { label: "Press Kit" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy" },
      { label: "Terms of Service" },
      { label: "Security" },
      { label: "Data Processing" },
      { label: "Cookie Policy" },
      { label: "Subprocessors" },
      { label: "Trust Center" },
    ],
  },
];

const socials = [LinkedinIcon, TwitterIcon, GithubIcon, DiscordIcon];

const trust: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Lock, title: "SOC 2 Type II", desc: "Compliant" },
  { icon: ShieldCheck, title: "GDPR Compliant", desc: "Your data is always protected" },
  { icon: Cloud, title: "99.9% Uptime SLA", desc: "Reliable by design" },
  { icon: Globe, title: "Hosted on AWS", desc: "Enterprise-grade infrastructure" },
  { icon: ShieldCheck, title: "ISO 27001 Certified", desc: "Information Security Management" },
  { icon: Users, title: "Trusted by Modern Teams", desc: "Across the globe" },
];

function OperixaWordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Image src="/operixa-cube.png" alt="Operixa" width={36} height={36} className="h-8 w-8" />
      <span className="text-2xl font-bold tracking-wide text-foreground">OPERIXA</span>
    </span>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden border-t border-card-border bg-background">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-10">
        {/* ── CTA banner ─────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-card/60 p-6 backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,var(--glow),transparent_60%)]" />
          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex items-center gap-4">
              <Image src="/operixa-cube.png" alt="" width={56} height={56} className="h-12 w-12 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  Ready to build the future of your product?
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Join thousands of teams building faster with Operixa.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-8px_var(--brand)] transition-transform hover:scale-[1.03]"
              >
                Start Free Trial
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
              >
                <Play size={14} className="fill-current" />
                Book a Demo
              </a>
            </div>
          </div>
        </div>

        {/* ── main footer ────────────────────────────────────── */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.7fr_repeat(5,1fr)_1.9fr] lg:gap-8">
          {/* brand */}
          <div>
            <OperixaWordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The AI-native product development platform that helps teams go
              from idea to production—faster.
            </p>
            <ul className="mt-5 space-y-2.5">
              {brandFeatures.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-muted">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-brand/15 text-brand">
                    <Icon size={11} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-card-border text-muted transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                {col.title}
              </h4>
              <span className="mt-2 block h-0.5 w-6 rounded bg-brand" />
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href="#" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-brand">
                      {l.label}
                      {l.badge && (
                        <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[9px] font-semibold text-brand">
                          {l.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
              Stay in the Loop
            </h4>
            <span className="mt-2 block h-0.5 w-6 rounded bg-brand" />
            <p className="mt-4 text-sm text-muted">
              Get product updates, best practices, and AI insights straight to
              your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-card-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-brand/50"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-brand py-2.5 text-sm font-semibold text-brand-foreground transition-transform hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <Lock size={11} /> We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* ── trust row ──────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl border border-card-border bg-card/40 p-6 sm:grid-cols-3 lg:grid-cols-6">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand/20 bg-brand/10 text-brand">
                <t.icon size={18} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight text-foreground">{t.title}</div>
                <div className="text-xs leading-tight text-muted">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── bottom bar ─────────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-card-border pt-8 text-sm text-muted sm:flex-row sm:justify-between">
          <p>© 2024 Operixa, Inc. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart size={14} className="fill-brand text-brand" /> by the Operixa team
          </p>
          <span className="inline-flex items-center gap-2 rounded-lg border border-card-border px-3 py-1.5 text-foreground">
            <Globe size={14} /> English <ChevronDown size={14} className="text-muted" />
          </span>
        </div>
      </div>
    </footer>
  );
}
