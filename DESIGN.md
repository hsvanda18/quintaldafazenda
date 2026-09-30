---
name: Quintal da Fazenda
description: Restaurante rústico no Patriota, Luanda. A casa lê-se como um talho de fazenda e uma brasa.
colors:
  mato-950: "#141b12"
  mato-900: "#1a2318"
  mato: "#202b1d"
  mato-700: "#2a3826"
  mato-600: "#374733"
  creme: "#efe3cf"
  creme-dim: "#cfc3ab"
  creme-mute: "#a99f8a"
  ouro: "#c9ab6e"
  ouro-claro: "#dcc393"
  ouro-escuro: "#9c8150"
  campo-claro: "#9cba84"
typography:
  display:
    fontFamily: "Ultra, Georgia, serif"
    fontSize: "clamp(2.75rem, 12.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Ultra, Georgia, serif"
    fontSize: "clamp(2.5rem, 10vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  title:
    fontFamily: "Ultra, Georgia, serif"
    fontSize: "clamp(1.35rem, 6.4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1
  item:
    fontFamily: "\"Zilla Slab\", Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
  price:
    fontFamily: "\"Zilla Slab\", Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    fontFeature: "\"tnum\" 1, \"lnum\" 1"
  body:
    fontFamily: "Karla, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "\"Zilla Slab\", Georgia, serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  xs: "2px"
  arch: "999px 999px 0 0"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  section: "56px"
  section-lg: "96px"
  page: "76rem"
components:
  button-ouro:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.mato-950}"
    typography: "{typography.price}"
    rounded: "{rounded.xs}"
    padding: "0 20px"
    height: "44px"
  button-ouro-hover:
    backgroundColor: "{colors.ouro-claro}"
  button-ouro-active:
    backgroundColor: "{colors.ouro-escuro}"
  button-linha:
    backgroundColor: "transparent"
    textColor: "{colors.creme}"
    rounded: "{rounded.xs}"
    padding: "0 20px"
    height: "44px"
  button-creme:
    backgroundColor: "{colors.mato-950}"
    textColor: "{colors.creme}"
    rounded: "{rounded.xs}"
    padding: "0 20px"
    height: "44px"
  button-creme-hover:
    backgroundColor: "{colors.mato-700}"
  etiqueta:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.mato-950}"
    typography: "{typography.price}"
    padding: "4px 12px 4px 24px"
    height: "34px"
  chip-corte:
    backgroundColor: "transparent"
    textColor: "{colors.creme-dim}"
    rounded: "{rounded.xs}"
    padding: "0 12px"
    height: "44px"
  chip-corte-on:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.mato-950}"
  campo:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.mato-950}"
    rounded: "{rounded.xs}"
    padding: "12px"
  comanda:
    backgroundColor: "{colors.creme}"
    textColor: "{colors.mato-950}"
    padding: "20px 32px 32px"
---

# Design System: Quintal da Fazenda

## Overview

**Creative North Star: "A Carta de Cortes"**

The site reads as a farm butcher's counter lit by a grill: the ox divided into cuts is the navigation for the grilled dishes, every price hangs on a cream butcher's tag tied with gold string, and the pre-order is the kitchen docket (comanda) that reaches the cooks before the guest arrives. Every colour comes from the logo: the deep bush-green ground, the cream lettering, the gold arch and rules, the field green inside the arch.

The surface is dark and flat, like a painted wooden sign. Gold appears only as one fine line: rules, arches, the ox outline, card borders. Cream is ink on the dark ground and becomes paper where the guest has to write or read a price: the tags, the docket, the form fields. Depth comes only from flat planes overlapping (a tag laid over an arch, a docket on the ground), never from shadows. A faint paper grain (7% opacity, overlay) covers everything.

Density is menu-like: long ruled lists, tabular prices, sticky category tabs. Display type is heavy wood-type, set loud and in uppercase; everything practical is set in a slab or a plain sans.

**Key Characteristics:**
- Dark bush-green ground in three tonal steps that alternate by section; no light theme.
- Gold used only as a single hairline (1px) or as the fill of a primary action or selected state.
- Cream paper objects (tag, docket, field) carry prices and input.
- Logo arch (full-round top, square base) with a 1px gold border and 6px inset frames photographs.
- Flat overlap for depth; no drop shadows.
- Tabular lining numerals on every price, time and date.

## Colors

A three-part palette taken from the logo: green ground, cream ink, gold hairline, plus a pale field green reserved for "open" and "in the order" states.

### Primary
- **Logo Gold** (ouro): Rules, the arch frame, the ox outline, card and ticket borders (at 30–60% opacity), the primary button fill, the selected cut and the active-tab underline. Also accents one phrase inside a display heading ("da terra", "antes de chegar").
- **Pale Gold** (ouro-claro): Hover on gold buttons, active tab text, photo captions, inline actions ("Adicionar ao pré-pedido"), the focus outline.
- **Burnt Gold** (ouro-escuro): Pressed gold button, the focus ring on cream fields, the scrollbar thumb.

