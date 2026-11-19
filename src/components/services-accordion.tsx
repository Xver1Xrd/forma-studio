"use client";
import { useState } from "react";
import { services } from "@/lib/content";
import { Picture, TextLink } from "./ui";
export function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="services-accordion">
      {services.map((s, i) => (
        <article
          key={s.slug}
          className={`service-row ${open === i ? "service-open" : ""}`}
        >
          <h3>
            <button
              className="accordion-trigger"
              aria-expanded={open === i}
              aria-controls={`service-panel-${s.slug}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="caption service-number">0{i + 1}</span>
              <span>{s.title}</span>
              <span className="accordion-plus" aria-hidden="true">
                {open === i ? "−" : "+"}
              </span>
            </button>
          </h3>
          <div
            className="accordion-panel"
            id={`service-panel-${s.slug}`}
            inert={open !== i}
            aria-hidden={open !== i}
          >
            <div className="accordion-content">
              <div className="service-description">
                <p>{s.description}</p>
                <TextLink href={`/services/${s.slug}`}>
                  Подробнее об услуге
                </TextLink>
              </div>
              <Picture
                src={s.image}
                alt={s.title}
                className="service-photo"
                sizes="(max-width: 767px) 100vw, 85vw"
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
