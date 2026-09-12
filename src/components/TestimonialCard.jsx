export function TestimonialCard({ item }) {
  return (
    <blockquote className="testimonial-card">
      <p>« {item.quote} »</p>
      <footer>
        <strong>{item.name}</strong>
        <span>
          {item.event} · {item.city}
        </span>
      </footer>
    </blockquote>
  );
}
