"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RsvpPage() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"will" | "unable" | "">("");
  const [message, setMessage] = useState("");
  // Date field is hidden; we rely on Supabase created_at. For local feed display, we'll use the current date at submission time.

  // Mocked RSVP list state (replace with backend later)
  type Item = { id: number; name: string; status: "will" | "unable"; message: string; date: string };
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const startIdx = (page - 1) * pageSize;
  const visibleItems = items.slice(startIdx, startIdx + pageSize);

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

    const newItem: Item = {
      id: Date.now(),
      name,
      status: attendance as "will" | "unable",
      message,
      date: new Date().toISOString().slice(0, 10),
    };
    setItems((prev) => [newItem, ...prev]);
    setName("");
    setAttendance("");
    setMessage("");
  };

  return (
    <div className="min-h-dvh w-full bg-[#ececec]">
      {/* Content layer: two columns on desktop with comfortable vertical spacing */}
  <main className="mx-auto grid min-h-dvh max-w-6xl grid-cols-1 gap-6 px-safe py-8 md:grid-cols-2 md:py-12 px-6 md:px-10">
        {/* Left column: RSVP form */}
  <section className="mx-4 rounded-2xl border-4 border-emerald-900 bg-white p-6 shadow-xl md:mx-0 md:p-8">
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
                We kindly request your RSVP
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
            {visibleItems.length === 0 ? (
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
