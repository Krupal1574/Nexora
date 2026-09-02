import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const testCount = await prisma.testimonial.count();
  const blogCount = await prisma.blogPost.count();
  const pubTestCount = await prisma.testimonial.count({ where: { published: true } });
  const pubBlogCount = await prisma.blogPost.count({ where: { published: true } });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
      <p className="text-[#94A3B8] mb-8">Welcome back, {session?.user?.name || "Admin"}!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#121623] border border-[#203548] p-6 rounded-2xl">
          <h3 className="text-[#94A3B8] text-sm font-semibold mb-2">Total Testimonials</h3>
          <p className="text-4xl font-bold text-[#00F2FE]">{testCount}</p>
        </div>
        <div className="bg-[#121623] border border-[#203548] p-6 rounded-2xl">
          <h3 className="text-[#94A3B8] text-sm font-semibold mb-2">Published Testimonials</h3>
          <p className="text-4xl font-bold text-emerald-400">{pubTestCount}</p>
        </div>
        <div className="bg-[#121623] border border-[#203548] p-6 rounded-2xl">
          <h3 className="text-[#94A3B8] text-sm font-semibold mb-2">Total Blog Posts</h3>
          <p className="text-4xl font-bold text-[#00F2FE]">{blogCount}</p>
        </div>
        <div className="bg-[#121623] border border-[#203548] p-6 rounded-2xl">
          <h3 className="text-[#94A3B8] text-sm font-semibold mb-2">Published Blog Posts</h3>
          <p className="text-4xl font-bold text-emerald-400">{pubBlogCount}</p>
        </div>
      </div>
    </div>
  );
}
