export const dynamic = "force-static";

export default function InvitationPage() {
  // Fullscreen embed of the Canva invitation page
  const src = "https://sukmarezky.my.canva.site/digital-invitation";
  return (
    <div className="min-h-dvh w-full">
      <iframe
        src={src}
        title="Invitation"
        className="block h-dvh w-full"
        style={{ border: "none" }}
        allow="fullscreen; clipboard-read; clipboard-write;" 
      />
    </div>
  );
}
