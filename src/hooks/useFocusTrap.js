import { useEffect } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const root = ref.current;
    const previous = document.activeElement;
    const nodes = () => [...root.querySelectorAll(FOCUSABLE)].filter((el) => !el.hasAttribute("disabled"));

    const first = nodes()[0];
    first?.focus();

    const onKey = (event) => {
      if (event.key !== "Tab") return;
      const list = nodes();
      if (list.length === 0) return;
      const firstNode = list[0];
      const lastNode = list[list.length - 1];
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode.focus();
      }
    };

    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("keydown", onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [ref, active]);
}
