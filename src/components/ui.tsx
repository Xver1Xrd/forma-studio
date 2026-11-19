import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
export function Arrow({
  direction = "up",
  className = "",
}: {
  direction?: "up" | "left" | "right" | "down";
  className?: string;
}) {
  return (
    <svg
      className={`arrow-icon ${className} arrow-${direction}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`chevron ${open ? "is-open" : ""}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
export function Button({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${light ? "button-light" : ""} ${className}`}
    >
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Picture({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`picture ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="photo"
      />
    </div>
  );
}
export function SectionHeading({
  label,
  children,
  id,
  as: Tag = "h2",
}: {
  label: string;
  children: ReactNode;
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <Tag id={id} className="section-title">
        {children}
      </Tag>
    </div>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className="page-intro shell">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {description && <p className="intro-description">{description}</p>}
    </section>
  );
}
