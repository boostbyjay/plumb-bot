# JJJ Plumbing — Marketing Website

A fast, mobile-first marketing website for **JJJ Plumbing Inc**, a licensed residential and commercial plumbing contractor serving the San Gabriel Valley and Los Angeles County. Built to convert emergency and estimate-request traffic, most of which arrives on mobile.

## What's included

- **Top notification bar** with same-day dispatch messaging and a click-to-call number.
- **Sticky navbar** with logo, anchor navigation, license badge, and a "Call Now" button.
- **Mobile sticky bottom bar** with "Tap to Call" and a "Request Quote" modal trigger, visible on all mobile screens.
- **Hero section** with primary CTAs (call / free estimate) and trust badges (licensed & insured, 100% guarantee, upfront pricing, 24/7 emergency availability).
- **Services grid** covering Emergency Repairs, Drain Cleaning & Hydro Jetting, Water Heater Services, Sewer Line Repair & Replacement, and Commercial Plumbing.
- **Dedicated Commercial Plumbing section** for grease trap service, backflow testing, multi-unit maintenance, and tenant improvement work.
- **About section** with company stats (25 years in business, cities served, satisfaction guarantee, license number).
- **Lead capture / free estimate form** with client-side validation and a simulated success state (see "Wiring up the lead form" below to make it live).
- **Service Areas** section listing San Gabriel Valley and greater LA County cities served.
- **Testimonials carousel** with sample 4- and 5-star reviews (swap for real reviews once available).
- **FAQ accordion** answering common customer questions.
- **Footer** with contact info, license number, hours, and social links.
- **JSON-LD structured data** (`PlumbingContractor` schema) for local SEO.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) component primitives (built on [Base UI](https://base-ui.com))
- [Lucide](https://lucide.dev) icons
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via `next/font`

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The dev server runs on **http://localhost:47291** (a non-default port is used to avoid clashing with other local services — see the `dev` script in `package.json` if you'd like to change it).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, JSON-LD structured data
    page.tsx           # assembles all page sections
    globals.css         # Tailwind theme, brand color tokens (navy + amber)
  components/
    site/               # all page sections (header, hero, services, forms, footer, etc.)
    ui/                  # shadcn/ui primitives (button, input, dialog, accordion, ...)
  lib/
    site-config.ts       # single source of truth for company info, services, cities, reviews, FAQs
```

To update company details (phone number, license, hours, service areas, services, reviews, FAQ copy), edit `src/lib/site-config.ts` — everything on the site reads from there.

## Wiring up the lead form

The "Get a Free Estimate" form (`src/components/site/lead-form.tsx`) currently validates client-side and shows a success state, but does not send data anywhere yet — it's a safe placeholder since no email/SMS provider credentials were available at build time. To make it live, replace the `handleSubmit` body with a real integration, for example:

- **[Formspree](https://formspree.io)** — point the form at your Formspree endpoint and POST `values`.
- **[Resend](https://resend.com)** — call a Next.js Route Handler / Server Action that sends an email via Resend with the submitted lead details.
- **Server Action** — write a `"use server"` action that pushes the lead into your CRM or dispatch system directly.

The same form is reused both in the full-page "Free Estimate" section and inside the mobile "Request Quote" modal.

## Content that should be reviewed before going live

- **Testimonials** (`src/lib/site-config.ts` → `testimonials`) are realistic sample reviews, not real customer feedback. Replace with actual reviews (and consider pulling live from Google/Yelp) before launch.
- **Logo** (`public/jjj-plumbing-logo.png`) was provided by the client and optimized for web use.
- **Address / geo-coordinates** in the JSON-LD schema (`src/app/layout.tsx` via `siteConfig.address` / `siteConfig.geo`) use a San Gabriel, CA placeholder — update with the real business address and coordinates for accurate local SEO.