### Secondary
- **Field Green** (campo-claro): Only for live, positive state: the "Aberto agora" dot and text, "No pré-pedido", completed-step ticks, and dietary tags. Never for decoration or large fills.

### Neutral
- **Bush Green** (mato): The page ground, the colour of the logo background; also the ox panel and ticket body.
- **Night Bush** (mato-950): The deepest ground (events section), text on gold and cream, the dark button on cream.
- **Deep Bush** (mato-900): Alternate section ground (carta, quintal) and the sticky tab bar.
- **Moss** (mato-700): Photo placeholder ground, the hover state for the dark button, label text on the docket.
- **Lichen** (mato-600): Placeholder text in cream fields only.
- **Logo Cream** (creme): Main text on green; the paper colour of tags, the docket and fields.
- **Aged Cream** (creme-dim): Secondary body copy, descriptions, idle tabs.
- **Faded Cream** (creme-mute): Tertiary notes ("Dados de demonstração"), sold-out names, the closed state.

### Named Rules
**The Logo Palette Rule.** Use only the logo-derived tokens. No new hues; tints come from opacity on existing tokens (`ouro/30`, `mato-950/40`).

**The Field Green Is A Signal Rule.** Field green means "open", "added" or "done". If it is not a live state or a tag, it is not green.

## Typography

**Display Font:** Ultra (with Georgia, serif)
**Item / Label Font:** Zilla Slab (with Georgia, serif)
**Body Font:** Karla (with system-ui, sans-serif)

**Character:** Heavy wood-type display from a painted farm sign, a sturdy slab for names, prices and labels, and a quiet humanist sans for the reading copy.

### Hierarchy
- **Display** (Ultra, clamp(2.75rem, 12.4vw, 6rem), 0.95, uppercase): The hero slogan only.
- **Headline** (Ultra, clamp(2.25rem–2.5rem, 9–10vw, 4.25rem–4.5rem), 0.95, uppercase): Section titles ("A Carta", "No quintal", "Reserve e peça").
- **Title** (Ultra, clamp(1.35rem, 6.4vw, 2.25rem), 1, uppercase): Menu category names centred in a gold rule; event titles (1.375–1.75rem); docket step headings (1.625–2rem).
- **Item** (Zilla Slab 600, 1.25rem, tight): Dish names. Tabs, chips and buttons use the same slab at 0.9375–1.0625rem.
- **Price** (Zilla Slab 600, 1.0625rem, tabular lining numerals): Inside every price tag; times and dates also use tabular numerals.
- **Body** (Karla 400, 1.0625rem, 1.55): Reading copy, capped at 34–52ch. Descriptions and notes step down to 0.9375rem and 0.875rem.
- **Label** (Zilla Slab 600, 0.8125rem, 0.14em, uppercase): Definition terms (Hoje / Onde / Jantar), form legends, docket row labels, the ticket month.

### Named Rules
**The Wood-Type Is For Headings Rule.** Ultra is only for uppercase headings and the ticket day number. Never use it for body text, buttons or prices.

**The Tabular Numbers Rule.** Every price, time, date, quantity and phone number uses tabular lining numerals.

## Layout

Single page, contained at 76rem, with 16px side padding (24px from `sm`). Sections are separated by a 1px gold rule at 30% opacity and alternate their ground between mato, mato-900 and mato-950. Vertical rhythm is 48–56px per section on mobile and 80–96px on desktop.

From `lg` the desktop uses a 12-column grid, usually split 7/5 or 5/7: heading and copy in 5 columns, the working object (docket, gallery) in 7; the hero slogan takes 7 with the arch in 5. The menu lists run in two columns on desktop. The grilled-meat block puts a sticky ox panel beside the list (5fr / 6fr). A fixed header, 3.5rem high (`--topo`), sits at the top, with the category tabs sticking just below it. On mobile everything stacks. The hero places the arch beside the practical facts, so the opening hours, address and price stay in the first viewport.

Touch targets are at least 44px (tabs 48px).

## Elevation & Depth

This system has no shadows. Depth comes from flat planes lying on top of each other: a price tag tilted −3° across the bottom of the arch, the cream docket set on the green ground, the ox panel on a darker section, the ticket's punched notches cut out in the section colour. The only `box-shadow` values in the build are not elevation: a 1px inset that draws the gold arch border (because a border would not follow the arch radius) and a 2px burnt-gold ring for focus on cream fields.

### Named Rules
**The Flat Overlap Rule.** To lift something, lay a flat plane over another plane in a different tone. Never add a drop shadow, glow or blur.

**The Single Hairline Rule.** Ornamental gold lines are 1px: rules, arch frames, borders, the string on the tag, ticket perforations. Only state markers can be heavier (the 2px active-tab underline, the 2px focus outline).

## Shapes

The corners are almost square. Buttons, chips, fields and steppers use a 2px radius, and everything else has sharp corners. There are three recurring silhouettes:

