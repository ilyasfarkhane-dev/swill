import { useMemo, useState } from "react";
import { GalleryGrid } from "../components/GalleryGrid.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { galleryFilters, galleryItems } from "../data/gallery.js";

export function Gallery() {
  const [filter, setFilter] = useState("tous");
  const items = useMemo(
    () => (filter === "tous" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <>
      <PageHero imageKey="hero" imagePosition="center top" eyebrow="Galerie" title="Mariages, entreprises, détails — une même lumière">
        <p>Une même lumière, du vin d’honneur au cocktail : quelques instants déjà captés, d’autres à venir.</p>
      </PageHero>
      <section className="section">
        <div className="filter-bar" role="group" aria-label="Filtrer la galerie">
          {galleryFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? "is-active" : undefined}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <GalleryGrid items={items} />
      </section>
    </>
  );
}
