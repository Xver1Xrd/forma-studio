import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { PageIntro, Picture, SectionHeading } from "@/components/ui";
import { Gallery } from "@/components/gallery";
import { FloorPlan } from "@/components/floor-plan";
import { ContactSection, NextProject } from "@/components/sections";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: `${p.name} — ${p.type}`,
        description: p.intro,
        alternates: { canonical: `/projects/${slug}` },
        openGraph: { images: [{ url: p.image, alt: p.name }] },
      }
    : {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const gallery = [
    {
      src: p.slug === "monolith" ? "/images/hero.webp" : p.image,
      alt: `${p.name} — главное пространство`,
    },
    {
      src:
        p.category === "architecture"
          ? "/images/silence.webp"
          : "/images/hero.webp",
      alt: "Свет, материалы и детали интерьера",
    },
    {
      src: p.slug === "epure" ? "/images/silence.webp" : "/images/epure.webp",
      alt: "Чистая геометрия и тактильные поверхности",
    },
  ];
  return (
    <>
      <div className="project-intro">
        <PageIntro
          label={`Проект / ${String(projects.indexOf(p) + 1).padStart(2, "0")}`}
          title={p.name}
          description={p.intro}
        />
      </div>
      <Picture
        src={p.image}
        alt={`${p.name} — ${p.type}`}
        className="page-banner"
        sizes="100vw"
        priority
      />
      <section className="section shell project-concept">
        <aside className="project-specs">
          <p className="eyebrow">
            {p.name} / {p.year}
          </p>
          <h2>{p.type}</h2>
          <dl>
            <div>
              <dt>Локация</dt>
              <dd>{p.location}</dd>
            </div>
            <div>
              <dt>Площадь</dt>
              <dd>{p.area.toLocaleString("ru-RU")} м²</dd>
            </div>
            <div>
              <dt>Год</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt>Статус</dt>
              <dd>Концепция</dd>
            </div>
          </dl>
        </aside>
        <div className="project-concept-copy">
          <p className="eyebrow">Концепция</p>
          <h2>{p.headline}</h2>
          <p>{p.concept}</p>
          <p>{p.detail}</p>
        </div>
      </section>
      <section className="shell" aria-label="Фотографии проекта">
        <Gallery images={gallery} title={p.name} />
      </section>
      <section className="section shell">
        <SectionHeading label="Пространственная логика">
          Каждому сценарию —<br />
          своё место.
        </SectionHeading>
        <FloorPlan name={p.name} area={p.area} />
        <p className="caption plan-note">
          Схематичная концептуальная планировка. Не является рабочей
          документацией.
        </p>
      </section>
      <section className="section shell">
        <SectionHeading label="Палитра проекта">
          Естественно.
          <br />
          Тактильно. Надолго.
        </SectionHeading>
        <div className="materials">
          {p.materials.map((m) => (
            <article className="material" key={m}>
              <div className="material-photo" aria-hidden="true" />
              <h3>{m}</h3>
            </article>
          ))}
        </div>
      </section>
      <NextProject slug={p.slug} />
      <ContactSection />
    </>
  );
}