- **The arch** (999px 999px 0 0): the logo arch, used to frame photos. It has a 1px gold inset line and 6px of padding, and the photo inside repeats the same arch.
- **The butcher tag**: a cream rectangle with a pointed left end (a 12px clip), a 6px punched hole in the ground colour, and a 1px gold string leaving the hole at −24°.
- **The perforation**: dashed 1px lines in gold on green (ticket stubs) or in mato-950 at 30–40% on cream (docket rows, docket foot). On the ticket, round notches in the section colour are cut at the ends of the dashed line.

## Components

### Buttons
Solid, square-shouldered, set in slab.
- **Shape:** near-square (2px), min 44px high, 20px horizontal padding (28px on the hero).
- **Primary (Gold):** gold fill with night-bush text. Hover pale gold, pressed burnt gold. One per view: "Reservar", "Reservar e pré-pedir".
- **Outline (Linha):** transparent with a gold border at 70% and cream text. On hover the border goes to full gold and gets a 10% gold wash. Used for secondary actions on green.
- **Dark (Creme):** night-bush fill with cream text, the primary action on cream paper (the docket's "Continuar"). Hover moss.
- **Disabled:** 50% opacity, not-allowed cursor. Transitions are colour-only, 150–180ms.

### Chips (cut filter)
- **Style:** 2px radius, 1px gold border at 40%, aged-cream slab text, min 44px high.
- **State:** selected fills gold with night-bush text (`aria-pressed`). Hover sets the border to full gold.

### Cards / Containers
- **Corner Style:** square.
- **Background:** mato on a darker section; creme for paper objects.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px gold at 40–50%, or none on paper.
- **Internal Padding:** 16–24px mobile, up to 32px on the docket.

### Inputs / Fields
- **Style:** cream paper field (on the docket) with a 1px night-bush border at 40%, 2px radius, 12px padding, night-bush text. On green (the menu search) the field is night-bush with a 1px gold border at 50% and cream text.
- **Focus:** the border darkens to full night-bush and gets a 2px burnt-gold ring. On green the border goes to full gold. The global focus-visible style is a 2px pale-gold outline with a 3px offset.
- **Error:** the border becomes 2px dashed night-bush and a message with an alert icon appears below it. Error is shown by line style, not a red.

### Navigation
- **Header:** sticky, 3.5rem high, mato at 95% with a 2px blur and a 1px gold rule underneath. Wordmark in Ultra with "da" in gold, open-state indicator, slab links in aged cream that turn pale gold on hover, and a compact gold "Reservar" button.
- **Category tabs:** a sticky horizontal scroller below the header. Slab 1rem, aged cream. The active tab is pale gold with a 2px gold underline, and it follows the scroll position.

### Butcher Price Tag (signature)
The cream tag described in Shapes, set in slab with tabular numerals. It always hangs from a 1px gold string. When a dish is sold out, the price is struck through (2px) and the tag drops to 60% opacity, with "Esgotado hoje" set as a label.

### Ox Cut Diagram (signature)
A line drawing of the ox in 1.25-unit gold strokes (about 1px when rendered), with the cut divisions as 3/3 dashed lines. Each cut is a button. Tapping one fills it gold, turns its label night-bush and filters the grilled list below. A matching chip row repeats the filter as ordinary buttons for accessibility.

### Comanda (signature)
The pre-order and booking form, laid out as a kitchen docket on cream. It has a gold header band with a dashed bottom edge, a step counter in tabular slab ("Passo 2 de 5"), a five-segment progress bar, an Ultra step heading, dashed perforated rows for the summary, and a dashed foot above the actions. The floating order summary on mobile uses the same dashed rows.

### Event Ticket (signature)
A bordered strip ruled like a ticket. The stub on the left holds the month (label), the day in Ultra with tabular numerals, and the weekday. A dashed gold perforation separates the stub, with round notches in the section colour at each end. The action sits in its own stub behind a second perforation.

### Photo Placeholder
Moss ground with a 135° gold hatch at 9% opacity, captioned "Foto: …" in a pale-gold slab label on night-bush at 90%. On the hero and in the gallery it goes inside the arch frame.

## Do's and Don'ts

### Do:
- **Do** draw every ornamental line in gold at 1px, varying opacity (30–70%) instead of weight.
- **Do** put every price on a cream butcher tag with a hole and a gold string, set in tabular slab numerals.
- **Do** frame photographs in the logo arch: a 1px gold inset line and 6px of padding.
- **Do** create depth by overlapping flat planes: tilt a tag across an arch, or set a cream docket on the green ground.
- **Do** use dashed perforations for anything torn off or itemised: ticket stubs, docket rows.
- **Do** alternate section grounds between mato, mato-900 and mato-950, separated by a gold rule at 30%.
- **Do** keep field green for open, added and done states only.

### Don't:
- **Don't** add drop shadows, glows or blurred elevation anywhere.
- **Don't** introduce hues outside the logo palette, including a red for errors. Use a dashed 2px border and a message instead.
- **Don't** set body text, buttons or prices in Ultra.
- **Don't** round corners beyond 2px, except for the arch and the punched holes.
- **Don't** thicken ornamental gold lines. 2px is reserved for the active-tab underline and focus.
