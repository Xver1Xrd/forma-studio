"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function MotionEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)"),
      fine = window.matchMedia("(pointer: fine)");
    let active: HTMLElement | null = null,
      frame = 0;
    const hero = document.querySelector<HTMLElement>(".hero");
    const reset = () => {
      active?.style.removeProperty("--magnetic-x");
      active?.style.removeProperty("--magnetic-y");
      active = null;
    };
    const move = (e: PointerEvent) => {
      if (reduced.matches || !fine.matches) return;
      const el =
        e.target instanceof Element
          ? e.target.closest<HTMLElement>(".button")
          : null;
      if (el !== active) reset();
      if (!el || el.hasAttribute("disabled")) return;
      active = el;
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        "--magnetic-x",
        `${Math.max(-6, Math.min(6, (e.clientX - r.left - r.width / 2) * 0.06))}px`,
      );
      el.style.setProperty(
        "--magnetic-y",
        `${Math.max(-5, Math.min(5, (e.clientY - r.top - r.height / 2) * 0.1))}px`,
      );
    };
    const scroll = () => {
      if (!hero || reduced.matches || frame) return;
      frame = requestAnimationFrame(() => {
        hero.style.setProperty(
          "--hero-parallax",
          `${Math.min(24, window.scrollY * 0.06)}px`,
        );
        frame = 0;
      });
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("keydown", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      reset();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("keydown", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", scroll);
    };
  }, [pathname]);
  return null;
}
