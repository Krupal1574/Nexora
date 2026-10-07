"use client";
import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

export default function CouponsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("PERCENTAGE");
  const [active, setActive] = useState(true);
  const [maxUses, setMaxUses] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const fetchItems = () => {
    fetch("/api/admin/coupons")
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
    setCode(u.code);
    setDiscount(u.discount.toString());
    setType(u.type);
    setActive(u.active);
    setMaxUses(u.maxUses ? u.maxUses.toString() : "");
    setExpiryDate(u.expiryDate ? new Date(u.expiryDate).toISOString().split('T')[0] : "");
  };

  const handleReset = () => {
    setEditingId(null);
    setCode("");
    setDiscount("");
    setType("PERCENTAGE");
    setActive(true);
    setMaxUses("");
    setExpiryDate("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      code,
      discount: parseFloat(discount),
      type,
      active,
      maxUses: maxUses ? parseInt(maxUses) : null,
      expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null
    };

    if (editingId) {
      await fetch(`/api/admin/coupons/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    
    handleReset();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
      fetchItems();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Coupons</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-[#121623] border border-[#203548] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1A202C] border-b border-[#203548]">
                <tr>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Code</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Discount</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Usage</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Status</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#203548]">
                {loading ? (
                  <tr><td colSpan={5} className="p-4 text-center text-[#94A3B8]">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-[#94A3B8]">No coupons found.</td></tr>
                ) : (
                  items.map((item: any) => (
                    <tr key={item.id} className="hover:bg-[#1A202C]/50 transition-colors">
                      <td className="p-4 text-sm text-white font-bold">{item.code}</td>
                      <td className="p-4 text-sm text-white">
                        {item.type === 'PERCENTAGE' ? `${item.discount}%` : `$${item.discount}`}
                      </td>
                      <td className="p-4 text-sm text-[#94A3B8]">
                        {item.usedCount} {item.maxUses ? `/ ${item.maxUses}` : ''}
                      </td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.active ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                        }`}>
                          {item.active ? 'Active' : 'Inactive'}
                        </span>
                        {item.expiryDate && new Date(item.expiryDate) < new Date() && (
                          <span className="block mt-1 text-xs text-red-500">Expired</span>
                        )}
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 bg-[#203548] hover:bg-[#F26A21] hover:text-black rounded transition-colors mr-2">
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
            {editingId ? `Update Coupon` : "Add Coupon"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Code</label>
              <input 
                type="text"
                value={code} 
                onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s/g, ''))} 
                className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)} 
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed Amount ($)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Discount Amount</label>
                <input 
                  type="number"
                  step="0.01"
                  min="0"
                  value={discount} 
                  onChange={(e) => setDiscount(e.target.value)} 
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Max Uses (Optional)</label>
              <input 
                type="number"
                min="1"
                value={maxUses} 
                onChange={(e) => setMaxUses(e.target.value)} 
                className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Expiry Date (Optional)</label>
              <input 
                type="date"
                value={expiryDate} 
                onChange={(e) => setExpiryDate(e.target.value)} 
                className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none [color-scheme:dark]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 accent-[#F26A21]"
              />
              <span className="text-sm font-medium text-[#94A3B8]">Coupon Active</span>
            </div>

            <div className="flex gap-2 pt-4">
              <button type="submit" className="flex-1 py-2 bg-[#F26A21] text-black font-bold rounded hover:bg-[#8FB8D8] transition-colors">
                {editingId ? "Update Coupon" : "Create Coupon"}
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
