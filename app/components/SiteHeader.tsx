"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react";
import { localizedPath, navigationFor, type MegaMenuKey, type SiteLocale } from "./site-navigation";

export default function SiteHeader({ locale }: { locale: SiteLocale }) {
  const pathname = usePathname();
  // The shared layout persists between pages. Reset open menus on every route change.
  return <HeaderNavigation key={pathname} locale={locale} pathname={pathname} />;
}

function HeaderNavigation({ locale, pathname }: { locale: SiteLocale; pathname: string }) {
  const content = navigationFor(locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuKey | null>(null);
  const triggerRefs = useRef<Partial<Record<MegaMenuKey, HTMLButtonElement | null>>>({});
  const menuButton = useRef<HTMLButtonElement>(null);
  const megaLinks = useRef<HTMLDivElement>(null);
  const focusMenu = useRef(false);
  const menu = activeMega ? content.menus[activeMega] : null;
  const path = (value: string) => localizedPath(locale, value);
  const close = () => { setMenuOpen(false); setActiveMega(null); };

  useEffect(() => {
    if (activeMega && focusMenu.current) {
      megaLinks.current?.querySelector("a")?.focus();
      focusMenu.current = false;
    }
  }, [activeMega]);

  useEffect(() => {
    if (!activeMega && !menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (activeMega) { triggerRefs.current[activeMega]?.focus(); setActiveMega(null); }
      else { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [activeMega, menuOpen]);

  return (
    <header
      className="site-header"
      onMouseLeave={() => setActiveMega(null)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) close(); }}
    >
      <Link className="brand" href={content.home} aria-label={content.homeLabel} onClick={close}>
        <img src="/assets/brand/marrant-logo.png" alt="Marrant" />
      </Link>
      <nav id="site-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={content.navigationLabel}>
        {(["products", "services"] as const).map((key) => (
          <div className="nav-menu-item" key={key}>
            <button
              ref={(element) => { triggerRefs.current[key] = element; }}
              className="nav-trigger"
              type="button"
              onMouseEnter={(event) => { if (event.buttons === 0 && window.matchMedia("(hover: hover)").matches) setActiveMega(key); }}
              onClick={(event) => {
                focusMenu.current = event.detail === 0;
                setActiveMega((current) => event.detail > 0 && window.matchMedia("(hover: hover)").matches ? key : current === key ? null : key);
              }}
              onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); focusMenu.current = true; setActiveMega(key); } }}
              aria-expanded={activeMega === key}
              aria-controls={activeMega === key ? "site-mega-menu" : undefined}
            >
              {key === "products" ? content.products : "OEM/ODM"} <CaretDown size={14} weight="bold" />
            </button>
          </div>
        ))}
        {[
          { href: `${content.home}#factory`, label: content.factory },
          { href: path("/blog"), label: content.blog },
          { href: path("/about"), label: content.about },
          { href: path("/contact"), label: content.contact },
        ].map(({ href, label }) => (
          <Link key={href} href={href} onClick={close} onMouseEnter={() => setActiveMega(null)} onFocus={() => setActiveMega(null)} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
        ))}
        <Link className="mobile-quote" href={path("/contact#inquiry")} onClick={close}>{content.quote}</Link>
        {menu && (
          <>
            <button className="mega-page-dim" type="button" tabIndex={-1} aria-label={content.closeLabel} onClick={() => setActiveMega(null)} />
            <div className="mega-menu-wrap" id="site-mega-menu">
              <section className="mega-menu" aria-label={menu.eyebrow}>
                <div className="mega-overview">
                  <p>{menu.eyebrow}</p><h2>{menu.title}</h2><span className="mega-rule" /><small>{menu.copy}</small>
                </div>
                <div ref={megaLinks} className="mega-links">
                  {menu.links.map((item) => (
                    <Link href={item.href} key={item.label} onClick={close}>
                      <strong>{item.label}<ArrowRight size={15} /></strong><span>{item.description}</span>
                    </Link>
                  ))}
                </div>
                <Link className="mega-feature" href={menu.feature.href} onClick={close}>
                  <img src={menu.feature.image} alt="" /><span className="mega-feature-shade" />
                  <div><small>{menu.feature.label}</small><strong>{menu.feature.title}<ArrowRight size={17} /></strong></div>
                </Link>
              </section>
            </div>
          </>
        )}
      </nav>
      <Link className="header-cta" href={path("/contact#inquiry")} onClick={close}>{content.quote}</Link>
      <button ref={menuButton} className="menu-button" type="button" onClick={() => { setMenuOpen(!menuOpen); setActiveMega(null); }} aria-label={content.toggleLabel} aria-expanded={menuOpen} aria-controls="site-navigation">
        {menuOpen ? <X size={24} /> : <List size={26} />}
      </button>
    </header>
  );
}
