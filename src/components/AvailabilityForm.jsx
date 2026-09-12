import { ArrowRight, CalendarBlank, MapPin } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { eventTypes, storageKeys } from "../data/contact.js";
import { writeStorage } from "../utils/storage.js";
import { formatDate, todayISO } from "../utils/format.js";
import { futureDate, required } from "../utils/validation.js";

const initial = { eventType: "", date: "", city: "" };

export function AvailabilityForm({ variant = "hero", initialValues = initial }) {
  const [values, setValues] = useState({ ...initial, ...initialValues });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSuccess("");
  };

  const validate = () => {
    const next = {
      eventType: required(values.eventType, "Choisissez un type d’événement."),
      date: futureDate(values.date),
      city: required(values.city, "Indiquez une ville ou un code postal de livraison."),
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setSuccess("");
      return;
    }
    setBusy(true);
    const payload = { ...values, checkedAt: new Date().toISOString() };
    writeStorage(storageKeys.availability, payload);
    window.setTimeout(() => {
      setSuccess(
        `Bonne nouvelle ! Votre demande pour ${values.eventType} à ${values.city.trim()} le ${formatDate(values.date)} peut être étudiée. Continuez pour recevoir votre devis personnalisé.`,
      );
      setBusy(false);
    }, 350);
  };

  const quoteSearch = new URLSearchParams({
    evenement: values.eventType,
    date: values.date,
    ville: values.city,
  }).toString();

  return (
    <form className={`availability availability--${variant}`} id="disponibilite" onSubmit={onSubmit} noValidate>
      <p className="availability-note">Demande de vérification — la disponibilité réelle sera confirmée par l’équipe.</p>
      <label className={errors.eventType ? "is-invalid" : undefined}>
        <CalendarBlank size={24} aria-hidden="true" />
        <span>
          <b>Type d’événement</b>
          <select
            value={values.eventType}
            onChange={set("eventType")}
            aria-invalid={errors.eventType ? true : undefined}
            aria-describedby={errors.eventType ? "avail-event-error" : undefined}
          >
            <option value="">Sélectionner</option>
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.eventType ? (
            <em id="avail-event-error" className="inline-error">
              {errors.eventType}
            </em>
          ) : null}
        </span>
      </label>
      <label className={errors.date ? "is-invalid" : undefined}>
        <CalendarBlank size={24} aria-hidden="true" />
        <span>
          <b>Date</b>
          <input
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={set("date")}
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={errors.date ? "avail-date-error" : undefined}
          />
          {errors.date ? (
            <em id="avail-date-error" className="inline-error">
              {errors.date}
            </em>
          ) : null}
        </span>
      </label>
      <label className={errors.city ? "is-invalid" : undefined}>
        <MapPin size={24} aria-hidden="true" />
        <span>
          <b>Ville ou code postal de livraison</b>
          <input
            value={values.city}
            onChange={set("city")}
            placeholder="Ville ou code postal"
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={errors.city ? "avail-city-error" : undefined}
          />
          {errors.city ? (
            <em id="avail-city-error" className="inline-error">
              {errors.city}
            </em>
          ) : null}
        </span>
      </label>
      <button className="availability-submit" type="submit" disabled={busy}>
        {busy ? "Vérification…" : "Vérifier la disponibilité"} <ArrowRight size={20} aria-hidden="true" />
      </button>
      {success ? (
        <p className="form-message form-message--success" role="status">
          {success}{" "}
          <Link to={`/devis?${quoteSearch}`}>Recevoir un devis</Link>
        </p>
      ) : null}
    </form>
  );
}
