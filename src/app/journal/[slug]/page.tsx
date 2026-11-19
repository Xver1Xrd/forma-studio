import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/content";
import { PageIntro, Picture, TextLink } from "@/components/ui";
import { JournalSection } from "@/components/sections";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a
    ? {
        title: a.title,
        description: a.intro,
        alternates: { canonical: `/journal/${a.slug}` },
        openGraph: {
          type: "article",
          publishedTime: a.date,
          images: [{ url: a.image, alt: a.title }],
        },
      }
    : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageIntro
        label={`Журнал / ${a.category} · ${a.dateLabel} · ${a.minutes} минут`}
        title={a.title}
        description={a.intro}
      />
      <Picture
        src={a.image}
        alt={a.title}
        className="page-banner"
        sizes="100vw"
        priority
      />
      <article className="section article-reading">
        <header className="sr-only">
          <h2>{a.title}</h2>
        </header>
        {a.sections.map((s, i) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            {i === 1 && (
              <>
                <blockquote>«{a.quote}»</blockquote>
                <Picture
                  src="/images/hero.webp"
                  alt="Натуральные фактуры и свет в интерьере FORMA"
                  className="article-inline-photo"
                  sizes="(max-width: 767px) calc(100vw - 48px), 800px"
                />
              </>
            )}
          </section>
        ))}
        <h2>Три ориентира</h2>
        <ol>
          {a.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
        <p className="article-conclusion">{a.conclusion}</p>
        <div className="article-end">
          <p className="caption">Редакция FORMA · Концептуальный материал</p>
          <TextLink href="/journal">Вернуться в журнал</TextLink>
        </div>
      </article>
      <JournalSection exclude={a.slug} />
    </>
  );
}
