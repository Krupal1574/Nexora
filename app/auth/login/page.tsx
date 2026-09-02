"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#121623] border border-[#203548]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00F2FE]">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#07151d] border border-[#203548] text-white focus:border-[#00F2FE] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#07151d] border border-[#203548] text-white focus:border-[#00F2FE] outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-[#00F2FE] text-black font-bold rounded hover:bg-[#00D2C4] transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
