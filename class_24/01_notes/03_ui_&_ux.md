# 1) Real UI/UX case study — *FoodNow: reduce checkout abandonment* (concise, shareable)

**Project goal:** reduce checkout abandonment on FoodNow (food-delivery app) by simplifying the final checkout screen and clarifying costs.

**Problem:** analytics showed 28% drop-off on checkout. Users reported surprise fees and unclear delivery ETA.

**Hypothesis:** simplify cost breakdown, surface the ETA and free-delivery threshold, and reduce form friction → fewer drop-offs.

**Process**

1. **Research (1 week)**

   * Analytics: funnel drop at Cart → Checkout (28%).
   * Session recordings: users open delivery fee detail, then leave.
   * 8 remote interviews: users said “I don’t trust final price”.
2. **UX goals**

   * Make final price transparent.
   * Ensure CTA is unambiguous.
   * Reduce fields and distractions.
3. **Wireframe (low-fi)**

   * Single column: Order summary, Cost breakdown (collapsible), ETA badge, Payment methods, Big CTA.
   * Move promo entry to optional drawer.
4. **Prototype & test (moderate-fi)**

   * A/B test control vs redesigned checkout with 200 users.
   * Usability test: 15 participants task-based (complete order).
5. **Metrics to measure**

   * Checkout completion rate
   * Time to complete checkout
   * Support tickets about pricing

**Design decisions**

* Always show Total prominently with currency and tag “Final price — no surprise fees.”
* Collapsible detailed fees but with label “Includes tax, service fee, delivery”.
* ETA badge with range (e.g., 25–35 min) and confidence icon.
* Remove optional fields from primary view (promos in drawer).
* Payment methods condensed into tappable cards; default selected uses last used.

**Outcome**

* A/B: Revised checkout ↑ completion rate from 72% → 83% (+11% absolute).
* Average checkout time ↓ 18%.
* Support tickets about pricing ↓ 34%.

**Key lessons**

* Transparency + single column flow reduces cognitive load.
* Prominent CTA + clear final price are the most important trust signals.
* Always validate with real traffic & measure.

---

# 2) How to design a screen in Figma — step-by-step (practical checklist)

Design the Checkout screen from the case study. Each step is what to do in Figma and why.

## Prep (set the foundations)

1. **Create a new file** → Page: “Checkout_v1”.
2. **Add a Frame** (`F`) for your device (Desktop 1440 or iPhone 14). Name it `Checkout / Desktop`.
3. **Set layout grid**: 12-col grid for desktop (gutter 16, margin 24). For mobile use 4-col grid or 8pt system.

## Build tokens (design system basics)

4. Create a **Styles** section:

   * Colors: Primary, Secondary, Surface, Text, Muted, Danger, Success.
   * Text styles: H1/H2/H3/Body/Small (we’ll define exact sizes later).
   * Effects: elevation shadows.
5. Create a **Components** page with basic atoms: Button, Input, Card, Badge.

## Sketch wireframe (low-fi)

6. Use rectangles and text (no color, only structure) to block:

   * Header (Back, title)
   * Order summary card
   * Cost breakdown (collapsible)
   * Payment options
   * CTA area (sticky bottom)
7. Keep it single column. Use Auto Layout on vertical stacks (spacing 16).

## Convert to hi-fi

8. Apply styles:

   * Background: surface color.
   * Order card: white card with medium shadow, 12px radius.
   * CTA: Primary filled button, full width on mobile.
9. Typography:

   * Title: H2
   * Totals: Bold, larger (H1 or H2)
   * Small text: secondary color
10. Use **Auto Layout** for the whole column: vertical, spacing 16, padding 20. This makes components responsive.

## Make components & variants

11. Make Buttons a component with variants: `default / disabled / loading`.
12. Payment method card as a component with states: `selected / unselected`. Use a check mark variant.

## Interaction & prototype

13. Add a prototype hotspot on CTA → checkout success screen. Add micro-interaction: press animation (scale 0.98) and a 300ms transition.
14. For collapsible fees: set “on click” to toggle overlay or animate height (Smart Animate).

## Accessibility + Handoff

