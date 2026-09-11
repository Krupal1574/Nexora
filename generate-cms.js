const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app');

const entities = [
  { name: 'users', model: 'user', title: 'Users' },
  { name: 'courses', model: 'course', title: 'Courses' },
  { name: 'products', model: 'product', title: 'Products' },
  { name: 'orders', model: 'order', title: 'Orders' },
  { name: 'inquiries', model: 'contactInquiry', title: 'Inquiries' },
  { name: 'coupons', model: 'coupon', title: 'Coupons' },
  { name: 'media', model: 'mediaAsset', title: 'Media Library' },
  { name: 'settings', model: 'siteSetting', title: 'Settings' },
  { name: 'logs', model: 'adminAuditLog', title: 'Audit Logs' }
];

const apiTemplate = (model) => `import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const items = await prisma.${model}.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const item = await prisma.${model}.create({
      data: body,
    });
    return NextResponse.json(item);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
`;

const pageTemplate = (title, model) => `"use client";
import { useState, useEffect } from "react";

export default function ${title.replace(/\s+/g, '')}Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/${model.toLowerCase() === 'contactinquiry' ? 'inquiries' : model.toLowerCase() === 'mediaasset' ? 'media' : model.toLowerCase() === 'sitesetting' ? 'settings' : model.toLowerCase() === 'adminauditlog' ? 'logs' : model.toLowerCase() + 's'}")
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">${title}</h1>
        <button className="bg-[#00F2FE] text-black px-4 py-2 rounded font-bold hover:bg-[#00D2C4] transition-colors">
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
                <tr><td colSpan={3} className="p-4 text-center text-[#94A3B8]">No ${title.toLowerCase()} found.</td></tr>
              ) : (
                items.map((item: any) => (
                  <tr key={item.id} className="hover:bg-[#1A202C]/50 transition-colors">
                    <td className="p-4 text-sm text-white">{item.id}</td>
                    <td className="p-4 text-sm text-[#94A3B8]">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-sm text-[#00F2FE] cursor-pointer hover:underline">Edit</td>
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
`;

entities.forEach(entity => {
  // Create API route
  const apiDir = path.join(baseDir, 'api', 'admin', entity.name);
  fs.mkdirSync(apiDir, { recursive: true });
  fs.writeFileSync(path.join(apiDir, 'route.ts'), apiTemplate(entity.model));

  // Create Page
  const pageDir = path.join(baseDir, 'admin', entity.name);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageTemplate(entity.title, entity.model));
});

console.log('Boilerplate generated successfully.');
