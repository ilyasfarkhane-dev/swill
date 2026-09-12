import { email, futureDate, guests, phone, required } from "./validation.js";

export const reservationDefaults = {
  eventType: "",
  eventDate: "",
  city: "",
  address: "",
  guests: "",
  photobooth: "",
  installation: "oui",
  message: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  privacy: false,
  submittedAt: "",
};

export const reservationFieldOrder = [
  "eventType",
  "eventDate",
  "city",
  "address",
  "guests",
  "photobooth",
  "installation",
  "firstName",
  "lastName",
  "email",
  "phone",
  "privacy",
];

export const reservationFieldIds = {
  eventType: "r-eventType",
  eventDate: "r-eventDate",
  city: "r-city",
  address: "r-address",
  guests: "r-guests",
  photobooth: "r-photobooth-elegant",
  installation: "r-installation-oui",
  firstName: "r-firstName",
  lastName: "r-lastName",
  email: "r-email",
  phone: "r-phone",
  privacy: "r-privacy",
};

export function sanitizeReservation(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...reservationDefaults };
  }
  return {
    ...reservationDefaults,
    eventType: String(value.eventType ?? ""),
    eventDate: String(value.eventDate ?? ""),
    city: String(value.city || value.postalCode || ""),
    address: String(value.address ?? ""),
    guests: value.guests === undefined || value.guests === null ? "" : String(value.guests),
    photobooth: String(value.photobooth ?? ""),
    installation: value.installation === "non" ? "non" : "oui",
    message: String(value.message ?? ""),
    firstName: String(value.firstName ?? ""),
    lastName: String(value.lastName ?? ""),
    email: String(value.email ?? ""),
    phone: String(value.phone ?? ""),
    privacy: Boolean(value.privacy),
    submittedAt: String(value.submittedAt ?? ""),
  };
}

export function validateReservation(data) {
  return {
    eventType: required(data.eventType, "Choisissez votre type d’événement."),
    eventDate: futureDate(data.eventDate, "Sélectionnez une date future."),
    city: required(data.city, "Indiquez la ville de livraison."),
    address: required(data.address, "Indiquez l’adresse du lieu."),
    guests: guests(data.guests, "Indiquez le nombre approximatif d’invités."),
    photobooth: required(data.photobooth, "Choisissez un photobooth."),
    installation: required(data.installation, "Précisez si vous souhaitez l’installation."),
    firstName: required(data.firstName, "Indiquez votre prénom."),
    lastName: required(data.lastName, "Indiquez votre nom."),
    email: email(data.email, "Saisissez une adresse e-mail valide."),
    phone: phone(data.phone, "Indiquez un numéro de téléphone valide."),
    privacy: data.privacy ? "" : "Veuillez accepter la politique de confidentialité.",
  };
}

export function firstInvalidField(errors) {
  return reservationFieldOrder.find((key) => errors[key]) || "";
}
