import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services-data";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Real-World IT Training & Career Prep",
  description:
    "Hands-on project-driven programs in Cloud, Full-Stack, Data Engineering, DevOps, and AI, engineered to bridge theory and high-paying tech jobs.",
};

export default function ItTrainingPage() {
  const service = servicesData.find((s) => s.slug === "it-training");
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
