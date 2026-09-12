import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FormField } from "../components/FormField.jsx";
import { PageHero } from "../components/PageHero.jsx";
import { PrimaryButton } from "../components/PrimaryButton.jsx";
import { SecondaryButton } from "../components/SecondaryButton.jsx";
import { countries, eventTypes, storageKeys } from "../data/contact.js";
import { packages } from "../data/packages.js";
import { getPhotobooth, photobooths } from "../data/photobooths.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { formatDate, todayISO } from "../utils/format.js";
import { readStorage } from "../utils/storage.js";
import { email, futureDate, guests, phone, required } from "../utils/validation.js";

function emptyQuote(params, availability) {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventType: params.get("evenement") || availability?.eventType || "",
    eventDate: params.get("date") || availability?.date || "",
    guests: "",
    venue: "",
    address: "",
    city: params.get("ville") || availability?.city || "",
    postalCode: "",
    country: "Maroc",
    photobooth: params.get("photobooth") || "",
    pack: params.get("formule") || "",
    installation: "option",
    message: "",
    privacy: false,
  };
}

export function Quote() {
  const [params] = useSearchParams();
  const availability = readStorage(storageKeys.availability, null);
  const [values, setValues] = useLocalStorage(storageKeys.quote, emptyQuote(params, availability));
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(Boolean(values?.submittedAt));
  const [busy, setBusy] = useState(false);

  const merged = useMemo(() => ({ ...emptyQuote(params, availability), ...values }), [availability, params, values]);
  const selectedBooth = getPhotobooth(merged.photobooth || params.get("photobooth"));
  const heroImage = selectedBooth?.imageKey || "elegant";

  const search = params.toString();
  useEffect(() => {
    const next = new URLSearchParams(search);
    const patch = {};
    if (next.get("evenement")) patch.eventType = next.get("evenement");
    if (next.get("date")) patch.eventDate = next.get("date");
    if (next.get("ville")) patch.city = next.get("ville");
    if (next.get("photobooth")) patch.photobooth = next.get("photobooth");
    if (next.get("formule")) patch.pack = next.get("formule");
    if (Object.keys(patch).length) setValues((current) => ({ ...current, ...patch, submittedAt: undefined }));
  }, [search, setValues]);

  const set = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value, submittedAt: current?.submittedAt }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const next = {
      firstName: required(merged.firstName, "Le prénom est requis."),
      lastName: required(merged.lastName, "Le nom est requis."),
      email: email(merged.email),
      phone: phone(merged.phone),
      eventType: required(merged.eventType, "Choisissez un type d’événement."),
      eventDate: futureDate(merged.eventDate),
      guests: guests(merged.guests),
      venue: required(merged.venue, "Indiquez le nom du lieu."),
      address: required(merged.address, "L’adresse de livraison est requise."),
      city: required(merged.city, "La ville est requise."),
      postalCode: required(merged.postalCode, "Le code postal est requis."),
      country: required(merged.country, "Le pays est requis."),
      photobooth: required(merged.photobooth, "Choisissez un photobooth."),
      pack: required(merged.pack, "Choisissez une formule."),
      installation: required(merged.installation, "Précisez l’option d’installation."),
      privacy: merged.privacy ? "" : "Veuillez accepter la politique de confidentialité.",
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setBusy(true);
    window.setTimeout(() => {
      const payload = { ...merged, submittedAt: new Date().toISOString() };
      setValues(payload);
      setSubmitted(true);
      setBusy(false);
    }, 400);
  };

  if (submitted && merged.submittedAt) {
    return (
      <>
        <PageHero imageKey={heroImage} imagePosition="center top" eyebrow="Devis" title="Votre demande est prête">
          <p>
            Votre demande est prête. La connexion au service d’envoi sera ajoutée lors de l’intégration du backend.
          </p>
        </PageHero>
        <section className="section section--narrow">
          <div className="confirm-card" role="status">
            <p className="card-eyebrow">Récapitulatif conservé sur cet appareil</p>
            <dl className="summary-list">
              <div>
                <dt>Contact</dt>
                <dd>
                  {merged.firstName} {merged.lastName} · {merged.email} · {merged.phone}
                </dd>
              </div>
              <div>
                <dt>Événement</dt>
                <dd>
                  {merged.eventType} le {formatDate(merged.eventDate)} · {merged.guests} invités
                </dd>
              </div>
              <div>
                <dt>Livraison</dt>
                <dd>
                  {merged.venue}, {merged.address}, {merged.postalCode} {merged.city}, {merged.country}
                </dd>
              </div>
              <div>
                <dt>Prestation</dt>
                <dd>
                  {photobooths.find((item) => item.id === merged.photobooth)?.name || merged.photobooth} ·{" "}
                  {packages.find((item) => item.id === merged.pack)?.name || merged.pack} · Installation :{" "}
                  {merged.installation === "oui" ? "souhaitée" : merged.installation === "non" ? "non" : "à discuter"}
                </dd>
              </div>
            </dl>
            <div className="action-row">
              <PrimaryButton to="/reservation">Poursuivre vers une réservation</PrimaryButton>
              <SecondaryButton
                tone="dark"
                onClick={() => {
                  setSubmitted(false);
                  setValues({ ...merged, submittedAt: undefined });
                }}
              >
                Modifier la demande
              </SecondaryButton>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero imageKey={heroImage} imagePosition="center top" eyebrow="Devis" title="Demander une proposition">
        <p>
          Tous les champs marqués sont nécessaires pour estimer la livraison. Aucun e-mail n’est envoyé pour le moment :
          le résumé reste enregistré dans votre navigateur.
        </p>
      </PageHero>
      <section className="section section--narrow">
        <form className="quote-form" onSubmit={onSubmit} noValidate>
          <fieldset>
            <legend>Contact</legend>
            <div className="form-grid">
              <FormField id="firstName" label="Prénom" error={errors.firstName}>
                <input value={merged.firstName} onChange={set("firstName")} autoComplete="given-name" />
              </FormField>
              <FormField id="lastName" label="Nom" error={errors.lastName}>
                <input value={merged.lastName} onChange={set("lastName")} autoComplete="family-name" />
              </FormField>
              <FormField id="email" label="E-mail" error={errors.email}>
                <input type="email" value={merged.email} onChange={set("email")} autoComplete="email" />
              </FormField>
              <FormField id="phone" label="Téléphone" error={errors.phone}>
                <input type="tel" value={merged.phone} onChange={set("phone")} autoComplete="tel" />
              </FormField>
            </div>
          </fieldset>

          <fieldset>
            <legend>Événement</legend>
            <div className="form-grid">
              <FormField id="eventType" label="Type d’événement" error={errors.eventType}>
                <select value={merged.eventType} onChange={set("eventType")}>
                  <option value="">Sélectionner</option>
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField id="eventDate" label="Date de l’événement" error={errors.eventDate}>
                <input type="date" min={todayISO()} value={merged.eventDate} onChange={set("eventDate")} />
              </FormField>
              <FormField id="guests" label="Nombre d’invités" error={errors.guests}>
                <input type="number" min="1" step="1" value={merged.guests} onChange={set("guests")} />
              </FormField>
              <FormField id="venue" label="Nom du lieu" error={errors.venue}>
                <input value={merged.venue} onChange={set("venue")} />
              </FormField>
            </div>
          </fieldset>

          <fieldset>
            <legend>Livraison</legend>
            <div className="form-grid">
              <FormField id="address" label="Adresse de livraison" error={errors.address}>
                <input value={merged.address} onChange={set("address")} autoComplete="street-address" />
              </FormField>
              <FormField id="city" label="Ville" error={errors.city}>
                <input value={merged.city} onChange={set("city")} autoComplete="address-level2" />
              </FormField>
              <FormField id="postalCode" label="Code postal" error={errors.postalCode}>
                <input value={merged.postalCode} onChange={set("postalCode")} autoComplete="postal-code" />
              </FormField>
              <FormField id="country" label="Pays" error={errors.country}>
                <select value={merged.country} onChange={set("country")}>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </fieldset>

          <fieldset>
            <legend>Prestation</legend>
            <div className="form-grid">
              <FormField id="photobooth" label="Photobooth" error={errors.photobooth}>
                <select value={merged.photobooth} onChange={set("photobooth")}>
                  <option value="">Sélectionner</option>
                  {photobooths.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField id="pack" label="Formule" error={errors.pack}>
                <select value={merged.pack} onChange={set("pack")}>
                  <option value="">Sélectionner</option>
                  {packages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField id="installation" label="Installation" error={errors.installation}>
                <select value={merged.installation} onChange={set("installation")}>
                  <option value="option">À discuter</option>
                  <option value="oui">Oui, je souhaite l’installation</option>
                  <option value="non">Non, livraison seule</option>
                </select>
              </FormField>
            </div>
            <FormField id="message" label="Message" hint="Précisions utiles : horaires, accès, contraintes de salle.">
              <textarea rows="5" value={merged.message} onChange={set("message")} />
            </FormField>
          </fieldset>

          <div className={`field ${errors.privacy ? "field--invalid" : ""}`.trim()}>
            <label className="check-line" htmlFor="privacy">
              <input
                id="privacy"
                type="checkbox"
                checked={Boolean(merged.privacy)}
                onChange={set("privacy")}
                aria-invalid={errors.privacy ? true : undefined}
                aria-describedby={errors.privacy ? "privacy-error" : undefined}
              />
              <span>
                J’accepte que ces informations soient conservées sur cet appareil pour préparer mon devis. Voir la{" "}
                <Link to="/confidentialite">politique de confidentialité</Link>.
              </span>
            </label>
            {errors.privacy ? (
              <p className="field-error" id="privacy-error" role="alert">
                {errors.privacy}
              </p>
            ) : null}
          </div>

          <PrimaryButton type="submit" disabled={busy}>
            {busy ? "Enregistrement…" : "Envoyer la demande"}
          </PrimaryButton>
        </form>
      </section>
    </>
  );
}
