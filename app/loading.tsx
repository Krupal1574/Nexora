import { Zap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#0B0F19]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#00F2FE14_0%,transparent_65%)]" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F2FE] to-[#00D2C4] flex items-center justify-center shadow-[0_0_30px_#00F2FE66] animate-pulse mb-6">
          <Zap className="w-8 h-8 text-[#0B0F19]" fill="currentColor" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00F2FE] animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#00F2FE] animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-[#00D2C4] animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
