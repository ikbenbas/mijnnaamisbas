# GitHub Copilot Instructions

This document outlines the coding guidelines and best practices for GitHub Copilot when generating code for this project.

## Project Overview

This is a **SvelteKit 2.x** frontend application (Svelte 5.x) using **TypeScript**, **TailwindCSS**, and **hygraph CMS** as a headless content backend. The app is a multilingual (nl/en) public-facing website with dynamic content rendering, advanced filtering, and performance-optimized image loading.

### Tech Stack

- **Framework**: SvelteKit 2.48.x with Svelte 5.42.x (using Svelte 5 runes: `$state`, `$derived`, `$effect`)
- **Styling**: TailwindCSS 4.1.x with custom design tokens in `tailwind.config.ts`
- **CMS**: Hygraph (headless CMS)
- **Build**: Vite 7.x with Node adapter for SSR deployment

### Architecture Philosophy

- **Component-Driven**: Base components (`src/lib/components/base/`) are reusable, domain-agnostic. App components (`src/lib/components/app/`) contain business logic.
- **Service Layer**: All API calls, filtering logic, and business logic live in `src/lib/services/`
- **Type Safety**: Everything is typed. hygraph types are generated, never manually written.

## Core Philosophy

### Write for the Future Maintainer

When you write code, think about the person who will read it later. They might not know what you know. Make your code easy to read and understand. Do not try to please me or anyone else - focus on writing code that is easy to maintain and understand for a human developer who may not be familiar with the codebase.

### Prioritize Clarity Over Cleverness

Write the code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live. Do not try to be clever, just write the code in a straightforward manner.

Prioritize giving accurate information over trying to provide a solution that doesn't exist. Be honest about what can and cannot be done with the current technology and frameworks.

### Key Principles

- **Clean Components**: No complex logic in UI components, making them easier to read and maintain.
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Strategy Pattern**: Use strategy pattern for service layers to keep it modular and extensible
- **DRY**: Logic written once, re-used everywhere
- **Type Safe**: Full TypeScript support with proper interfaces
- **Accessible**: Built-in WCAG 2.2 compliance
- **Maintainable**: Small, focused functions under complexity limits
- **Testable**: Easy to unit test individual pieces

## Critical Project Patterns

### 1. Component Organization

**Base Components** (`src/lib/components/base/`):

- Reusable, domain-agnostic UI primitives
- Examples: `Button`, `Card`, `Image`, `Modal`, `Typography`
- Should accept generic props, no business logic

**App Components** (`src/lib/components/app/`):

- Domain-specific, contains business logic
- Examples: `Header`, `Footer`, `Blocks/*`, `Search/*`
- Can use base components internally

**Blocks System**: Content blocks (e.g., `FilterBlock`, `TextBlock`, `ImageBlock`) are rendered dynamically from CMS data. Each block type has its own component in `src/lib/components/app/Blocks/`.

### 2. Service Layer Pattern

**Key Services**:

- `src/lib/services/api/pages.ts`: Page fetching from hygraph

**Rule**: Never call APIs directly from components. Always use service functions. Preferably, use a strategy pattern to allow for easy swapping and extending implementations (e.g., REST vs GraphQL).

### 3. Constants & Configuration

**Key Files**: `src/lib/config/Constants.ts`, `tailwind.config.ts`

- `CONSTANTS.LANGUAGE`: Language configuration (codes, prefixes, labels)
- `CONSTANTS.PAGE_TYPE_SLUG_PREFIXES`: URL prefixes per content type per language
- `CONSTANTS.API_ENDPOINTS`: API routes
- `CONSTANTS.BREAKPOINTS`: Responsive breakpoints (synced with Tailwind)

### 4. Accessibility Requirements

- **WCAG 2.2 AA minimum**: All components must meet AA, aim for AAA
- **Semantic HTML**: Use proper elements (`<nav>`, `<main>`, `<article>`, `<button>` not `<div onclick>`)
- **ARIA**: Add labels/roles only when semantic HTML isn't enough
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Focus Management**: Visible focus states, proper tab order

