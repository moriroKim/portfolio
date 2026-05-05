import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiReactquery,
  SiStyledcomponents,
  SiExpo,
  SiSupabase,
  SiNestjs,
  SiSpringboot,
  SiNodedotjs,
  SiPrisma,
  SiMariadbfoundation,
  SiRedis,
  SiSqlite,
  SiGooglecloud,
  SiDocker,
  SiNginx,
  SiJenkins,
  SiGithubactions,
  SiClaude,
  SiApple,
  SiUbuntu,
} from "react-icons/si";
import { FaWindows } from "react-icons/fa";
import {
  Cpu,
  Coffee,
  ShoppingCart,
  Wallet,
  Bell,
  Layers,
  type LucideIcon,
} from "lucide-react";

type AnyIcon = IconType | LucideIcon;
type IconDef = { icon: AnyIcon; color?: string };

const ICONS: Record<string, IconDef> = {
  typescript: { icon: SiTypescript, color: "#3178C6" },
  java: { icon: Coffee, color: "#ED8B00" },

  react: { icon: SiReact, color: "#61DAFB" },
  "react-native": { icon: SiReact, color: "#61DAFB" },
  "react native": { icon: SiReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs, color: "#000000" },
  vite: { icon: SiVite, color: "#646CFF" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  zustand: { icon: Layers, color: "#7c3aed" },
  "tanstack query": { icon: SiReactquery, color: "#FF4154" },
  "styled-components": { icon: SiStyledcomponents, color: "#DB7093" },

  expo: { icon: SiExpo, color: "#000000" },
  "supabase (codepush)": { icon: SiSupabase, color: "#3FCF8E" },

  nestjs: { icon: SiNestjs, color: "#E0234E" },
  "spring boot": { icon: SiSpringboot, color: "#6DB33F" },
  "node.js": { icon: SiNodedotjs, color: "#339933" },
  prisma: { icon: SiPrisma, color: "#2D3748" },

  mariadb: { icon: SiMariadbfoundation, color: "#003545" },
  redis: { icon: SiRedis, color: "#DC382D" },
  "supabase (postgres)": { icon: SiSupabase, color: "#3FCF8E" },
  sqlite: { icon: SiSqlite, color: "#003B57" },

  "gcp cloud run": { icon: SiGooglecloud, color: "#4285F4" },
  docker: { icon: SiDocker, color: "#2496ED" },
  "github actions": { icon: SiGithubactions, color: "#2088FF" },
  jenkins: { icon: SiJenkins, color: "#D24939" },
  nginx: { icon: SiNginx, color: "#009639" },
  "mac mini 셀프호스팅": { icon: SiApple, color: "#000000" },
  "mac mini self-hosting": { icon: SiApple, color: "#000000" },
  "mac mini セルフホスティング": { icon: SiApple, color: "#000000" },

  portone: { icon: ShoppingCart, color: "#EF4444" },
  "toss payments": { icon: Wallet, color: "#0064FF" },
  "fcm / expo push": { icon: Bell, color: "#FBBC04" },

  "claude code": { icon: SiClaude, color: "#C15F3C" },

  windows: { icon: FaWindows, color: "#0078D4" },
  macos: { icon: SiApple, color: "#000000" },
  ubuntu: { icon: SiUbuntu, color: "#E95420" },
};

const FALLBACK: IconDef = { icon: Cpu, color: "#7c3aed" };

export function TechIcon({ name, className = "" }: { name: string; className?: string }) {
  const def = ICONS[name.toLowerCase()] ?? FALLBACK;
  const Icon = def.icon as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  return <Icon className={className} style={{ color: def.color }} />;
}
