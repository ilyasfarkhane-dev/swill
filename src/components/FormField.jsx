import { Children, cloneElement, isValidElement } from "react";

export function FormField({ id, label, error, hint, children }) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`field ${error ? "field--invalid" : ""}`.trim()}>
      <label htmlFor={id}>{label}</label>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              id,
              "aria-invalid": error ? true : undefined,
              "aria-describedby": describedBy,
            })
          : child,
      )}
      {hint ? (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
