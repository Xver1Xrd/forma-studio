import Link from "next/link";
import { articles, projects, site, team, workflow } from "@/lib/content";
import { Button, Picture, SectionHeading, TextLink, Arrow } from "./ui";
import { ProjectGrid, ProjectCard } from "./project-grid";
import { ServicesAccordion } from "./services-accordion";
import { Comparison } from "./comparison";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";
export function AboutSection() {
  return (
    <section className="section shell" id="studio">
      <Reveal>
        <SectionHeading label="01 / Философия">
          Больше, чем
          <br />
          архитектура.
        </SectionHeading>
      </Reveal>
      <div className="about-grid">
        <div className="about-principles">
          <p className="editorial">
            Пространство как
            <br />
            форма искусства.
          </p>
          <ol className="principles">
            <li>01 — Индивидуальность</li>
            <li>02 — Функциональность</li>
            <li>03 — Вневременная эстетика</li>
          </ol>
        </div>
        <Picture
          src="/images/team-1.webp"
          alt="Архитектор за работой с эскизами и материалами"
          className="studio-portrait"
          sizes="(max-width: 767px) calc(100vw - 48px), 30vw"
        />
        <div className="about-story">
          <p className="lead">
            FORMA — архитектурная студия, объединяющая дизайн, искусство и
            инженерную точность.
          </p>
          <p>
            Мы создаём пространства, которые отражают характер человека и меняют
            его повседневный опыт.
          </p>
          <TextLink href="/about">Познакомиться со студией</TextLink>
        </div>
      </div>
    </section>
  );
}
export function ProjectsSection() {
  return (
    <section className="section shell">
      <Reveal>
        <SectionHeading label="02 / Портфолио">
          Избранные
          <br />
          проекты
        </SectionHeading>
      </Reveal>
      <ProjectGrid />
      <div className="section-end">
        <Button href="/projects">Все проекты</Button>
      </div>
    </section>
  );
}
export function ServicesSection() {
  return (
    <section className="section dark-section">
      <div className="shell">
        <Reveal>
          <SectionHeading label="03 / Экспертиза">
            От идеи
            <br />
            до реализации.
          </SectionHeading>
        </Reveal>
        <ServicesAccordion />
        <div className="section-end">
          <Button href="/services" light>
            Услуги студии
          </Button>
        </div>
      </div>
    </section>
  );
}
export function ComparisonSection() {
  return (
    <section className="section shell">
      <Reveal>
        <SectionHeading label="04 / Трансформация">
          Один объём.
          <br />
          Другой опыт.
        </SectionHeading>
      </Reveal>
      <Comparison />
      <p className="section-copy">
        Тот же ракурс — новая жизнь пространства. Убираем лишнее, раскрываем
        свет и соединяем природные материалы с точной геометрией.
      </p>
    </section>
  );
}
export function WorkflowSection() {
  return (
    <section className="section shell" id="process">
      <Reveal>
        <SectionHeading label="05 / Процесс">Как мы работаем</SectionHeading>
      </Reveal>
      <ol className="workflow">
        {workflow.map((s, i) => (
          <li key={s.title}>
            <span className="caption">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function CalculatorTeaser() {
  return (
    <section className="section calculator-teaser">
      <div className="shell">
        <Reveal>
          <SectionHeading label="06 / Первый шаг">
            Ваше пространство
            <br />
            начинается с идеи.
          </SectionHeading>
          <p className="body-copy">
            Пять простых шагов, чтобы определить состав проекта и получить
            предварительный ориентир по бюджету.
          </p>
          <Button href="/calculator">Рассчитать проект</Button>
          <p className="caption">
            Демонстрационный расчёт. Не является коммерческим предложением.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
export function TeamSection() {
  return (
    <section className="section shell">
      <Reveal>
        <SectionHeading label="07 / Люди">
          Разные взгляды.
          <br />
          Общий замысел.
        </SectionHeading>
      </Reveal>
      <div className="team-grid">
        {team.map((p) => (
          <article className="team-card" key={p.name}>
            <Picture
              src={p.image}
              alt={p.name}
              className="team-photo"
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 45vw, 23vw"
            />
            <h3>{p.name}</h3>
            <p className="team-role">{p.role}</p>
            <p>{p.description}</p>
          </article>
        ))}
      </div>
      <p className="caption team-note">
        Команда представлена вымышленными персонажами для концепции сайта.
      </p>
    </section>
  );
}
export function JournalSection({ exclude }: { exclude?: string }) {
  const list = articles.filter((a) => a.slug !== exclude);
  return (
    <section className="section shell">
      <Reveal>
        <SectionHeading label="08 / Наблюдения">
          {exclude ? "Продолжить чтение" : "Журнал FORMA"}
        </SectionHeading>
      </Reveal>
      <div className="journal-grid">
        {list.map((a) => (
          <article className="article-card" key={a.slug}>
            <Link href={`/journal/${a.slug}`}>
              <Picture
                src={a.image}
                alt={a.title}
                className="article-photo"
                sizes="(max-width: 1023px) calc(100vw - 48px), 30vw"
              />
              <p className="caption">
                {a.category} · <time dateTime={a.date}>{a.dateLabel}</time>
              </p>
              <h3>{a.title}</h3>
            </Link>
            <TextLink href={`/journal/${a.slug}`}>
              Читать историю · {a.minutes} минут
            </TextLink>
          </article>
        ))}
      </div>
      {!exclude && (
        <div className="section-end">
          <TextLink href="/journal">Все истории</TextLink>
        </div>
      )}
    </section>
  );
}
export function ContactSection({
  initialProject,
  initialMessage,
  asPage = false,
}: {
  initialProject?: string;
  initialMessage?: string;
  asPage?: boolean;
}) {
  return (
    <section className="section dark-section" id="contact">
      <div className="shell">
        <Reveal>
          <SectionHeading label="09 / Начнём диалог" as={asPage ? "h1" : "h2"}>
            Давайте создадим
            <br />
            что-то особенное.
          </SectionHeading>
        </Reveal>
        <div className="contact-columns">
          <div className="contact-details">
            <p className="contact-lead">
              Расскажите о пространстве,
              <br />
              которое вы хотите создать.
            </p>
            <p className="contact-address">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              Telegram: @forma_demo
              <br />
              Санкт-Петербург · Демо-офис
              <br />
              ул. Архитектурная, 12
            </p>
            <p className="caption">Все контактные данные вымышлены.</p>
            <p className="social-labels">Telegram / Pinterest</p>
          </div>
          <ContactForm
            initialProject={initialProject}
            initialMessage={initialMessage}
          />
        </div>
      </div>
    </section>
  );
}
export function FeaturedPair() {
  return (
    <section className="section shell">
      <SectionHeading label="Проекты / В деталях">
        Архитектура
        <br />
        повседневной жизни.
      </SectionHeading>
      <div className="project-masonry">
        {projects.slice(0, 2).map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
export function NextProject({ slug }: { slug: string }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];
  return (
    <section className="section shell next-project">
      <p className="eyebrow">Следующий проект</p>
      <Link href={`/projects/${next.slug}`} className="next-project-heading">
        <h2>{next.name}</h2>
        <Arrow />
      </Link>
      <Link href={`/projects/${next.slug}`}>
        <Picture
          src={next.image}
          alt={next.type}
          className="next-project-photo"
          sizes="90vw"
        />
      </Link>
      <div className="section-end">
        <TextLink href="/projects">Все проекты</TextLink>
      </div>
    </section>
  );
}
