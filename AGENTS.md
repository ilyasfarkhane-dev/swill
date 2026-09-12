# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Swillbox Maroc product rules

- Brand name: Swillbox Maroc. Delivery only in Morocco — never mention France as a service area.
- Delivery only: the photobooth is brought to the event address and collected afterwards. Never mention pickup points, point relais, or customer collection.
- Installation is optional, included in some packages.
- Public copy is professional French. No Lorem Ipsum. No fabricated fixed prices — use « Sur devis ».
- Contact, legal, and dimension values live in `src/data/` and remain placeholders until confirmed.
- Preserve the established navy / champagne-gold / ivory editorial language (Cormorant Garamond + Inter).
- Quote and reservation flows persist in LocalStorage only; never claim a backend confirmation or sent e-mail.
