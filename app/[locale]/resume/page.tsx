import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: `${dict.hero.name} · Resume`, robots: { index: false } };
}

const T = {
  ko: { resume: "이력서", contact: "연락처", exp: "경력", edu: "학력", skills: "기술", awards: "수상 · 논문", projects: "주요 프로젝트" },
  ja: { resume: "履歴書", contact: "連絡先", exp: "職務経歴", edu: "学歴", skills: "スキル", awards: "受賞・論文", projects: "主なプロジェクト" },
  en: { resume: "Resume", contact: "Contact", exp: "Experience", edu: "Education", skills: "Skills", awards: "Awards · Publications", projects: "Selected projects" },
};

/** **bold** 마커 렌더 */
function B({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {p}
          </strong>
        ) : (
          p
        ),
      )}
    </>
  );
}

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = T[locale] ?? T.ko;
  const exp = dict.experience.items[0];
  const featured = dict.projects.items.filter((p) => p.featured);

  return (
    <article className="resume-sheet mx-auto max-w-[820px] bg-paper px-10 py-12 text-ink print:max-w-none print:px-0 print:py-0">
      {/* Header */}
      <header className="border-b-2 border-ink pb-5">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {dict.hero.name}
          <span className="ml-3 text-base font-medium text-ink-soft">
            {dict.hero.nameRoman}
          </span>
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          {dict.hero.positioningPre} {dict.hero.positioningEmphasis}
          {dict.hero.positioningPost}
        </p>
        <p className="mt-2 font-mono text-[11.5px] text-ink-soft">
          jinmo@wigtn.com · github.com/moriroKim · wigtn.com
        </p>
      </header>

      {/* Intro */}
      <section className="mt-6 space-y-2.5">
        {dict.about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="text-[12.5px] leading-relaxed text-ink-muted">
            <B text={p} />
          </p>
        ))}
      </section>

      {/* Experience */}
      <section className="mt-7">
        <h2 className="resume-h2">{t.exp}</h2>
        <div className="mt-2.5 flex items-baseline justify-between">
          <p className="text-sm font-bold">{exp.company} · {exp.role}</p>
          <p className="font-mono text-[11px] text-ink-soft">{exp.period}</p>
        </div>
        {exp.summary && (
          <p className="mt-1 text-[12px] text-ink-muted">{exp.summary}</p>
        )}
        <ul className="mt-2.5 space-y-2">
          {(exp.bullets ?? []).map((b) => (
            <li key={b.title} className="text-[12px] leading-relaxed">
              <span className="font-semibold text-ink">{b.title}</span>
              {b.detail && (
                <span className="text-ink-muted"> — {b.detail}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Featured projects */}
      <section className="mt-7">
        <h2 className="resume-h2">{t.projects}</h2>
        <ul className="mt-2.5 space-y-2">
          {featured.map((p) => (
            <li key={p.slug} className="text-[12px] leading-relaxed">
              <span className="font-semibold text-ink">{p.title}</span>
              <span className="text-ink-muted"> — {p.summary}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Awards */}
      <section className="mt-7">
        <h2 className="resume-h2">{t.awards}</h2>
        <ul className="mt-2.5 space-y-1.5 text-[12px] text-ink-muted">
          {dict.achievements.items.map((a) => (
            <li key={a.title}>
              <span className="font-mono text-[10.5px] text-ink-soft">{a.date}</span>
              <span className="ml-2 font-medium text-ink">{a.title}</span>
              {a.meta && <span className="ml-1.5">· {a.meta}</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Education + Skills */}
      <div className="mt-7 grid grid-cols-2 gap-8">
        <section>
          <h2 className="resume-h2">{t.edu}</h2>
          <ul className="mt-2.5 space-y-1.5 text-[12px] text-ink-muted">
            {dict.education.items.map((e) => (
              <li key={e.institution}>
                <span className="font-medium text-ink">{e.institution}</span>
                <span className="ml-1.5">{e.major}</span>
                <span className="ml-1.5 font-mono text-[10.5px] text-ink-soft">{e.period}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="resume-h2">{t.skills}</h2>
          <p className="mt-2.5 text-[12px] leading-relaxed text-ink-muted">
            {dict.techStack.groups
              .map((g) => g.items.join(" · "))
              .join(" · ")}
          </p>
        </section>
      </div>
    </article>
  );
}
