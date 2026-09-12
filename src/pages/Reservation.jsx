import { Truck } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FormField } from "../components/FormField.jsx";
import { PrimaryButton } from "../components/PrimaryButton.jsx";
import { SecondaryButton } from "../components/SecondaryButton.jsx";
import { eventTypes, storageKeys } from "../data/contact.js";
import { images } from "../data/images.js";
import { getPhotobooth, photobooths } from "../data/photobooths.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { formatDate, todayISO } from "../utils/format.js";
import {
  firstInvalidField,
  reservationFieldIds,
  sanitizeReservation,
  validateReservation,
} from "../utils/reservation.js";
import { readStorage } from "../utils/storage.js";

function seedReservation(params) {
  const availability = readStorage(storageKeys.availability, null);
  const quote = readStorage(storageKeys.quote, null);
  return sanitizeReservation({
    eventType: params.get("evenement") || quote?.eventType || availability?.eventType || "",
    eventDate: params.get("date") || quote?.eventDate || availability?.date || "",
    city: params.get("ville") || quote?.city || availability?.city || quote?.postalCode || "",
    address: quote?.address || "",
    guests: quote?.guests || "",
    photobooth: params.get("photobooth") || quote?.photobooth || "",
    installation: quote?.installation === "non" ? "non" : "oui",
    message: quote?.message || "",
    firstName: quote?.firstName || "",
    lastName: quote?.lastName || "",
    email: quote?.email || "",
    phone: quote?.phone || "",
    privacy: false,
  });
}

