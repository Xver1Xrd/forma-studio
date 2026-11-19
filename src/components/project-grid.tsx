"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, projects, type ProjectCategory } from "@/lib/content";
import { Arrow, Picture } from "./ui";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: (typeof projects)[number];
  index?: number;
}) {
  return (
    <article
      className="project-card"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-card-link"
        aria-labelledby={`project-${project.slug}-name project-${project.slug}-meta`}
      >
        <Picture
          src={project.image}
          alt={`${project.name}: ${project.type.toLowerCase()}`}
          className="project-card-photo"
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(50vw - 40px), calc(50vw - 84px)"
        />
        <div className="project-card-title">
          <h3 id={`project-${project.slug}-name`}>{project.name}</h3>
          <Arrow />
        </div>
        <p className="project-meta" id={`project-${project.slug}-meta`}>
          {project.type} <span aria-hidden="true">/</span> {project.location} ·{" "}
          {project.year}
        </p>
      </Link>
    </article>
  );
}
export function ProjectGrid({ showFilters = true }: { showFilters?: boolean }) {
  const [category, setCategory] = useState<"all" | ProjectCategory>("all");
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("category");
    if (categories.some((c) => c.id === id)) setCategory(id as typeof category);
  }, []);
  const filtered = projects.filter(
    (p) => category === "all" || p.category === category,
  );
  const change = (id: typeof category) => {
    setCategory(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    window.history.replaceState(null, "", url);
  };
  return (
    <div className="portfolio">
      {showFilters && (
        <div className="filters" role="group" aria-label="Категории проектов">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => change(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" role="status">
        Найдено проектов: {filtered.length}
      </p>
      <div className="project-masonry" key={category}>
        <div className="masonry-column">
          {filtered
            .filter((_, i) => i % 2 === 0)
            .map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
        </div>
        <div className="masonry-column masonry-offset">
          {filtered
            .filter((_, i) => i % 2 === 1)
            .map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + 1} />
            ))}
        </div>
      </div>
    </div>
  );
}
