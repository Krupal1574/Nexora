import type { Metadata } from "next";
import JobPlacementContent from "./JobPlacementContent";

export const metadata: Metadata = {
  title: "Job Placement Support & Services | Nexora Staffing",
  description:
    "Specialized job placement support for F-1, OPT, STEM OPT, H-1B, and USC tech professionals across top US employers. Tailored resume prep, interview coaching, and active recruiter outreach.",
};

export default function JobPlacementPage() {
  return <JobPlacementContent />;
}
