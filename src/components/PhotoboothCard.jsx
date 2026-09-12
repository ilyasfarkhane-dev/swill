import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { EditorialMedia } from "./EditorialMedia.jsx";

export function PhotoboothCard({ booth }) {
  return (
    <article className={`booth-card booth-card--${booth.composition}`}>
      <Link className="booth-card-hit" to={`/photobooths#${booth.id}`} aria-label={`Découvrir ${booth.name}`}>
        <EditorialMedia
          imageKey={booth.imageKey}
          placeholder={booth.placeholder}
          alt=""
        />
        <div className="booth-card-body">
          <p className="card-eyebrow">{booth.eyebrow}</p>
          <h3>{booth.name}</h3>
          <p className="booth-card-tagline">{booth.tagline}</p>
          <p>{booth.summary}</p>
          <ul>
            {booth.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <p className="booth-card-reco">
            <span>Idéal pour</span> {booth.recommended}
          </p>
          <span className="btn btn-gold">
            Découvrir <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
