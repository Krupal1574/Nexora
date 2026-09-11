"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/admin/blogs");
    if (res.ok) {
      setBlogs(await res.json());
    }
    setLoading(false);
  };

  const handleEdit = (b: any) => {
    setEditingId(b.id);
    setTitle(b.title);
    setSlug(b.slug);
    setCategory(b.category);
    setExcerpt(b.excerpt);
    setContent(b.content);
    setImage(b.image || "");
    setPublished(b.published);
  };

  const handleReset = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCategory("");
    setExcerpt("");
    setContent("");
    setImage("");
    setPublished(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, slug, category, excerpt, content, image, published };
    
    if (editingId) {
      await fetch(`/api/admin/blogs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    handleReset();
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Blog Posts</h1>
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
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm">Title</th>
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm">Category</th>
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm">Status</th>
                  <th className="p-4 text-[#94A3B8] font-semibold text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#203548]">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-[#1A202C] transition-colors">
                    <td className="p-4 text-white font-medium max-w-[200px] truncate">{b.title}</td>
                    <td className="p-4 text-[#94A3B8] text-sm">{b.category}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${b.published ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                        {b.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => handleEdit(b)} className="p-2 bg-[#203548] hover:bg-[#00F2FE] hover:text-black rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="p-2 bg-[#203548] hover:bg-red-500 hover:text-white rounded transition-colors">
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

        <div className="bg-[#121623] border border-[#203548] rounded-2xl p-6 h-fit max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-6">
            {editingId ? "Edit Post" : "Add Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Title</label>
              <input type="text" value={title} onChange={(e) => {
                setTitle(e.target.value);
                if (!editingId) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                }
              }} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Slug</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none min-h-[60px]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Content (Markdown-like)</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none min-h-[150px]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Cover Image URL</label>
              <input type="url" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none" />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-[#00F2FE]" />
                <span className="text-sm font-medium text-[#94A3B8]">Published</span>
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
