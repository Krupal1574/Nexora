"use client";

import { useState } from "react";
import { Upload, FileText, X, Loader2, Check } from "lucide-react";

export function ResumeUpload({ hasResume, onParsed }: { hasResume: boolean, onParsed: (data: any) => void }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadAndParse = async () => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 1. Parse resume
      const parseRes = await fetch("/api/user/profile/resume/parse", {
        method: "POST",
        body: formData,
      });

      if (!parseRes.ok) {
        throw new Error("Parsing failed");
      }

      const parsedData = await parseRes.json();
      
      // 2. Save resume with parsed data
      formData.append("parsedData", JSON.stringify(parsedData));
      const saveRes = await fetch("/api/user/profile/resume", {
        method: "POST",
        body: formData,
      });

      if (!saveRes.ok) {
        throw new Error("Saving resume failed");
      }

      onParsed(parsedData);
      setFile(null);
      alert("Resume uploaded and parsed successfully! Please review the extracted data.");
    } catch (err) {
      console.error(err);
      alert("Error uploading/parsing resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your resume?")) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile/resume", {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Resume deleted");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/5 border border-black/10 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-[#171717] mb-4 flex items-center gap-2">
        <FileText className="text-primary" />
        Resume
      </h3>
      
      {hasResume && !file ? (
        <div className="flex items-center justify-between bg-black/5 p-4 rounded-lg border border-black/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Check className="text-primary w-5 h-5" />
            </div>
            <div>
              <p className="text-[#171717] font-medium">Resume Uploaded</p>
              <a href="/api/user/profile/resume" className="text-sm text-primary hover:underline">
                Download current resume
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="px-4 py-2 bg-black/10 hover:bg-white/20 text-[#171717] rounded-lg text-sm cursor-pointer transition-colors">
              Replace
              <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} />
            </label>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors">
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-black/20 rounded-xl p-8 text-center hover:bg-black/5 transition-colors">
          {file ? (
            <div className="flex flex-col items-center gap-4">
              <FileText className="w-12 h-12 text-[#171717]/70" />
              <div className="text-[#171717]">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-[#171717]/50">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUploadAndParse}
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Parsing..." : "Upload & Parse"}
                </button>
                <button
                  onClick={() => setFile(null)}
                  disabled={loading}
                  className="px-6 py-2 bg-black/10 text-[#171717] rounded-lg hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-[#171717] font-medium">Click to upload your resume</p>
                <p className="text-sm text-[#171717]/50 mt-1">PDF or DOCX up to 5MB</p>
              </div>
              <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} />
            </label>
          )}
        </div>
      )}
    </div>
  );
}
