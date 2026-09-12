import { PageHero } from "../components/PageHero.jsx";
import { PrimaryButton } from "../components/PrimaryButton.jsx";
import { SecondaryButton } from "../components/SecondaryButton.jsx";

export function NotFound() {
  return (
    <PageHero compact eyebrow="Page introuvable" title="Cette page n’existe pas, ou plus.">
      <p>Le lien est peut-être ancien. Revenez à l’accueil, ou écrivez-nous pour un devis.</p>
      <div className="action-row">
        <PrimaryButton to="/">Retour à l’accueil</PrimaryButton>
        <SecondaryButton to="/devis">Demander un devis</SecondaryButton>
      </div>
    </PageHero>
  );
}
