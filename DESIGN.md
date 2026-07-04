---
name: Academic Warmth
colors:
  surface: '#fff8f3'
  surface-dim: '#e0d9d2'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ec'
  surface-container: '#f4ece6'
  surface-container-high: '#efe7e0'
  surface-container-highest: '#e9e1db'
  on-surface: '#1e1b17'
  on-surface-variant: '#4d4635'
  inverse-surface: '#33302c'
  inverse-on-surface: '#f7efe9'
  outline: '#7f7663'
  outline-variant: '#d0c5af'
  surface-tint: '#745b00'
  primary: '#745b00'
  on-primary: '#ffffff'
  primary-container: '#f2c94c'
  on-primary-container: '#6b5400'
  inverse-primary: '#ebc246'
  secondary: '#755843'
  on-secondary: '#ffffff'
  secondary-container: '#ffd8bd'
  on-secondary-container: '#7a5d47'
  tertiary: '#5f5e5a'
  on-tertiary: '#ffffff'
  tertiary-container: '#cfcdc7'
  on-tertiary-container: '#585753'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe08b'
  primary-fixed-dim: '#ebc246'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#584400'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#e5bfa5'
  on-secondary-fixed: '#2b1706'
  on-secondary-fixed-variant: '#5b412d'
  tertiary-fixed: '#e5e2dc'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474743'
  background: '#fff8f3'
  on-background: '#1e1b17'
  surface-variant: '#e9e1db'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style

The design system is built on the philosophy of **Academic Warmth**. While the pre-school category often leans into chaotic primary colors and playful shapes, this system pivots toward an established, institutional feel that reassures parents of academic rigor and professional care. It speaks to a "School POV"—emphasizing tradition, stability, and growth.

The visual style is **Corporate / Modern** with a soft, editorial edge. It utilizes generous whitespace to convey a sense of calm and organization. By avoiding typical "juvenile" tropes, the system establishes the school as a serious educational foundation, using the logo's yellow not as a toy-like accent, but as a prestigious, sun-lit highlight against sophisticated neutrals.

## Colors

The palette is anchored by the logo’s **Goldenrod Yellow** and **Deep Cocoa Brown**. To maintain a professional atmosphere, we move away from stark whites in favor of **Alabaster Cream** for surfaces, which provides a softer, more premium contrast.

- **Primary (Goldenrod):** Used for primary actions, highlights, and active states. It represents optimism and intellectual energy.
- **Secondary (Cocoa Brown):** Used for typography, iconography, and grounding elements. It replaces black to create a more organic, established feel.
- **Surface (Alabaster Cream):** The primary background color to reduce eye strain and provide a "paper-like" academic quality.
- **Accents (Warm Greys):** Used for subtle borders and secondary text to maintain hierarchy without adding visual noise.

## Typography

The typography strategy balances modern precision with high legibility. **Hanken Grotesk** is used for headlines to provide a sharp, contemporary "designer" feel that reflects institutional quality. **Source Sans 3** is utilized for body text, chosen for its exceptional readability in long-form parent handbooks and curriculum descriptions.

Headlines should use the Deep Cocoa Brown to ensure maximum authority. Key navigational labels and buttons use uppercase Hanken Grotesk with slight tracking to lean into the professional/corporate aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to maintain the structured, orderly feel of an educational institution. A 12-column grid is used with generous 80px gaps between major sections to prevent information density from feeling overwhelming.

- **Desktop:** 1200px max-width container, centered.
- **Tablet:** 8-column fluid grid with 32px side margins.
- **Mobile:** 4-column fluid grid with 16px side margins.

Content should feel "breathable." Use wide internal padding within cards (minimum 32px) to ensure the interface feels welcoming rather than cramped.

## Elevation & Depth

To align with the "trustworthy" and "professional" goals, the system uses **Tonal Layers** combined with **Ambient Shadows**. Instead of harsh black shadows, we use low-opacity shadows tinted with the Cocoa Brown (`rgba(74, 50, 31, 0.08)`) to maintain warmth.

- **Level 0 (Surface):** Alabaster Cream (#F9F6F0).
- **Level 1 (Cards):** Pure White (#FFFFFF) with a soft, 16px blur shadow. Used for curriculum modules or news items.
- **Level 2 (Modals/Overlays):** Pure White with a 32px blur shadow and 1px Cocoa Brown border at 5% opacity.

Depth is used sparingly to highlight interactive elements, keeping the overall experience grounded and "flat-plus."

## Shapes

The design system employs **Rounded** geometry (8px / 0.5rem base radius). This specific level of roundedness is "soft enough to be friendly, but sharp enough to be professional." 

- **Standard Elements (Buttons, Inputs):** 8px radius.
- **Large Containers (Cards, Images):** 16px radius (rounded-lg).
- **Icon Enclosures:** 12px or Circular (pill) if used for tags.

Avoid ultra-round or organic "blob" shapes, as they detract from the academic seriousness of the brand.

## Components

### Buttons
- **Primary:** Solid Cocoa Brown with White text. Use for "Enroll Now" or "Contact Us."
- **Secondary:** Alabaster Cream background with a 1px Cocoa Brown border.
- **Ghost:** Goldenrod Yellow text with no background, used for "Read More" links.

### Input Fields
Fields should use a White background with a 1px warm grey border. On focus, the border transitions to Goldenrod Yellow with a subtle glow. Labels are always positioned above the field in **label-sm** Cocoa Brown.

### Cards
Cards are the primary vehicle for curriculum details. They feature a White background, 16px corner radius, and a 1px #E0DCD5 border. Imagery within cards should have a 12px inner radius to create a "nested" look.

### Chips & Tags
Used for grade levels (e.g., "Pre-K," "Nursery"). These should use a light tint of the Primary Yellow background with Deep Cocoa Brown text to ensure readability and a professional look.

### Lists
Use custom bullet points: a small 6px Goldenrod Yellow square instead of standard circles to echo the architectural/structured nature of the school.