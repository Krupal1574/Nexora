import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services-data";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Full-Cycle Talent Acquisition Solutions",
  description:
    "Transforming how tech enterprises discover, attract, and retain elite technical talent through strategic talent mapping and executive search.",
};

export default function TalentAcquisitionPage() {
  const service = servicesData.find((s) => s.slug === "talent-acquisition");
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
