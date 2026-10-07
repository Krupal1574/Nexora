"use client";

import { useState } from "react";
import { Loader2, Mail, Phone, Lock } from "lucide-react";
import { useSession } from "next-auth/react";

export function SecuritySettings({ initialEmail, initialPhone }: { initialEmail: string, initialPhone?: string | null }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone || "");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const isGoogle = session?.user?.image?.includes("googleusercontent.com");

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === initialEmail) return;

    setLoading(true);
    try {
      const res = await fetch("/api/user/profile/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail: email }),
      });
      
      if (res.ok) {
        alert("Verification email sent to " + email);
      } else {
        const text = await res.text();
        alert("Failed: " + text);
      }
    } catch (err) {
      alert("Error requesting email change");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone === initialPhone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/user/profile/mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPhone: phone }),
      });
      
      if (res.ok) {
        setShowOtp(true);
        alert("OTP sent to " + phone);
      } else {
        const text = await res.text();
        alert("Failed: " + text);
      }
    } catch (err) {
      alert("Error requesting phone change");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile/mobile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      
      if (res.ok) {
        alert("Phone verified successfully!");
        setShowOtp(false);
        window.location.reload();
      } else {
        const text = await res.text();
        alert("Failed: " + text);
      }
    } catch (err) {
      alert("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Email Setting */}
      <div className="bg-black/5 border border-black/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-[#171717] mb-4 flex items-center gap-2">
          <Mail className="text-primary" />
          Email Address
        </h3>
        {isGoogle ? (
          <p className="text-[#171717]/70">Your email is managed by Google.</p>
        ) : (
          <form onSubmit={handleEmailChange} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#171717]/70 mb-2">New Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || email === initialEmail}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              Verify & Change
            </button>
          </form>
        )}
      </div>

      {/* Phone Setting */}
      <div className="bg-black/5 border border-black/10 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-[#171717] mb-4 flex items-center gap-2">
          <Phone className="text-primary" />
          Mobile Phone
        </h3>
        {!showOtp ? (
          <form onSubmit={handlePhoneRequest} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#171717]/70 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || phone === initialPhone}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              Update Phone
            </button>
          </form>
        ) : (
          <form onSubmit={handlePhoneVerify} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#171717]/70 mb-2">Enter 6-digit OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-[#171717] focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="px-6 py-2 bg-black/10 text-[#171717] rounded-lg hover:bg-white/20"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* Password Setting */}
      {!isGoogle && (
        <div className="bg-black/5 border border-black/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#171717] mb-4 flex items-center gap-2">
            <Lock className="text-primary" />
            Password
          </h3>
          <p className="text-[#171717]/70 mb-4">You can change your password from the security settings or by requesting a reset.</p>
          <a href="/auth/forgot-password" className="px-6 py-2 bg-black/10 text-[#171717] rounded-lg hover:bg-white/20 inline-block">
            Reset Password
          </a>
        </div>
      )}
    </div>
  );
}
