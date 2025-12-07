"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get recipient name from ?to= query, default to 'Tamu Undangan'. Replace '+' with space for common URL patterns.
  const toRaw = searchParams.get("to") || "Tamu Undangan";
  const recipientName = toRaw.replace(/\+/g, " ");
  return (
    <div className="min-h-dvh w-full">
      {/* Fullscreen background: portrait on mobile, rotated on desktop */}
      <div className="home-bg">
        <img
          src="/home-background.png"
          alt="Home background"
          className="home-bg__image"
        />
      </div>

      {/* Content layer */}
      <main className="relative flex min-h-dvh items-center justify-center px-safe py-safe">
        <section className="flex w-full max-w-[420px] flex-col items-center gap-4 text-center md:max-w-none md:w-auto">
          {/* Heading S&R with Dynalight font */}
          <h1 className="text-5xl md:text-6xl">S&amp;R</h1>

          

          {/* Bride/Groom Illustration */}
          <img
            src="/java-bride.png"
            alt="Couple illustration"
            className="h-auto w-30 md:w-40"
          />
          {/* Optional date under image (commented out) */}
          <p className="mt-2 text-lg tracking-widest">28.03.2026</p>

          {/* Recipient name above the button */}
          <p className="mt-1 text-lg md:text-xl">to: {recipientName}</p>

          {/* Open Invitation button */}
          <button
            className="mt-2 rounded-full bg-emerald-800 px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            onClick={() => {
              const to = searchParams.get("to");
              const qs = to ? `?to=${encodeURIComponent(to)}` : "";
              router.push(`https://sukmarezky.my.canva.site/digital-invitation`);
            }}
          >
            Open Invitation
          </button>
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-dvh w-full flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
