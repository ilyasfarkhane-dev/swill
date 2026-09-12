import { Check, Minus } from "@phosphor-icons/react";
import { EditorialMedia } from "../components/EditorialMedia.jsx";
import { FinalCta } from "../components/FinalCta.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { PrimaryButton } from "../components/PrimaryButton.jsx";
import { SecondaryButton } from "../components/SecondaryButton.jsx";
import { photobooths } from "../data/photobooths.js";

function Capability({ value }) {
  if (value === true) return <Check size={18} weight="bold" aria-label="Oui" />;
  if (value === false) return <Minus size={18} aria-label="Non" />;
  return <span>{value}</span>;
}

export function Photobooths() {
  return (
    <>
      <PageHero imageKey="elegant" imagePosition="center top" eyebrow="Photobooths" title="Trois modèles, livrés sur votre lieu">
        <p>
          Chaque appareil a une présence différente. Les dimensions précises restent à confirmer ; l’espace au sol se
          valide avec vous selon la salle.
        </p>
      </PageHero>

      {photobooths.map((booth) => (
        <article className="model-block" id={booth.id} key={booth.id}>
          <EditorialMedia
            imageKey={booth.imageKey}
            placeholder={booth.placeholder}
            className="model-photo"
            alt={booth.imageKey ? undefined : `${booth.name}, photobooth Swillbox Maroc`}
          />
          <div className="model-copy">
            <p className="card-eyebrow">{booth.eyebrow}</p>
            <h2>{booth.name}</h2>
            <p className="lead">{booth.description}</p>
            <dl className="spec-list">
              <div>
                <dt>Dimensions</dt>
                <dd>{booth.dimensions}</dd>
              </div>
              <div>
                <dt>Espace d’installation</dt>
                <dd>{booth.footprint}</dd>
              </div>
              <div>
                <dt>Événements</dt>
                <dd>{booth.bestEvents.join(" · ")}</dd>
              </div>
            </dl>
            <div className="spec-columns">
              <div>
                <h3>Inclus</h3>
                <ul>
                  {booth.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Options</h3>
                <ul>
                  {booth.extras.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="action-row">
              <PrimaryButton to={`/devis?photobooth=${booth.id}`}>Demander un devis</PrimaryButton>
              <SecondaryButton to={`/reservation?photobooth=${booth.id}`} tone="dark">
                Réserver
              </SecondaryButton>
            </div>
          </div>
        </article>
      ))}

      <section className="section">
        <h2 className="table-title">Comparaison rapide</h2>
        <div className="table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Caractéristique</th>
                {photobooths.map((booth) => (
                  <th scope="col" key={booth.id}>
                    {booth.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Photo</th>
                {photobooths.map((booth) => (
                  <td key={booth.id}>
                    <Capability value={booth.capabilities.photo} />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">GIF</th>
                {photobooths.map((booth) => (
                  <td key={booth.id}>
                    <Capability value={booth.capabilities.gif} />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Vidéo</th>
                {photobooths.map((booth) => (
                  <td key={booth.id}>
                    <Capability value={booth.capabilities.video} />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Impression</th>
                {photobooths.map((booth) => (
                  <td key={booth.id}>{booth.capabilities.print}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Idéal pour</th>
                {photobooths.map((booth) => (
                  <td key={booth.id}>{booth.recommended}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="compare-cards">
          {photobooths.map((booth) => (
            <li key={booth.id}>
              <h3>{booth.name}</h3>
              <p>
                Photo : {booth.capabilities.photo ? "oui" : "non"} · GIF : {booth.capabilities.gif ? "oui" : "non"} ·
                Vidéo : {booth.capabilities.video ? "oui" : "non"}
              </p>
              <p>Impression : {booth.capabilities.print}</p>
              <p>{booth.recommended}</p>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
