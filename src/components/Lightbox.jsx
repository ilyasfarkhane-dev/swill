import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap.js";
import { EditorialMedia } from "./EditorialMedia.jsx";

export function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null);
  const item = index >= 0 ? items[index] : null;
  useFocusTrap(dialogRef, Boolean(item));

  useEffect(() => {
    if (!item) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div className="lightbox" role="presentation" onClick={onClose}>
      <div
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={item.alt || item.title}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="lightbox-close" type="button" onClick={onClose} aria-label="Fermer">
          <X size={22} />
        </button>
        <EditorialMedia
          imageKey={item.imageKey}
          placeholder={item.placeholder}
          alt={item.alt}
          eager
        />
        <p className="lightbox-caption">
          <strong>{item.title}</strong>
          <span>
            {index + 1} / {items.length}
          </span>
        </p>
        <div className="lightbox-nav">
          <button type="button" onClick={onPrev} aria-label="Image précédente">
            <CaretLeft size={22} /> Précédent
          </button>
          <button type="button" onClick={onNext} aria-label="Image suivante">
            Suivant <CaretRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
