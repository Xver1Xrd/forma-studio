import type { Metadata } from "next";
import { PageIntro, Picture } from "@/components/ui";
import {
  ServicesSection,
  WorkflowSection,
  FeaturedPair,
  CalculatorTeaser,
  ContactSection,
} from "@/components/sections";
export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Архитектура, дизайн интерьеров, 3D-визуализация, авторский надзор и комплектация от FORMA.",
  alternates: { canonical: "/services" },
};
export default function Services() {
  return (
    <>
      <PageIntro
        label="Услуги FORMA"
        title={
          <>
            Целостный подход.
            <br />
            От замысла до деталей.
          </>
        }
        description="Соединяем архитектуру, дизайн и инженерную точность в едином процессе."
      />
      <Picture
        src="/images/hero.webp"
        alt="Интерьер с панорамными окнами, тёплым деревом и натуральным камнем"
        className="page-banner"
        sizes="100vw"
        priority
      />
      <ServicesSection />
      <WorkflowSection />
      <FeaturedPair />
      <CalculatorTeaser />
      <ContactSection />
    </>
  );
}
