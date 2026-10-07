import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#F5F1E8]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#F26A2114_0%,transparent_65%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F26A21] to-[#8FB8D8] flex items-center justify-center shadow-[0_0_30px_#F26A2166] animate-pulse mb-6">
          <Zap className="w-8 h-8 text-[#F5F1E8]" fill="currentColor" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#F26A21] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#F26A21] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#8FB8D8] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
