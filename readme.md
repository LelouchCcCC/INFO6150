# Robotics Club Website

This is my INFO6150 Assignment 1

---

## Semantic Structure

The website uses semantic HTML5 elements:

- `<header>` with club name and navigation
- `<nav>` for main menu links
- `<main>` wrapping the page layout
- `<section>` for About, Events, Join Us, Media, FAQ
- `<article>` in the About section
- `<aside>` for sidebar (recruiting and quick actions)
- `<footer>` for contact info

---

## Required Elements Implemented

- **Favicon**: `link rel="icon"` points to `assets/favicon.ico`
- **Table**: Workshop & Event schedule
- **Form**: Join Us form
  - Inputs: `text`, `email`, `password`
  - `datalist` for experience level
- **Image**: `<figure>` with `<figcaption>` (`assets/p1.jpg`)
- **Hyperlinks**: Internal anchors + external link to Google Maps
- **Buttons**: Submit + Reset
- **Audio**: `welcome.m4a` (club officer welcome message)
- **Video**: `robotics.mp4` (highlight reel)
- **Details & Summary**: FAQ section
- **Contact Info**: `mailto:` links in footer

---

## Styling

- Uses **external CSS only** (`style.css`)
- Light theme colors with modern layout
- Figure/image styled with rounded corners and caption

---

## How to Run

1. Clone the repository:
   ```bash
   git clone git@github.com:LelouchCcCC/INFO6150.git
   cd INFO6150
   ```
2. Open index.html in your browser.
