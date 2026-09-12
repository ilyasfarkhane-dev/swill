import { Link } from "react-router-dom";
import { FinalCta } from "../components/FinalCta.jsx";
import { PackageCard } from "../components/PackageCard.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { extras, packages } from "../data/packages.js";

const rows = [
  { label: "Livraison sur le lieu de l’événement", values: [true, true, true] },
  { label: "Photos numériques illimitées", values: [true, true, true] },
  { label: "Galerie privée", values: [true, true, true] },
  { label: "Personnalisation du cadre", values: [true, true, true] },
  { label: "Impressions sur place", values: [false, true, true] },
  { label: "Accessoires élégants", values: [false, true, true] },
  { label: "Installation", values: [false, true, true] },
  { label: "Livre d’or", values: [false, false, true] },
  { label: "Fond premium", values: [false, false, true] },
  { label: "Durée prolongée", values: [false, false, true] },
  { label: "Assistance dédiée", values: [false, false, true] },
];

export function Tariffs() {
  return (
    <>
      <PageHero imageKey="elegant" imagePosition="center top" eyebrow="Tarifs" title="Des formules claires, un devis honnête">
        <p>
          Aucun prix forfaitaire n’est affiché ici : le montant dépend du photobooth, de la durée et surtout de
          l’adresse de livraison. La mention « Sur devis » n’est pas un artifice, c’est l’état réel de notre grille.
        </p>
      </PageHero>

      <section className="section">
        <div className="package-grid">
          {packages.map((pack) => (
            <PackageCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <section className="section section--ivory">
        <h2 className="table-title">Comparer les formules</h2>
        <div className="table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">Inclus</th>
                {packages.map((pack) => (
                  <th scope="col" key={pack.id}>
                    {pack.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={packages[index].id}>{value ? "Oui" : "—"}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Tarif</th>
                {packages.map((pack) => (
                  <td key={pack.id}>{pack.priceLabel}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="compare-cards">
          {packages.map((pack) => (
            <li key={pack.id}>
              <h3>{pack.name}</h3>
              <ul>
                {pack.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p>{pack.priceLabel}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section split-section">
        <div>
          <h2>Options</h2>
          <ul className="plain-list">
            {extras.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                <span>{item.note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Livraison</h2>
          <p>
            Les frais de livraison dépendent de l’adresse exacte de l’événement, de la date et du matériel. Ils figurent
            sur le devis, après étude — nous n’utilisons pas de calculateur approximatif.
          </p>
          <p>
            Au Maroc, nous confirmons chaque tournée au cas par cas. Pour le déroulé complet, voir la page{" "}
            <Link to="/livraison">Livraison</Link>. Les questions fréquentes sont rassemblées dans la{" "}
            <Link to="/#faq">FAQ</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
