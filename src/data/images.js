/**
 * Catalogue d'images.
 * Remplacer un chemin ici met à jour toutes les pages.
 * Les entrées sans `src` utilisent un cadre éditorial remplaçable.
 */
export const images = {
  hero: {
    src: "/assets/hero-celebration.png",
    alt: "Invités d’un mariage tenant des photos sorties du photobooth Swillbox Maroc",
  },
  elegant: {
    src: "/assets/photobooth-feature.png",
    alt: "Photobooth L’Élégant, bois et façade noire, dans une salle de réception",
  },
  studio: {
    src: "/assets/photobooth-studio.png",
    alt: "Photobooth Le Studio, installation éditoriale devant un fond champagne",
  },
  booth360: {
    src: "/assets/photobooth-360.png",
    alt: "Plateforme vidéo Le 360, anneau lumineux dans une salle de réception",
  },
  weddingGuests: {
    src: "/assets/hero-celebration.png",
    alt: "Mariée et invités souriant avec leurs tirages photo, à côté du photobooth",
    position: "62% center",
  },
  boothDetail: {
    src: "/assets/photobooth-feature.png",
    alt: "Détail du photobooth sur trépied, halo lumineux et composition florale",
    position: "center 20%",
  },
  venueAtmosphere: {
    src: "/assets/photobooth-feature.png",
    alt: "Salle de réception aux bougies, fleurs blanches et photobooth en fond",
    position: "80% center",
  },
  printMoment: {
    src: "/assets/hero-celebration.png",
    alt: "Mains tenant une planche photo instantanée lors d’une soirée",
    position: "center 70%",
  },
  corporate: {
    src: "/assets/event-corporate.png",
    alt: "Invités d’un cocktail d’entreprise tenant des photos près du photobooth",
  },
  birthday: {
    src: "/assets/event-birthday.png",
    alt: "Célébration d’anniversaire autour d’un gâteau, photobooth en fond",
  },
};

export function resolveImage(entry) {
  if (!entry) return null;
  if (typeof entry === "string") return images[entry] || { src: entry, alt: "" };
  if (entry.imageKey) return { ...images[entry.imageKey], ...entry };
  return entry;
}
