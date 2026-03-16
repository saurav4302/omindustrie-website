# AGENTS.md

## Project Overview
- This repository is a static marketing website for OM Industries.
- Tech stack is plain `index.html`, `styles.css`, and `script.js` with image assets in `assets/images/`.
- There is no framework, bundler, package manager, or automated test setup in this repo.

## Core Working Rules
- Keep the site framework-free unless explicitly requested.
- Prefer minimal, targeted edits over broad rewrites.
- Preserve existing visual language: industrial theme, blue/orange accents, gradient surfaces, rounded cards, and current typography (`Rajdhani` + `Manrope`).
- Use semantic HTML and maintain current section-based structure (`hero`, `about`, `products`, `process`, `gallery`, `inquiry`).
- Maintain accessibility basics: alt text, form labels, button types, keyboard-safe interactions, and ARIA where relevant.

## File Responsibilities
- `index.html`: Page structure, content, SEO meta tags, and static section markup.
- `styles.css`: Design tokens (`:root` variables), layout, responsive behavior, transitions/animations.
- `script.js`: DOM behavior only (navigation toggle, reveal-on-scroll, hero slider, gallery filter, lightbox, dynamic year).
- `assets/images/*`: Product and brand imagery. Reuse existing naming style (`heatsink-product-XX.jpeg`).

## HTML Conventions
- Keep indentation to 2 spaces.
- Reuse existing utility patterns/classes before introducing new class families.
- If adding sections/components, follow current container pattern (`.container`, section class, eyebrow + heading + content blocks).
- Keep external dependencies minimal. Do not add third-party scripts without explicit request.

## CSS Conventions
- Prefer extending existing CSS variables in `:root` before hardcoding repeated values.
- Keep selectors readable and close to current naming style (kebab-case class names).
- Preserve mobile responsiveness; when adding layout rules, include/verify behavior for narrow screens.
- Avoid large `!important` usage and deep selector chains.

## JavaScript Conventions
- Use modern vanilla JS and current file style (`const`, arrow functions, optional chaining where useful).
- Guard DOM queries for optional elements (as current code does).
- Keep event handlers and UI state straightforward; avoid introducing heavy abstractions for small interactions.
- If adding features, ensure they degrade safely when relevant elements are missing.

## Content and Brand Guidance
- Tone should stay industrial, practical, and trust-focused (not overly promotional).
- Product copy should emphasize thermal performance, reliability, finish quality, and custom manufacturing support.
- Keep inquiry/contact flows intact unless specifically asked to change submission behavior.

## Validation Checklist For Changes
- Open `index.html` in browser and verify:
- Navigation toggle works on mobile widths.
- Hero slider arrows/dots and auto-advance still work.
- Gallery filter and lightbox open/close/navigation still work.
- Inquiry form fields and submit button render correctly.
- No broken image paths.
- No obvious layout regressions on desktop and mobile widths.

## Non-Goals Unless Requested
- Do not introduce React/Vue/Angular or build tooling.
- Do not restructure all classes or rename files broadly.
- Do not compress/replace all images in bulk.
- Do not remove existing sections/content for stylistic preference alone.

