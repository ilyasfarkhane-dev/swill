import { Link } from "react-router-dom";

export function PrimaryButton({ to, children, type = "button", onClick, disabled, className = "", ...props }) {
  const classes = `btn btn-gold ${className}`.trim();
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
