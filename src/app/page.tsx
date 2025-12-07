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
        <section className="flex w-full max-w-[420px] flex-col items-center gap-2 text-center md:max-w-none md:w-auto">
          {/* Heading S&R with Dynalight font */}
            <h1 className="text-5xl md:text-6xl text-black">S&amp;R</h1>

          {/* Bride/Groom Illustration */}
          <img
            src="/java-bride.png"
            alt="Couple illustration"
            className="h-auto w-30 md:w-40"
          />
          {/* Optional date under image (commented out) */}
          <p className="text-lg tracking-widest text-black">28.03.2026</p>

          {/* Recipient name above the button */}
          <p className="text-lg md:text-xl text-black ">Dear, <br/> {recipientName}</p>

          {/* Open Invitation button */}
          <button
            className="mt-3 rounded-full bg-emerald-800 px-6 py-3 text-base font-semibold text-white font-[family-name:var(--font-playpen-sans)] shadow-md transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 flex items-center gap-2"
            onClick={() => {
              const to = searchParams.get("to");
              const qs = to ? `?to=${encodeURIComponent(to)}` : "";
              router.push(`https://sukmarezky.my.canva.site/digital-invitation`);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
            </svg>
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
