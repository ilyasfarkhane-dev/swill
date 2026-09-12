import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { mainNav } from "../data/navigation.js";
import { useFocusTrap } from "../hooks/useFocusTrap.js";
import { PrimaryButton } from "./PrimaryButton.jsx";
import { SecondaryButton } from "./SecondaryButton.jsx";

export function MobileMenu({ open, onClose }) {
  const ref = useRef(null);
  useFocusTrap(ref, open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-nav-wrap">
      <button className="mobile-nav-backdrop" type="button" aria-label="Fermer le menu" onClick={onClose} />
      <nav className="mobile-nav" aria-label="Navigation mobile" ref={ref} id="menu-mobile">
        {mainNav.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : undefined)} onClick={onClose}>
            {item.label}
          </NavLink>
        ))}
        <SecondaryButton to="/devis" onClick={onClose}>
          Devis
        </SecondaryButton>
        <PrimaryButton to="/reservation" onClick={onClose}>
          Réserver
        </PrimaryButton>
      </nav>
    </div>
  );
}
