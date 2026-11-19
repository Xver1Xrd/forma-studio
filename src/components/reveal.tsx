"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const bounds = node.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.94) return;
    node.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          node.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
