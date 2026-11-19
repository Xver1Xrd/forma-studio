export const propertyOptions = [
  { id: "apartment", label: "Квартира", factor: 1 },
  { id: "house", label: "Частный дом", factor: 1.15 },
  { id: "office", label: "Офис", factor: 0.9 },
  { id: "commercial", label: "Коммерческое помещение", factor: 1.2 },
] as const;
export const styleOptions = [
  {
    id: "minimalism",
    label: "Минимализм",
    factor: 1,
    image: "/images/epure.webp",
  },
  {
    id: "contemporary",
    label: "Современный",
    factor: 1,
    image: "/images/hero.webp",
  },
  {
    id: "scandinavian",
    label: "Скандинавский",
    factor: 1,
    image: "/images/nord.webp",
  },
  {
    id: "neoclassic",
    label: "Неоклассика",
    factor: 1.2,
    image: "/images/terra.webp",
  },
  {
    id: "japandi",
    label: "Japandi",
    factor: 1.1,
    image: "/images/silence.webp",
  },
  {
    id: "bespoke",
    label: "Индивидуальный",
    factor: 1.25,
    image: "/images/linea.webp",
  },
] as const;
export const serviceOptions = [
  { id: "design", label: "Дизайн-проект", rate: 1600 },
  { id: "visualization", label: "3D-визуализация", rate: 800 },
  { id: "documentation", label: "Рабочая документация", rate: 600 },
  { id: "supervision", label: "Авторский надзор", rate: 500 },
  { id: "procurement", label: "Комплектация", rate: 400 },
] as const;
export type CalculatorConfig = {
  property: string;
  area: number;
  style: string;
  services: string[];
};
export const defaultConfig: CalculatorConfig = {
  property: "apartment",
  area: 140,
  style: "minimalism",
  services: ["design", "visualization", "documentation"],
};
export function estimate(config: CalculatorConfig) {
  const property = propertyOptions.find((o) => o.id === config.property),
    style = styleOptions.find((o) => o.id === config.style);
  if (
    !property ||
    !style ||
    !Number.isFinite(config.area) ||
    config.area < 30 ||
    config.area > 500 ||
    !config.services.length ||
    config.services.some((id) => !serviceOptions.some((o) => o.id === id)) ||
    new Set(config.services).size !== config.services.length
  )
    throw new RangeError("Некорректная конфигурация проекта");
  const rate = serviceOptions
    .filter((s) => config.services.includes(s.id))
    .reduce((sum, s) => sum + s.rate, 0);
  return {
    total:
      Math.round((config.area * rate * property.factor * style.factor) / 1000) *
      1000,
    rate,
    propertyFactor: property.factor,
    styleFactor: style.factor,
  };
}
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
