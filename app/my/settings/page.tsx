"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Settings, Mail, Shield, User, Calendar, Lock,
  Eye, EyeOff, Check, AlertCircle, Globe, Key,
} from "lucide-react";

type AccountInfo = {
  id: string;
  name: string | null;
  email: string;
  jobTitle: string | null;
  company: string | null;
  role: string;
  hasPassword: boolean;
  isGoogleUser: boolean;
  providers: string[];
  createdAt: string;
};

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#203548] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-[#1A202C] flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#64748B]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#64748B] mb-0.5">{label}</p>
        <p className="text-sm text-[#94A3B8] break-all">{value}</p>
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#94A3B8] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          placeholder={placeholder}
          className="w-full p-3 pr-10 rounded-xl bg-[#0B0F19] border border-[#203548] text-white focus:border-[#00F2FE] outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#94A3B8] transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function AccountSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [infoLoading, setInfoLoading] = useState(true);
  const [infoError, setInfoError] = useState("");

  // Password change form
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwStatus, setPwStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/my/settings");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/user/settings")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load account info");
        return r.json();
      })
      .then(setAccountInfo)
      .catch(() => setInfoError("Could not load account information."))
      .finally(() => setInfoLoading(false));
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="flex items-center gap-3 text-[#94A3B8]">
            <div className="w-5 h-5 border-2 border-[#00F2FE]/30 border-t-[#00F2FE] rounded-full animate-spin" />
            Loading...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");

    if (newPw !== confirmPw) {
      setPwError("New passwords do not match.");
      return;
    }
    if (newPw.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }

    setPwStatus("loading");
    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setPwStatus("success");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      setTimeout(() => setPwStatus("idle"), 4000);
    } catch (err: any) {
      setPwError(err.message);
      setPwStatus("error");
    }
  };

  const userImage = session?.user?.image;
  const displayName = accountInfo?.name || session?.user?.email || "User";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#00F2FE]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Account Settings
              </h1>
              <p className="text-[#94A3B8] text-sm">Manage your account information and security.</p>
            </div>
          </div>

          {infoError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {infoError}
            </div>
          )}

          {/* Account Information */}
          <section className="bg-[#121923] border border-[#203548] rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00F2FE]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="px-6 py-5 border-b border-[#203548]">
              <h2 className="text-lg font-semibold text-white">Account Information</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Your profile details and account type.</p>
            </div>

            {infoLoading ? (
              <div className="p-6 space-y-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#203548] rounded-lg" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2.5 w-16 bg-[#203548] rounded" />
                      <div className="h-3 w-40 bg-[#203548] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : accountInfo ? (
              <div className="px-6 py-4 relative z-10">
                {/* Avatar + name row */}
                <div className="flex items-center gap-4 py-3 border-b border-[#203548]">
                  <div className="w-14 h-14 rounded-full border-2 border-[#203548] overflow-hidden shrink-0 ring-2 ring-[#00F2FE]/10">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt={displayName}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00F2FE] to-[#00D2C4] flex items-center justify-center text-xl font-bold text-black">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{displayName}</p>
                    <p className="text-xs text-[#64748B]">{accountInfo.email}</p>
                  </div>
                </div>

                <InfoRow icon={Mail} label="Email Address" value={accountInfo.email} />
                <InfoRow icon={User} label="Display Name" value={accountInfo.name || "—"} />
                {accountInfo.jobTitle && (
                  <InfoRow icon={User} label="Job Title" value={accountInfo.jobTitle} />
                )}
                {accountInfo.company && (
                  <InfoRow icon={User} label="Company" value={accountInfo.company} />
                )}
                <InfoRow icon={Shield} label="Account Role" value={accountInfo.role} />
                <InfoRow
                  icon={Calendar}
                  label="Member Since"
                  value={new Date(accountInfo.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />

                {/* Auth type badge */}
                <div className="pt-4">
                  {accountInfo.isGoogleUser ? (
                    <div className="flex items-center gap-2.5 p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                      <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-300">Signed in with Google</p>
                        <p className="text-xs text-[#64748B]">Your identity is managed by Google.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5 p-3 bg-[#00F2FE]/5 border border-[#00F2FE]/20 rounded-xl">
                      <Key className="w-5 h-5 text-[#00F2FE] shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#00F2FE]">Email & Password account</p>
                        <p className="text-xs text-[#64748B]">You log in with your email and password.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </section>

          {/* Security / Password Change */}
          <section className="bg-[#121923] border border-[#203548] rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#203548]">
              <h2 className="text-lg font-semibold text-white">Security</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Manage your password and login security.</p>
            </div>

            <div className="px-6 py-6">
              {infoLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-48 bg-[#203548] rounded" />
                  <div className="h-10 bg-[#203548] rounded-xl" />
                  <div className="h-10 bg-[#203548] rounded-xl" />
                </div>
              ) : accountInfo?.isGoogleUser ? (
                /* Google user — no password to change */
                <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <Globe className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300 mb-1">
                      Password managed by Google
                    </p>
                    <p className="text-sm text-[#94A3B8]">
                      You signed in using Google OAuth. To change your password, visit your{" "}
                      <a
                        href="https://myaccount.google.com/security"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                      >
                        Google account security settings
                      </a>
                      .
                    </p>
                  </div>
                </div>
              ) : (
                /* Credential user — show password change form */
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-4 h-4 text-[#64748B]" />
                    <p className="text-sm font-medium text-[#94A3B8]">Change Password</p>
                  </div>

                  {pwStatus === "success" && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      Password changed successfully.
                    </div>
                  )}

                  {(pwStatus === "error" || pwError) && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {pwError}
                    </div>
                  )}

                  <PasswordInput
                    id="current-password"
                    label="Current Password"
                    value={currentPw}
                    onChange={setCurrentPw}
                    placeholder="Enter current password"
                  />
                  <PasswordInput
                    id="new-password"
                    label="New Password"
                    value={newPw}
                    onChange={setNewPw}
                    placeholder="At least 8 characters"
                  />
                  <PasswordInput
                    id="confirm-password"
                    label="Confirm New Password"
                    value={confirmPw}
                    onChange={setConfirmPw}
                    placeholder="Repeat new password"
                  />

                  <button
                    type="submit"
                    disabled={pwStatus === "loading"}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#00F2FE] text-black font-bold rounded-xl hover:bg-[#00D2C4] transition-colors disabled:opacity-50"
                  >
                    {pwStatus === "loading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Update Password
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Quick links */}
          <div className="flex gap-3 justify-center pt-2">
            <a href="/profile" className="text-sm text-[#64748B] hover:text-[#00F2FE] transition-colors">
              Edit Profile
            </a>
            <span className="text-[#203548]">·</span>
            <a href="/my/orders" className="text-sm text-[#64748B] hover:text-[#00F2FE] transition-colors">
              My Orders
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
