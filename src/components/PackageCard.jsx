import { PrimaryButton } from "./PrimaryButton.jsx";
import { SecondaryButton } from "./SecondaryButton.jsx";

export function PackageCard({ pack, actionTo = "/devis" }) {
  return (
    <article className={`package-card ${pack.recommended ? "package-card--featured" : ""}`.trim()}>
      <p className="card-eyebrow">{pack.eyebrow}</p>
      <h3>{pack.name}</h3>
      <p className="package-card-summary">{pack.summary}</p>
      <p className="package-card-price">{pack.priceLabel}</p>
      <ul>
        {pack.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {pack.recommended ? (
        <PrimaryButton to={`${actionTo}?formule=${pack.id}`}>Demander un devis</PrimaryButton>
      ) : (
        <SecondaryButton to={`${actionTo}?formule=${pack.id}`} tone="dark">
          Demander un devis
        </SecondaryButton>
      )}
    </article>
  );
}
