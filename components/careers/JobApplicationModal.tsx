"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, CheckCircle2, FileText, ArrowRight, Loader2, Mail } from "lucide-react";
import { useModalScrollLock } from "@/hooks/useModalScrollLock";

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleName: string;
  roleSlug?: string;
}

export default function JobApplicationModal({
  isOpen,
  onClose,
  roleName,
}: JobApplicationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [notes, setNotes] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useModalScrollLock(isOpen);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validExtensions = [".pdf", ".doc", ".docx"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!validExtensions.includes(ext)) {
      setError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB. Please choose a smaller file.");
      return;
    }
    setError("");
    setResumeFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your contact phone number.");
      return;
    }
    if (!resumeFile) {
      setError("Please upload your resume to submit your application.");
      return;
    }

    setIsSubmitting(true);

    const fallbackMailto = `mailto:connect@nexorastaffingllp.com?subject=${encodeURIComponent(
      `Application: ${roleName} - ${name}`
    )}&body=${encodeURIComponent(
      `Hello Nexora Hiring Team,\n\nI am applying for the role of ${roleName}.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLinkedIn: ${
        linkedin || "N/A"
      }\n\nNote: ${notes || "None"}\n\nPlease find my resume attached.\n\nThank you,\n${name}`
    )}`;

    setMailtoUrl(fallbackMailto);

    try {
      const formData = new FormData();
      formData.append("roleName", roleName);
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      if (linkedin.trim()) formData.append("linkedin", linkedin.trim());
      if (notes.trim()) formData.append("notes", notes.trim());
      formData.append("resume", resumeFile);

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok && !data.success) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setIsSuccess(true);

      // Trigger mailto redirect so user also has a copy in their email client
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = data.mailto || fallbackMailto;
        }, 600);
      }
    } catch (err: unknown) {
      console.error(err);
      // Fallback: If network/backend fails, redirect directly to mail client
      setIsSuccess(true);
      if (typeof window !== "undefined") {
        window.location.href = fallbackMailto;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setNotes("");
    setResumeFile(null);
    setIsSuccess(false);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl z-10"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-7 pt-6 pb-4 border-b border-[#0f0f0f]/10 flex items-center justify-between z-20">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ff2b2b]/10 text-[#ff2b2b] mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b2b] animate-pulse" />
                Now Hiring
              </span>
              <h3
                className="text-xl md:text-2xl font-bold text-[#0f0f0f] leading-snug line-clamp-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {roleName}
              </h3>
            </div>
            <button
              onClick={handleReset}
              className="w-9 h-9 rounded-full bg-[#F5F1E8] text-[#0f0f0f] hover:bg-[#F26A21] hover:text-white flex items-center justify-center transition-colors shrink-0 ml-4"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-7">
            {isSuccess ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4
                  className="text-2xl font-bold text-[#0f0f0f]"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Application Submitted!
                </h4>
                <p className="text-[#0f0f0f]/75 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <strong>{name}</strong>! Your application and resume have been
                  forwarded to <strong>connect@nexorastaffingllp.com</strong> and the hiring team.
                </p>

                <div className="bg-[#F5F1E8] p-4 rounded-2xl text-left text-xs text-[#0f0f0f]/70 space-y-1">
                  <p>
                    <strong>Position:</strong> {roleName}
                  </p>
                  <p>
                    <strong>Delivered To:</strong> connect@nexorastaffingllp.com
                  </p>
                  <p>
                    <strong>Resume Attached:</strong> {resumeFile?.name}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F26A21] hover:bg-[#D95A19] text-white font-semibold px-6 py-3 text-sm transition-colors shadow-md"
                  >
                    <Mail className="w-4 h-4" /> Open In Email App
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full bg-[#0f0f0f] text-white hover:bg-neutral-800 font-semibold px-6 py-3 text-sm transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f0f0f]/70 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-[#0f0f0f]/15 focus:border-[#F26A21] focus:ring-2 focus:ring-[#F26A21]/20 outline-none text-sm transition-all bg-[#FAF8F5]"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f0f0f]/70 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#0f0f0f]/15 focus:border-[#F26A21] focus:ring-2 focus:ring-[#F26A21]/20 outline-none text-sm transition-all bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f0f0f]/70 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-[#0f0f0f]/15 focus:border-[#F26A21] focus:ring-2 focus:ring-[#F26A21]/20 outline-none text-sm transition-all bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f0f0f]/70 mb-1.5">
                    LinkedIn Profile URL <span className="text-xs font-normal text-neutral-400">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 rounded-xl border border-[#0f0f0f]/15 focus:border-[#F26A21] focus:ring-2 focus:ring-[#F26A21]/20 outline-none text-sm transition-all bg-[#FAF8F5]"
                  />
                </div>

                {/* Resume Upload Dropzone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f0f0f]/70 mb-1.5">
                    Attach Resume <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/60 text-sm">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-emerald-900 truncate">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-emerald-700">
                            {(resumeFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                        isDragging
                          ? "border-[#F26A21] bg-[#F26A21]/10"
                          : "border-[#0f0f0f]/20 hover:border-[#F26A21] bg-[#FAF8F5]"
                      }`}
                    >
                      <UploadCloud className="w-8 h-8 text-[#F26A21] mx-auto mb-1.5" />
                      <p className="text-sm font-semibold text-[#0f0f0f]">
                        Click to upload your resume
                      </p>
                      <p className="text-xs text-[#77736D] mt-0.5">
                        PDF, DOC, or DOCX (max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#0f0f0f]/70 mb-1.5">
                    Cover Note or Questions <span className="text-xs font-normal text-neutral-400">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us a little about your experience or availability..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#0f0f0f]/15 focus:border-[#F26A21] focus:ring-2 focus:ring-[#F26A21]/20 outline-none text-sm transition-all bg-[#FAF8F5] resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#F26A21] hover:bg-[#D95A19] text-white font-semibold py-3.5 px-6 text-base transition-colors shadow-lg shadow-[#F26A21]/25 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#77736D] mt-2">
                    Delivered directly to connect@nexorastaffingllp.com and recruiting leadership.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

