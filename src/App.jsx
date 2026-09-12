import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import { SkipLink } from "./components/SkipLink.jsx";
import { Delivery } from "./pages/Delivery.jsx";
import { Events } from "./pages/Events.jsx";
import { Gallery } from "./pages/Gallery.jsx";
import { Home } from "./pages/Home.jsx";
import { Legal } from "./pages/Legal.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Photobooths } from "./pages/Photobooths.jsx";
import { Privacy } from "./pages/Privacy.jsx";
import { Quote } from "./pages/Quote.jsx";
import { Reservation } from "./pages/Reservation.jsx";
import { Tariffs } from "./pages/Tariffs.jsx";

export function App() {
  return (
    <div className="site-shell">
      <SkipLink />
      <ScrollToTop />
      <Header />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photobooths" element={<Photobooths />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/tarifs" element={<Tariffs />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/livraison" element={<Delivery />} />
          <Route path="/devis" element={<Quote />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/confidentialite" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
