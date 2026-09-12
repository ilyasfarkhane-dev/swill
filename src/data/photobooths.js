export const photobooths = [
  {
    id: "elegant",
    name: "L’Élégant",
    eyebrow: "Classique",
    tagline: "Bois chaud, façade noire, présence discrète.",
    summary:
      "Un meuble de réception plus qu’une machine. L’Élégant s’installe près d’un salon ou d’une allée et se fond dans un décor de mariage ou de dîner.",
    description:
      "Finition bois et noir mat, halo lumineux mesuré, interface simple. Les invités se prennent en photo sans file d’attente technique, et repartent avec un souvenir lisible, bien cadré.",
    imageKey: "elegant",
    recommended: "Mariages, dîners, cérémonies intimistes",
    bestEvents: ["Mariage", "Événement privé"],
    features: ["Photos HD", "GIFs", "Galerie privée", "Personnalisation du cadre"],
    capabilities: {
      photo: true,
      gif: true,
      video: false,
      print: "En option, selon formule",
    },
    dimensions: "Dimensions à confirmer",
    footprint: "Espace conseillé à confirmer — prévoir un dégagement confortable devant l’appareil.",
    included: ["Livraison sur le lieu de l’événement", "Galerie privée", "Personnalisation graphique de base"],
    extras: ["Installation par nos équipes", "Impressions sur place", "Accessoires"],
    composition: "portrait",
  },
  {
    id: "studio",
    name: "Le Studio",
    eyebrow: "Éditorial",
    tagline: "Une lumière de studio, un rendu plus magazine.",
    summary:
      "Pensé comme un mini-studio, Le Studio convient aux soirées d’entreprise et aux lancements où l’image doit rester nette, homogène, un peu plus construite.",
    description:
      "Fonds soignés, lumière plus dirigée, cadence fluide. Idéal lorsqu’une marque, un comité d’organisation ou un couple souhaite un rendu plus éditorial, sans installer un vrai plateau photo.",
    imageKey: "studio",
    recommended: "Entreprises, lancements, cocktails",
    bestEvents: ["Entreprise", "Mariage"],
    features: ["Rendu studio", "Fonds interchangeables", "Photos & GIFs", "Identité visuelle"],
    capabilities: {
      photo: true,
      gif: true,
      video: true,
      print: "En option, selon formule",
    },
    dimensions: "Dimensions à confirmer",
    footprint: "Prévoir un espace un peu plus large qu’un photobooth classique — surface exacte à confirmer.",
    included: ["Livraison sur site", "Orientation de la lumière", "Galerie privée"],
    extras: ["Fond premium", "Installation", "Assistant dédié"],
    composition: "wide",
  },
  {
    id: "360",
    name: "Le 360",
    eyebrow: "Immersif",
    tagline: "Le mouvement, filmé avec mesure.",
    summary:
      "Une plateforme rotative et une vidéo courte, assez spectaculaire pour un after, assez maîtrisée pour rester élégante.",
    description:
      "Les invités montent, la caméra tourne, le souvenir part en vidéo. Le 360 fonctionne particulièrement bien en fin de soirée, lorsque l’on veut un moment collectif sans amplifier le volume de la salle.",
    imageKey: "booth360",
    recommended: "Afters, anniversaires, soirées privées",
    bestEvents: ["Anniversaire", "Événement privé", "Entreprise"],
    features: ["Vidéo 360", "Partage immédiat", "Effet signature", "Photos associées"],
    capabilities: {
      photo: true,
      gif: false,
      video: true,
      print: "Non, sauf complément photo",
    },
    dimensions: "Dimensions à confirmer",
    footprint: "Plateforme circulaire : dégagement autour de l’installation à confirmer selon le lieu.",
    included: ["Livraison sur site", "Réglage de la scène", "Fichiers vidéo"],
    extras: ["Installation", "Éclairage d’ambiance", "Durée prolongée"],
    composition: "square",
  },
];

export function getPhotobooth(id) {
  return photobooths.find((item) => item.id === id) || null;
}
