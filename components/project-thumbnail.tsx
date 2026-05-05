type ThumbVariant = {
  from: string;
  to: string;
  text: string;
  pattern: "dots" | "lines" | "grid" | "circles";
};

const VARIANTS: Record<string, ThumbVariant> = {
  "soundmind-sso": {
    from: "#6366f1",
    to: "#312e81",
    text: "#e0e7ff",
    pattern: "grid",
  },
  "chocopie-contract": {
    from: "#fb7185",
    to: "#9f1239",
    text: "#ffe4e6",
    pattern: "circles",
  },
  mohani: {
    from: "#f59e0b",
    to: "#b45309",
    text: "#fef3c7",
    pattern: "dots",
  },
  wigex: {
    from: "#8b5cf6",
    to: "#4c1d95",
    text: "#ede9fe",
    pattern: "grid",
  },
  "wigtn-snowflake": {
    from: "#06b6d4",
    to: "#0e7490",
    text: "#cffafe",
    pattern: "lines",
  },
  "wigvo-v2": {
    from: "#10b981",
    to: "#065f46",
    text: "#d1fae5",
    pattern: "circles",
  },
  "wigtn-plugins": {
    from: "#a78bfa",
    to: "#5b21b6",
    text: "#f5f3ff",
    pattern: "dots",
  },
  movieget: {
    from: "#ef4444",
    to: "#7f1d1d",
    text: "#fee2e2",
    pattern: "lines",
  },
  micgolf: {
    from: "#22c55e",
    to: "#14532d",
    text: "#dcfce7",
    pattern: "grid",
  },
};

const DEFAULT_VARIANT: ThumbVariant = {
  from: "#7c3aed",
  to: "#1e1b4b",
  text: "#ede9fe",
  pattern: "dots",
};

function patternFor(kind: ThumbVariant["pattern"], color: string) {
  switch (kind) {
    case "lines":
      return `repeating-linear-gradient(45deg, transparent 0 12px, ${color}26 12px 13px)`;
    case "grid":
      return `linear-gradient(${color}1f 1px, transparent 1px) 0 0/24px 24px, linear-gradient(90deg, ${color}1f 1px, transparent 1px) 0 0/24px 24px`;
    case "circles":
      return `radial-gradient(circle at 30% 30%, ${color}33, transparent 32%), radial-gradient(circle at 75% 70%, ${color}26, transparent 28%)`;
    case "dots":
    default:
      return `radial-gradient(${color}33 1.5px, transparent 1.5px) 0 0/18px 18px`;
  }
}

function markFor(slug: string): string {
  // Domain-style short marks per project
  const map: Record<string, string> = {
    "soundmind-sso": "SSO",
    "chocopie-contract": "C/P",
    mohani: "M",
    wigex: "WX",
    "wigtn-snowflake": "❄",
    "wigvo-v2": "v2",
    "wigtn-plugins": "{ }",
    movieget: "MG",
    micgolf: "MIC",
  };
  return map[slug] ?? slug.slice(0, 2).toUpperCase();
}

type Props = {
  slug: string;
  className?: string;
};

export function ProjectThumbnail({ slug, className = "" }: Props) {
  const v = VARIANTS[slug] ?? DEFAULT_VARIANT;
  const mark = markFor(slug);

  return (
    <div
      aria-hidden
      className={`relative grid place-items-center overflow-hidden rounded-xl ${className}`}
      style={{
        background: `linear-gradient(135deg, ${v.from} 0%, ${v.to} 100%)`,
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-90"
        style={{ backgroundImage: patternFor(v.pattern, v.text) }}
      />

      {/* Bottom corner glow */}
      <div
        className="absolute -inset-1 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 80% 90%, ${v.text}33, transparent 50%)`,
        }}
      />

      {/* Mark */}
      <span
        className="relative z-10 font-mono text-3xl font-bold tracking-tight md:text-4xl"
        style={{ color: v.text }}
      >
        {mark}
      </span>

      {/* Slug ribbon at bottom */}
      <span
        className="absolute bottom-2 left-3 right-3 truncate font-mono text-[9px] uppercase tracking-[0.2em] opacity-70"
        style={{ color: v.text }}
      >
        {slug}
      </span>
    </div>
  );
}
