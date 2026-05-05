export type ProjectCategory = "work" | "team" | "bootcamp";

export type ProjectItem = {
  slug: string;
  category: ProjectCategory;
  company: string;
  title: string;
  summary: string;
  tags: readonly string[];
  role: string;
  period?: string;
  badge?: string;
  featured?: boolean;
};

export type ExperienceItem = {
  period: string;
  company: string;
  role: string;
  description: string;
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
  tags?: readonly string[];
};

export type AchievementItem = {
  kind: "cert" | "language";
  date: string;
  title: string;
  meta?: string;
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
    items: readonly TrainingItem[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    subtitle: string;
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
