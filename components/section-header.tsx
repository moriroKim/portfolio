type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: Props) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <header
      id={id}
      className={`mb-12 flex flex-col gap-4 md:mb-16 ${alignment}`}
    >
      <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-dark">
        <span className="h-px w-6 bg-violet/40" />
        <span>{eyebrow}</span>
        <span className="h-px w-6 bg-violet/40" />
      </div>
      <h2 className="max-w-3xl text-3xl font-bold tracking-[var(--tracking-tight)] text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
