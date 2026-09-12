import { Link } from "react-router-dom";

export function SecondaryButton({ to, children, type = "button", onClick, disabled, className = "", tone = "light", ...props }) {
  const classes = `btn btn-outline btn-outline--${tone} ${className}`.trim();
  if (to) {
    return (
      <Link className={classes} to={to} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
