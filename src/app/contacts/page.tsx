import type { Metadata } from "next";
import { ContactSection } from "@/components/sections";
import { Picture, SectionHeading } from "@/components/ui";
export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Обсудите будущий проект с FORMA. Демонстрационная контактная форма архитектурной студии.",
  alternates: { canonical: "/contacts" },
};
export default async function Contacts({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const types = [
    "Квартира",
    "Частный дом",
    "Офис",
    "Коммерческое помещение",
    "Другое",
  ];
  const project =
    typeof query.project === "string" && types.includes(query.project)
      ? query.project
      : "Квартира";
  const message =
    typeof query.message === "string" ? query.message.slice(0, 2000) : "";
  return (
    <>
      <div className="contact-page-spacer" />
      <ContactSection
        initialProject={project}
        initialMessage={message}
        asPage
      />
      <section className="section shell">
        <SectionHeading label="Встреча в студии">
          Личный разговор.
          <br />
          Общий замысел.
        </SectionHeading>
        <Picture
          src="/images/linea.webp"
          alt="Светлое пространство для встреч в архитектурной студии"
          className="office-photo"
          sizes="90vw"
        />
        <p className="office-details">
          Демо-офис: Санкт-Петербург, ул. Архитектурная, 12
          <br />
          Встречи по предварительной договорённости.
          <br />
          <span className="caption">Адрес и контакты вымышлены.</span>
        </p>
      </section>
    </>
  );
}
