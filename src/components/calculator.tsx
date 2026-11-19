"use client";
import { useEffect, useId, useState } from "react";
import {
  defaultConfig,
  estimate,
  formatPrice,
  propertyOptions,
  serviceOptions,
  styleOptions,
  type CalculatorConfig,
} from "@/lib/calculator";
import { Arrow, Button, Picture } from "./ui";
const stepNames = ["Тип объекта", "Площадь", "Стиль", "Услуги", "Результат"];
export function Calculator() {
  const [config, setConfig] = useState<CalculatorConfig>(defaultConfig),
    [areaDraft, setAreaDraft] = useState("140"),
    [step, setStep] = useState(1),
    [error, setError] = useState(""),
    [loaded, setLoaded] = useState(false);
  const id = useId();
  useEffect(() => {
    try {
      const saved = localStorage.getItem("forma-calculator-v1");
      if (saved) {
        const c = JSON.parse(saved);
        estimate(c);
        setConfig(c);
        setAreaDraft(String(c.area));
      }
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded)
      try {
        localStorage.setItem("forma-calculator-v1", JSON.stringify(config));
      } catch {}
  }, [config, loaded]);
  const update = (patch: Partial<CalculatorConfig>) => {
    setConfig((v) => ({ ...v, ...patch }));
    setError("");
  };
  const next = () => {
    if (step === 2) {
      const n = Number(areaDraft);
      if (!Number.isFinite(n) || n < 30 || n > 500) {
        setError("Укажите площадь от 30 до 500 м².");
        document.getElementById(id + "-area")?.focus();
        return;
      }
      update({ area: Math.round(n * 10) / 10 });
    }
    if (step === 4 && !config.services.length) {
      setError("Выберите хотя бы одну услугу.");
      return;
    }
    setError("");
    setStep((s) => Math.min(5, s + 1));
    document.getElementById("calculator-heading")?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  let result;
  try {
    result = estimate(config);
  } catch {
    result = null;
  }
  const property = propertyOptions.find((o) => o.id === config.property)!;
  const style = styleOptions.find((o) => o.id === config.style)!;
  const contactQuery = new URLSearchParams({
    project: property.label,
    message: `Интересует проект: ${property.label.toLowerCase()}, ${config.area} м², стиль — ${style.label}. Услуги: ${serviceOptions
      .filter((s) => config.services.includes(s.id))
      .map((s) => s.label)
      .join(
        ", ",
      )}. Иллюстративный ориентир: ${result ? formatPrice(result.total) : "не рассчитан"}.`,
  });
  return (
    <section
      className="calculator-section section shell"
      aria-labelledby="calculator-heading"
    >
      <ol className="calc-progress" aria-label="Этапы расчёта">
        {stepNames.map((label, i) => (
          <li
            key={label}
            className={i + 1 <= step ? "reached" : ""}
            aria-current={step === i + 1 ? "step" : undefined}
          >
            <span>0{i + 1}</span>
            <span className="progress-label">{label}</span>
          </li>
        ))}
      </ol>
      <div className="calc-step" key={step}>
        <p className="eyebrow">
          Шаг {step} из 5 / {stepNames[step - 1]}
        </p>
        <h2 id="calculator-heading" className="calc-heading">
          {
            [
              "Что будем проектировать?",
              "Какая площадь пространства?",
              "Какой стиль вам близок?",
              "Что включить в проект?",
              "Ваш предварительный ориентир",
            ][step - 1]
          }
        </h2>
        {step === 1 && (
          <fieldset className="choice-grid">
            <legend className="sr-only">Тип объекта</legend>
            {propertyOptions.map((o) => (
              <label
                key={o.id}
                className={`choice ${config.property === o.id ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="property"
                  value={o.id}
                  checked={config.property === o.id}
                  onChange={() => update({ property: o.id })}
                />
                <span className="radio-mark" />
                <span>{o.label}</span>
              </label>
            ))}
          </fieldset>
        )}
        {step === 2 && (
          <div className="area-control">
            <div className="area-display" aria-live="polite">
              {config.area}
              <span>м²</span>
            </div>
            <label className="sr-only" htmlFor={id + "-slider"}>
              Площадь, ползунок
            </label>
            <input
              id={id + "-slider"}
              aria-label="Площадь, ползунок"
              type="range"
              min="30"
              max="500"
              step="1"
              value={config.area}
              onChange={(e) => {
                update({ area: Number(e.target.value) });
                setAreaDraft(e.target.value);
              }}
              style={
                {
                  "--range-progress": `${((config.area - 30) / 470) * 100}%`,
                } as React.CSSProperties
              }
            />
            <div className="range-labels">
              <span>30 м²</span>
              <span>500 м²</span>
            </div>
            <div className="manual-area">
              <label htmlFor={id + "-area"}>Или укажите точную площадь</label>
              <div>
                <input
                  id={id + "-area"}
                  aria-label="Точная площадь"
                  type="number"
                  inputMode="decimal"
                  min="30"
                  max="500"
                  step=".1"
                  value={areaDraft}
                  onChange={(e) => {
                    setAreaDraft(e.target.value);
                    setError("");
                    const n = Number(e.target.value);
                    if (n >= 30 && n <= 500) update({ area: n });
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? id + "-error" : undefined}
                />
                <span>м²</span>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <fieldset className="style-grid">
            <legend className="sr-only">Стиль интерьера</legend>
            {styleOptions.map((o) => (
              <label
                key={o.id}
                className={`style-option ${config.style === o.id ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  aria-label={o.label}
                  name="style"
                  value={o.id}
                  checked={config.style === o.id}
                  onChange={() => update({ style: o.id })}
                />
                <Picture
                  src={o.image}
                  alt={o.label}
                  className="style-photo"
                  sizes="(max-width: 767px) 45vw, 28vw"
                />
                <span className="style-label">
                  <span className="radio-mark" />
                  {o.label}
                </span>
              </label>
            ))}
          </fieldset>
        )}
        {step === 4 && (
          <fieldset className="calc-services">
            <legend className="sr-only">Необходимые услуги</legend>
            {serviceOptions.map((o) => (
              <label key={o.id} className="calc-service-option">
                <input
                  type="checkbox"
                  checked={config.services.includes(o.id)}
                  onChange={() =>
                    update({
                      services: config.services.includes(o.id)
                        ? config.services.filter((s) => s !== o.id)
                        : [...config.services, o.id],
                    })
                  }
                />
                <span>{o.label}</span>
                <span className="caption">от {formatPrice(o.rate)} / м²*</span>
              </label>
            ))}
            <p className="caption muted">
              * Демонстрационные ставки для примера расчёта. Официальные цены
              определяются индивидуально.
            </p>
          </fieldset>
        )}
        {step === 5 && result && (
          <div className="calc-result">
            <p className="result-price">от {formatPrice(result.total)}</p>
            <p className="estimate-disclaimer">
              Иллюстративная оценка. Не является официальным тарифом или
              коммерческим предложением.
            </p>
            <dl className="result-config">
              <div>
                <dt>Объект</dt>
                <dd>{property.label}</dd>
              </div>
              <div>
                <dt>Площадь</dt>
                <dd>{config.area} м²</dd>
              </div>
              <div>
                <dt>Стиль</dt>
                <dd>{style.label}</dd>
              </div>
              <div>
                <dt>Услуги</dt>
                <dd>
                  {serviceOptions
                    .filter((s) => config.services.includes(s.id))
                    .map((s) => s.label)
                    .join(", ")}
                </dd>
              </div>
            </dl>
            <p className="caption muted">
              Пример: {config.area} м² × {formatPrice(result.rate)}/м²
              {result.propertyFactor !== 1 ? ` × ${result.propertyFactor}` : ""}
              {result.styleFactor !== 1
                ? ` × ${result.styleFactor}`
                : ""} = {formatPrice(result.total)}. Результат округлён до 1 000
              ₽.
            </p>
            <Button href={`/contacts?${contactQuery}`}>
              Обсудить результат
            </Button>
          </div>
        )}
        {error && (
          <p className="calc-error" id={id + "-error"} role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="calc-navigation">
        <button
          className="text-link plain-button"
          type="button"
          disabled={step === 1}
          onClick={() => {
            setError("");
            setStep((v) => v - 1);
          }}
        >
          ← Назад
        </button>
        {step < 5 ? (
          <button className="button" onClick={next} type="button">
            Далее
            <Arrow />
          </button>
        ) : (
          <button
            className="text-link plain-button"
            type="button"
            onClick={() => {
              setConfig(defaultConfig);
              setAreaDraft("140");
              setStep(1);
              setError("");
            }}
          >
            Начать заново
            <Arrow />
          </button>
        )}
      </div>
    </section>
  );
}
