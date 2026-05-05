type Props = {
  slug: string;
  className?: string;
};

function markFor(slug: string): string {
  const map: Record<string, string> = {
    "soundmind-sso": "SSO",
    "chocopie-contract": "C/P",
    mohani: "M",
    wigex: "WX",
    "wigtn-snowflake": "❄",
    "wigvo-v2": "v2",
    "wigtn-coding": "{ }",
    movieget: "MG",
    micgolf: "MIC",
  };
  return map[slug] ?? slug.slice(0, 2).toUpperCase();
}

const dotPattern =
  "radial-gradient(rgba(15,23,42,0.08) 1.5px, transparent 1.5px) 0 0/18px 18px";

export function ProjectThumbnail({ slug, className = "" }: Props) {
  const mark = markFor(slug);

  return (
    <div
      aria-hidden
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: dotPattern }}
      />

      <span className="relative z-10 font-mono text-3xl font-bold tracking-tight text-zinc-400 md:text-4xl">
        {mark}
      </span>

      <span className="absolute bottom-2 left-3 right-3 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400/80">
        {slug}
      </span>
    </div>
  );
}
