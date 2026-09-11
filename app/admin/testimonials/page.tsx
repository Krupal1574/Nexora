"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [avatar, setAvatar] = useState("");
  const [rating, setRating] = useState(5);
  const [published, setPublished] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) {
      setTestimonials(await res.json());
    }
    setLoading(false);
  };

  const handleEdit = (t: any) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setContent(t.content);
    setAvatar(t.avatar || "");
    setRating(t.rating || 5);
    setPublished(t.published);
    setIsApproved(t.isApproved || false);
    setIsFeatured(t.isFeatured || false);
  };

  const handleReset = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setContent("");
    setAvatar("");
    setRating(5);
    setPublished(true);
    setIsApproved(false);
    setIsFeatured(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, role, content, avatar, rating: parseInt(rating.toString(), 10), published, isApproved, isFeatured };
    
    if (editingId) {
      await fetch(`/api/admin/testimonials/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    handleReset();
    fetchTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      fetchTestimonials();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Testimonials</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-[#121623] border border-[#203548] rounded-2xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-[#94A3B8]">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#0B0F19] border-b border-[#203548]">
                <tr>
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm">Name / Role</th>
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm">Rating</th>
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm">Status</th>
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#203548]">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-[#1A202C] transition-colors">
                    <td className="p-4 text-white">
                      <div className="font-bold">{t.name}</div>
                      <div className="text-xs text-[#94A3B8]">{t.role}</div>
                    </td>
                    <td className="p-4 text-[#94A3B8] text-sm">{t.rating} Stars</td>
                    <td className="p-4 flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded text-xs font-bold w-max ${t.published ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                        {t.published ? 'Published' : 'Draft'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-bold w-max ${t.isApproved ? 'bg-blue-400/10 text-blue-400' : 'bg-orange-400/10 text-orange-400'}`}>
                        {t.isApproved ? 'Approved' : 'Pending'}
                      </span>
                      {t.isFeatured && (
                        <span className="px-2 py-1 rounded text-xs font-bold w-max bg-purple-400/10 text-purple-400">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleEdit(t)} className="p-2 bg-[#203548] hover:bg-[#00F2FE] hover:text-black rounded transition-colors mr-2">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-2 bg-[#203548] hover:bg-red-500 hover:text-white rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>

        <div className="bg-[#121623] border border-[#203548] rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-white mb-6">
            {editingId ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Role / Position</label>
              <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Content</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none min-h-[100px]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Avatar URL</label>
              <input type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Rating (1-5)</label>
              <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(parseInt(e.target.value) || 5)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            
            <div className="flex flex-col gap-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-[#00F2FE]" />
                <span className="text-sm font-medium text-[#94A3B8]">Published (visible on site if approved)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isApproved} onChange={(e) => setIsApproved(e.target.checked)} className="w-4 h-4 accent-blue-500" />
                <span className="text-sm font-medium text-[#94A3B8]">Approved by Admin</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-purple-500" />
                <span className="text-sm font-medium text-[#94A3B8]">Featured Testimonial</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <button type="submit" className="flex-1 py-2 bg-[#00F2FE] text-black font-bold rounded hover:bg-[#00D2C4] transition-colors">
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button type="button" onClick={handleReset} className="px-4 py-2 bg-[#203548] text-white font-bold rounded hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
