"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "Product", href: "#" },
  { label: "AI Agents", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

/* magnetic pull for the CTA — single small element, cheap */
function magnetize(e: React.PointerEvent<HTMLAnchorElement>) {
  const t = e.currentTarget;
  const r = t.getBoundingClientRect();
  const x = (e.clientX - (r.left + r.width / 2)) * 0.3;
  const y = (e.clientY - (r.top + r.height / 2)) * 0.5;
  t.style.translate = `${x}px ${y}px`;
}
function demagnetize(e: React.PointerEvent<HTMLAnchorElement>) {
  e.currentTarget.style.translate = "0px 0px";
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl shadow-[0_8px_40px_-16px_var(--glow)]"
          : "bg-background/40 backdrop-blur-md"
      }`}
      style={{
        boxShadow: scrolled
          ? "inset 0 1px 0 0 color-mix(in srgb, #fff 10%, transparent), 0 10px 40px -18px var(--glow)"
          : "inset 0 1px 0 0 color-mix(in srgb, #fff 6%, transparent)",
      }}
    >
      <div className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-10">
        {/* flowing gradient bottom border */}
        <span
          className="nav-border-flow pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500"
          style={{
            opacity: scrolled ? 1 : 0.4,
            backgroundImage:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 80%, transparent) 25%, var(--brand) 50%, color-mix(in srgb, var(--accent) 80%, transparent) 75%, transparent)",
          }}
        />
        {/* ambient glow beneath the bar (breathing) */}
        <span
          className="nav-breathe pointer-events-none absolute inset-x-16 -bottom-6 h-10 rounded-[100%] bg-[radial-gradient(60%_100%_at_50%_0%,var(--brand),transparent_70%)] blur-lg transition-opacity duration-500"
          style={{ opacity: scrolled ? 0.9 : 0.5 }}
        />

        {/* logo (unchanged) with soft breathing glow */}
        <a href="#" aria-label="Operixa home" className="relative z-10 shrink-0">
          <span className="nav-breathe pointer-events-none absolute -inset-3 -z-10 rounded-full bg-brand/25 blur-xl" />
          <Logo />
        </a>

        {/* center links — moving pill + animated underline */}
        <nav
          onMouseLeave={() => setHovered(null)}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onMouseEnter={() => setHovered(l.label)}
              className="group relative text-sm text-muted transition-colors duration-300 hover:text-foreground"
            >
              {hovered === l.label && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute -inset-x-3 -inset-y-1.5 -z-10 rounded-lg bg-foreground/[0.06] shadow-[inset_0_0_0_1px_color-mix(in_srgb,white_10%,transparent),0_0_20px_-6px_var(--brand)]"
                />
              )}
              {l.label}
              <span className="pointer-events-none absolute -bottom-1.5 left-0 right-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-brand to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* actions */}
        <div className="z-10 hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href="#"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Sign In
          </a>
          <a
            href="#"
            onPointerMove={magnetize}
            onPointerLeave={demagnetize}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 via-brand to-indigo-500 px-4 py-2 text-sm font-semibold text-brand-foreground shadow-[0_8px_24px_-10px_var(--brand)] transition-[box-shadow,scale,translate] duration-200 hover:scale-[1.04] hover:shadow-[0_14px_44px_-8px_var(--brand)] active:scale-95"
          >
            {/* moving light sweep */}
            <span className="nav-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <span className="relative">Get Started</span>
          </a>
        </div>

        {/* mobile */}
        <div className="z-10 flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/5"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <a
                  href="#"
                  className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="rounded-lg bg-gradient-to-r from-violet-600 via-brand to-indigo-500 px-4 py-2.5 text-center text-sm font-semibold text-brand-foreground transition-transform hover:scale-[1.02]"
                >
                  Get Started
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