15. Check color contrast (WCAG 4.5:1 for normal text ideally 7:1 for small text). Use plugins for contrast.
16. Add annotations in developer handoff: token names, padding values, type names.
17. Export assets: icons as SVG, images as compressed PNG/JPG.

## Prototype testing

18. Share prototype link, run 5–8 rapid usability sessions, collect tasks & time metrics, iterate.

---

# 3) UI rules — color, spacing, typography (practical system you can copy)

These are battle-tested rules. Use them as your baseline design system.

## Color rules

* **Primary color**: brand accent for primary CTA only. Use it sparingly.
* **Neutral palette**: at least 6 greys (bg, surface, border, text, muted, disabled).
* **Semantic colors**: success (green), error (red), warning (orange) — use only for states.
* **Contrast**: text must meet WCAG:

  * Body text ≥ 16px → contrast at least 4.5:1 (aim for 7:1 for small text).
  * UI color tokens: name them (e.g., `--color-primary-500`, `--color-neutral-900`).
* **Accessibility:** never use color alone to convey meaning — pair with icons or labels.
* **Accent / feedback:** use subtle tints for hover states — don’t change layout.

**Example tokens**

* `primary-50`, `primary-100`, `primary-300`, `primary-500` (brand)
* `neutral-0` (white), `neutral-100`, `neutral-300`, `neutral-600`, `neutral-900` (text)

## Spacing rules (8pt system)

* Use an **8px base grid** (or 4px if you want smaller increments). I recommend 8px.
* Common spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64 (multiples of 8 except 12).
* Use **spacing tokens**: `space-4`, `space-8`, `space-16`, ...
* Use **Auto Layout** in Figma with consistent padding: containers often use 16 or 24 padding.
* **Touch target**: minimum 44–48px height/width for tappable elements on mobile.
* **Card radii**: 8px for small, 12–16px for larger panels.
* **Gutters**: Desktop horizontal margins often 24–32px; grid columns follow 8px multiples.

## Typography rules

* Pick a clear variable or system font (e.g., Inter, Roboto, SF Pro).
* Define a limited scale. Example (8pt system + scale):

  * H1 — 36 / 40 (line height 44) — bold
  * H2 — 28 / 32 — semibold
  * H3 — 22 / 28 — semibold
  * Body — 16 / 24 — regular
  * Small — 14 / 20 — regular
  * Caption — 12 / 16 — regular
* **Line height**: 1.4–1.6 for body text; tighter for headings.
* **Letter spacing**: 0–0.2px for body; slightly negative for large headings if needed.
* **Font weight usage**: 400 regular for body, 600 for medium headings, 700 for strong emphasis (CTA label).
* **Scale consistency**: use tokens like `type-h1`, `type-body`, etc.

## UI micro-rules (quick checklist)

* CTA prominence: make primary CTA full width on mobile and sticky bottom on checkout pages.
* Visual hierarchy: use size, color, and spacing (in that order) to establish importance.
* Feedback: show immediate visual feedback for actions (pressed, loading spinner, disabled).
* Error states: inline error messages + red outline + accessible text.
* Empty states: include helpful CTA or microcopy — never blank.
* Motion: keep micro-interactions under 200–400ms. Use easing for natural feel.
* Icons: prefer 16/20/24px sizes; consistent stroke weight.

---

# Quick examples (apply immediately)

**Spacing example (container padding)**

* Header padding: `padding: 16px`
* Main column gap: `gap: 16px`
* Card padding: `padding: 20px` (use 16 or 24 depending on density)

**Button token example**

* `.btn-primary`:

  * height: 48px (mobile), border-radius: 12px
  * background: `primary-500`, color: `neutral-0`
  * padding: `0 16px`, font: `16px/24px 600`
  * hover: primary-600 (darker), active: scale 0.98

**Typography example**

* Body: `font-size: 16px; line-height: 24px; color: neutral-900`
* H2: `font-size: 28px; line-height: 32px; font-weight: 600`

---

# Final tips (practical, helps you ship)

* Start with **a few tokens** and enforce them. Don’t make dozens of one-off styles.
* Use **Auto Layout** in Figma for flexible, resizable components.
* Test contrast with a plugin and real devices.
* Prototype flows (not just screens) — users test flow, not static artboards.
* Measure after shipping: implement analytics on conversion points and iterate.