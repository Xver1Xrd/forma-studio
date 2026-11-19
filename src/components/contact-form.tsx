"use client";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { inquirySchema } from "@/lib/inquiry";
import { Arrow } from "./ui";
type Errors = Partial<Record<string, string>>;
export function ContactForm({
  initialProject = "Квартира",
  initialMessage = "",
}: {
  initialProject?: string;
  initialMessage?: string;
}) {
  const uid = useId(),
    formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({}),
    [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
      "idle",
    );
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || "").trim(),
      project: String(data.get("project") || ""),
      message: String(data.get("message") || ""),
      consent: data.get("consent") === "on",
      company: String(data.get("company") || ""),
    };
    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        next[key] ??= i.message;
      });
      setErrors(next);
      setStatus("idle");
      const first = formRef.current?.elements.namedItem(Object.keys(next)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok || result.mode !== "demo") throw new Error("request");
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }
  const field = (
    name: string,
    label: string,
    type: string,
    autoComplete: string,
  ) => (
    <div className={`form-field ${errors[name] ? "field-error" : ""}`}>
      <label htmlFor={`${uid}-${name}`}>{label}</label>
      <input
        id={`${uid}-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={
          name === "name"
            ? "Как к вам обращаться"
            : name === "phone"
              ? "+7 (___) ___-__-__"
              : "your@email.com"
        }
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${uid}-${name}-error` : undefined}
        maxLength={name === "name" ? 80 : name === "phone" ? 30 : 254}
      />
      {errors[name] && (
        <p id={`${uid}-${name}-error`} className="field-message">
          {errors[name]}
        </p>
      )}
    </div>
  );
  if (status === "success")
    return (
      <div className="form-success" role="status">
        <span className="success-symbol" aria-hidden="true">
          ✓
        </span>
        <h3>Спасибо за интерес к FORMA.</h3>
        <p>
          Это демонстрационная форма. Данные проверены, но заявка никуда не
          отправлена.
        </p>
        <button
          className="button button-light"
          onClick={() => setStatus("idle")}
        >
          Вернуться к форме
          <Arrow />
        </button>
      </div>
    );
  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="consultation-form"
      aria-label="Обсудить проект"
    >
      <p className="form-demo-note">
        Демонстрационная форма · заявки не отправляются
      </p>
      {field("name", "Ваше имя", "text", "name")}
      {field("phone", "Телефон", "tel", "tel")}
      {field("email", "Электронная почта", "email", "email")}
      <div className="form-field">
        <label htmlFor={`${uid}-project`}>Тип проекта</label>
        <div className="select-wrap">
          <select
            id={`${uid}-project`}
            name="project"
            defaultValue={initialProject}
          >
            {[
              "Квартира",
              "Частный дом",
              "Офис",
              "Коммерческое помещение",
              "Другое",
            ].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="m4 6 4 4 4-4" stroke="currentColor" />
          </svg>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor={`${uid}-message`}>Расскажите о вашем проекте</label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={3}
          maxLength={2000}
          placeholder="Площадь, место и то, о чём вы мечтаете"
          defaultValue={initialMessage}
        />
        {errors.message && <p className="field-message">{errors.message}</p>}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Компания</label>
        <input
          id={`${uid}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="consent-field">
        <label>
          <input
            type="checkbox"
            name="consent"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={
              errors.consent ? `${uid}-consent-error` : undefined
            }
          />
          <span>
            Согласен с <Link href="/privacy">политикой конфиденциальности</Link>{" "}
            и обработкой данных в рамках демонстрации
          </span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-error`} className="field-message">
            {errors.consent}
          </p>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="form-error-message">
          Не удалось проверить форму. Попробуйте ещё раз.
        </p>
      )}
      <button
        className="button button-light"
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        <span>
          {status === "loading" ? "Проверяем данные…" : "Обсудить проект"}
        </span>
        {status === "loading" ? (
          <span className="loading-spinner" aria-hidden="true" />
        ) : (
          <Arrow />
        )}
      </button>
    </form>
  );
}
