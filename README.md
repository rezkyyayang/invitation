Mobile-first Next.js app optimized for portrait on phones, while staying responsive for desktop landscape.

## Getting Started

First, run the development server (Windows PowerShell):

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### Mobile portrait behavior
- Uses `viewport-fit=cover` and safe-area insets for iOS/Android notches.
- Orientation-aware styles in `src/app/globals.css`.
- Dynamic viewport height (`min-h-dvh`) avoids mobile address bar issues.

### Desktop landscape behavior
- Scales layout widths via responsive max widths.
- Slight font-size adjustment for comfortable reading in landscape.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## PWA basics
- Manifest added at `public/manifest.json`.
- Theme colors configured in `src/app/layout.tsx` metadata.

> Note: For full installable PWA, add service worker (e.g., `next-pwa`) later.
