import { images } from "../data/images.js";

export function EditorialMedia({
  imageKey,
  src,
  alt,
  position,
  placeholder,
  className = "",
  eager = false,
}) {
  const fromKey = imageKey ? images[imageKey] : null;
  const resolvedSrc = src || fromKey?.src;
  const resolvedAlt = alt || fromKey?.alt || "";
  const objectPosition = position || fromKey?.position || "center";

  if (resolvedSrc) {
    return (
      <div className={`media ${className}`.trim()}>
        <img
          src={resolvedSrc}
          alt={resolvedAlt}
          style={{ objectPosition }}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className={`media media--placeholder ${className}`.trim()} role="img" aria-label={resolvedAlt || placeholder?.label}>
      <span className="media-placeholder-label">{placeholder?.label || "Swillbox Maroc"}</span>
      {placeholder?.caption ? <span className="media-placeholder-caption">{placeholder.caption}</span> : null}
    </div>
  );
}
