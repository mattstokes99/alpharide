# AlphaRide

Pre-launch teaser website for AlphaRide, an independent mobility company planning to operate a fleet of Tesla Cybercabs in Alpharetta, Georgia once the platform is commercially available to fleet operators.

Static HTML/CSS/JS — no build step, no dependencies. Open any `.html` file directly in a browser, or serve the folder with any static file server.

## Structure

- `index.html` — Home (hero, why Cybercab, roadmap, locations teaser)
- `about.html` — About (vision, independence disclosure)
- `locations.html` — Planned locations, filterable (Live Now / Coming Soon)
- `contact.html` — Waitlist signup form
- `css/styles.css` — shared styles
- `js/main.js` — mobile nav, location filter, scroll reveal, waitlist form handling

## Important: trademark & copyright notes

- **AlphaRide is independent and not affiliated with Tesla, Inc.** This disclaimer appears in the header strip and footer of every page — keep it if content changes.
- **No Tesla photography is used anywhere on this site.** The hero vehicle graphic is an original illustration (inline SVG), not a Tesla photo or render. If you later obtain a license to use real Cybercab photography, review the terms carefully before swapping it in — using Tesla's marketing images without permission is a copyright and trademark risk.
- Vehicle specs/pricing referenced (2-seat, ~$30K target, electric) are drawn from Tesla's own public statements and are explicitly framed as estimates, not guarantees.

## Before launch

- Replace placeholder email/contact details.
- Wire up the waitlist form: create a form at [Formspree](https://formspree.io) (or similar) and replace `YOUR_FORM_ID` in `contact.html`'s form `action`.
- Confirm the locations list against your actual planned service area before publicizing it further — the current list is drawn from publicly reported Alpharetta developments, not confirmed property partnerships.
- Add real founder/company information on the About page.
- Revisit all Tesla/Cybercab references with legal counsel before any real-world launch or marketing spend, given the trademark sensitivity of referencing another company's product by name.
