import { Accordion } from "../components/Accordion.jsx";
import { FinalCta } from "../components/FinalCta.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { deliverySteps } from "../data/benefits.js";
import { faqs } from "../data/faqs.js";

export function Delivery() {
  return (
    <>
      <PageHero imageKey="elegant" imagePosition="center top" eyebrow="Livraison & installation" title="Nous venons à vous, puis nous reprenons le matériel">
        <p>
          Vous n’avez aucun point de retrait à rechercher : nous livrons directement sur le lieu indiqué lors de votre
          réservation.
        </p>
      </PageHero>

      <section className="section">
        <ol className="process-list">
          {deliverySteps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section--narrow">
        <h2 className="table-title">Questions sur la logistique</h2>
        <Accordion items={faqs} />
      </section>
      <FinalCta />
    </>
  );
}
