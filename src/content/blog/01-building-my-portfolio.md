---
title: Building My Portfolio with React 19 and Vite
slug: building-my-portfolio
date: 2026-05-14
excerpt: A deep dive into the tech stack and design decisions behind my personal portfolio site.
tags:
  - React
  - TypeScript
  - Vite
  - Portfolio
readTime: 5
coverImage: /profile-photo.webp
featured: true
---

# Building My Portfolio with React 19 and Vite

When I decided to build my personal portfolio, I wanted something that reflected my engineering values: fast, accessible, and delightful to use.

## The Tech Stack

I chose a modern stack focused on developer experience and performance:

- **React 19** - For the latest features and improvements
- **TypeScript** - Type safety from the start
- **Vite** - Lightning-fast HMR and builds
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth, declarative animations
- **GSAP** - Complex scroll-driven animations

## Design Philosophy

The portfolio uses a dark-first design with a warm gold accent and cool cyan highlights. The contrast creates depth while the gradient backgrounds add subtle motion.

## Key Features

### Theme System
A complete light/dark theme system with system preference detection and localStorage persistence.

### Content Management
All content lives in Markdown files with Zod validation, making it easy to update without touching components.

### Performance
- 56% image size reduction using sharp
- Code splitting for large dependencies
- Lazy loading for off-screen content
- Total bundle: ~137KB gzipped

## Lessons Learned

Building this taught me that **good UX is in the details** - the typing animation, smooth scroll progress, animated counters, and stagger transitions all add up to a polished feel.

The most rewarding part? Every detail was a chance to think about what makes interfaces feel alive.
