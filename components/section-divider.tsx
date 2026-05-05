/**
 * Subtle horizontal divider between page sections.
 * Centered gradient line — fades into the page background at both ends.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      role="separator"
      className="mx-auto h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-line-strong/60 to-transparent"
    />
  );
}
