"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function TestimonialForm() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, content }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit testimonial");
      }

      setStatus("success");
      setName("");
      setRole("");
      setContent("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto bg-[#121923] border border-[#203548] p-8 rounded-2xl">
      <h3 className="text-2xl font-bold text-white mb-2">Share Your Experience</h3>
      <p className="text-[#94A3B8] text-sm mb-6">
        Submit a testimonial to share your experience with Nexora.
      </p>

      {status === "success" ? (
        <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-center">
          Thank you! Your testimonial has been submitted successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm">
              {errorMsg}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1">Role / Company</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none transition-colors"
                placeholder="Software Engineer at Acme Corp"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1">Testimonial</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full p-2.5 rounded-xl bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none transition-colors resize-none"
              placeholder="Nexora helped me find my dream job..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-[#00F2FE] text-black font-bold rounded-xl hover:bg-[#00D2C4] transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Submitting..." : "Submit Testimonial"}
          </button>
        </form>
      )}
    </div>
  );
}
