"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Get recipient name from ?to= query, default to 'Tamu Undangan'. Replace '+' with space for common URL patterns.
  const toRaw = searchParams.get("to") || "Tamu Undangan";
  const recipientName = toRaw.replace(/\+/g, " ");
  const recipientNameWithBreak = (() => {
    const lowerName = recipientName.toLowerCase();
    const danIndex = lowerName.indexOf(" dan ");
    if (danIndex === -1) {
      return recipientName;
    }
    return (
      <>
        {recipientName.slice(0, danIndex).trimEnd()}
        <br />
        {recipientName.slice(danIndex + 1)}
      </>
    );
  })();
  return (
    <div className="min-h-dvh w-full">
      {/* Fullscreen background: portrait on mobile, no rotation on desktop */}
      <div className="home-bg home-bg--no-rotate">
        <img
          src="/home-idn2.png"
          alt="Home background"
          className="home-bg__image"
        />
      </div>

      {/* Content layer */}
      <main className="relative flex min-h-dvh items-center justify-center px-safe py-safe">
        <section className="flex w-full max-w-[420px] flex-col items-center gap-2 text-center translate-y-10 md:max-w-none md:w-auto">
          
          {/* Recipient name above the button */}
          <p className="text-sm md:text-base text-black font-[family-name:var(--font-playpen-sans)]">Yth. Bapak/Ibu/Saudara/i, <br/><span className="text-sm md:text-sm font-semibold">{recipientNameWithBreak}</span></p>

          {/* Open Invitation button */}
          <button
            className="mt-3 rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white font-[family-name:var(--font-playpen-sans)] shadow-md transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 flex items-center gap-2"
            onClick={() => {
              const to = searchParams.get("to");
              const qs = to ? `?to=${encodeURIComponent(to)}` : "";
              router.push(`https://sukmarezky.my.canva.site/digital-invitation`);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
            </svg>
            Buka Undangan
          </button>
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-dvh w-full flex items-center justify-center">Memuat...</div>}>
      <HomeContent />
    </Suspense>
  );
}
