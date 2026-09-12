import { CaretDown } from "@phosphor-icons/react";
import { useId, useState } from "react";

export function Accordion({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);
  const uid = useId();

  return (
    <div className="accordion">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${uid}-${item.id}`;
        const buttonId = `${panelId}-button`;
        return (
          <div className="accordion-item" key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span>{item.question}</span>
                <CaretDown size={18} aria-hidden="true" className={open ? "is-open" : undefined} />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
