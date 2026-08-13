---
name: Armando Bringas
description: Independent product-development portfolio for small and medium businesses.
colors:
  ink: "#141A28"
  ink-deep: "#1F2021"
  paper: "#F5F6FA"
  paper-line: "#D7DBE5"
  signal-orange: "#C96512"
  signal-orange-deep: "#8C4208"
typography:
  display:
    fontFamily: "Familjen Grotesk, sans-serif"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 400
rounded:
  control: "6px"
  surface: "8px"
spacing:
  compact: "8px"
  standard: "16px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.signal-graphite}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.signal-graphite-deep}"
---

# Design System: Armando Bringas

## Overview

**Creative North Star: "The Independent Software Studio"**

The system makes a compact professional practice feel as considered as a capable product team: calm, technical, and specific. It uses a cool-paper canvas, ink project imagery for the portfolio hero, and orange as the signal for decisions and contact—not decoration.

**Key Characteristics:**

- Editorial hierarchy rather than marketing noise.
- Technical precision without developer-culture clichés.
- Real project evidence is the visual material.

## Colors

The palette is restrained: ink carries authority, paper carries reading, and orange marks action.

### Primary

- **Signal Orange:** `#C96512` in both modes, used for primary actions, contact icons, active tabs, and focus states.

### Neutral

- **Studio Ink:** Used for primary text, rules, and high-contrast details.
- **Cool Paper:** Used for the page ground and reading surfaces.
- **Technical Rule:** Used for calm dividers and quiet component boundaries.

**The Signal Rule.** Orange is reserved for a visitor decision, an active state, or a meaningful link.

## Typography

**Display Font:** Familjen Grotesk

**Body Font:** Manrope

**Character:** The display face gives headlines a compact editorial edge; the body remains neutral and comfortable for project details and service explanations.

### Hierarchy

- **Display:** Dense, high-impact hero messaging with tight tracking.
- **Headline:** Section and project titles with clear weight contrast.
- **Body:** Comfortable reading measure, normally capped near 70ch.

## Layout

The navigation and information architecture remain stable. The portfolio hero is a centered, full-bleed project-image field with direct actions and compact contact utilities. Content returns to a centered, quiet reading column with generous section separation. Tabs preserve the existing service, process, portfolio, and contact workflow on all breakpoints.

## Elevation & Depth

Depth is structural rather than decorative. Default surfaces rely on clean boundaries; motion and color changes identify interaction. Shadows only appear where a modal needs protected focus.

## Shapes

Controls use subtly rounded corners: compact (6px) for buttons and tabs, composed (8px) for surfaces and project media. Pills are limited to tags.

## Components

### Buttons

- **Primary:** Translucent ink with a light blur and white text over the portfolio hero. Orange remains reserved for contact icons, active states, and meaningful links.
- **Secondary:** Transparent with white text over the portfolio hero.
- **Hover / Focus:** A small upward shift or stronger surface contrast; focus remains explicit.

### Cards / Containers

- **Corner Style:** Composed, modest rounding.
- **Border:** One calm technical rule.
- **Internal Padding:** Comfortable, content-led spacing.

### Navigation

- **Style:** Fixed paper/ink bar with a fine boundary line.
- **State:** Active tabs use the orange signal; inactive tabs remain quiet.

## Do's and Don'ts

### Do:

- **Do** let real project imagery and case-study detail provide proof.
- **Do** use the portfolio hero to establish the offer before presenting detail.
- **Do** preserve bilingual content, theme switching, and existing navigation paths.

### Don't:

- **Don't** use orange as a decorative accent across every surface.
- **Don't** introduce glassmorphism, neon glow, dashboard metrics, or generic agency imagery.
- **Don't** replace the established navigation structure during UI work.