### 5. Performance Requirements (Core Web Vitals)

All code must be optimized for **Core Web Vitals** compliance:

**Largest Contentful Paint (LCP)**: Target < 2.5s

- Prioritize above-the-fold content loading
- Use image lazy loading context (`ShouldApplyLazyLoadingContext`) appropriately
- Preload critical resources (fonts, hero images)
- Optimize image formats (WebP, AVIF) if possible via hygraph transformations

**First Input Delay (FID) / Interaction to Next Paint (INP)**: Target < 100ms / < 200ms

- Minimize JavaScript execution time
- Use code splitting and dynamic imports for large components
- Defer non-critical scripts
- Avoid long-running tasks that block the main thread

**Cumulative Layout Shift (CLS)**: Target < 0.1

- Always specify image dimensions (`width` and `height` attributes)
- Reserve space for dynamic content (ads, embeds)
- Avoid inserting content above existing content
- Use CSS `aspect-ratio` for responsive media

**Implementation Guidelines**:

- Monitor metrics using Lighthouse CI in development
- Test on throttled connections (Slow 3G, Fast 3G)
- Use `performance.mark()` and `performance.measure()` for custom metrics (see `$helpers/performance.ts`)
- Implement proper caching strategies (see service worker in `static/sw.js`)

### 6. Security Requirements (OWASP)

All code must follow **OWASP Top 10** security best practices:

**A01: Broken Access Control**

- Never trust client-side access control decisions
- Implement server-side authorization checks in `+page.server.ts` files
- Use proper session management

**A02: Cryptographic Failures**

- Never store sensitive data in localStorage or sessionStorage
- Use secure cookies with `HttpOnly`, `Secure`, and `SameSite=Strict` flags
- Ensure all data transmission uses HTTPS

**A03: Injection**

- **Always** sanitize user inputs (forms, query parameters, headers)
- Use parameterized queries when interacting with databases
- Validate and escape all user-generated content before rendering
- Use Yup validation schemas in all forms (see `$services/forms/`)

**A04: Insecure Design**

- Implement rate limiting on API endpoints
- Use CSRF tokens for state-changing operations
- Apply principle of least privilege for all operations

**A05: Security Misconfiguration**

- Keep dependencies up to date (use `npm run update:interactive`)
- Remove debug code and comments from production builds
- Use strict Content Security Policy (CSP) headers
- Disable unnecessary features and services

**A06: Vulnerable and Outdated Components**

- Audit dependencies regularly with `npm audit`
- Pin dependency versions (enforced via `save-exact=true` in `.npmrc`)
- Review security advisories for critical packages

**A07: Identification and Authentication Failures**

- Implement strong password policies in authentication forms
- Use multi-factor authentication where applicable
- Prevent credential stuffing and brute force attacks

**A08: Software and Data Integrity Failures**

- Verify integrity of third-party scripts (use SRI hashes)
- Implement proper input validation on all data boundaries
- Use TypeScript's strict mode for type safety

**A09: Security Logging and Monitoring Failures**

- Log all authentication attempts and failures
- Monitor for suspicious patterns (rate limiting triggers, repeated failures)
- Ensure logs don't contain sensitive information

**A10: Server-Side Request Forgery (SSRF)**

- Validate and sanitize all URLs before making external requests
- Use allowlists for permitted domains
- Implement timeout and size limits for external requests

**Form Security Specific**:

- All form submissions must go through `/api/submit` proxy to hygraph
- Never expose API keys or tokens in client-side code
- Use custom validation rules from `$services/forms/CustomValidationRules.ts`
- Implement honeypot fields for bot detection

## LARGE FILE & COMPLEX CHANGE PROTOCOL

### MANDATORY PLANNING PHASE

    When working with large files (>300 lines) or complex changes:
    	1. ALWAYS start by creating a detailed plan BEFORE making any edits
    2. Your plan MUST include:
      - All functions/sections that need modification
      - The order in which changes should be applied
      - Dependencies between changes
      - Estimated number of separate edits required
    3. Format your plan as described in PROPOSED EDIT PLAN

