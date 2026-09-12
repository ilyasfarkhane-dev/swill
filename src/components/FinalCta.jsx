import { PrimaryButton } from "./PrimaryButton.jsx";
import { SecondaryButton } from "./SecondaryButton.jsx";

export function FinalCta({
  title = "Prêts à créer des souvenirs qui restent ?",
  intro = "Indiquez le lieu et la date : nous étudions la livraison et vous revenons avec une proposition claire.",
}) {
  return (
    <section className="final-cta">
      <div className="final-cta-inner">
        <h2>{title}</h2>
        <p>{intro}</p>
        <div className="action-row">
          <SecondaryButton to="/devis">Demander un devis</SecondaryButton>
          <PrimaryButton to="/reservation">Réserver mon photobooth</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
