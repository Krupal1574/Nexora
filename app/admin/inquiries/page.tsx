"use client";
import { useState, useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function InquiriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [status, setStatus] = useState("NEW");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/inquiries")
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
    setName(u.name);
    setStatus(u.status);
    setNotes(u.notes || "");
  };

  const handleReset = () => {
    setEditingId(null);
    setName("");
    setStatus("NEW");
    setNotes("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    await fetch(`/api/admin/inquiries/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes })
    });
    
    handleReset();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      fetchItems();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Inquiries</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-[#121623] border border-[#203548] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1A202C] border-b border-[#203548]">
                <tr>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Sender</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Subject / Date</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Status</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#203548]">
                {loading ? (
                  <tr><td colSpan={4} className="p-4 text-center text-[#94A3B8]">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center text-[#94A3B8]">No inquiries found.</td></tr>
                ) : (
                  items.map((item: any) => (
                    <tr key={item.id} className="hover:bg-[#1A202C]/50 transition-colors">
                      <td className="p-4 text-sm text-white">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-[#94A3B8] text-xs">{item.email}</div>
                      </td>
                      <td className="p-4 text-sm text-white">
                        <div className="truncate max-w-[200px]">{item.subject}</div>
                        <div className="text-[#94A3B8] text-xs">{new Date(item.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.status === 'RESOLVED' ? 'bg-green-400/10 text-green-400' : 
                          item.status === 'IN_PROGRESS' ? 'bg-blue-400/10 text-blue-400' : 
                          'bg-yellow-400/10 text-yellow-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 flex justify-end gap-2">
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
            {editingId ? `Update Inquiry: ${name}` : "Select an inquiry to update"}
          </h2>
          
          {editingId ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)} 
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none"
                >
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Internal Notes</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  placeholder="Add notes for admin team..."
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none min-h-[100px]"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 py-2 bg-[#00F2FE] text-black font-bold rounded hover:bg-[#00D2C4] transition-colors">
                  Update Inquiry
                </button>
                <button type="button" onClick={handleReset} className="px-4 py-2 bg-[#203548] text-white font-bold rounded hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-[#94A3B8] text-sm">Click the edit button next to an inquiry in the table to modify its status or add internal notes.</p>
          )}
        </div>
      </div>
    </div>
  );
}
