---
title: Why I Switched From Spinners to Skeleton Screens
slug: skeletons-vs-spinners
date: 2026-05-12
excerpt: Skeleton screens significantly improve perceived performance compared to traditional loading spinners.
tags:
  - UX
  - Performance
  - React
readTime: 3
coverImage: /profile-photo.webp
featured: false
---

# Why I Switched From Spinners to Skeleton Screens

Loading states are often an afterthought, but they shape how fast your app *feels*.

## The Problem With Spinners

A spinning indicator tells users one thing: "wait." It doesn't communicate progress, structure, or what's coming next. Users feel disconnected from the experience.

## Enter Skeleton Screens

Skeleton screens show the structure of the content before it loads. Users see what's coming, where it'll be, and roughly how big.

## Implementation

```tsx
function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white/5 p-6">
      <Skeleton className="w-full h-48 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
    </div>
  );
}
```

## The Result

Even with the same actual loading time, the perceived wait drops because:
- Users see structure immediately
- Animation suggests progress
- The transition to real content feels seamless

Small change, big difference.
