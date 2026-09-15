"use client";

import { useState } from "react";
import { User, Upload, X, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export function AvatarUpload({ currentImage, name }: { currentImage?: string | null, name?: string | null }) {
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(currentImage);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File too large. Max 2MB");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/user/profile/photo", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        setImage(url);
        await update({ image: url }); // Update next-auth session
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile/photo", {
        method: "DELETE",
      });

      if (res.ok) {
        setImage(null);
        await update({ image: null }); // Let next-auth re-evaluate or fallback
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 bg-white/5 flex items-center justify-center">
          {image ? (
            <img src={image} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl text-white/50">{name?.[0]?.toUpperCase() || <User size={48} />}</span>
          )}
        </div>
        
        {loading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader2 className="animate-spin text-white w-8 h-8" />
          </div>
        )}

        <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
          <Upload size={16} />
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={loading} />
        </label>
      </div>

      {image && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
        >
          <X size={14} /> Remove Photo
        </button>
      )}
    </div>
  );
}
