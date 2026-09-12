import { isPastDate } from "./format.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+0-9\s().-]{8,22}$/;

export function required(value, message = "Ce champ est requis.") {
  if (String(value ?? "").trim()) return "";
  return message;
}

export function email(value, invalidMessage = "Saisissez une adresse e-mail valide.") {
  const empty = required(value, "L’adresse e-mail est requise.");
  if (empty) return empty;
  return emailPattern.test(value.trim()) ? "" : invalidMessage;
}

export function phone(value, invalidMessage = "Indiquez un numéro de téléphone valide.") {
  const empty = required(value, "Le téléphone est requis.");
  if (empty) return empty;
  const digits = String(value).replace(/\D/g, "");
  if (digits.length < 8 || !phonePattern.test(value.trim())) return invalidMessage;
  return "";
}

export function futureDate(value, message = "Sélectionnez une date future.") {
  const empty = required(value, message);
  if (empty) return empty;
  return isPastDate(value) ? message : "";
}

export function guests(value, message = "Indiquez le nombre approximatif d’invités.") {
  const empty = required(value, message);
  if (empty) return empty;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1) return message;
  return "";
}

export function firstError(errors) {
  return Object.values(errors).find(Boolean) || "";
}
