import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { PageIntro, Picture, SectionHeading, TextLink } from "@/components/ui";
import {
  WorkflowSection,
  CalculatorTeaser,
  ContactSection,
} from "@/components/sections";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s
    ? {
        title: s.title,
        description: s.description,
        alternates: { canonical: `/services/${s.slug}` },
      }
    : {};
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageIntro
        label={`Услуги / ${s.title}`}
        title={s.headline}
        description={s.description}
      />
      <Picture
        src={s.image}
        alt={s.title}
        className="page-banner"
        sizes="100vw"
        priority
      />
      <section className="section shell">
        <SectionHeading label="Что входит">
          От первого эскиза
          <br />
          до последнего штриха.
        </SectionHeading>
        <ol className="service-scope-list">
          {s.scope.map((v, i) => (
            <li key={v}>
              <span className="caption">0{i + 1}</span>
              <span>{v}</span>
            </li>
          ))}
        </ol>
      </section>
      <WorkflowSection />
      <section className="section shell">
        <SectionHeading label="Важные детали">Ответы до старта.</SectionHeading>
        <div className="faq">
          <details open>
            <summary>С чего начать работу?</summary>
            <p>{s.faq}</p>
          </details>
          <details>
            <summary>Можно заказать отдельный этап?</summary>
            <p>
              Да. Обсудим вашу задачу и выберем подходящий состав работ. Важно,
              чтобы у команды была достаточная информация для точного
              результата.
            </p>
          </details>
          <details>
            <summary>Как формируется стоимость?</summary>
            <p>
              Стоимость зависит от площади, сложности и состава работ. В
              калькуляторе можно получить иллюстративный ориентир, а
              индивидуальные условия обсуждаются после брифа.
            </p>
            <TextLink href="/calculator">Перейти к калькулятору</TextLink>
          </details>
        </div>
      </section>
      <CalculatorTeaser />
      <ContactSection />
    </>
  );
}
