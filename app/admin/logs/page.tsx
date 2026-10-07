"use client";
import { useState, useEffect } from "react";

export default function AuditLogsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/logs")
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
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
        <button className="bg-[#F26A21] text-black px-4 py-2 rounded font-bold hover:bg-[#8FB8D8] transition-colors">
          Add New
        </button>
      </div>

      <div className="bg-[#121623] border border-[#203548] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1A202C] border-b border-[#203548]">
              <tr>
                <th className="p-4 text-sm font-medium text-[#94A3B8]">ID</th>
                <th className="p-4 text-sm font-medium text-[#94A3B8]">Created At</th>
                <th className="p-4 text-sm font-medium text-[#94A3B8]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#203548]">
              {loading ? (
                <tr><td colSpan={3} className="p-4 text-center text-[#94A3B8]">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={3} className="p-4 text-center text-[#94A3B8]">No audit logs found.</td></tr>
              ) : (
                items.map((item: any) => (
                  <tr key={item.id} className="hover:bg-[#1A202C]/50 transition-colors">
                    <td className="p-4 text-sm text-white">{item.id}</td>
                    <td className="p-4 text-sm text-[#94A3B8]">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-sm text-[#F26A21] cursor-pointer hover:underline">Edit</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
