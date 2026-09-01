import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackgroundDecor } from "@/components/background-decor";
import { BottomActionBar } from "@/components/bottom-action-bar";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <div className="relative">
      <BackgroundDecor />
      <Header locale={locale} dict={dict} />
      <main className="relative z-10 flex-1 pt-0">{children}</main>
      <Footer locale={locale} dict={dict.footer} />
      <BottomActionBar
        locale={locale}
        dict={dict.nav}
        email={dict.contact.methods[0]?.value ?? "jinmo@wigtn.com"}
      />
    </div>
  );
}
