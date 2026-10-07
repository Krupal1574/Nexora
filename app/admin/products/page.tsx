"use client";
import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

export default function ProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [stock, setStock] = useState("0");
  const [featured, setFeatured] = useState(false);

  const fetchItems = () => {
    fetch("/api/admin/products")
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
    setIsAdding(false);
    setEditingId(u.id);
    setName(u.name);
    setSlug(u.slug);
    setDescription(u.description || "");
    setPrice(u.price ? u.price.toString() : "0");
    setOriginalPrice(u.originalPrice ? u.originalPrice.toString() : "");
    setDiscount(u.discount?.toString() || "0");
    setImage(u.image || "");
    setCategory(u.category || "");
    setStatus(u.status);
    setStock(u.stock?.toString() || "0");
    setFeatured(u.featured || false);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setIsAdding(true);
    setName("");
    setSlug("");
    setDescription("");
    setPrice("0");
    setOriginalPrice("");
    setDiscount("0");
    setImage("");
    setCategory("");
    setStatus("ACTIVE");
    setStock("0");
    setFeatured(false);
  };

  const handleReset = () => {
    setEditingId(null);
    setIsAdding(false);
    setName("");
    setSlug("");
    setDescription("");
    setPrice("0");
    setOriginalPrice("");
    setDiscount("0");
    setImage("");
    setCategory("");
    setStatus("ACTIVE");
    setStock("0");
    setFeatured(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = { 
      name, slug, description, price: parseFloat(price), originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      discount: parseInt(discount, 10), image, category, status, stock: parseInt(stock, 10), featured 
    };

    if (editingId) {
      await fetch(`/api/admin/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch(`/api/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    
    handleReset();
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      fetchItems();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <button 
          onClick={handleAddNew}
          className="bg-[#F26A21] text-black px-4 py-2 rounded font-bold hover:bg-[#8FB8D8] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-[#121623] border border-[#203548] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1A202C] border-b border-[#203548]">
                <tr>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Product</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Price / Stock</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8]">Status</th>
                  <th className="p-4 text-sm font-medium text-[#94A3B8] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#203548]">
                {loading ? (
                  <tr><td colSpan={4} className="p-4 text-center text-[#94A3B8]">Loading...</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center text-[#94A3B8]">No products found.</td></tr>
                ) : (
                  items.map((item: any) => (
                    <tr key={item.id} className="hover:bg-[#1A202C]/50 transition-colors">
                      <td className="p-4 text-sm text-white">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-[#94A3B8] text-xs">/{item.slug}</div>
                      </td>
                      <td className="p-4 text-sm text-white">
                        <div>${Number(item.price || 0).toFixed(2)}</div>
                        <div className="text-[#94A3B8] text-xs">Stock: {item.stock}</div>
                      </td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.status === 'ACTIVE' ? 'bg-green-400/10 text-green-400' : 
                          item.status === 'INACTIVE' ? 'bg-gray-400/10 text-gray-400' : 
                          'bg-red-400/10 text-red-400'
                        }`}>
                          {item.status}
                        </span>
                        {item.featured && (
                          <span className="ml-2 px-2 py-1 rounded text-xs font-bold bg-[#F26A21]/10 text-[#F26A21]">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="p-4 flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 bg-[#203548] hover:bg-[#F26A21] hover:text-black rounded transition-colors">
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
        {(isAdding || editingId) && (
          <div className="bg-[#121623] border border-[#203548] rounded-2xl p-6 h-fit max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingId ? `Edit Product` : "Add New Product"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Slug</label>
                <input 
                  type="text" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value)} 
                  required
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={3}
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Image URL</label>
                <input 
                  type="text" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Category</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required
                    className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Original Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={originalPrice} 
                    onChange={(e) => setOriginalPrice(e.target.value)} 
                    className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Stock</label>
                  <input 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    required
                    className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#94A3B8]">Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    className="w-full p-2 rounded bg-[#0B0F19] border border-[#203548] text-white focus:border-[#F26A21] outline-none"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="OUT_OF_STOCK">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={featured} 
                    onChange={(e) => setFeatured(e.target.checked)} 
                    className="w-4 h-4 accent-[#F26A21]" 
                  />
                  <span className="text-sm font-medium text-white">Featured Product</span>
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 py-2 bg-[#F26A21] text-black font-bold rounded hover:bg-[#8FB8D8] transition-colors">
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleReset} className="px-4 py-2 bg-[#203548] text-white font-bold rounded hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
