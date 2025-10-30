# iTunes Search App

A Next.js application for searching and browsing podcasts with a modern, responsive interface.

## Tech Stack

- **Next.js** with App Router
- **TypeScript**
- **React Query** for data fetching
- **Tailwind CSS** for styling

## Project Structure

```
app/
   --- layout.tsx
   --- page.tsx
   --- loading.tsx
   --- not-found.tsx
   --- globals.css
components/
   --- ui/
   --- podcast/
   --- features/
lib/
   --- config/
   --- hooks/
   --- providers/
   --- services/
   --- types/
   --- utils.ts
public/
   --- fonts/
   --- icons/
```

## Features

- Search podcasts from iTunes API
- Responsive design with mobile-first approach
- Modern UI with Tailwind CSS
- Loading states and error handling
- Layout toggle between grid and carousel views
- Support for Arabic typography with custom fonts


## Develpoment
``` bash
cp .env.example .env
npm run dev
```