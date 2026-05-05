/**
 * Page-level violet ambient blobs — provide subtle color across all sections.
 * Spans the full page height and sits behind content.
 */
export function BackgroundDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
    >
      <div className="absolute top-[18%] -left-32 h-[420px] w-[420px] rounded-full bg-violet/[0.06] blur-3xl md:h-[520px] md:w-[520px]" />
      <div className="absolute top-[38%] -right-32 h-[400px] w-[400px] rounded-full bg-violet-light/[0.08] blur-3xl md:h-[500px] md:w-[500px]" />
      <div className="absolute top-[60%] -left-24 h-[400px] w-[400px] rounded-full bg-violet/[0.05] blur-3xl md:h-[500px] md:w-[500px]" />
      <div className="absolute bottom-[10%] -right-24 h-[420px] w-[420px] rounded-full bg-violet-light/[0.06] blur-3xl md:h-[500px] md:w-[500px]" />
    </div>
  );
}
