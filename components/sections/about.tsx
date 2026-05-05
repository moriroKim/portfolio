"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../section-header";
import { ProfileCard } from "../profile-card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Props = {
  dict: Dictionary["about"];
};

const ease = [0.22, 1, 0.36, 1] as const;

// Render **word** segments as violet-highlighted spans within an otherwise muted paragraph.
function renderHighlighted(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="font-semibold text-violet-deep">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function AboutSection({ dict }: Props) {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-4xl px-6 py-24 md:py-32"
    >
      <SectionHeader eyebrow={dict.eyebrow} title={dict.title} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_360px] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="space-y-6"
        >
          {dict.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-[1.75] text-ink-muted sm:text-lg"
            >
              {renderHighlighted(p)}
            </p>
          ))}
        </motion.div>

        {/* Profile ID-card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="order-first self-start md:order-none"
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  );
}
