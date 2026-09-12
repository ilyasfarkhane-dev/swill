import { useCallback, useMemo, useState } from "react";
import { EditorialMedia } from "./EditorialMedia.jsx";
import { Lightbox } from "./Lightbox.jsx";

export function GalleryGrid({ items, emptyLabel = "Aucun visuel pour ce filtre pour le moment." }) {
  const [openIndex, setOpenIndex] = useState(-1);

  const safeItems = useMemo(() => items ?? [], [items]);
  const current = openIndex >= 0 ? openIndex : -1;
  const close = useCallback(() => setOpenIndex(-1), []);
  const prev = useCallback(
    () => setOpenIndex((index) => (index <= 0 ? safeItems.length - 1 : index - 1)),
    [safeItems.length],
  );
  const next = useCallback(
    () => setOpenIndex((index) => (index >= safeItems.length - 1 ? 0 : index + 1)),
    [safeItems.length],
  );

  if (safeItems.length === 0) {
    return <p className="empty-state">{emptyLabel}</p>;
  }

  return (
    <>
      <ul className="gallery-grid">
        {safeItems.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className="gallery-tile"
              onClick={() => setOpenIndex(index)}
              aria-label={`Agrandir : ${item.alt || item.title}`}
            >
              <EditorialMedia imageKey={item.imageKey} placeholder={item.placeholder} alt="" />
              <span className="gallery-tile-label">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={safeItems} index={current} onClose={close} onPrev={prev} onNext={next} />
    </>
  );
}
