"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Home, Menu, X, ChevronDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { LangSwitcher } from "./lang-switcher";
import { SOCIAL } from "@/lib/social";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function LinkedinMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75c0 .97-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.76c1.4-2.59 7-2.78 7 2.48v6.76z" />
    </svg>
  );
}

export function Header({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const [careerMobileOpen, setCareerMobileOpen] = useState(false);
  const careerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Career desktop dropdown — outside click
  useEffect(() => {
    if (!careerOpen) return;
    const onClick = (e: MouseEvent) => {
      if (careerRef.current && !careerRef.current.contains(e.target as Node)) {
        setCareerOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCareerOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, [careerOpen]);

  // Drawer — Esc to close + lock body scroll
  useEffect(() => {
    if (!drawerOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [drawerOpen]);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setCareerMobileOpen(false);
  };

  const base = `/${locale}`;
  const nav = dict.nav;

  const careerSub = [
    { href: `${base}/#experience`, label: dict.experience.title },
    { href: `${base}/#education`, label: dict.education.title },
    { href: `${base}/#training`, label: dict.training.title },
    { href: `${base}/#achievements`, label: dict.achievements.title },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "border-b border-line/70 bg-paper/85 backdrop-blur-md"
            : ""
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
          {/* Left — Home (flex-1) */}
          <div className="flex flex-1 justify-start">
            <Link
              href={base}
              aria-label={nav.home}
              onClick={() => {
                setCareerOpen(false);
                closeDrawer();
              }}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-muted transition-all hover:bg-violet-soft hover:text-violet-deep"
            >
              <Home className="h-[17px] w-[17px]" strokeWidth={2.2} />
            </Link>
          </div>

          {/* Desktop nav (hidden on mobile) */}
          <nav
            aria-label="Main"
            className="hidden shrink-0 items-center justify-center gap-1 sm:flex"
          >
            <a
              href={`${base}/#about`}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-muted transition-all hover:bg-violet-soft hover:text-violet-deep"
            >
              {nav.about}
            </a>

            {/* Career dropdown */}
            <div ref={careerRef} className="relative">
              <button
                type="button"
                aria-expanded={careerOpen}
                aria-haspopup="menu"
                onClick={() => setCareerOpen((v) => !v)}
                className="inline-flex cursor-pointer items-center gap-0.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-muted transition-all hover:bg-violet-soft hover:text-violet-deep"
              >
                {nav.experience}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    careerOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={2.2}
                />
              </button>
              <div
                role="menu"
                className={`absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 origin-top rounded-xl border border-line/70 bg-paper/95 p-1.5 shadow-[0_18px_45px_-18px_rgba(76,29,149,0.25)] backdrop-blur-md transition-all duration-200 ${
                  careerOpen
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }`}
              >
                {careerSub.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setCareerOpen(false)}
                    className="flex h-10 items-center rounded-lg px-3 text-[13px] font-medium text-ink-muted transition-colors hover:bg-violet-soft hover:text-violet-deep"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={`${base}/#work-projects`}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-muted transition-all hover:bg-violet-soft hover:text-violet-deep"
            >
              {nav.projects}
            </a>
            <a
              href={`${base}/#contact`}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-muted transition-all hover:bg-violet-soft hover:text-violet-deep"
            >
              {nav.contact}
            </a>
          </nav>

          {/* Right cluster */}
          <div className="flex flex-1 items-center justify-end gap-0.5 sm:gap-1">
            {/* Socials — visible on all sizes */}
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-all hover:bg-violet-soft hover:text-violet-deep"
            >
              <SiGithub className="h-[15px] w-[15px]" />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-all hover:bg-violet-soft hover:text-violet-deep"
            >
              <LinkedinMark className="h-[15px] w-[15px]" />
            </a>

            <span
              aria-hidden
              className="mx-1 h-4 w-px bg-line-strong/60"
            />

            {/* Lang switcher — always visible */}
            <LangSwitcher currentLocale={locale} size="sm" />

            {/* Mobile only: hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-violet-soft hover:text-violet-deep sm:hidden"
            >
              <Menu className="h-[19px] w-[19px]" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer + backdrop */}
      <div
        className={`fixed inset-0 z-50 sm:hidden ${
          drawerOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!drawerOpen}
      >
        {/* Backdrop */}
        <div
          onClick={closeDrawer}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-[80%] max-w-sm flex-col bg-paper shadow-[-12px_0_40px_-12px_rgba(76,29,149,0.25)] transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-line/70 px-5 py-4">
            <span className="font-display text-base font-bold tracking-tight text-ink">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeDrawer}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-violet-soft hover:text-violet-deep"
            >
              <X className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>

          {/* Drawer body */}
          <nav
            aria-label="Mobile main"
            className="flex flex-1 flex-col overflow-y-auto px-3 py-4"
          >
            <a
              href={`${base}/#about`}
              onClick={closeDrawer}
              className="flex h-12 items-center rounded-xl px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-violet-soft hover:text-violet-deep"
            >
              {nav.about}
            </a>

            {/* Career — collapsible */}
            <button
              type="button"
              onClick={() => setCareerMobileOpen((v) => !v)}
              aria-expanded={careerMobileOpen}
              className="flex h-12 cursor-pointer items-center justify-between rounded-xl px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-violet-soft hover:text-violet-deep"
            >
              <span>{nav.experience}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  careerMobileOpen ? "rotate-180" : ""
                }`}
                strokeWidth={2.2}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                careerMobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-3 mt-1 flex flex-col border-l border-line pl-3">
                {careerSub.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeDrawer}
                    className="flex h-10 items-center rounded-lg px-3 text-[13px] font-medium text-ink-muted transition-colors hover:bg-violet-soft hover:text-violet-deep"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={`${base}/#work-projects`}
              onClick={closeDrawer}
              className="flex h-12 items-center rounded-xl px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-violet-soft hover:text-violet-deep"
            >
              {nav.projects}
            </a>
            <a
              href={`${base}/#contact`}
              onClick={closeDrawer}
              className="flex h-12 items-center rounded-xl px-4 text-[15px] font-semibold text-ink transition-colors hover:bg-violet-soft hover:text-violet-deep"
            >
              {nav.contact}
            </a>
          </nav>

        </aside>
      </div>
    </>
  );
}
