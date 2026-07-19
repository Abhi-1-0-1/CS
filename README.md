# Class 12 CS Notes — React Site

A dynamic, animated version of the Class 12 Computer Science revision notes,
built with React + Vite + React Router + Framer Motion.

## Requirements
- Node.js 18+ (comes with npm)

## Setup
```bash
npm install
npm run dev
```
Then open the URL it prints (usually http://localhost:5173).

## Scripts
- `npm run dev` — local dev server with hot reload
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build locally

## Structure
```
src/
  components/   shared UI pieces (Nav, CodeBlock, cards, flow diagrams, SQL diagrams…)
  pages/        one component per chapter (Home, FileHandling, Exceptions, Functions,
                 DataStructures, SQL)
  data/         chapters.js — single source of truth for nav + home page cards
  hooks/        useScrollSpy — highlights the active TOC pill while scrolling
  lib/          highlight.js — lightweight Python/SQL syntax highlighter
  styles/       theme.css — all design tokens & component styles
```
