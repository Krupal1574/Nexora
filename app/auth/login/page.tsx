"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

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
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#121623] border border-[#203548]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00F2FE]">Login to Nexora</h2>
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

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="w-full h-px bg-[#203548]"></span>
          <span className="text-xs text-[#94A3B8] uppercase">Or</span>
          <span className="w-full h-px bg-[#203548]"></span>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="mt-6 w-full flex items-center justify-center gap-2 py-2 bg-white text-black font-semibold rounded hover:bg-gray-100 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-sm text-[#94A3B8]">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-[#00F2FE] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
