import type { Metadata } from "next";
import { PageIntro, Picture } from "@/components/ui";
import {
  AboutSection,
  TeamSection,
  WorkflowSection,
  ContactSection,
} from "@/components/sections";
export const metadata: Metadata = {
  title: "О студии",
  description:
    "Философия FORMA, команда и принципы работы над архитектурой и интерьерами.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <PageIntro
        label="О студии FORMA"
        title={
          <>
            Пространство
            <br />
            как форма искусства.
          </>
        }
        description="Мы ищем баланс между выразительной идеей и повседневным комфортом."
      />
      <Picture
        src="/images/linea.webp"
        alt="Светлое пространство архитектурной студии с натуральными материалами"
        className="page-banner"
        sizes="100vw"
        priority
      />
      <AboutSection />
      <TeamSection />
      <WorkflowSection />
      <ContactSection />
    </>
  );
}
