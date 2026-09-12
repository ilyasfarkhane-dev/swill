import { contact } from "../data/contact.js";

export function BrandLogo({ className = "" }) {
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src="/assets/swill-logo.png"
      alt={contact.brand}
      width="280"
      height="120"
    />
  );
}
