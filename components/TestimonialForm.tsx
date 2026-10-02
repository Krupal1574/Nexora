"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle2, AlertCircle } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TestimonialForm() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, content, rating }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit testimonial");
      }

      setStatus("success");
      // Reset form after 3 seconds
      setTimeout(() => {
        setName(session?.user?.name || "");
        setRole("");
        setContent("");
        setRating(5);
        setStatus("idle");
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="text-center mb-12"
      >
        <span className="eyebrow mb-8">Share your experience</span>
        <h2 className="display display-md mb-6">
          Your <span className="accent">success</span> story.
        </h2>
        <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
          Help others by sharing your experience working with Nexora.
          Your testimonial will be reviewed before publishing.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:p-12"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F2FE] opacity-[0.02] blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#00D2C4]/20 border border-[#00D2C4]/30 mb-8 mx-auto"
              >
                <CheckCircle2 className="w-12 h-12 text-[#00D2C4]" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Thank You!
              </h3>
              <p className="text-[#94A3B8] text-lg mb-2">
                Your testimonial has been submitted successfully.
              </p>
              <p className="text-[#64748B] text-sm">
                We'll review it and publish it soon. This form will reset in a moment.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Error Message */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300"
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Submission Failed</p>
                    <p className="text-sm">{errorMsg}</p>
                  </div>
                </motion.div>
              )}

              {/* Name and Role */}
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease }}
                >
                  <label htmlFor="name" className="block text-sm font-bold text-white mb-3 tracking-wide">
                    YOUR NAME <span className="text-[#00F2FE]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="form-input"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: 0.1 }}
                >
                  <label htmlFor="role" className="block text-sm font-bold text-white mb-3 tracking-wide">
                    ROLE & COMPANY <span className="text-[#00F2FE]">*</span>
                  </label>
                  <input
                    id="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    placeholder="Software Engineer at TechCorp"
                    className="form-input"
                  />
                </motion.div>
              </div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-white mb-4 tracking-wide">
                  YOUR RATING <span className="text-[#00F2FE]">*</span>
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      className="transition-all"
                    >
                      <Star
                        className={`w-10 h-10 transition-all ${
                          star <= (hoveredRating || rating)
                            ? "text-[#00F2FE] fill-[#00F2FE]"
                            : "text-[#203548] fill-[#203548]"
                        }`}
                      />
                    </motion.button>
                  ))}
                  <span className="ml-4 text-base text-[#94A3B8] font-medium">
                    {rating === 5 && "Excellent!"}
                    {rating === 4 && "Very Good"}
                    {rating === 3 && "Good"}
                    {rating === 2 && "Fair"}
                    {rating === 1 && "Poor"}
                  </span>
                </div>
              </motion.div>

              {/* Testimonial Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
              >
                <label htmlFor="content" className="block text-sm font-bold text-white mb-3 tracking-wide">
                  YOUR EXPERIENCE <span className="text-[#00F2FE]">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  placeholder="Tell us about your experience with Nexora. What did we help you achieve? How did our services impact your career?"
                  className="form-input resize-none"
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-[#64748B]">
                    Minimum 50 characters recommended
                  </p>
                  <p className="text-xs text-[#64748B]">
                    {content.length} / 500
                  </p>
                </div>
              </motion.div>

              {/* Privacy Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.4 }}
                className="p-5 rounded-2xl bg-[#00F2FE]/5 border border-[#00F2FE]/10"
              >
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  <strong className="text-white font-semibold">Privacy Note:</strong> Your testimonial
                  will be reviewed by our team before being published. We may edit for
                  length or clarity. By submitting, you agree to let Nexora use your
                  testimonial on our website and marketing materials.
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  disabled={status === "loading" || !name || !role || !content}
                  whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                  className="btn-primary w-full justify-center px-8 py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-3 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Testimonial
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
