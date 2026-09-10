"use client";

import { usePathname } from "next/navigation";
import styles from "./LanguageSwitcher.module.css";

const translatedRoutes = new Set([
  "/", "/about", "/products", "/blog", "/contact",
  "/products/crazy-horse-leather-travel-tote-bag",
  "/blog/how-to-source-crazy-horse-leather-travel-tote-bag",
]);

export default function LanguageSwitcher({ pathname }: { pathname: string }) {
  const currentPathname = usePathname();
  const normalized = (currentPathname ?? pathname).replace(/\/$/, "") || "/";
  const chinese = normalized === "/zh" || normalized.startsWith("/zh/");
  const englishPath = chinese ? normalized.slice(3) || "/" : normalized;
  const counterpart = translatedRoutes.has(englishPath) ? englishPath : "/";
  const chinesePath = counterpart === "/" ? "/zh" : `/zh${counterpart}`;

  return (
    <nav className={styles.switcher} aria-label={chinese ? "网站语言" : "Website language"}>
      {/* Full document navigation ensures that the server-rendered root lang changes too. */}
      <a href={counterpart} lang="en" hrefLang="en" aria-current={!chinese ? "page" : undefined}>English</a>
      <span aria-hidden="true">|</span>
      <a href={chinesePath} lang="zh-CN" hrefLang="zh-CN" aria-current={chinese ? "page" : undefined}>中文</a>
    </nav>
  );
}
