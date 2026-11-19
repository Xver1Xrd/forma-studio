"use client";
import { useState } from "react";
import Image from "next/image";
export function Comparison() {
  const [position, setPosition] = useState(50);
  return (
    <div
      className="image-comparison"
      style={{ "--position": `${position}%` } as React.CSSProperties}
    >
      <Image
        src="/images/after.webp"
        alt="После: гостиная с камнем, дубом и мягким естественным светом"
        fill
        sizes="(max-width: 767px) 100vw, 90vw"
        className="photo"
      />
      <div className="comparison-before">
        <Image
          src="/images/before.webp"
          alt="До: тот же жилой объём с необработанными бетонными поверхностями"
          fill
          sizes="(max-width: 767px) 100vw, 90vw"
          className="photo"
        />
      </div>
      <span className="comparison-label label-before">До</span>
      <span className="comparison-label label-after">После</span>
      <div className="comparison-divider">
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Сравнение до и после"
        aria-valuetext={`До — ${position}%, после — ${100 - position}%`}
        className="comparison-input"
      />
      <span className="sr-only">
        Перемещайте разделитель мышью, касанием или стрелками клавиатуры.
      </span>
    </div>
  );
}
