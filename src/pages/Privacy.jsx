import { contact } from "../data/contact.js";
import { PageHero } from "../components/PageHero.jsx";

export function Privacy() {
  return (
    <>
      <PageHero imageKey="elegant" imagePosition="center top" eyebrow="Confidentialité" title="Politique de confidentialité" compact>
        <p>Version prototype : aucun serveur n’enregistre vos demandes pour le moment.</p>
      </PageHero>
      <section className="section section--narrow legal-prose">
        <h2>Données collectées</h2>
        <p>
          Les formulaires de devis et de réservation enregistrent un résumé dans le stockage local de votre navigateur
          (LocalStorage), uniquement sur cet appareil. Aucun e-mail n’est envoyé, aucune base distante n’est interrogée
          tant que le backend n’est pas branché.
        </p>
        <h2>Finalité</h2>
        <p>
          Préparer une demande de devis ou de réservation, et vous permettre d’y revenir plus tard sur le même
          navigateur.
        </p>
        <h2>Durée</h2>
        <p>Les données restent jusqu’à ce que vous les effaciez (données de navigation) ou que vous vidiez le stockage du site.</p>
        <h2>Vos droits</h2>
        <p>
          Conformément à la loi 09-08 relative à la protection des données personnelles, vous pourrez demander l’accès, la rectification ou l’effacement auprès de{" "}
          {contact.email} une fois le traitement réellement mis en place.
        </p>
      </section>
    </>
  );
}
