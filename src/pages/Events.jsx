import { EditorialMedia } from "../components/EditorialMedia.jsx";
import { FinalCta } from "../components/FinalCta.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { PrimaryButton } from "../components/PrimaryButton.jsx";
import { events } from "../data/events.js";

export function Events() {
  return (
    <>
      <PageHero imageKey="hero" imagePosition="center top" eyebrow="Événements" title="Mariages, entreprises, fêtes — le même protocole de livraison">
        <p>
          Le photobooth arrive à l’adresse de la réception. L’ambiance, elle, change : plus feutrée pour un dîner, plus
          construite pour une marque, plus libre pour un anniversaire.
        </p>
      </PageHero>
      {events.map((event, index) => (
        <article className={`event-block ${index % 2 ? "event-block--reverse" : ""}`} id={event.id} key={event.id}>
          <EditorialMedia
            imageKey={event.imageKey}
            placeholder={event.placeholder}
            className="event-photo"
            alt={event.imageKey ? undefined : event.name}
          />
          <div>
            <p className="card-eyebrow">Type d’événement</p>
            <h2>{event.name}</h2>
            <p className="lead">{event.text}</p>
            <h3>Usages fréquents</h3>
            <ul>
              {event.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="reco-line">
              <strong>Photobooth conseillé —</strong> {event.recommendation}
            </p>
            <h3>Options souvent retenues</h3>
            <ul>
              {event.options.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <PrimaryButton to={`/devis?evenement=${encodeURIComponent(event.typeValue)}&photobooth=${event.photoboothId}`}>
              Demander un devis
            </PrimaryButton>
          </div>
        </article>
      ))}
      <FinalCta />
    </>
  );
}
