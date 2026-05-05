"use client";

import LightRays from "./reactbits/LightRays";
import BlurText from "./reactbits/BlurText";
import ShinyText from "./reactbits/ShinyText";
import InteractiveDotGrid from "./reactbits/InteractiveDotGrid";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  locale: Locale;
  dict: Dictionary["hero"];
};

export function Hero({ locale: _locale, dict }: Props) {
  void _locale;

  const tagline = `${dict.positioningPre} ${dict.positioningEmphasis}${dict.positioningPost}`;

  return (
    <section className="hero-light relative flex min-h-screen items-center justify-center overflow-hidden">
      <span aria-hidden className="hero-horizon" />

      {/* Two violet floating blobs (yellow / cyan removed) */}
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-violet-light/14 blur-3xl"
      />
      <div
        aria-hidden
        className="float-slow-rev pointer-events-none absolute -top-20 right-[6%] h-[380px] w-[380px] rounded-full bg-violet/8 blur-3xl"
      />

      {/* Interactive dot grid — visible base, vivid hover */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_85%_65%_at_center,black_0%,transparent_85%)]"
      >
        <InteractiveDotGrid
          dotSize={2.5}
          gap={26}
          baseColor="#c4bfd4"
          activeColor="#7c3aed"
          proximity={190}
        />
      </div>

      {/* Light rays — much subtler so the hero stays bright */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-35"
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c3aed"
          raysSpeed={1.0}
          lightSpread={1.6}
          rayLength={2.2}
          fadeDistance={0.85}
          saturation={1.0}
          followMouse
          mouseInfluence={0.05}
          noiseAmount={0.04}
          distortion={0.02}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        {/* English name — BlurText reveal + ongoing CSS shimmer */}
        <div className="flex justify-center">
          <BlurText
            text="jinmo-kim"
            as="h1"
            animateBy="letters"
            direction="top"
            delay={70}
            stepDuration={0.4}
            className="font-display text-[clamp(3.5rem,11vw,8.5rem)] font-bold leading-[0.95] tracking-[var(--tracking-display)] text-ink"
          />
        </div>

        {/* Role descriptor */}
        <p className="animate-fade-up delay-500 mt-5 font-mono text-sm uppercase tracking-[0.28em] text-violet-deep sm:text-base">
          {dict.roleTitle}
        </p>

        {/* Tagline — whole-sentence shimmer */}
        <p className="animate-fade-up delay-900 text-balance-cjk mx-auto mt-10 max-w-[34ch] text-[clamp(1.125rem,2vw,1.5rem)] font-medium leading-[1.55] sm:max-w-[42ch]">
          <ShinyText
            text={tagline}
            color="#3a3656"
            shineColor="#a78bfa"
            speed={3.5}
            spread={120}
          />
        </p>
      </div>
    </section>
  );
}
