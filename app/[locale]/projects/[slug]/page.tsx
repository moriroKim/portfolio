import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trophy } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { ProjectThumbnail } from "@/components/project-thumbnail";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDictionary(locale).projects.items.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const item = dict.projects.items.find((p) => p.slug === slug);
  if (!item) return {};

  const title = `${item.title} — ${dict.hero.name}`;
  const description = item.caseStudy?.tagline ?? item.summary;

  return {
    title,
    description,
    openGraph: { title, description, locale, type: "article" },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const item = dict.projects.items.find((p) => p.slug === slug);
  if (!item) notFound();

  const cs = item.caseStudy;
  const labels = dict.projects;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-28 pt-24 sm:px-8">
      <Link
        href={`/${locale}#projects`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-violet"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {labels.backToList}
      </Link>

      {/* Header */}
      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-widest text-violet">
          {item.company}
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          {item.title}
        </h1>
        {cs?.tagline && (
          <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted">
            {cs.tagline}
          </p>
        )}

        {item.award && (
          <span
            className={`mt-5 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold ring-1 ${
              item.awardTier === "gold"
                ? "bg-amber-400 text-amber-950 ring-amber-500/40"
                : "bg-zinc-300 text-zinc-900 ring-zinc-400/50"
            }`}
          >
            <Trophy className="h-3 w-3" />
            {item.award}
          </span>
        )}
      </header>

      {/* Meta */}
      <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-3">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            {labels.roleLabel}
          </dt>
          <dd className="mt-1.5 text-sm text-ink">{cs?.role ?? item.role}</dd>
        </div>
        {(cs?.period ?? item.period) && (
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              {labels.periodLabel}
            </dt>
            <dd className="mt-1.5 text-sm text-ink">
              {cs?.period ?? item.period}
            </dd>
          </div>
        )}
        <div className="sm:col-span-3">
          <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
            {labels.stackLabel}
          </dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {(cs?.stack ?? item.tags).map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-paper-soft px-2 py-0.5 font-mono text-[11px] text-ink-muted"
              >
                {t}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      {/* Thumbnail */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-line">
        <ProjectThumbnail slug={item.slug} className="aspect-[16/9] w-full" />
      </div>

      {/* Metrics */}
      {cs?.metrics && cs.metrics.length > 0 && (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cs.metrics.map((m) => (
            <li
              key={m.label}
              className="rounded-xl border border-line bg-paper-warm px-5 py-4"
            >
              <p className="font-display text-2xl font-bold tracking-tight text-violet-dark">
                {m.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-soft">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Body */}
      {cs ? (
        <div className="mt-14 space-y-12">
          {cs.blocks.map((block, i) => (
            <section key={block.heading}>
              <h2 className="flex items-baseline gap-3 font-display text-xl font-bold tracking-tight text-ink">
                <span className="font-mono text-xs text-violet">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {block.heading}
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-[1.85] text-ink-muted">
                {block.body}
              </p>
              {block.bullets && (
                <ul className="mt-5 space-y-2.5 border-l-2 border-violet-soft pl-5">
                  {block.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-pretty text-sm leading-relaxed text-ink-muted"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-14 rounded-xl border border-dashed border-line bg-paper-soft px-6 py-10 text-center text-sm text-ink-soft">
          {labels.noCaseStudy}
        </p>
      )}

      {item.github && (
        <a
          href={item.github}
          target="_blank"
          rel="noreferrer"
          className="mt-14 inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink transition-colors hover:border-violet/50 hover:text-violet"
        >
          <SiGithub className="h-4 w-4" />
          GitHub
        </a>
      )}
    </article>
  );
}
