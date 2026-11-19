import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { Calculator } from "@/components/calculator";
export const metadata: Metadata = {
  title: "Калькулятор проекта",
  description:
    "Пять шагов для выбора состава проекта и иллюстративной предварительной оценки стоимости.",
  alternates: { canonical: "/calculator" },
};
export default function CalculatorPage() {
  return (
    <>
      <PageIntro
        label="Калькулятор проекта"
        title={
          <>
            Рассчитайте стоимость
            <br />
            вашего проекта
          </>
        }
        description="Пять шагов от идеи к предварительной оценке. Все ставки и суммы приведены исключительно для демонстрации."
      />
      <Calculator />
    </>
  );
}
