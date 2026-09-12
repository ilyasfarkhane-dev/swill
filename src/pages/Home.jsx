import { ArrowRight, CalendarBlank, GearSix, Heart, ImageSquare, Sparkle, Truck } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Accordion } from "../components/Accordion.jsx";
import { AvailabilityForm } from "../components/AvailabilityForm.jsx";
import { BenefitItem } from "../components/BenefitItem.jsx";
import { EditorialMedia } from "../components/EditorialMedia.jsx";
import { FinalCta } from "../components/FinalCta.jsx";
import { GalleryGrid } from "../components/GalleryGrid.jsx";
import { PackageCard } from "../components/PackageCard.jsx";
import { PhotoboothCard } from "../components/PhotoboothCard.jsx";
import { PrimaryButton } from "../components/PrimaryButton.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { TestimonialCard } from "../components/TestimonialCard.jsx";
import { benefits, processSteps } from "../data/benefits.js";
import { events } from "../data/events.js";
import { faqs } from "../data/faqs.js";
import { galleryItems } from "../data/gallery.js";
import { packages } from "../data/packages.js";
import { photobooths } from "../data/photobooths.js";
import { testimonials } from "../data/testimonials.js";

const icons = { Truck, GearSix, ImageSquare, Heart, CalendarBlank, Sparkle };

export function Home() {
  return (
    <>
      <section className="hero" id="accueil">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">MARIAGES · ENTREPRISES · ÉVÉNEMENTS PRIVÉS</p>
          <h1>
            Des souvenirs
            <br />
            inoubliables,
            <br />
            <em>
              livrés à votre
              <br />
              événement
            </em>
          </h1>
          <p className="hero-copy">
            Des photobooths élégants et faciles à vivre,
            <br />
            livrés directement sur le lieu de votre événement
            <br />
            au Maroc. Vous profitez,
            <br />
            on s’occupe du reste.
          </p>
          <div className="hero-actions">
            <a className="hero-link hero-link--button" href="#disponibilite">
              Vérifier la disponibilité
            </a>
            <Link className="hero-link" to="/photobooths">
              Découvrir nos photobooths <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <AvailabilityForm />
      </section>

      <section className="benefits" aria-label="Points forts">
        {benefits.map((item) => (
          <BenefitItem key={item.id} icon={icons[item.icon]} title={item.title} text={item.text} />
        ))}
      </section>

      <section className="experience" id="experience">
        <div className="product-photo-wrap">
          <EditorialMedia imageKey="elegant" eager className="product-photo" />
          <span className="quality-seal">
            ÉLÉGANT
            <br />
            FIABLE
            <br />
            INOUBLIABLE
            <br />
            <b>✦</b>
          </span>
        </div>
        <div className="experience-copy">
          <p className="section-kicker">UNE EXPÉRIENCE CLÉ EN MAIN</p>
          <h2>
            Un photobooth pensé
            <br />
            pour vos plus beaux moments
          </h2>
          <p className="lead">
            Design raffiné, prise en main simple, livraison à l’adresse de la réception. Après l’événement, l’équipe
            revient chercher le matériel. Vous n’avez rien à transporter.
          </p>
          <div className="steps">
            {processSteps.map((step, index) => {
              const Icon = icons[step.icon];
              return (
                <article key={step.id}>
                  <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={31} weight="light" aria-hidden="true" />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="signature" aria-hidden="true">
        <p>Des moments qui comptent</p>
        <span />
        <small>SWILLBOX MAROC</small>
      </section>

      <section className="section" id="photobooths-apercu">
        <div className="section-head-row">
          <SectionHeading
            eyebrow="Nos modèles"
            title="Trois photobooths, trois présences"
            intro="Le même soin de livraison, des caractères différents. Choisissez selon la salle, pas selon un catalogue générique."
          />
          <PrimaryButton to="/photobooths">Tous les modèles</PrimaryButton>
        </div>
        <div className="booth-grid">
          {photobooths.map((booth) => (
            <PhotoboothCard key={booth.id} booth={booth} />
          ))}
        </div>
      </section>

      <section className="section section--ivory">
        <SectionHeading eyebrow="Événements" title="Là où nous intervenons le plus souvent" />
        <div className="event-grid">
          {events.map((event) => (
            <Link className="event-tile" key={event.id} to={`/evenements#${event.id}`}>
              <EditorialMedia imageKey={event.imageKey} placeholder={event.placeholder} alt="" />
              <div>
                <h3>{event.name}</h3>
                <p>{event.lead}</p>
                <span className="text-link">
                  Voir le détail <ArrowRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Formules"
          title="Trois cadres, un devis sur mesure"
          intro="Les prix dépendent du lieu, de la date et du matériel. Nous n’affichons pas de tarifs inventés."
        />
        <div className="package-grid">
          {packages.map((pack) => (
            <PackageCard key={pack.id} pack={pack} />
          ))}
        </div>
      </section>

      <section className="section section--ivory">
        <div className="section-head-row">
          <SectionHeading eyebrow="Galerie" title="Quelques instants, déjà là" />
          <PrimaryButton to="/galerie">Voir toute la galerie</PrimaryButton>
        </div>
        <GalleryGrid items={galleryItems.slice(0, 6)} />
      </section>

      <section className="section">
        <SectionHeading eyebrow="Ils nous ont fait confiance" title="Trois retours, sans enjoliver" />
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section section--narrow" id="faq">
        <SectionHeading eyebrow="Questions fréquentes" title="Ce que l’on nous demande d’abord" />
        <Accordion items={faqs} />
      </section>

      <FinalCta />
    </>
  );
}
