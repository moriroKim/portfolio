"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * MagicBento — wraps a grid of cards and pipes the cursor position into
 * each card via CSS custom properties (--mx, --my). Cards opt in by
 * adding the `bento-card` class plus `data-bento-card` attribute; the
 * actual visual treatment (spotlight, border glow) lives in globals.css.
 */
export function MagicBento({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let frame = 0;
    let lastEvent: MouseEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!lastEvent) return;
      const cards = container.querySelectorAll<HTMLElement>("[data-bento-card]");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${lastEvent!.clientX - rect.left}px`);
        card.style.setProperty("--my", `${lastEvent!.clientY - rect.top}px`);
      });
    };

    const handleMove = (e: MouseEvent) => {
      lastEvent = e;
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    container.addEventListener("mousemove", handleMove);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
