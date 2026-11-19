import { Hero } from "@/components/hero";
import {
  AboutSection,
  ProjectsSection,
  ServicesSection,
  ComparisonSection,
  WorkflowSection,
  CalculatorTeaser,
  TeamSection,
  JournalSection,
  ContactSection,
} from "@/components/sections";
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ComparisonSection />
      <WorkflowSection />
      <CalculatorTeaser />
      <TeamSection />
      <JournalSection />
      <ContactSection />
    </>
  );
}
