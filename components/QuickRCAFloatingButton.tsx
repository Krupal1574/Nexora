"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function QuickRCAFloatingButton() {
  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.dispatchEvent(new Event('open-rca-modal'))}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F26A21] to-[#E55A11] px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(242,106,33,0.4)] transition-all hover:shadow-[0_8px_32px_rgba(242,106,33,0.6)] sm:bottom-8 sm:left-8 group"
    >
      <Activity className="h-5 w-5 animate-pulse" />
      <span>Get Free Diagnosis</span>
      
      {/* Decorative pulse ring */}
      <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-[#F26A21] opacity-20 duration-1000 group-hover:opacity-40" />
    </motion.button>
  );
}
