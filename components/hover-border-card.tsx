"use client";

import { useState, type ReactNode } from "react";
import ElectricBorder from "./reactbits/ElectricBorder";

type Props = {
  children: ReactNode;
  /** Wrapper class on the outermost relative container */
  className?: string;
  /** Optional class merged onto the inner card surface */
  cardClassName?: string;
  /** Border radius (matches inner card rounding) */
  radius?: number;
  /** Electric border color */
  color?: string;
  /** Animation chaos / wobble amount */
  chaos?: number;
  /** Animation speed */
  speed?: number;
};

/**
 * Card wrapper that swaps a quiet `border-line` for an animated electric
 * border on hover. The ElectricBorder canvas only runs while hovered, so
 * we never have N concurrent RAF loops at rest.
 */
export function HoverBorderCard({
  children,
  className = "",
  cardClassName = "",
  radius = 16,
  color = "#7c3aed",
  chaos = 0.12,
  speed = 1,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const baseInner = `rounded-2xl border bg-paper transition-colors duration-300 ${
    hovered ? "border-violet/45" : "border-line"
  } ${cardClassName}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative ${className}`}
    >
      {hovered ? (
        <ElectricBorder
          color={color}
          speed={speed}
          chaos={chaos}
          borderRadius={radius}
        >
          <div className={baseInner}>{children}</div>
        </ElectricBorder>
      ) : (
        <div className={baseInner}>{children}</div>
      )}
    </div>
  );
}
