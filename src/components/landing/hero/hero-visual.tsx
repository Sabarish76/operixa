"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  UserRound,
  Share2,
  Code2,
  Users,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Node = {
  icon: LucideIcon;
  label: string;
  color: string;
  pos: string;
  labelPos: "top" | "bottom";
  delay: number;
  /** drift amplitude (px) — gives each node its own little orbit */
  drift: { x: number; y: number };
};

const nodes: Node[] = [
  {
    icon: UserRound,
    label: "Product Manager",
    color: "#7c3aed",
    pos: "left-1/2 top-0 -translate-x-1/2",
    labelPos: "top",
    delay: 0.1,
    drift: { x: 6, y: -8 },
  },
  {
    icon: Share2,
    label: "Architect",
    color: "#3b82f6",
    pos: "left-[2%] top-[30%]",
    labelPos: "bottom",
    delay: 0.2,
    drift: { x: -7, y: 9 },
  },
  {
    icon: Code2,
    label: "Developer",
    color: "#f59e0b",
    pos: "left-[4%] top-[72%]",
    labelPos: "bottom",
    delay: 0.3,
    drift: { x: 8, y: 7 },
  },
  {
    icon: Users,
    label: "Team Lead",
    color: "#06b6d4",
    pos: "right-[2%] top-[30%]",
    labelPos: "bottom",
    delay: 0.25,
    drift: { x: 7, y: 9 },
  },
  {
    icon: ShieldCheck,
    label: "QA",
    color: "#22c55e",
    pos: "right-[4%] top-[72%]",
    labelPos: "bottom",
    delay: 0.35,
    drift: { x: -8, y: -7 },
  },
];

// approximate node + core centers within the 600×450 SVG viewBox,
// used to draw the animated connection lines (satellites → core)
const LINKS = [
  { x: 300, y: 30 }, // PM
  { x: 42, y: 152 }, // Architect
  { x: 56, y: 338 }, // Developer
  { x: 558, y: 152 }, // Team Lead
  { x: 544, y: 338 }, // QA
];
const CORE = { x: 300, y: 415 };

