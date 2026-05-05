"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";

interface Dot {
  cx: number;
  cy: number;
}

export interface InteractiveDotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  className?: string;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

const InteractiveDotGrid: React.FC<InteractiveDotGridProps> = ({
  dotSize = 2.5,
  gap = 28,
  baseColor = "#cdc8db",
  activeColor = "#7c3aed",
  proximity = 140,
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cell = dotSize + gap;
    const cols = Math.floor((width + gap) / cell);
    const rows = Math.floor((height + gap) / cell);
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({ cx: startX + x * cell, cy: startY + y * cell });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    let rafId: number | null = null;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;
      const r = dotSize / 2;

      for (const dot of dotsRef.current) {
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r2 = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g2 = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b2 = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r2},${g2},${b2})`;
        }

        ctx.beginPath();
        ctx.arc(dot.cx, dot.cy, r, 0, Math.PI * 2);
        ctx.fillStyle = style;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [proximity, baseColor, activeColor, baseRgb, activeRgb, dotSize]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(buildGrid);
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    } else {
      window.addEventListener("resize", buildGrid);
    }
    return () => {
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener("resize", buildGrid);
      }
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />
    </div>
  );
};

export default InteractiveDotGrid;
