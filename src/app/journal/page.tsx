import type { Metadata } from "next";
import { PageIntro, Picture } from "@/components/ui";
import { JournalSection, CalculatorTeaser } from "@/components/sections";
export const metadata: Metadata = {
  title: "Журнал",
  description:
    "Наблюдения FORMA об архитектуре, свете, натуральных материалах и повседневной жизни.",
  alternates: { canonical: "/journal" },
};
export default function Journal() {
  return (
    <>
      <PageIntro
        label="Журнал FORMA"
        title={
          <>
            Мысли
            <br />о пространстве.
          </>
        }
        description="Архитектура, материалы и наблюдения за тем, как мы живём."
      />
      <JournalSection />
      <Picture
        src="/images/hero.webp"
        alt="Игра естественного света в современном интерьере"
        className="page-banner"
        sizes="100vw"
      />
      <CalculatorTeaser />
    </>
  );
}
