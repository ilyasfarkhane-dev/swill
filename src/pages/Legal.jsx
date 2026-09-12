import { contact } from "../data/contact.js";
import { PageHero } from "../components/PageHero.jsx";

export function Legal() {
  return (
    <>
      <PageHero imageKey="elegant" imagePosition="center top" eyebrow="Informations légales" title="Mentions légales" compact>
        <p>Les mentions ci-dessous sont des placeholders, à remplacer par les informations officielles de la société.</p>
      </PageHero>
      <section className="section section--narrow legal-prose">
        <h2>Éditeur</h2>
        <p>
          {contact.legalName} — {contact.headquarters}. ICE : {contact.ice}. N° TVA : {contact.vatNumber}.
          Responsable de la publication : {contact.publisher}.
        </p>
        <h2>Contact</h2>
        <p>
          {contact.email} · {contact.phone}
        </p>
        <h2>Hébergement</h2>
        <p>{contact.host}</p>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des textes, visuels et éléments graphiques présentés sur ce site sont la propriété de{" "}
          {contact.legalName} ou de leurs ayants droit. Toute reproduction non autorisée est interdite.
        </p>
      </section>
    </>
  );
}
