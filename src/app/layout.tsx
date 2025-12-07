import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import { Poppins, Dynalight, Playpen_Sans } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const dynalight = Dynalight({ subsets: ["latin"], weight: "400" });
const playpenSans = Playpen_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-playpen-sans" });

export const metadata: Metadata = {
  title: "S&R Wedding Invitation",
  description: "Wedding invitation for Sukma and Rezky on 28th March 2026",
  manifest: "/manifest.json",
};

// Move viewport + themeColor to the dedicated Viewport export as per Next.js recommendations
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* Head is managed by metadata/viewport exports */}</head>
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased ${poppins.className} ${dynalight.className} ${playpenSans.variable}`}
      >
        {/* Safe-area wrapper for iOS/Android notches */}
        <div className="min-h-dvh portrait:px-safe portrait:py-safe landscape:px-4 landscape:py-2">
          {children}
        </div>
      </body>
    </html>
  );
}
