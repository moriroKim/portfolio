export type ProjectCategory = "work" | "team" | "bootcamp";

export type CaseStudyBlock = {
  heading: string;
  body: string;
  bullets?: readonly string[];
};

export type CaseStudy = {
  tagline: string;
  role: string;
  period?: string;
  stack: readonly string[];
  /** 문제 → 제약 → 결정 → 결과 순의 서술 블록 */
  blocks: readonly CaseStudyBlock[];
  /** 정량 결과. 근거를 댈 수 있는 것만. */
  metrics?: readonly { value: string; label: string }[];
};

export type ProjectItem = {
  slug: string;
  category: ProjectCategory;
  company: string;
  title: string;
  summary: string;
  tags: readonly string[];
  role: string;
  period?: string;
  award?: string;
  awardTier?: "gold" | "silver";
  status?: string;
  featured?: boolean;
  github?: string;
  youtube?: string;
  caseStudy?: CaseStudy;
};

export type ResumeBullet = {
  title: string;
  detail?: string;
  projectSlug?: string;
};

export type ExperienceItem = {
  period: string;
  company: string;
  role: string;
  summary?: string;
  bullets?: readonly ResumeBullet[];
  tags: readonly string[];
};

export type EducationItem = {
  period: string;
  institution: string;
  major: string;
  note?: string;
};

export type TrainingItem = {
  period: string;
  institution: string;
  program: string;
  note?: string;
  bullets?: readonly ResumeBullet[];
  tags?: readonly string[];
};

export type AchievementItem = {
  kind: "cert" | "language" | "award";
  date: string;
  title: string;
  meta?: string;
  projectSlug?: string;
  medal?: "gold" | "silver" | "bronze";
};

export type StatItem = {
  value: string;
  label: string;
  meta?: string;
};

export type TechStackGroup = {
  label: string;
  items: readonly string[];
};

export type ContactMethod = {
  label: string;
  value: string;
  href: string;
};

export type Dictionary = {
  meta: {
    siteName: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    resume: string;
    contact: string;
    email: string;
  };
  hero: {
    name: string;
    nameRoman: string;
    roleTitle: string;
    positioningPre: string;
    positioningEmphasis: string;
    positioningPost: string;
    subtitle: string;
    metaChips: readonly string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    chips: readonly string[];
  };
  stats: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: readonly StatItem[];
  };
  career: {
    eyebrow: string;
    title: string;
    description: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewProjectLabel: string;
    items: readonly ExperienceItem[];
  };
  education: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: readonly EducationItem[];
  };
  training: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewProjectLabel: string;
    items: readonly TrainingItem[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewProjectLabel: string;
    items: readonly AchievementItem[];
  };
  techStack: {
    eyebrow: string;
    title: string;
    subtitle: string;
    groups: readonly TechStackGroup[];
  };
  projects: {
    work: {
      eyebrow: string;
      title: string;
      description: string;
    };
    team: {
      eyebrow: string;
      title: string;
      description: string;
    };
    items: readonly ProjectItem[];
    viewCaseStudy: string;
    showMore: string;
    showLess: string;
    backToList: string;
    noCaseStudy: string;
    roleLabel: string;
    stackLabel: string;
    periodLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    methods: readonly ContactMethod[];
    copyLabel: string;
    copiedLabel: string;
  };
  footer: {
    contact: string;
    email: string;
    github: string;
    rights: string;
  };
  common: {
    role: string;
    period: string;
    team: string;
    visibility: string;
    publicLabel: string;
    privateLabel: string;
    inProgress: string;
  };
};
