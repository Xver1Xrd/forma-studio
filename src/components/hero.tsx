"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui";
const slides = [
  {
    image: "/images/hero.webp",
    name: "MONOLITH",
    alt: "Гостиная с панорамными окнами, травертином и тёплым дубом",
  },
  {
    image: "/images/silence.webp",
    name: "SILENCE",
    alt: "Тёплый минималистичный интерьер апартаментов SILENCE",
  },
  {
    image: "/images/nord.webp",
    name: "NORD",
    alt: "Северный дом из тёмного дерева среди заснеженных сосен",
  },
];
export function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  return (
    <section
      className="hero"
      aria-label="Архитектура осмысленного пространства"
    >
      <div className="hero-image" key={slide.image}>
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority={active === 0 ? "high" : "auto"}
          className="photo"
        />
        <div className="hero-shade" />
      </div>
      <div className="shell hero-main">
        <p className="eyebrow hero-kicker">Независимая архитектурная студия</p>
        <h1>
          <span>Архитектура</span>
          <span>осмысленного</span>
          <span>пространства.</span>
        </h1>
        <div className="hero-detail">
          <p>
            Создаём архитектуру и интерьеры, в которых эстетика,
            функциональность и индивидуальность становятся единым целым.
          </p>
          <Button href="/projects" light>
            Смотреть проекты
          </Button>
        </div>
        <div className="hero-bottom">
          <p className="caption" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / 03 — {slide.name}
          </p>
          <a href="#studio" className="scroll-indicator">
            Листайте вниз <span aria-hidden="true">↓</span>
          </a>
          <div className="carousel-controls">
            <button
              onClick={() =>
                setActive((active + slides.length - 1) % slides.length)
              }
              aria-label="Предыдущий слайд"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 12H4m6-6-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </button>
            <button
              onClick={() => setActive((active + 1) % slides.length)}
              aria-label="Следующий слайд"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12h16m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
