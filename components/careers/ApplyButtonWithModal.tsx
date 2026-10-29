"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import JobApplicationModal from "@/components/careers/JobApplicationModal";

interface ApplyButtonWithModalProps {
  roleName: string;
  roleSlug?: string;
  className?: string;
  buttonText?: string;
}

export default function ApplyButtonWithModal({
  roleName,
  roleSlug,
  className,
  buttonText = "Apply Now",
}: ApplyButtonWithModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 rounded-full bg-[#F26A21] hover:bg-[#D95A19] text-white font-semibold px-8 py-4 text-base transition-colors shadow-lg shadow-[#F26A21]/20 cursor-pointer"
        }
      >
        {buttonText}
        <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
      </button>

      <JobApplicationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        roleName={roleName}
        roleSlug={roleSlug}
      />
    </>
  );
}

