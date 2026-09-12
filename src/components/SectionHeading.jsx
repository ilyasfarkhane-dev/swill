export function SectionHeading({ eyebrow, title, intro, align = "left", id }) {
  return (
    <header className={`section-heading section-heading--${align}`} id={id}>
      {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </header>
  );
}
