import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services-data";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Employee Background Verification Services USA",
  description:
    "FCRA-compliant employee background checks, employment history validation, education verification, and criminal record screening across all 50 states.",
};

export default function BackgroundVerificationPage() {
  const service = servicesData.find((s) => s.slug === "background-verification");
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
