"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function RsvpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"will" | "unable" | "">("");
  const [message, setMessage] = useState("");
  // Date field is hidden; we rely on Supabase created_at. For local feed display, we'll use the current date at submission time.

  // Mocked RSVP list state (replace with backend later)
  type Item = { id: number; name: string; status: "will" | "unable"; message: string; date: string };
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 25;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const startIdx = (page - 1) * pageSize;
  const visibleItems = items.slice(startIdx, startIdx + pageSize);

  // Fetch RSVP data from Supabase
  const fetchRsvpData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .schema("rezkyyayang")
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching RSVP data:", error);
        return;
      }

      if (data) {
        // Transform Supabase data to match Item type
        const transformedItems: Item[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          status: row.rsvp ? "will" : "unable",
          message: row.message || "",
          date: row.created_at ? new Date(row.created_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        }));
        setItems(transformedItems);
      }
    } catch (err) {
      console.error("Error fetching RSVP data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchRsvpData();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submit; integrate with backend or Google Form later
    if (!name || !attendance) return;

    // Map attendance to boolean rsvp: will=true, unable=false
    const rsvpBool = attendance === "will";

    // Insert into Supabase
    const { error } = await supabase
      .schema("rezkyyayang")
      .from("rsvp")
      .insert({
        name,
        message,
        rsvp: rsvpBool,
      });

    if (error) {
      alert(`Failed to submit RSVP: ${error.message}`);
      return;
    }

    // Refresh data after successful submission
    await fetchRsvpData();
    
    // Reset form
    setName("");
    setAttendance("");
    setMessage("");
    alert("RSVP submitted successfully!");
  };

  return (
    <div className="min-h-dvh w-full bg-[#ececec]">
      {/* Content layer: two columns on desktop with comfortable vertical spacing */}
  <main className="mx-auto grid min-h-dvh max-w-6xl grid-cols-1 gap-6 px-safe py-8 md:grid-cols-2 md:py-12 px-6 md:px-10">
        {/* Left column: RSVP form */}
  <section className="mx-4 rounded-2xl border-4 border-emerald-900 bg-white p-6 shadow-xl md:mx-0 md:p-8 relative">
          {/* Navigation buttons in top right corner */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-900 text-white hover:bg-emerald-800 transition-colors shadow-md"
              title="Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => window.open("https://sukmarezky.my.canva.site/digital-invitation", "_blank")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-900 text-white hover:bg-emerald-800 transition-colors shadow-md"
              title="Open Invitation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
              </svg>
            </button>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-emerald-900">RSVP</h1>

          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Your Name */}
            <div>
              <label className="mb-2 block font-semibold text-emerald-900">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                className="w-full rounded-xl border border-emerald-900/50 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700"
                required
              />
            </div>

            {/* RSVP choice */}
            <div>
              <label className="mb-2 block font-semibold text-emerald-900">
                We kindly request your RSVP on 28 March 2026
              </label>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance("will")}
                  className={`w-full rounded-xl px-4 py-3 text-base shadow-sm transition-colors ${
                    attendance === "will"
                      ? "bg-emerald-900 text-white"
                      : "bg-gray-200 text-emerald-900 hover:bg-gray-300"
                  }`}
                >
                  ✅ Will Attend
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance("unable")}
                  className={`w-full rounded-xl px-4 py-3 text-base shadow-sm transition-colors ${
                    attendance === "unable"
                      ? "bg-emerald-900 text-white"
                      : "bg-gray-200 text-emerald-900 hover:bg-gray-300"
                  }`}
                >
                  ❌ Unable to Attend
                </button>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block font-semibold text-emerald-900">
                ✉️ Share some love for Us!
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=""
                className="w-full rounded-xl border border-emerald-900/50 bg-white px-4 py-5 text-base shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* Date field removed; created_at from Supabase will be used. */}

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 w-full rounded-full bg-emerald-900 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              disabled={!name || !attendance}
            >
              Submit
            </button>
          </form>
        </section>

        {/* Right column: stats and RSVP feed */}
  <section className="mx-4 rounded-2xl border-4 border-emerald-900 bg-white p-6 shadow-xl md:mx-0 md:p-8">
          <h2 className="mb-4 text-2xl font-bold text-emerald-900">Attendance Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-900/50 bg-emerald-50 p-4 text-center">
              <div className="text-sm font-semibold text-emerald-900">✅ Will Attend</div>
              <div className="mt-1 text-3xl font-bold text-emerald-900">
                {items.filter((i) => i.status === "will").length}
              </div>
            </div>
            <div className="rounded-xl border border-emerald-900/50 bg-emerald-50 p-4 text-center">
              <div className="text-sm font-semibold text-emerald-900">❌ Unable to Attend</div>
              <div className="mt-1 text-3xl font-bold text-emerald-900">
                {items.filter((i) => i.status === "unable").length}
              </div>
            </div>
          </div>

          <h3 className="mt-6 text-xl font-bold text-emerald-900">RSVP Feed</h3>
          <div className="mt-3 max-h-[50vh] overflow-y-auto rounded-xl border border-emerald-900/40 bg-white">
            {isLoading ? (
              <div className="p-4 text-sm text-emerald-900/80 text-center">Loading...</div>
            ) : visibleItems.length === 0 ? (
              <div className="p-4 text-sm text-emerald-900/80">No RSVP yet.</div>
            ) : (
              <ul className="divide-y divide-emerald-900/20">
                {visibleItems.map((i) => (
                  <li key={i.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-900">{i.name}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        i.status === "will" ? "bg-emerald-900 text-white" : "bg-gray-200 text-emerald-900"
                      }`}>
                        {i.status === "will" ? "✅ Will Attend" : "❌ Unable to Attend"}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-emerald-900/80">{i.message || "-"}</div>
                    <div className="mt-1 text-xs text-emerald-900/60">{i.date}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Prev
            </button>
            <div className="text-sm text-emerald-900">Page {page} / {totalPages}</div>
            <button
              type="button"
              className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
