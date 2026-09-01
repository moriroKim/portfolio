import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trophy } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales } from "@/lib/i18n/config";
import { CaseStudyDiagram } from "@/components/case-study/diagram";

type Params = { locale: string; slug: string };

const UNIT_RE =
  /(\d[\d,.]*\s?(?:%|ms|밀리초|ミリ秒|초|秒|건|件|통|通|개|個|역|駅|명|배|회|줄|calls?|tests?|stations?|models?|lines?|seconds?|s\b)|\d+\s?\/\s?\d+)/g;

/** 본문 텍스트: **볼드** 마커와 수치+단위를 강조해 렌더링 */
function Rich({ text }: { text: string }) {
  const boldParts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {boldParts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part.split(UNIT_RE).map((seg, j) =>
            j % 2 === 1 ? (
              <strong
                key={`${i}-${j}`}
                className="rounded bg-violet-faint px-1 font-mono text-[0.92em] font-bold text-violet-deep"
              >
                {seg}
              </strong>
            ) : (
              seg
            ),
          )
        ),
      )}
    </>
  );
}

const TONE_TAG: Record<string, { problem: string; outcome: string }> = {
  ko: { problem: "발견한 문제", outcome: "개선 결과" },
  ja: { problem: "発見した問題", outcome: "改善結果" },
  en: { problem: "Problem found", outcome: "Outcome" },
};

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
            <Rich text={cs.tagline} />
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

      {/* Architecture diagram */}
      <CaseStudyDiagram slug={item.slug} locale={locale} />

      {/* Metrics: 문제 행과 결과 행을 분리 */}
      {cs?.metrics && cs.metrics.length > 0 && (
        <div className="mt-10 space-y-5">
          {(["problem", "outcome", undefined] as const).map((tone) => {
            const group = cs.metrics!.filter((m) => m.tone === tone);
            if (group.length === 0) return null;
            const tag = tone ? (TONE_TAG[locale] ?? TONE_TAG.ko)[tone] : null;
            return (
              <div key={tone ?? "neutral"}>
                {tag && (
                  <p
                    className={`mb-2 inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest ${
                      tone === "problem"
                        ? "bg-rose/15 text-rose"
                        : "bg-emerald/15 text-emerald-700"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        tone === "problem" ? "bg-rose" : "bg-emerald-600"
                      }`}
                    />
                    {tag}
                  </p>
                )}
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {group.map((m) => (
                    <li
                      key={m.label}
                      className={`rounded-xl border px-5 py-4 ${
                        tone === "problem"
                          ? "border-rose/40 bg-rose/5"
                          : tone === "outcome"
                            ? "border-emerald/40 bg-emerald/5"
                            : "border-line bg-paper-warm"
                      }`}
                    >
                      <p
                        className={`font-display text-2xl font-bold tracking-tight ${
                          tone === "problem"
                            ? "text-rose"
                            : tone === "outcome"
                              ? "text-emerald-700"
                              : "text-violet-dark"
                        }`}
                      >
                        {m.value}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-ink-soft">{m.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
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
                <Rich text={block.body} />
              </p>
              {block.bullets && (
                <ul className="mt-5 space-y-2.5 border-l-2 border-violet-soft pl-5">
                  {block.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-pretty text-sm leading-relaxed text-ink-muted"
                    >
                      <Rich text={b} />
                    </li>
                  ))}
                </ul>
              )}

              {block.steps && (
                <ol className="mt-6 space-y-3">
                  {block.steps.map((st, si) => (
                    <li
                      key={st.label}
                      className="group relative rounded-xl border border-line bg-paper-warm px-5 py-4 transition-colors hover:border-violet/40"
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-soft font-mono text-[10.5px] font-bold text-violet-deep"
                        >
                          {String(si + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="flex flex-wrap items-center gap-2 text-[13.5px] font-bold leading-snug text-ink">
                            <span>{st.label}</span>
                            <span
                              aria-hidden
                              className="h-px flex-1 bg-line group-hover:bg-violet/30"
                            />
                          </p>
                          <p className="mt-1.5 text-pretty text-[13px] leading-relaxed text-ink-muted">
                            <Rich text={st.text} />
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {block.compare && (
                <ul className="mt-6 space-y-4">
                  {block.compare.map((c) => (
                    <li key={c.label} className="rounded-xl border border-line bg-paper-warm px-5 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                        {c.label}
                      </p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="w-16 shrink-0 text-right font-mono text-[11px] text-rose">
                            {c.before}
                          </span>
                          <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-rose/12">
                            <span className="block h-full rounded-full bg-rose/60" style={{ width: "100%" }} />
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-16 shrink-0 text-right font-mono text-[11px] font-bold text-emerald-700">
                            {c.after}
                          </span>
                          <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-emerald/12">
                            <span
                              className="block h-full rounded-full bg-emerald-600"
                              style={{ width: `${Math.max(2, c.afterRatio)}%` }}
                            />
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {block.table && (
                <div className="mt-6 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-line bg-paper-soft">
                        <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                          {labels.altOptionLabel}
                        </th>
                        <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                          {labels.altProsLabel}
                        </th>
                        <th className="px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                          {labels.altConsLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.table.map((row) => (
                        <tr
                          key={row.option}
                          className={`border-b border-line/70 last:border-0 ${
                            row.chosen ? "bg-violet-faint" : ""
                          }`}
                        >
                          <td className="px-4 py-3 align-top">
                            <span className="font-semibold text-ink">
                              {row.option}
                            </span>
                            {row.chosen && (
                              <span className="ml-2 inline-flex rounded bg-violet px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-white">
                                {labels.altChosenLabel}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-ink-muted">
                            <Rich text={row.pros} />
                          </td>
                          <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-ink-muted">
                            <Rich text={row.cons} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
