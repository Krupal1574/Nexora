"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function QuickRCAModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    output_effort: "",
    daily_applications: "",
    weekly_calls: "",
    resume_usage: "",
    where_stuck: "",
    where_stuck_other: "",
    what_doing: [] as string[],
    what_doing_other: "",
    biggest_problem: "",
    name: "",
    phone: "",
    email: "",
    linkedin: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setError("");
    };
    window.addEventListener("open-rca-modal", handleOpen);
    return () => window.removeEventListener("open-rca-modal", handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleNext = () => {
    setError("");
    if (step === 1) {
      if (!formData.output_effort || !formData.daily_applications.trim() || !formData.weekly_calls.trim() || !formData.resume_usage) {
        setError("Please fill out all fields in this step.");
        return;
      }
    } else if (step === 2) {
      if (!formData.where_stuck && !formData.where_stuck_other.trim()) {
        setError("Please tell us where you are stuck.");
        return;
      }
      if (formData.what_doing.length === 0 && !formData.what_doing_other.trim()) {
        setError("Please select what you are currently doing.");
        return;
      }
    } else if (step === 3) {
      if (!formData.biggest_problem.trim()) {
        setError("Please describe your biggest problem.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, 4) as Step);
  };

  const handlePrev = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1) as Step);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError("Name, Phone, and Email are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("linkedin", formData.linkedin);
      data.append("output_effort", formData.output_effort);
      data.append("daily_applications", formData.daily_applications);
      data.append("weekly_calls", formData.weekly_calls);
      data.append("resume_usage", formData.resume_usage);
      
      const actualWhereStuck = formData.where_stuck_other.trim() ? formData.where_stuck_other : formData.where_stuck;
      data.append("where_stuck", actualWhereStuck);
      
      const whatDoingArray = [...formData.what_doing];
      if (formData.what_doing_other.trim()) whatDoingArray.push(formData.what_doing_other);
      data.append("what_doing", whatDoingArray.join(", "));
      
      data.append("biggest_problem", formData.biggest_problem);

      if (resumeFile) {
        data.append("resume", resumeFile);
      }

      const res = await fetch("/api/submit-rca", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit RCA");
      }

      alert("Diagnosis Request Submitted Successfully!");
      setIsOpen(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleWhatDoing = (val: string) => {
    setFormData((prev) => {
      const isSelected = prev.what_doing.includes(val);
      return {
        ...prev,
        what_doing: isSelected
          ? prev.what_doing.filter((item) => item !== val)
          : [...prev.what_doing, val],
      };
    });
  };

  const steps = [
    { num: 1, title: "Quick Diagnosis" },
    { num: 2, title: "Where You're Stuck" },
    { num: 3, title: "Biggest Problem" },
    { num: 4, title: "Contact Details" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-[#F9FBF9] shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center bg-[#F26A21] text-white hover:bg-[#D95A19] transition-colors z-10 rounded-bl-lg"
          >
            <X size={20} />
          </button>

          <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-hidden">
            {/* Progress Bar */}
            <div className="relative mb-8 flex justify-between px-2 sm:px-6 shrink-0">
              <div className="absolute left-6 right-6 top-1/2 h-[2px] -translate-y-1/2 bg-gray-200" />
              <div
                className="absolute left-6 top-1/2 h-[2px] -translate-y-1/2 bg-[#F26A21] transition-all duration-300"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
              {steps.map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      step >= s.num
                        ? "bg-[#F26A21] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s.num ? <Check size={16} /> : s.num}
                  </div>
                  <span className="hidden text-xs font-medium text-gray-600 sm:block">
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mb-4 shrink-0">
              <h2 className="text-2xl font-bold text-[#171717]">Quick RCA</h2>
              <p className="text-sm text-[#77736D]">Please fill details carefully to get the perfect result.</p>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 shrink-0">
                <AlertCircle size={16} />
                <p>{error}</p>
              </div>
            )}

            {/* Form Container (Scrollable) */}
            <div className="overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-4 flex-1">
              
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-center text-lg font-bold text-[#F26A21]">Current Output vs Effort</h3>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-800">
                      How many jobs do you apply daily and how many interview calls do you get per week?
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {["0–10 apps / 0 calls", "10–30 apps / 0–1 calls", "30+ apps / 1–3 calls", "50+ apps / 3+ calls"].map((opt) => (
                        <label key={opt} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:border-[#F26A21] ${formData.output_effort === opt ? 'border-[#F26A21] bg-orange-50/50' : 'border-gray-200 bg-white'}`}>
                          <input type="radio" checked={formData.output_effort === opt} onChange={() => setFormData({ ...formData, output_effort: opt })} className="text-[#F26A21] focus:ring-[#F26A21]" />
                          <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Daily Applications</label>
                      <input type="text" value={formData.daily_applications} onChange={(e) => setFormData({ ...formData, daily_applications: e.target.value })} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Weekly Interview Calls</label>
                      <input type="text" value={formData.weekly_calls} onChange={(e) => setFormData({ ...formData, weekly_calls: e.target.value })} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="block text-sm font-medium text-gray-800">Resume Usage</label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {["Same resume everywhere", "Slight changes", "Fully customized per job"].map((opt) => (
                        <label key={opt} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:border-[#F26A21] ${formData.resume_usage === opt ? 'border-[#F26A21] bg-orange-50/50' : 'border-gray-200 bg-white'}`}>
                          <input type="radio" checked={formData.resume_usage === opt} onChange={() => setFormData({ ...formData, resume_usage: opt })} className="text-[#F26A21] focus:ring-[#F26A21]" />
                          <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-center text-lg font-bold text-[#F26A21]">Where are you stuck?</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        "Not getting calls",
                        "Only AI screening calls",
                        "Only few recruiter calls",
                        "Only consultancy calls",
                        "Getting assessments but no interviews",
                        "Not getting technical interviews",
                        "Not reaching final rounds",
                        "Reaching final rounds but no offer",
                        "No update after final round",
                      ].map((opt) => (
                        <label key={opt} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:border-[#F26A21] ${formData.where_stuck === opt ? 'border-[#F26A21] bg-orange-50/50' : 'border-gray-200 bg-white'}`}>
                          <input type="radio" checked={formData.where_stuck === opt} onChange={() => setFormData({ ...formData, where_stuck: opt })} className="text-[#F26A21] focus:ring-[#F26A21]" />
                          <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Other (Optional)</label>
                      <input type="text" value={formData.where_stuck_other} onChange={(e) => setFormData({ ...formData, where_stuck_other: e.target.value })} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-center text-lg font-bold text-[#F26A21]">What all are you currently doing?</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        "Easy Apply / Quick Apply",
                        "Company portal applications",
                        "LinkedIn networking",
                        "Referral outreach",
                        "Cold emailing recruiters",
                        "Consultancy support",
                      ].map((opt) => (
                        <label key={opt} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:border-[#F26A21] ${formData.what_doing.includes(opt) ? 'border-[#F26A21] bg-orange-50/50' : 'border-gray-200 bg-white'}`}>
                          <input type="checkbox" checked={formData.what_doing.includes(opt)} onChange={() => toggleWhatDoing(opt)} className="rounded text-[#F26A21] focus:ring-[#F26A21]" />
                          <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Other (Optional)</label>
                      <input type="text" value={formData.what_doing_other} onChange={(e) => setFormData({ ...formData, what_doing_other: e.target.value })} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-center text-lg font-bold text-[#F26A21]">What do you think is your biggest problem?</h3>
                  <textarea
                    rows={6}
                    value={formData.biggest_problem}
                    onChange={(e) => setFormData({ ...formData, biggest_problem: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 p-4 text-sm focus:border-[#F26A21] focus:outline-none resize-none"
                    placeholder="Describe the main challenges you are facing right now..."
                  />
                </div>
              )}

              {step === 4 && (
                <form id="rca-form" onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-center text-lg font-bold text-[#F26A21] mb-6">Almost done — where should we send your diagnosis?</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Full Name *</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Phone Number *</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Email Address *</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">LinkedIn Profile URL</label>
                    <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="https://linkedin.com/in/your-profile" className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F26A21] focus:outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Upload Resume</label>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-[#F26A21] focus:outline-none file:mr-4 file:rounded-full file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200" 
                    />
                  </div>
                  
                  <div className="mt-4 rounded-lg bg-[#F26A21]/10 p-4 flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F26A21] text-white">
                      <Check size={14} />
                    </div>
                    <p className="text-sm font-medium text-[#F26A21]">Your information is secure and will only be used for your RCA.</p>
                  </div>
                </form>
              )}

            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-between border-t border-gray-100 pt-4 shrink-0">
              {step > 1 ? (
                <button
                  onClick={handlePrev}
                  className="rounded-full bg-gray-100 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}
              {step < 4 ? (
                <button
                  onClick={handleNext}
                  className="rounded-full bg-[#F26A21] px-8 py-2.5 font-semibold text-white shadow-lg shadow-[#F26A21]/20 hover:bg-[#D95A19] transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  form="rca-form"
                  disabled={isSubmitting}
                  className={`rounded-full px-8 py-2.5 font-semibold text-white shadow-lg transition-colors ${
                    isSubmitting ? "bg-[#F26A21]/70 cursor-not-allowed" : "bg-[#F26A21] shadow-[#F26A21]/20 hover:bg-[#D95A19]"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Get My 2-Minute Diagnosis"}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
