import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services-data";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";

export const metadata: Metadata = {
  title: "Accounting & Tax Services for IT Consultants & Businesses",
  description:
    "Full-service bookkeeping, payroll management, corporate tax planning, and individual consultant tax optimization for tech professionals.",
};

export default function AccountingTaxesPage() {
  const service = servicesData.find((s) => s.slug === "accounting-and-taxes");
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
