import { z } from "zod";
export const inquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Укажите имя, минимум 2 символа")
      .max(80, "Имя не должно быть длиннее 80 символов"),
    phone: z
      .string()
      .trim()
      .max(30)
      .refine(
        (v) =>
          !v ||
          (/^\+?[\d\s()-]{10,30}$/.test(v) &&
            v.replace(/\D/g, "").length >= 10 &&
            v.replace(/\D/g, "").length <= 15),
        "Проверьте номер телефона",
      ),
    email: z.union([z.email("Проверьте электронную почту"), z.literal("")]),
    project: z.enum([
      "Квартира",
      "Частный дом",
      "Офис",
      "Коммерческое помещение",
      "Другое",
    ]),
    message: z
      .string()
      .trim()
      .max(2000, "Сообщение не должно превышать 2000 символов"),
    consent: z.literal(true, { error: "Нужно согласие на обработку данных" }),
    company: z.string().max(0),
  })
  .refine((v) => Boolean(v.phone || v.email), {
    path: ["phone"],
    message: "Укажите телефон или электронную почту",
  });
export type Inquiry = z.infer<typeof inquirySchema>;
