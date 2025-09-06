@ -1,2 +1,169 @@
# Portfolio
This is my personal portfolio website - Describe about my profession.
# Portfolio — Dinesh R

This repository contains a compact, responsive personal portfolio website built with plain
HTML, CSS and JavaScript. It showcases projects, a brief bio, services, and a contact form
that sends messages using a third-party email service.

## Table of contents

- [Project overview](#project-overview)
- [Features](#features)
- [Tech stack & libraries](#tech-stack--libraries)
- [File structure](#file-structure)
- [How to run locally](#how-to-run-locally)
- [System design](#system-design)
- [Notes & next steps](#notes--next-steps)

## Project overview

This is a static single-page portfolio site with the following sections:

- Home (hero, social links, CV download)
- About (profile and short bio)
- Services (high-level offering)
- Portfolio (project thumbnails and links)
- Contact (form to send email)

The site is intentionally simple and optimized for easy deployment to static hosting
providers (GitHub Pages, S3, Netlify, etc.).

## Features

- Responsive single-page layout
- Animated UI using ScrollReveal
- Iconography via Boxicons
- Contact form that sends messages via EmailJS (client-side)
- Downloadable resume in `assets/Dinesh's Resume.pdf`

## Tech stack & libraries

- Plain HTML, CSS, and vanilla JavaScript
- Third-party libraries loaded from CDNs:
	- Boxicons (icons)
	- ScrollReveal (scroll animations)
	- EmailJS (client-side email delivery)
	- SMTP.js (optional SMTP support)

## File structure

Root files
- `index.html` — main page
- `README.md` — this file

Folders
- `CSS/style.css` — site styles
- `Script/script.js` — UI behaviour and contact form logic
- `assets/` — images and `Dinesh's Resume.pdf`

Key assets
- `assets/images/My Photo Home.png` — hero image
- `assets/images/Dinesh's Photo About.jpg` — about section image
- `assets/images/E-Commerce Website.JPG` — portfolio project screenshot

## How to run locally

1. Clone the repository or open the folder in your editor.
2. Open `index.html` in a browser (no build step required).

Notes about email: the contact form uses a client-side email provider (EmailJS). To safely test
emails in your own environment:

1. Create an account at EmailJS and configure a service + template.
2. Replace the service ID, template ID and public key in the client script with your own values.
3. For production or privacy-sensitive sites, prefer a small server-side endpoint instead of
	 sending emails directly from client-side JavaScript.

## System design

This project is a small static web application. The design is intentionally minimal; below is a
concise description of components, data flow, and deployment options.

Architecture components

- Client (Static website): `index.html`, `CSS/style.css`, `Script/script.js`
	- Renders UI and handles interactions.
	- Runs entirely in the user's browser.
- Assets: images and PDF under `assets/` served with the site.
- Third-party services (external dependencies):
	- Boxicons and ScrollReveal (CDN served) for presentation.
	- Email provider (EmailJS / SMTP.js) used to deliver contact messages.

Data / request flow (Contact form)

1. User fills contact form and submits.
2. `Script/script.js` collects inputs and calls the EmailJS client API (emailjs.send).
3. EmailJS relays the message to the configured email destination (or uses the template
	 configured in your EmailJS dashboard).

ASCII overview

	[Browser / Client]
				|
				| (static files: HTML, CSS, JS, assets)
				v
	[Static Host]  <-- optional CDN (GitHub Pages, S3 + CloudFront, Netlify)
				|
				v
	[Third-party services]
	 - Boxicons CDN
	 - ScrollReveal CDN
	 - EmailJS (email delivery)

Design considerations & recommendations

- Security: Client-side email sending exposes service/template IDs in the page source. For
	production, implement a small server-side endpoint (e.g., AWS Lambda, Netlify Function)
	that accepts form data and sends email server-side to avoid exposing credentials.
- Performance: Host static assets on a CDN or static hosting provider. Optimize images
	(compress and use modern formats) for faster load times.
- Accessibility: Add meaningful alt text and ARIA attributes where applicable. Ensure form
	controls have labels and validation feedback for better UX.

## Notes & next steps

- Status: This is a complete static portfolio site and ready for static hosting.
- Suggested improvements:
	- Move email sending to a serverless function to hide credentials and reduce spam risk.
	- Add automated tests (linting, link checks) and CI to validate deploys.
	- Optimize images and add responsive breakpoints for very small/very large screens.

---

Requirements coverage

- Analyse the project: Done — code and assets reviewed.
- Modify README based on analysis: Done — updated with overview, usage, file map, and notes.
- Add System Design: Done — architecture, data flow, recommendations included.

Implemented extras in this repository:

- `assets/system-design.svg` — small architecture diagram illustrating client, static host,
	and serverless/email flow.