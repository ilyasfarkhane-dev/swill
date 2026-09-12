import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { mainNav } from "../data/navigation.js";
import { BrandLogo } from "./BrandLogo.jsx";
import { MobileMenu } from "./MobileMenu.jsx";
import { PrimaryButton } from "./PrimaryButton.jsx";
import { SecondaryButton } from "./SecondaryButton.jsx";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 950) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={`header ${compact ? "header--compact" : ""}`.trim()}>
      <NavLink className="brand" to="/" end onClick={() => setMenuOpen(false)}>
        <BrandLogo />
      </NavLink>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {mainNav.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : undefined)}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions">
        <SecondaryButton to="/devis">Devis</SecondaryButton>
        <PrimaryButton to="/reservation">Réserver</PrimaryButton>
      </div>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
        aria-controls="menu-mobile"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={25} /> : <List size={27} />}
      </button>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