export function Reservation() {
  const [params] = useSearchParams();
  const [values, setValues] = useLocalStorage(storageKeys.reservation, seedReservation(params));
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const data = useMemo(() => sanitizeReservation(values), [values]);
  const booth = getPhotobooth(data.photobooth);
  const search = params.toString();

  useEffect(() => {
    const next = new URLSearchParams(search);
    const patch = {};
    if (next.get("evenement")) patch.eventType = next.get("evenement");
    if (next.get("date")) patch.eventDate = next.get("date");
    if (next.get("ville")) patch.city = next.get("ville");
    if (next.get("photobooth")) patch.photobooth = next.get("photobooth");
    if (Object.keys(patch).length) {
      setValues((current) => sanitizeReservation({ ...current, ...patch, submittedAt: "" }));
    }
  }, [search, setValues]);

  const update = (patch) => {
    setValues((current) => sanitizeReservation({ ...current, ...patch }));
    setErrors((current) => {
      const cleared = { ...current };
      Object.keys(patch).forEach((key) => {
        cleared[key] = "";
      });
      return cleared;
    });
    setStatus("");
  };

  const set = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    update({ [field]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const next = validateReservation(data);
    setErrors(next);
    const first = firstInvalidField(next);
    if (first) {
      setStatus("Certains champs sont à compléter.");
      window.requestAnimationFrame(() => {
        document.getElementById(reservationFieldIds[first])?.focus();
      });
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      update({ submittedAt: new Date().toISOString() });
      setBusy(false);
      setStatus("Votre demande a été enregistrée sur cet appareil.");
    }, 280);
  };

  if (data.submittedAt) {
    return (
      <section className="reserve-page">
        <div className="confirm-card reserve-success" role="status">
          <p className="section-kicker">Demande de réservation</p>
          <h1>Votre demande est prête</h1>
          <p>
            Merci, {data.firstName}. Les informations de votre événement ont bien été enregistrées sur cet appareil.
            Notre équipe doit maintenant vérifier la disponibilité et les conditions de livraison.
          </p>
          <p className="reserve-notice">Aucune réservation définitive ni aucun paiement n’a été effectué.</p>
          <div className="action-row">
            <SecondaryButton tone="dark" onClick={() => update({ submittedAt: "" })}>
              Modifier ma demande
            </SecondaryButton>
            <PrimaryButton to="/">Retour à l’accueil</PrimaryButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reserve-page">
      <header className="reserve-intro">
        <p className="section-kicker">Demande de réservation</p>
        <h1>Réservez votre photobooth simplement</h1>
        <p>
          Indiquez-nous l’essentiel sur votre événement. Notre équipe vérifiera la disponibilité et vous contactera pour
          confirmer la livraison.
        </p>
        <p className="reserve-reassurance">Demande sans engagement · Réponse personnalisée · Aucun paiement en ligne</p>
      </header>

      <form className="reserve-layout" onSubmit={onSubmit} noValidate>
        <div className="reserve-main">
          <fieldset>
            <legend>Votre événement</legend>
            <div className="form-grid">
              <FormField id="r-eventType" label="Type d’événement" error={errors.eventType}>
                <select value={data.eventType} onChange={set("eventType")}>
                  <option value="">Sélectionner</option>
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField id="r-eventDate" label="Date de l’événement" error={errors.eventDate}>
                <input type="date" min={todayISO()} value={data.eventDate} onChange={set("eventDate")} />
              </FormField>
              <FormField id="r-city" label="Ville ou code postal" error={errors.city}>
                <input value={data.city} onChange={set("city")} autoComplete="address-level2" />
              </FormField>
              <FormField id="r-guests" label="Nombre approximatif d’invités" error={errors.guests}>
                <input type="number" min="1" inputMode="numeric" value={data.guests} onChange={set("guests")} />
              </FormField>
            </div>
            <FormField id="r-address" label="Adresse du lieu" error={errors.address}>
              <input value={data.address} onChange={set("address")} autoComplete="street-address" />
            </FormField>
          </fieldset>

          <fieldset>
            <legend>Votre photobooth</legend>
            <div className="booth-picks" role="radiogroup" aria-label="Photobooth souhaité">
              {photobooths.map((item) => {
                const image = images[item.imageKey];
                const selected = data.photobooth === item.id;
                return (
                  <label key={item.id} className={`booth-pick ${selected ? "is-selected" : ""}`.trim()}>
                    <input
                      id={item.id === "elegant" ? "r-photobooth-elegant" : `r-photobooth-${item.id}`}
                      type="radio"
                      name="photobooth"
                      value={item.id}
                      checked={selected}
                      onChange={set("photobooth")}
                    />
                    <span className="booth-pick-media">
                      <img src={image?.src} alt="" />
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <em>{item.tagline}</em>
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.photobooth ? (
              <p className="field-error" role="alert">
                {errors.photobooth}
              </p>
            ) : null}

            <fieldset className="install-group">
              <legend>Installation par l’équipe</legend>
              <div className="install-options">
                <label className={data.installation === "oui" ? "is-selected" : undefined}>
                  <input
                    id="r-installation-oui"
                    type="radio"
                    name="installation"
                    value="oui"
                    checked={data.installation === "oui"}
                    onChange={set("installation")}
                  />
                  Oui, je souhaite une installation
                </label>
                <label className={data.installation === "non" ? "is-selected" : undefined}>
                  <input
                    type="radio"
                    name="installation"
                    value="non"
                    checked={data.installation === "non"}
                    onChange={set("installation")}
                  />
                  Non, livraison seule
                </label>
              </div>
            </fieldset>

            <FormField id="r-message" label="Message (optionnel)">
              <textarea rows="4" value={data.message} onChange={set("message")} />
            </FormField>
          </fieldset>

          <aside className="delivery-note">
            <Truck size={22} weight="light" aria-hidden="true" />
            <div>
              <strong>Livraison directe sur votre lieu</strong>
              <p>
                Vous n’avez aucun point de retrait à rechercher. Nous livrons le photobooth à l’adresse indiquée, puis
                nous récupérons le matériel après votre événement.
              </p>
            </div>
          </aside>

          <fieldset>
            <legend>Vos coordonnées</legend>
            <div className="form-grid">
              <FormField id="r-firstName" label="Prénom" error={errors.firstName}>
                <input value={data.firstName} onChange={set("firstName")} autoComplete="given-name" />
              </FormField>
              <FormField id="r-lastName" label="Nom" error={errors.lastName}>
                <input value={data.lastName} onChange={set("lastName")} autoComplete="family-name" />
              </FormField>
              <FormField id="r-email" label="E-mail" error={errors.email}>
                <input type="email" value={data.email} onChange={set("email")} autoComplete="email" />
              </FormField>
              <FormField id="r-phone" label="Téléphone" error={errors.phone}>
                <input type="tel" value={data.phone} onChange={set("phone")} autoComplete="tel" />
              </FormField>
            </div>
            <div className={`field ${errors.privacy ? "field--invalid" : ""}`.trim()}>
              <label className="check-line" htmlFor="r-privacy">
                <input
                  id="r-privacy"
                  type="checkbox"
                  checked={data.privacy}
                  onChange={set("privacy")}
                  aria-invalid={errors.privacy ? true : undefined}
                  aria-describedby={errors.privacy ? "r-privacy-error" : undefined}
                />
                <span>
                  J’accepte que ces informations soient conservées sur cet appareil pour préparer ma demande. Voir la{" "}
                  <Link to="/confidentialite">politique de confidentialité</Link>.
                </span>
              </label>
              {errors.privacy ? (
                <p className="field-error" id="r-privacy-error" role="alert">
                  {errors.privacy}
                </p>
              ) : null}
            </div>
          </fieldset>
        </div>

        <aside className="reserve-summary" aria-live="polite">
          <h2>Votre demande</h2>
          <dl>
            <div>
              <dt>Événement</dt>
              <dd className={data.eventType ? undefined : "is-empty"}>{data.eventType || "À compléter"}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd className={data.eventDate ? undefined : "is-empty"}>
                {data.eventDate ? formatDate(data.eventDate) : "À compléter"}
              </dd>
            </div>
            <div>
              <dt>Ville</dt>
              <dd className={data.city ? undefined : "is-empty"}>{data.city || "À compléter"}</dd>
            </div>
            <div>
              <dt>Photobooth</dt>
              <dd className={booth ? undefined : "is-empty"}>{booth?.name || "À compléter"}</dd>
            </div>
            <div>
              <dt>Installation</dt>
              <dd>{data.installation === "oui" ? "Oui" : "Non"}</dd>
            </div>
          </dl>
          <ul>
            <li>Aucun paiement maintenant</li>
            <li>Disponibilité confirmée par notre équipe</li>
            <li>Livraison directement sur le lieu indiqué</li>
          </ul>
        </aside>

        <div className="reserve-submit">
          <p className="reserve-status" role="status" aria-live="polite">
            {status}
          </p>
          <PrimaryButton type="submit" disabled={busy}>
            {busy ? "Enregistrement…" : "Envoyer ma demande de réservation"}
          </PrimaryButton>
          <p className="reserve-disclaimer">
            Cette demande ne confirme pas encore votre réservation. Notre équipe vous contactera après vérification de
            la disponibilité.
          </p>
          <Link className="text-link" to="/photobooths">
            Retour aux photobooths
          </Link>
        </div>
      </form>
    </section>
  );
}
