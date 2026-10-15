import type { Metadata } from "next";
import RecruitmentStaffingContent from "../recruitment-staffing/RecruitmentStaffingContent";

export const metadata: Metadata = {
  title: "Recruitment & Staffing Solutions | Nexora Staffing",
  description:
    "End-to-end technical recruitment, contract staffing, and permanent placement solutions. Connecting leading U.S. enterprises with pre-screened tech talent.",
};

export default function RecruitmentAndStaffingPage() {
  return <RecruitmentStaffingContent />;
}
