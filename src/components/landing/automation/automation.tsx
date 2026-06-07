"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Boxes,
  Users,
  Code2,
  ShieldCheck,
  Zap,
  Target,
  Database,
  CheckCircle2,
  Circle,
  CircleDot,
  Globe,
  ShieldHalf,
  UserCog,
  HardDrive,
  Cloud,
  Activity,
  type LucideIcon,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/* ─────────────────────────── panel chrome ─────────────────────────── */
function Panel({
  icon: Icon,
  title,
  desc,
  children,
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex w-full max-w-[300px] grow basis-[224px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-4 shadow-[0_24px_70px_-34px_var(--glow)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_30px_80px_-30px_var(--glow)]"
    >
      {/* top sheen */}
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      {/* hover glow */}
      <span className="pointer-events-none absolute -top-20 left-1/2 h-40 w-48 -translate-x-1/2 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-[0_0_24px_-8px_var(--brand)]">
          <Icon size={18} />
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <p className="relative mt-2 text-xs leading-relaxed text-muted">{desc}</p>
      <div className="relative mt-3 flex-1 overflow-hidden rounded-xl border border-white/5 bg-card-2/70 p-3 backdrop-blur">
        {children}
      </div>
    </motion.div>
  );
}

const priColor: Record<string, string> = {
  High: "#a78bfa",
  Medium: "#3b82f6",
  Low: "#71717a",
};

/* ─────────────────────────── 1. PRD ─────────────────────────── */
function PrdMock() {
  const stories: [string, "High" | "Medium" | "Low"][] = [
    ["User can like any metric", "High"],
    ["User can filter data", "High"],
    ["User can export reports", "Medium"],
    ["User can share reports", "Low"],
  ];
  return (
    <div className="text-[10px]">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">Q3 Analytics Dashboard</span>
        <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[8px] font-semibold text-brand">PRD</span>
      </div>
      {["Executive Summary", "Problem Statement", "Goals", "Success Metrics"].map((s) => (
        <div key={s} className="mt-2">
          <div className="font-medium text-foreground/80">{s}</div>
          <div className="mt-1 h-1 w-full rounded bg-foreground/10" />
          <div className="mt-1 h-1 w-3/4 rounded bg-foreground/10" />
        </div>
      ))}
      <div className="mt-3 font-medium text-foreground/80">User Stories</div>
      <div className="mt-1.5 overflow-hidden rounded-md border border-card-border">
        <div className="flex bg-foreground/5 px-2 py-1 text-[8px] font-semibold text-muted">
          <span className="flex-1">Story</span>
          <span>Priority</span>
        </div>
        {stories.map(([s, p]) => (
          <div key={s} className="flex items-center border-t border-card-border px-2 py-1">
            <span className="flex-1 truncate text-foreground/70">{s}</span>
            <span
              className="rounded px-1.5 py-0.5 text-[8px] font-semibold"
              style={{ background: `${priColor[p]}22`, color: priColor[p] }}
            >
              {p}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 font-medium text-foreground/80">Acceptance Criteria</div>
    </div>
  );
}

/* ─────────────────── 2. System Architecture ─────────────────── */
function ArchNode({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-md border border-brand/30 bg-brand/10 px-1.5 py-1 text-[9px] font-medium text-foreground">
      <Icon size={10} className="shrink-0 text-brand" />
      {label}
    </div>
  );
}
function ArchMock() {
  const Connector = () => <div className="mx-auto h-2 w-px bg-brand/30" />;
  const Single = ({ icon, label }: { icon: LucideIcon; label: string }) => (
    <div className="mx-auto w-3/5">
      <ArchNode icon={icon} label={label} />
    </div>
  );
  const Pair = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-2 gap-1.5">{children}</div>
  );
  return (
    <div className="flex flex-col py-1">
      <Single icon={Globe} label="Web / Mobile" />
      <Connector />
      <Single icon={ShieldHalf} label="API Gateway" />
      <Connector />
      <Pair>
        <ArchNode icon={ShieldHalf} label="Auth Service" />
        <ArchNode icon={UserCog} label="User Service" />
      </Pair>
      <Connector />
      <Pair>
        <ArchNode icon={Database} label="PostgreSQL" />
        <ArchNode icon={HardDrive} label="Redis Cache" />
      </Pair>
      <Connector />
      <Pair>
        <ArchNode icon={Activity} label="Queue (Kafka)" />
        <ArchNode icon={Cloud} label="S3 Storage" />
      </Pair>
      <Connector />
      <Single icon={Activity} label="Monitoring" />
    </div>
  );
}

/* ─────────────────────── 3. Sprint Planning ─────────────────── */
type Status = "Done" | "In Progress" | "Todo";
const statusStyle: Record<Status, { c: string; Icon: LucideIcon }> = {
  Done: { c: "#22c55e", Icon: CheckCircle2 },
  "In Progress": { c: "#3b82f6", Icon: CircleDot },
  Todo: { c: "#71717a", Icon: Circle },
};
function Task({ label, status }: { label: string; status: Status }) {
  const { c, Icon } = statusStyle[status];
  return (
    <div className="flex items-center gap-1.5 py-0.5 text-[9px]">
      <Icon size={11} style={{ color: c }} className="shrink-0" />
      <span className="flex-1 truncate text-foreground/75">{label}</span>
      <span className="rounded px-1 py-0.5 text-[7px] font-semibold" style={{ background: `${c}22`, color: c }}>
        {status}
      </span>
    </div>
  );
}
function SprintMock() {
  return (
    <div className="text-[10px]">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">Sprint 1</span>
        <span className="rounded bg-blue-500/15 px-1.5 py-0.5 text-[8px] font-semibold text-blue-400">In Progress</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-[8px] font-medium text-muted">
        <span>Frontend</span>
        <span>4 tasks</span>
      </div>
      <Task label="Setup project structure" status="Done" />
      <Task label="Implement dashboard layout" status="Done" />
      <Task label="Create metrics components" status="In Progress" />
      <Task label="Add charts integration" status="Todo" />
      <div className="mt-2 flex items-center justify-between text-[8px] font-medium text-muted">
        <span>Backend</span>
        <span>3 tasks</span>
      </div>
      <Task label="Design database schema" status="Done" />
      <Task label="Build analytics API" status="In Progress" />
      <Task label="Implement data aggregation" status="Todo" />
      <div className="mt-2 flex items-center justify-between text-[8px] font-medium text-muted">
        <span>DevOps</span>
        <span>1 task</span>
      </div>
      <Task label="Setup CI/CD pipeline" status="Todo" />
    </div>
  );
}

/* ─────────────────────── 4. Developer Output ─────────────────── */
const k = "text-violet-400";
const s = "text-emerald-400";
const t = "text-cyan-400";
const f = "text-blue-400";
const m = "text-muted";
function CodeMock() {
  return (
    <div className="font-mono text-[9px] leading-[1.5]">
      <div className="mb-2 flex items-center justify-between border-b border-card-border pb-1.5">
        <span className="text-[9px] text-muted">analytics.service.ts</span>
        <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[7px] font-semibold text-brand">TS</span>
      </div>
      <pre className="whitespace-pre-wrap text-foreground/80">
        <span className={k}>import</span> {"{ db }"} <span className={k}>from</span> <span className={s}>{'"@/lib/db"'}</span>;{"\n"}
        <span className={k}>import</span> {"{ cache }"} <span className={k}>from</span> <span className={s}>{'"@/lib/cache"'}</span>;{"\n\n"}
        <span className={k}>export async function</span> <span className={f}>getAnalytics</span>({"\n"}
        {"  "}userId: <span className={t}>string</span>,{"\n"}
        {"  "}filters: <span className={t}>Filters</span>{"\n"}
        {") {"}{"\n"}
        {"  "}<span className={k}>const</span> key = <span className={s}>{"`analytics:${userId}`"}</span>;{"\n"}
        {"  "}<span className={k}>const</span> hit = <span className={k}>await</span> cache.<span className={f}>get</span>(key);{"\n"}
        {"  "}<span className={k}>if</span> (hit) <span className={k}>return</span> hit;{"\n\n"}
        {"  "}<span className={k}>const</span> data = <span className={k}>await</span> db.<span className={f}>query</span>(<span className={m}>...</span>);{"\n"}
        {"  "}<span className={k}>await</span> cache.<span className={f}>set</span>(key, data);{"\n"}
        {"  "}<span className={k}>return</span> data;{"\n"}
        {"}"}
      </pre>
    </div>
  );
}

/* ─────────────────────────── 5. QA Output ─────────────────────────── */
function QaCase({ n, title }: { n: number; title: string }) {
  return (
    <div className="mt-2 rounded-md border border-card-border bg-card/60 p-2 text-[9px]">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground/85">Test Case #{n}</span>
        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-400">Passed</span>
      </div>
      <p className="mt-1 text-foreground/60">{title}</p>
      <div className="mt-1 space-y-0.5 text-[8px] text-muted">
        <div><span className="text-foreground/50">Expected:</span> Data loads successfully</div>
        <div><span className="text-foreground/50">Actual:</span> Loaded as expected</div>
      </div>
    </div>
  );
}
function QaMock() {
  return (
    <div className="text-[10px]">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">Test Suite: Dashboard</span>
        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-400">Passed</span>
      </div>
      <QaCase n={1} title="Verify user can view dashboard metrics" />
      <QaCase n={2} title="Verify filters work correctly" />
      <QaCase n={3} title="Verify export functionality" />
    </div>
  );
}

/* ─────────────────────────── stats ─────────────────────────── */
const stats = [
  { icon: Zap, title: "10x Faster", desc: "From weeks to days" },
  { icon: Target, title: "100% Consistent", desc: "Best practices by default" },
  { icon: ShieldCheck, title: "Production Ready", desc: "Ship with confidence" },
  { icon: Database, title: "Always Up-to-Date", desc: "Latest tech & patterns" },
  { icon: Users, title: "One Unified Output", desc: "Everything in one place" },
];

export function Automation() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.2] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[460px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        {/* header */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            AI-Powered · End-to-End · Production Ready
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            Everything Your Team Needs.
            <br />
            <span className="brand-gradient-text">Generated Automatically.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Operixa AI Agents generate every artifact, document, and code you
            need to build and ship products{" "}
            <span className="font-semibold text-foreground">10x faster</span>.
          </p>
        </motion.div>

        {/* panels row */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Panel icon={FileText} title="PRD Generator" desc="Complete product requirements in minutes.">
            <PrdMock />
          </Panel>
          <Panel icon={Boxes} title="System Architecture" desc="Scalable architecture designed for performance and growth." delay={0.05}>
            <ArchMock />
          </Panel>
          <Panel icon={Users} title="Sprint Planning" desc="AI breaks down work into actionable tasks and sprint plans." delay={0.1}>
            <SprintMock />
          </Panel>
          <Panel icon={Code2} title="Developer Output" desc="Production-ready code written following best practices." delay={0.15}>
            <CodeMock />
          </Panel>
          <Panel icon={ShieldCheck} title="QA Output" desc="Comprehensive tests to ensure quality and reliability." delay={0.2}>
            <QaMock />
          </Panel>
        </div>

        {/* stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-card-border bg-card/50 p-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((st, i) => (
            <motion.div
              key={st.title}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand/20 bg-brand/10 text-brand">
                <st.icon size={18} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{st.title}</div>
                <div className="text-xs text-muted">{st.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
