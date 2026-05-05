import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { Hero } from "@/components/hero";
import { PhotoTicker } from "@/components/sections/photo-ticker";
import { AboutSection } from "@/components/sections/about";
import { StatsSection } from "@/components/sections/stats";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { TrainingSection } from "@/components/sections/training";
import { AchievementsSection } from "@/components/sections/achievements";
import { TechStackSection } from "@/components/sections/tech-stack";
import { ProjectsSection } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";
import { SectionDivider } from "@/components/section-divider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.meta.siteName,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.siteName,
      description: dict.meta.description,
      locale,
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict.hero} />
      <PhotoTicker />
      <SectionDivider />
      <AboutSection dict={dict.about} />
      <SectionDivider />
      <StatsSection dict={dict.stats} />
      <SectionDivider />
      <ExperienceSection locale={locale} dict={dict.experience} />
      <SectionDivider />
      <EducationSection dict={dict.education} />
      <SectionDivider />
      <TrainingSection locale={locale} dict={dict.training} />
      <SectionDivider />
      <AchievementsSection locale={locale} dict={dict.achievements} />
      <SectionDivider />
      <TechStackSection dict={dict.techStack} />
      <SectionDivider />
      <ProjectsSection
        locale={locale}
        sectionId="work-projects"
        header={dict.projects.work}
        items={dict.projects.items.filter((it) => it.category === "work")}
        showMoreLabel={dict.projects.showMore}
        showLessLabel={dict.projects.showLess}
      />
      <SectionDivider />
      <ProjectsSection
        locale={locale}
        sectionId="team-projects"
        header={dict.projects.team}
        items={dict.projects.items.filter((it) => it.category !== "work")}
        showMoreLabel={dict.projects.showMore}
        showLessLabel={dict.projects.showLess}
      />
      <SectionDivider />
      <ContactSection dict={dict.contact} />
    </>
  );
}
