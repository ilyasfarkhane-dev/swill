import { images } from "../data/images.js";

export function PageHero({ eyebrow, title, children, compact = false, imageKey, imagePosition = "center top" }) {
  const image = imageKey ? images[imageKey] : null;

  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""} ${image ? "page-hero--media" : ""}`.trim()}>
      {image ? (
        <>
          <div
            className="page-hero-image"
            style={{
              backgroundImage: `url("${image.src}")`,
              backgroundPosition: imagePosition || image.position || "center top",
            }}
            role="img"
            aria-label={image.alt}
          />
          <div className="page-hero-shade" aria-hidden="true" />
        </>
      ) : null}
      <div className="page-hero-inner">
        {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {children ? <div className="page-hero-copy">{children}</div> : null}
      </div>
    </section>
  );
}
