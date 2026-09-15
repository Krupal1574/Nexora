"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, FileText, Settings, Briefcase, Mail } from "lucide-react";
import { AvatarUpload } from "@/components/candidate/AvatarUpload";
import { ProfileForm } from "@/components/candidate/ProfileForm";
import { ResumeUpload } from "@/components/candidate/ResumeUpload";
import { SecuritySettings } from "@/components/candidate/SecuritySettings";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"profile" | "resume" | "settings">("profile");
  const [profileData, setProfileData] = useState<any>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated" && session?.user) {
      fetchProfileData();
    }
  }, [status, session, router]);

  const fetchProfileData = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
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

  const handleParsed = (data: any) => {
    setParsedData(data);
    setActiveTab("profile"); // Switch to profile to review data
  };

  const hasResume = !!profileData?.resume;
  
  // Calculate completion percentage
  const calcCompletion = () => {
    if (!profileData) return 0;
    const fields = [
      !!profileData.name,
      !!profileData.candidateProfile?.headline,
      !!profileData.candidateProfile?.location,
      !!profileData.phone,
      !!profileData.candidateProfile?.summary,
      !!profileData.candidateProfile?.skills?.length,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  };
  const completion = calcCompletion();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-[#121923] border border-[#203548] p-6 rounded-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/5 rounded-full blur-[50px]" />
              
              <AvatarUpload 
                currentImage={session?.user?.image} 
                name={session?.user?.name || session?.user?.email} 
              />
              
              <h2 className="mt-4 text-lg font-bold text-white">{session?.user?.name || "User"}</h2>
              <p className="text-sm text-white/50">{profileData?.candidateProfile?.headline || "No headline set"}</p>
              
              <div className="mt-6">
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>Profile Completion</span>
                  <span>{completion}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00F2FE] to-[#00D2C4] rounded-full" 
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "profile" 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <User size={18} /> Profile Information
              </button>
              <button 
                onClick={() => setActiveTab("resume")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "resume" 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FileText size={18} /> My Resume
              </button>
              <button 
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "settings" 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Settings size={18} /> Security & Settings
              </button>
              
              <div className="h-px bg-white/10 my-2" />
              
              <a 
                href="/my/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all"
              >
                <Briefcase size={18} /> My Orders
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-[#121923] border border-[#203548] p-8 rounded-2xl relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F2FE]/5 rounded-full blur-[100px]" />
              
              <div className="relative z-10">
                {activeTab === "profile" && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Professional Profile</h2>
                    {parsedData && (
                      <div className="mb-6 p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl">
                        Resume parsed successfully. We've filled in your profile based on the extracted data. Please review and save.
                      </div>
                    )}
                    <ProfileForm initialData={profileData} parsedData={parsedData} />
                  </div>
                )}
                
                {activeTab === "resume" && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Resume Management</h2>
                    <p className="text-white/70 mb-8">Upload your resume to automatically parse your skills and experience.</p>
                    <ResumeUpload hasResume={hasResume} onParsed={handleParsed} />
                  </div>
                )}
                
                {activeTab === "settings" && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                    <SecuritySettings initialEmail={profileData?.email} initialPhone={profileData?.phone} />
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
