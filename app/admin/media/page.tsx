"use client";
import { useState, useEffect } from "react";
import { Edit2, Trash2, Image as ImageIcon, FileText, Video, ExternalLink } from "lucide-react";

export default function MediaLibraryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [url, setUrl] = useState("");
  const [type, setType] = useState("IMAGE");
  const [format, setFormat] = useState("");
  const [size, setSize] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/media")
      .then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (u: any) => {
    setEditingId(u.id);
    setUrl(u.url);
    setType(u.type);
    setFormat(u.format || "");
    setSize(u.size ? u.size.toString() : "");
  };

  const handleReset = () => {
    setEditingId(null);
    setUrl("");
    setType("IMAGE");
    setFormat("");
    setSize("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      url,
      type,
      format: format || null,
      size: size ? parseInt(size) : null
    };

    if (editingId) {
      await fetch(`/api/admin/media/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    
    handleReset();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this media asset?")) {
      await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      fetchItems();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'IMAGE': return <ImageIcon className="w-8 h-8 text-blue-400" />;
      case 'VIDEO': return <Video className="w-8 h-8 text-purple-400" />;
      case 'DOCUMENT': return <FileText className="w-8 h-8 text-emerald-400" />;
      default: return <ImageIcon className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Media Library</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-[#121623] border border-[#203548] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1A202C] border-b border-[#203548]">
                <tr>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Preview</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Details</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#203548]">
                {loading ? (
                  <tr><td colSpan={3} className="p-4 text-center text-[#94A3B8]">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={3} className="p-4 text-center text-[#94A3B8]">No media found.</td></tr>
                ) : (
                  items.map((item: any) => (
                    <tr key={item.id} className="hover:bg-[#1A202C]/50 transition-colors">
                      <td className="p-4">
                        <div className="w-16 h-16 bg-[#0B0F19] rounded flex items-center justify-center overflow-hidden border border-[#203548]">
                          {item.type === 'IMAGE' ? (
                            <img src={item.url} alt="Media preview" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/150'} />
                          ) : getIcon(item.type)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white text-sm font-bold flex items-center gap-1 hover:text-[#00F2FE] truncate max-w-[300px]">
                            {item.url} <ExternalLink className="w-3 h-3" />
                          </a>
                          <div className="flex gap-2 text-xs text-[#94A3B8]">
                            <span className="bg-[#203548] px-2 py-0.5 rounded">{item.type}</span>
                            {item.format && <span>{item.format}</span>}
                            {item.size && <span>{(item.size / 1024).toFixed(1)} KB</span>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleEdit(item)} className="p-2 bg-[#203548] hover:bg-[#00F2FE] hover:text-black rounded transition-colors mr-2">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-[#203548] hover:bg-red-500 hover:text-white rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Panel */}
        <div className="bg-[#121623] border border-[#203548] rounded-2xl p-6 h-fit max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-6">
            {editingId ? `Update Media` : "Add Media"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Direct URL</label>
              <input 
                type="url"
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none"
                required
                placeholder="https://..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Media Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
                className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none"
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
                <option value="DOCUMENT">Document</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Format (Optional)</label>
                <input 
                  type="text"
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)} 
                  placeholder="e.g. png, mp4"
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Size in bytes (Optional)</label>
                <input 
                  type="number"
                  min="0"
                  value={size} 
                  onChange={(e) => setSize(e.target.value)} 
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button type="submit" className="flex-1 py-2 bg-[#00F2FE] text-black font-bold rounded hover:bg-[#00D2C4] transition-colors">
                {editingId ? "Update Media" : "Add Media"}
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
