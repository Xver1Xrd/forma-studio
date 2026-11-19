import Link from "next/link";
import { site } from "@/lib/content";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <Link className="footer-wordmark" href="/" aria-label="FORMA — главная">
          FORMA
        </Link>
        <p className="footer-tagline">{site.tagline}</p>
        <div className="footer-bottom">
          <nav aria-label="Навигация в подвале">
            <Link href="/about">О студии</Link>
            <Link href="/projects">Проекты</Link>
            <Link href="/services">Услуги</Link>
            <Link href="/journal">Журнал</Link>
            <Link href="/contacts">Контакты</Link>
            <a href="#top">Наверх ↑</a>
          </nav>
          <div className="footer-legal">
            <span>© FORMA, {new Date().getFullYear()}</span>
            <Link href="/privacy">Конфиденциальность</Link>
            <span>
              Концептуальная студия. Проекты, команда и контакты вымышлены.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
