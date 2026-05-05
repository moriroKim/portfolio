"use client";

import LogoLoop, { type LogoItem } from "../reactbits/LogoLoop";
import { ProjectThumbnail } from "../project-thumbnail";

const TICKER_SLUGS = [
  "wigex",
  "wigtn-snowflake",
  "soundmind-sso",
  "chocopie-contract",
  "mohani",
  "movieget",
  "micgolf",
  "wigtn-coding",
  "wigvo-v2",
];

/**
 * Photo / project visuals ticker.
 * Currently rendering project thumbnails as the ticker content. Real
 * screenshots can be swapped in by passing image LogoItems instead.
 */
export function PhotoTicker() {
  const items: LogoItem[] = TICKER_SLUGS.map((slug) => ({
    node: (
      <div className="h-[120px] w-[200px] overflow-hidden rounded-xl border border-line/60 shadow-[0_8px_30px_-16px_rgba(76,29,149,0.3)] md:h-[140px] md:w-[240px]">
        <ProjectThumbnail slug={slug} className="h-full w-full" />
      </div>
    ),
    title: slug,
    ariaLabel: slug,
  }));

  return (
    <section
      aria-label="Project visuals"
      className="relative w-full overflow-hidden border-y border-line/60 bg-paper-warm/30 py-10 md:py-14"
    >
      <LogoLoop
        logos={items}
        speed={50}
        direction="left"
        logoHeight={140}
        gap={24}
        fadeOut
        fadeOutColor="#f8f7fb"
        pauseOnHover
        ariaLabel="Project visuals ticker"
      />
    </section>
  );
}
