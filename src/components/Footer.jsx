import { InstagramLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { contact } from "../data/contact.js";
import { footerNav, legalNav } from "../data/navigation.js";
import { BrandLogo } from "./BrandLogo.jsx";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="footer-logo" to="/" aria-label={contact.brand}>
            <BrandLogo />
          </Link>
          <p>{contact.description}</p>
        </div>
        <div>
          <p className="footer-title">Navigation</p>
          <ul>
            {footerNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Livraison</p>
          <p>Livraison au Maroc, sur l’adresse de votre événement, sous réserve de disponibilité.</p>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
          </p>
          <p>
            <a className="footer-social" href={contact.instagramUrl} rel="noreferrer" target="_blank">
              <InstagramLogo size={18} aria-hidden="true" /> {contact.instagramHandle}
            </a>
          </p>
        </div>
      </div>
      <div className="footer-base">
        <p>
          © {year} {contact.legalName}
        </p>
        <ul>
          {legalNav.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
