"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Picture } from "./ui";
type GalleryImage = { src: string; alt: string };
export function Gallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0),
    [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };
  const change = (d: number) =>
    setActive((v) => (v + d + images.length) % images.length);
  return (
    <>
      <div className="project-gallery">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            className="gallery-item"
            onClick={() => {
              setActive(i);
              dialog.current?.showModal();
              setOpen(true);
            }}
            aria-label={`Открыть фотографию ${i + 1}: ${img.alt}`}
          >
            <Picture
              src={img.src}
              alt={img.alt}
              className="gallery-photo"
              sizes="(max-width: 767px) 100vw, 90vw"
            />
            <span className="gallery-hint">
              Рассмотреть <span aria-hidden="true">+</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`Галерея проекта ${title}`}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            change(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            change(-1);
          }
        }}
      >
        <div className="lightbox-inner">
          <div className="lightbox-top">
            <p className="caption">
              {title} / {String(active + 1).padStart(2, "0")} —{" "}
              {String(images.length).padStart(2, "0")}
            </p>
            <button className="plain-button" onClick={close}>
              Закрыть <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="lightbox-picture">
            {open && (
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="95vw"
                className="photo-contain"
                priority
              />
            )}
          </div>
          <div className="lightbox-bottom">
            <p>{images[active].alt}</p>
            <div className="carousel-controls">
              <button
                onClick={() => change(-1)}
                aria-label="Предыдущая фотография"
              >
                ←
              </button>
              <button
                onClick={() => change(1)}
                aria-label="Следующая фотография"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
