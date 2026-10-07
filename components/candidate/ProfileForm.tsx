"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function ProfileForm({ 
  initialData, 
  parsedData 
}: { 
  initialData: any, 
  parsedData?: any 
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    headline: initialData?.candidateProfile?.headline || "",
    location: initialData?.candidateProfile?.location || "",
    summary: initialData?.candidateProfile?.summary || "",
    expectedSalary: initialData?.candidateProfile?.expectedSalary || "",
    availability: initialData?.candidateProfile?.availability || "",
    skills: initialData?.candidateProfile?.skills?.join(", ") || "",
    linkedinUrl: initialData?.candidateProfile?.linkedinUrl || "",
    githubUrl: initialData?.candidateProfile?.githubUrl || "",
    portfolioUrl: initialData?.candidateProfile?.portfolioUrl || "",
  });

  // When parsed data arrives from resume, populate empty fields
  useEffect(() => {
    if (parsedData) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || parsedData.name || "",
        headline: prev.headline || parsedData.headline || "",
        location: prev.location || parsedData.location || "",
        summary: prev.summary || parsedData.summary || "",
        skills: prev.skills || (parsedData.skills ? parsedData.skills.join(", ") : ""),
      }));
    }
  }, [parsedData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s: string) => s.trim()).filter(Boolean),
        // For MVP, we skip complex nested UI for education/experience,
        // but they can be passed as JSON from parsedData if needed.
        experience: parsedData?.experience || initialData?.candidateProfile?.experience || [],
        education: parsedData?.education || initialData?.candidateProfile?.education || [],
      };

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Profile saved successfully");
        window.location.reload();
      } else {
        alert("Failed to save profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#171717]/70 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#171717]/70 mb-2">Professional Headline</label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="e.g. Senior Software Engineer"
            className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#171717]/70 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA"
            className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#171717]/70 mb-2">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g. 2 weeks notice"
            className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#171717]/70 mb-2">Career Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          rows={4}
          className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#171717]/70 mb-2">Skills (comma separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="e.g. React, Node.js, TypeScript"
          className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#171717]/70 mb-2">LinkedIn URL</label>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#171717]/70 mb-2">GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#171717]/70 mb-2">Portfolio URL</label>
          <input
            type="url"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Profile
        </button>
      </div>
    </form>
  );
}
