import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { ProjectGrid } from "@/components/project-grid";
import { CalculatorTeaser } from "@/components/sections";
export const metadata: Metadata = {
  title: "Проекты",
  description:
    "Шесть концептуальных проектов FORMA: резиденции, апартаменты, офисы и бутик-отели.",
  alternates: { canonical: "/projects" },
};
export default function Projects() {
  return (
    <>
      <PageIntro
        label="Портфолио / FORMA"
        title={
          <>
            Проекты, которые
            <br />
            говорят за нас.
          </>
        }
        description="Разные масштабы. Разные сценарии. Неизменное внимание к человеку и месту."
      />
      <section
        className="section shell portfolio-section"
        aria-label="Каталог проектов"
      >
        <ProjectGrid />
      </section>
      <CalculatorTeaser />
    </>
  );
}
