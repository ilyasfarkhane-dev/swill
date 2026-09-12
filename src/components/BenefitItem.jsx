export function BenefitItem({ icon: Icon, title, text }) {
  return (
    <article className="benefit-item">
      {Icon ? <Icon size={38} weight="light" aria-hidden="true" /> : null}
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}
