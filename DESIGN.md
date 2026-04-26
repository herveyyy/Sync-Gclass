---
name: Playful Neo-Brutalism
colors:
  surface: "#fff9e6"
  surface-dim: "#dfdac6"
  surface-bright: "#fff9e6"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f9f4df"
  surface-container: "#f3eeda"
  surface-container-high: "#eee8d4"
  surface-container-highest: "#e8e3cf"
  on-surface: "#1d1c10"
  on-surface-variant: "#4a4731"
  inverse-surface: "#333123"
  inverse-on-surface: "#f6f1dc"
  outline: "#7c785f"
  outline-variant: "#cdc7aa"
  surface-tint: "#686000"
  primary: "#686000"
  on-primary: "#ffffff"
  primary-container: "#ffec00"
  on-primary-container: "#736a00"
  inverse-primary: "#d9c900"
  secondary: "#0050cc"
  on-secondary: "#ffffff"
  secondary-container: "#0266ff"
  on-secondary-container: "#f9f7ff"
  tertiary: "#446900"
  on-tertiary: "#ffffff"
  tertiary-container: "#b8fd4b"
  on-tertiary-container: "#4c7300"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#f8e600"
  primary-fixed-dim: "#d9c900"
  on-primary-fixed: "#1f1c00"
  on-primary-fixed-variant: "#4e4800"
  secondary-fixed: "#dae1ff"
  secondary-fixed-dim: "#b3c5ff"
  on-secondary-fixed: "#001849"
  on-secondary-fixed-variant: "#003fa4"
  tertiary-fixed: "#b2f746"
  tertiary-fixed-dim: "#98da27"
  on-tertiary-fixed: "#121f00"
  on-tertiary-fixed-variant: "#334f00"
  background: "#fff9e6"
  on-background: "#1d1c10"
  surface-variant: "#e8e3cf"
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: "800"
    lineHeight: "1.1"
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: "800"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: "700"
    lineHeight: "1.3"
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: "500"
    lineHeight: "1.5"
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "500"
    lineHeight: "1.5"
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "700"
    lineHeight: "1.2"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 8px
  sm: 16px
  md: 32px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built for a demographic that demands tactile feedback and high-energy engagement. The brand personality is unapologetically loud, joyful, and adventurous. By combining the raw, structural integrity of Neo-brutalism with a primary-school color palette, the UI creates a digital playground that feels physical and indestructible.

The aesthetic prioritizes clarity through extreme contrast. Every element is defined by heavy strokes, ensuring that interactive components are unmistakable. The emotional response is one of confidence and fun—removing the preciousness of "glossy" modern interfaces in favor of a "comic book" or "sticker book" feel that invites exploration and frequent interaction.

## Colors

The palette is anchored in high-saturation primary and secondary colors to ensure maximum visual stimulation and clear functional mapping.

- **Sunny Yellow:** Use for primary actions and highlights.
- **Bright Blue:** Use for secondary information and interactive links.
- **Lime Green:** Use for success states and growth-related metaphors.
- **Punchy Orange:** Use for warnings or high-priority attention grabbers.

The background remains a crisp white to allow the colors to pop, while the universal 4px black border provides the necessary structure to contain the high-energy palette. Contrast ratios are strictly maintained to ensure all text is legible for developing eyes.

## Typography

This design system utilizes **Plus Jakarta Sans** for its friendly, rounded terminals and geometric clarity. The typography is scaled larger than standard applications to accommodate younger users who are still developing reading fluency and motor skills.

Headlines should use the ExtraBold (800) weight to maintain the "chunky" visual language of the borders. Body text is kept at a minimum of 18px to ensure legibility across all device types. Letter spacing is slightly increased for labels to prevent characters from "clumping" visually.

## Layout & Spacing

The layout philosophy follows a **fluid grid** with exaggerated "safe zones." Because the target audience often uses tablets or touchscreen devices, touch targets are oversized, and white space is used aggressively to prevent accidental taps.

A 12-column grid is used for desktop, while a 4-column grid is used for mobile. Gutters are kept wide (24px) to ensure that the thick 4px borders of adjacent elements do not feel cluttered or visually overwhelming. All spacing is derived from an 8px base unit, though the system leans heavily into "Large" and "Extra Large" increments for a spacious, easy-to-navigate feel.

## Elevation & Depth

Depth in this design system is purely structural and non-illusory. There are no blurs, gradients, or soft ambient shadows. Instead, we use **Hard Shadows** (also known as "Drop-block" shadows).

- **Shadow Character:** 100% opacity black (#000000).
- **Direction:** Bottom-right offset (45 degrees).
- **Distance:** 4px for small elements (chips), 8px for medium elements (buttons/cards), and 12px for large containers.
- **Interaction:** When an element is pressed, the shadow offset should reduce to 0px, and the element should translate 4px or 8px towards the shadow, simulating a physical "button press."

## Shapes

The shape language is a mix of structured containers and whimsical decorative geometry.

- **Containers:** All UI elements (buttons, inputs, cards) use a `rounded-lg` (1rem) or `rounded-xl` (1.5rem) corner radius. This softens the aggressive nature of the thick black borders and makes the UI feel approachable.
- **Decorative Elements:** Simple circles, stars, and squiggles are used as background motifs. These elements follow the same 4px border rule but often omit the hard shadow to remain in the background hierarchy.
- **Borders:** A minimum 4px black stroke is mandatory on all interactive or containing elements.

## Components

### Buttons

Buttons are the core of this design system. They must feature a 4px black border, a high-saturation background color (Primary Yellow or Secondary Blue), and an 8px hard black shadow. Text inside buttons must be bold and centered.

### Cards

Cards use a white background with a 4px black border and a 12px hard shadow. Headlines within cards should be "Headline-MD" or "Headline-LG."

### Inputs

Input fields use a white background and a 4px black border. When focused, the border color remains black, but the shadow can shift to a secondary color (Blue or Orange) to indicate activity. The "tap target" height for inputs is a minimum of 64px.

### Chips & Tags

Chips are pill-shaped (using `rounded-xl`) with 4px borders. These are perfect for categorical labels or "sticker" style rewards.

### Checkboxes & Radios

These are oversized (min 32x32px) to ensure easy selection. Checkboxes use a thick 4px border and, when checked, fill with a vibrant color and a large black "X" or checkmark.

### Decorative Squiggles

Custom SVG paths with a 6px stroke width used to divide sections or highlight specific headings, reinforcing the playful, hand-drawn energy of the brand.
