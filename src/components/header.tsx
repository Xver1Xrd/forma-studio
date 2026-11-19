"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { Arrow } from "./ui";
export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };
  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };
  const transparent = path === "/" && !scrolled;
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <header
        className={`site-header ${transparent ? "header-transparent" : ""}`}
      >
        <div className="header-inner shell">
          <Link href="/" className="wordmark" aria-label="FORMA — на главную">
            FORMA
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            {navLinks.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={path === n.href ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/contacts" className="header-cta">
              Обсудить проект
              <Arrow />
            </Link>
            <span className="language" aria-label="Язык сайта: русский">
              RU
            </span>
            <button
              className="menu-toggle"
              onClick={show}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              Меню <span aria-hidden="true">+</span>
            </button>
          </div>
        </div>
      </header>
      <dialog
        className="menu-dialog"
        id="mobile-menu"
        ref={dialog}
        onClose={() => setOpen(false)}
        aria-labelledby="menu-title"
      >
        <div className="mobile-menu-shell">
          <div className="menu-top">
            <Link href="/" onClick={close} className="wordmark" id="menu-title">
              FORMA
            </Link>
            <button onClick={close} className="plain-button">
              Закрыть <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav aria-label="Мобильная навигация">
            {[
              ...navLinks.filter((n) => n.href !== "/#process"),
              { href: "/journal", label: "Журнал" },
            ].map((n, i) => (
              <Link onClick={close} key={n.href} href={n.href}>
                <span className="menu-index">0{i + 1}</span>
                {n.label}
                <Arrow />
              </Link>
            ))}
          </nav>
          <Link className="button" href="/contacts" onClick={close}>
            Обсудить проект
            <Arrow />
          </Link>
          <div className="menu-foot">
            <span>{site.tagline}</span>
            <span className="caption">Концепция архитектурной студии · RU</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
