import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services-data";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Technical Recruitment & Staffing Solutions",
  description:
    "Scalable technical staffing solutions connecting companies with pre-vetted engineers, architects, data specialists, and IT leaders.",
};

export default function RecruitmentStaffingPage() {
  const service = servicesData.find((s) => s.slug === "recruitment-and-staffing");
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
