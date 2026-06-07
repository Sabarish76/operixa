"use client";

import { useEffect, useRef } from "react";

/**
 * Layered ambient hero background — performance-first.
 *  Layer 1 — slowly drifting CSS aurora gradient (transform-only, GPU)
 *  Layer 2 — neural network + cursor glow (canvas)
 *  Layer 3 — small floating particles, rendered in the SAME canvas pass
 *  Content sits above on its own layer.
 *  - 30fps cap, dpr 1, small node count, no shadowBlur, single RAF loop
 *  - auto-pauses when scrolled past the hero, when tab hidden, or reduced-motion
 *  Motion is felt near the top; glass-heavy sections below pay zero cost.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const FPS = 1000 / 30;
    const MAX = 150; // link distance
    const mouse = { x: -9999, y: -9999 };

    let w = 0;
    let h = 0;
    let dark = document.documentElement.classList.contains("dark");
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] =
      [];
    // Layer 3 — slow-drifting particles (softer, larger, gently twinkling)
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      base: number; // base opacity
      ph: number; // twinkle phase
    }[] = [];
    let raf = 0;
    let last = 0;
    let active = true;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      const count = Math.min(140, Math.max(50, Math.round((w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.7,
      }));
      const pCount = Math.min(60, Math.max(22, Math.round((w * h) / 36000)));
      particles = Array.from({ length: pCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.22 + 0.05), // gentle upward drift
        r: Math.random() * 1.8 + 1.2,
        base: Math.random() * 0.35 + 0.2,
        ph: Math.random() * Math.PI * 2,
      }));
    }

    function update() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.ph += 0.018;
        // wrap around the edges for a continuous, seamless drift
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
      }
    }

    function render() {
      const c = ctx!;
      c.clearRect(0, 0, w, h);
      // brighter + darker-toned in light mode so it reads on white
      const lineRGB = dark ? "129,118,255" : "79,70,229"; // indigo
      const nodeRGB = dark ? "167,139,250" : "109,40,217"; // violet
      const cursorRGB = dark ? "59,130,246" : "37,99,235"; // blue
      const lineA = dark ? 0.24 : 0.42;
      const nodeA = dark ? 0.6 : 0.85;

      // links between nearby nodes
      c.lineWidth = 1.1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX * MAX) {
            const al = (1 - Math.sqrt(d2) / MAX) * lineA;
            c.strokeStyle = `rgba(${lineRGB},${al})`;
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
          }
        }
      }

      // links toward the cursor
      if (mouse.x > -9000) {
        const mr = MAX * 1.7;
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mr * mr) {
            const al = (1 - Math.sqrt(d2) / mr) * (dark ? 0.5 : 0.55);
            c.strokeStyle = `rgba(${cursorRGB},${al})`;
            c.beginPath();
            c.moveTo(n.x, n.y);
            c.lineTo(mouse.x, mouse.y);
            c.stroke();
          }
        }
        const g = c.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          200,
        );
        g.addColorStop(
          0,
          dark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.07)",
        );
        g.addColorStop(1, "rgba(124,58,237,0)");
        c.fillStyle = g;
        c.beginPath();
        c.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        c.fill();
      }

      // nodes
      for (const n of nodes) {
        c.fillStyle = `rgba(${nodeRGB},${nodeA})`;
        c.beginPath();
        c.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        c.fill();
      }

      // Layer 3 — floating particles (soft, twinkling, drifting upward)
      const partRGB = dark ? "196,181,253" : "139,92,246"; // violet-300 / violet-500
      for (const p of particles) {
        const tw = 0.55 + 0.45 * Math.sin(p.ph); // twinkle 0.1 → 1
        c.fillStyle = `rgba(${partRGB},${p.base * tw})`;
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fill();
      }
    }

    function loop(t: number) {
      if (!active || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
      if (t - last < FPS) return;
      last = t;
      update();
      render();
    }

    function start() {
      if (!raf && active && !document.hidden && !reduced)
        raf = requestAnimationFrame(loop);
    }

    function onScroll() {
      const a = window.scrollY < window.innerHeight * 1.1;
      if (a && !active) {
        active = true;
        start();
      } else {
        active = a;
      }
    }
    function onMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onVisible() {
      if (!document.hidden) start();
    }

    let rRaf = 0;
    function onResize() {
      if (rRaf) return;
      rRaf = requestAnimationFrame(() => {
        rRaf = 0;
        resize();
        render();
      });
    }

    const obs = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
      if (!active || reduced) render();
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    if (reduced) render();
    else start();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <>
      {/* Layer 1 — animated aurora gradient (slow drift, transform-only) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="animate-aurora absolute inset-0"
          style={{
            background:
              "radial-gradient(40vw 40vw at 10% -5%, rgba(124,58,237,0.12), transparent 60%)," +
              "radial-gradient(38vw 38vw at 92% 14%, rgba(59,130,246,0.10), transparent 60%)," +
              "radial-gradient(44vw 44vw at 28% 105%, rgba(6,182,212,0.08), transparent 60%)",
          }}
        />
        {/* second aurora blob drifting on a different timing for parallax depth */}
        <div
          className="animate-aurora absolute inset-0"
          style={{
            animationDuration: "34s",
            animationDirection: "reverse",
            background:
              "radial-gradient(36vw 36vw at 78% -8%, rgba(168,85,247,0.10), transparent 62%)," +
              "radial-gradient(42vw 42vw at 4% 70%, rgba(34,211,238,0.07), transparent 62%)",
          }}
        />
      </div>
      {/* Layer 2 — neural network + cursor glow · Layer 3 — particles (same canvas) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
        aria-hidden
      />
    </>
  );
}