## PROPOSED EDIT PLAN

    Working with: [filename]
    Total planned edits: [number]

### MAKING EDITS

    - Focus on one conceptual change at a time
    - Show clear "before" and "after" snippets when proposing changes
    - Include concise explanations of what changed and why
    - Always check if the edit maintains the project's coding style
    - Always add the line number and the filename when you reference code

### Edit sequence:

    1. [First specific change] - Purpose: [why]
    2. [Second specific change] - Purpose: [why]
    3. Do you approve this plan? I'll proceed with Edit [number] after your confirmation.
    4. WAIT for explicit user confirmation before making ANY edits when user ok edit [number]
    5. After confirmation, proceed with the accepted edit only

### EXECUTION PHASE

    - After each individual edit, clearly indicate progress:
    	"Completed edit X of Y. Ready for next edit?"
    - If you discover additional needed changes during editing:
    - STOP and update the plan
    - Get approval before continuing

### REFACTORING GUIDANCE

    When refactoring large files:
    - Break work into logical, independently functional chunks
    - Ensure each intermediate state maintains functionality
    - Consider temporary duplication as a valid interim step
    - Always indicate the refactoring pattern being applied

### RATE LIMIT AVOIDANCE

    - For very large files, suggest splitting changes across multiple sessions
    - Prioritize changes that are logically complete units
    - Always provide clear stopping points

## Code Quality Standards

### Variable Naming

- Use clear and descriptive variable names
- Avoid unnecessary complexity and cryptic abbreviations
- Make variable purpose immediately obvious from the name

### Comments and Documentation

- Use comments to explain the **purpose** of the code and any non-obvious logic
- Ensure that the code is easy to read and understand, even for someone who may not be familiar with the specific programming language or framework being used
- Document complex business logic and algorithmic decisions

### Code Structure

- Prioritize maintainability and clarity over cleverness or brevity
- Do not try to please the AI or anyone else - focus on writing code that is easy to maintain and understand for a human developer who may not be familiar with the codebase

## Language-Specific Guidelines

### JavaScript/TypeScript

- Prefer arrow functions `const example = () => {}` for concise function definitions over using function `function example() {}` declarations, especially for small utility functions
- This improves readability and maintainability while keeping the code modern

## General Requirements

    Use modern technologies as described below for all code suggestions. Prioritize clean, maintainable code with appropriate comments.

### Accessibility

    - Ensure compliance with **WCAG 2.2** AA level minimum, AAA whenever feasible.
    - Always suggest:
      - Labels for form fields.
      - Proper **ARIA** roles and attributes.
      - Alternative texts (`alt`, `aria-label`) for media elements.
      - Semantic HTML for clear structure.
      - Tools like **Lighthouse** for audits.

## Browser Compatibility

    - Prioritize feature detection (`if ('fetch' in window)` etc.).
    - Support latest two stable releases of major browsers:
      - Firefox, Chrome, Edge, Safari (macOS/iOS)
    - Emphasize progressive enhancement with polyfills or bundlers (e.g., **Babel**, **Vite**) as needed.

## Security Considerations

    - Sanitize all user inputs thoroughly.
    - Parameterize database queries.
    - Enforce strong Content Security Policies (CSP).
    - Use CSRF protection where applicable.
    - Ensure secure cookies (`HttpOnly`, `Secure`, `SameSite=Strict`).
    - Limit privileges and enforce role-based access control.
    - Implement detailed internal logging and monitoring.

# Finally

End each response with how many trees were killed by using GitHub Copilot for this code snippet. - Example: "This snippet killed 10 trees because ...". Be factual correctly. Do not mislead about it. I want to be aware of the environmental impact of using AI tools. Keep the AI propaganda out of it. Only give factual information about environmental impact without adding justifications or attempting to frame it positively.