function AgentNode({
  icon: Icon,
  label,
  color,
  pos,
  labelPos,
  delay,
  drift,
}: Node) {
  // sizes scale with the visual's width (cqi) but stay within readable bounds
  const labelEl = (
    <span
      className="whitespace-nowrap font-medium text-muted"
      style={{ fontSize: "clamp(8px, 1.9cqi, 11px)" }}
    >
      {label}
    </span>
  );
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "backOut" }}
      className={`absolute z-40 ${pos}`}
    >
      {/* orbital drift — icon + label float together as one unit */}
      <motion.div
        animate={{ x: [0, drift.x, 0, -drift.x, 0], y: [0, drift.y, 0, -drift.y, 0] }}
        transition={{
          duration: 9 + delay * 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
        style={{ gap: "clamp(2px, 1cqi, 6px)" }}
      >
        {labelPos === "top" && labelEl}
        <div
          className="relative grid shrink-0 place-items-center"
          style={{
            width: "clamp(28px, 7.3cqi, 44px)",
            height: "clamp(28px, 7.3cqi, 44px)",
          }}
        >
          {/* pulsing ambient glow behind the icon */}
          <motion.span
            aria-hidden
            animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.35, 1] }}
            transition={{
              duration: 3.2 + delay * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color}, transparent 70%)`,
              filter: "blur(8px)",
            }}
          />
          <div
            className="relative grid h-full w-full place-items-center rounded-[22%] border backdrop-blur"
            style={{
              borderColor: `${color}66`,
              background: `color-mix(in srgb, ${color} 10%, var(--card))`,
              boxShadow: `0 0 28px -6px ${color}, 0 8px 20px -10px rgba(0,0,0,0.6)`,
            }}
          >
            <Icon
              style={{
                width: "clamp(14px, 3.5cqi, 20px)",
                height: "clamp(14px, 3.5cqi, 20px)",
                color,
              }}
            />
          </div>
        </div>
        {labelPos === "bottom" && labelEl}
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // pointer-driven 3D tilt (Apple-Vision-Pro-style depth)
  const px = useMotionValue(0); // -0.5 … 0.5
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 });

  // base tilt is the original look; pointer adds a few degrees on top
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, -19]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, 0]);
  // glow follows the pointer for a subtle reactive highlight
  const glowX = useTransform(sx, [-0.5, 0.5], ["35%", "65%"]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="@container relative mx-auto aspect-4/3 w-full max-w-[460px] sm:max-w-[560px] lg:max-w-[820px] xl:max-w-[920px]"
    >
      {/* orbit ring + animated connection lines (satellites → Operixa Core) */}
      <svg
        viewBox="0 0 600 450"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {/* connection lines from each agent node to the core */}
        {LINKS.map((p, i) => (
          <line
            key={`link-glow-${i}`}
            x1={CORE.x}
            y1={CORE.y}
            x2={p.x}
            y2={p.y}
            stroke="var(--brand)"
            strokeOpacity="0.12"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}
        {LINKS.map((p, i) => (
          <line
            key={`link-${i}`}
            x1={CORE.x}
            y1={CORE.y}
            x2={p.x}
            y2={p.y}
            stroke="var(--brand)"
            strokeOpacity="0.5"
            strokeWidth="1.2"
            strokeDasharray="4 9"
            strokeLinecap="round"
            className="orbit-flow"
          />
        ))}
        <ellipse
          cx="300"
          cy="208"
          rx="295"
          ry="200"
          fill="none"
          stroke="var(--brand)"
          strokeOpacity="0.35"
          strokeWidth="1.3"
          strokeDasharray="4 10"
          className="orbit-flow"
        />
        <circle
          r="4"
          fill="#a78bfa"
          style={{ filter: "drop-shadow(0 0 7px #a78bfa)" }}
        >
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            path="M5,208 A295,200 0 1,1 595,208 A295,200 0 1,1 5,208"
          />
        </circle>
      </svg>

      {/* dotted connector from PM down to dashboard */}
      <div className="pointer-events-none absolute left-1/2 top-[11%] z-20 h-[9%] w-px -translate-x-1/2 border-l border-dashed border-brand/40" />

      {/* ambient glow pooled behind the dashboard for floating depth */}
      <motion.div
        aria-hidden
        style={{ left: glowX }}
        className="animate-ambient pointer-events-none absolute top-[28%] z-0 h-[55%] w-[60%] -translate-x-1/2 rounded-[40%] bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)] blur-3xl"
      />

      {/* dashboard window — pointer-reactive 3D tilt + slow float */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-[8%] top-[18%] z-10"
        style={{ perspective: "1900px" }}
      >
        <motion.div
          style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
            transformOrigin: "center",
          }}
        >
          <div className="overflow-hidden rounded-2xl border border-card-border shadow-[0_50px_110px_-30px_var(--glow),0_30px_60px_-25px_rgba(0,0,0,0.55)]">
            <Image
              src="/dashboard-dark.png"
              alt="Operixa dashboard"
              width={1523}
              height={1008}
              priority
              className="hidden h-auto w-full dark:block"
            />
            <Image
              src="/dashboard-light.png"
              alt="Operixa dashboard"
              width={1536}
              height={1024}
              priority
              className="block h-auto w-full dark:hidden"
            />
          </div>

          {/* reflection — mirrored, faded copy beneath the dashboard */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-full mt-1 overflow-hidden rounded-2xl opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
            style={{ transform: "scaleY(-1)" }}
          >
            <Image
              src="/dashboard-dark.png"
              alt=""
              width={1523}
              height={1008}
              className="hidden h-auto w-full dark:block"
            />
            <Image
              src="/dashboard-light.png"
              alt=""
              width={1536}
              height={1024}
              className="block h-auto w-full dark:hidden"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* floating cube + pedestal (real glossy asset; bg dropped via blend mode) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-14%] left-1/2 z-30 w-[52%] -translate-x-1/2"
      >
        {/* dark: transparent PNG (black bg removed) */}
        <Image
          src="/cube-dark2.png"
          alt="Operixa AI core"
          width={1369}
          height={1149}
          priority
          className="hidden h-auto w-full dark:block"
        />
        {/* light: white bg dropped via multiply */}
        <Image
          src="/cube-light1.png"
          alt="Operixa AI core"
          width={1402}
          height={1122}
          priority
          className="block h-auto w-full mix-blend-multiply dark:hidden"
        />
      </motion.div>

      {/* agent nodes */}
      {nodes.map((n) => (
        <AgentNode key={n.label} {...n} />
      ))}
    </motion.div>
  );
}
