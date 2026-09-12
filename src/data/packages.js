export const packages = [
  {
    id: "essentiel",
    name: "Essentiel",
    eyebrow: "Formule",
    recommended: false,
    summary: "L’essentiel pour une présence photo soignée, livrée sur place.",
    priceLabel: "Sur devis",
    features: [
      "Livraison sur le lieu de l’événement",
      "Photos numériques illimitées",
      "Galerie privée",
      "Personnalisation du cadre photo",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    eyebrow: "Recommandée",
    recommended: true,
    summary: "La formule la plus demandée : impressions, accessoires et installation.",
    priceLabel: "Sur devis",
    features: [
      "Tout ce qui est inclus dans Essentiel",
      "Impressions sur place",
      "Accessoires élégants",
      "Installation incluse",
    ],
  },
  {
    id: "prestige",
    name: "Prestige",
    eyebrow: "Complète",
    recommended: false,
    summary: "Une présence plus longue, un décor plus travaillé, une assistance dédiée.",
    priceLabel: "Sur devis",
    features: [
      "Tout ce qui est inclus dans Signature",
      "Livre d’or",
      "Fond premium",
      "Durée de service prolongée",
      "Assistance dédiée",
    ],
  },
];

export const extras = [
  { id: "installation", name: "Installation sur place", note: "Si elle n’est pas déjà incluse dans la formule." },
  { id: "backdrop", name: "Fond premium", note: "Selon le photobooth et le lieu." },
  { id: "guestbook", name: "Livre d’or", note: "Impressions à coller ou pages signées." },
  { id: "props", name: "Accessoires supplémentaires", note: "Sélection sobre, adaptée au type d’événement." },
  { id: "duration", name: "Durée prolongée", note: "Au-delà de la plage prévue au devis." },
  { id: "host", name: "Assistance dédiée", note: "Un interlocuteur présent pendant le service." },
];

export function getPackage(id) {
  return packages.find((item) => item.id === id) || null;
}
