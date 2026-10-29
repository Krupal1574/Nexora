import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import ApplyButtonWithModal from "@/components/careers/ApplyButtonWithModal";

export const metadata: Metadata = {
  title: "Civil Engineer Project Manager – Land Development",
  description:
    "Apply for the Civil Engineer Project Manager – Land Development position in Doylestown, Pennsylvania. Full-time, office-based with flexible work model. $110,000–$150,000.",
};

const ROLE_NAME = "Civil Engineer Project Manager – Land Development";
const ROLE_SLUG = "civil-engineer-project-manager-land-development";
const ROLE_IMAGE = "/images/careers/civil-engineer-project-manager.jpg";

export default function CivilEngineerPMPage() {
  return (
    <div className="bg-[#F5F1E8] min-h-screen">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#77736D] hover:text-[#F26A21] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 md:px-12 pt-8 pb-10">
        <span className="inline-flex items-center gap-2 bg-[#ff2b2b] text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Open
        </span>
        <h1
          className="text-3xl md:text-5xl font-bold tracking-tight text-[#0f0f0f] mb-2"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Civil Engineer Project Manager
        </h1>
        <p className="text-xl text-[#0f0f0f]/70 mb-8">Land Development</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <MapPin className="w-4 h-4" /> Doylestown, Pennsylvania
          </span>
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <DollarSign className="w-4 h-4" /> $110,000 – $150,000
          </span>
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <Clock className="w-4 h-4" /> Full-time
          </span>
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <Building2 className="w-4 h-4" /> Office-based with flexible work model
          </span>
        </div>

        {/* Role Banner Image */}
        <div className="relative aspect-[16/9] md:aspect-[2/1] w-full rounded-[28px] overflow-hidden shadow-sm mb-8 bg-[#1a1a1a] border border-black/5">
          <Image
            src={ROLE_IMAGE}
            alt={ROLE_NAME}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <ApplyButtonWithModal roleName={ROLE_NAME} roleSlug={ROLE_SLUG} />
        </div>
      </header>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        <div className="bg-white rounded-[28px] p-8 md:p-12 shadow-sm space-y-10">
          {/* About */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              About the Role
            </h2>
            <p className="text-[#0f0f0f]/80 leading-relaxed">
              We are seeking an experienced Civil Engineer Project Manager to join a growing land
              development team in Doylestown, Pennsylvania. You will lead residential and commercial
              land development projects from concept through construction, managing multidisciplinary
              engineering teams, coordinating with municipal authorities, and ensuring projects are
              delivered on time and within budget.
            </p>
          </section>

          {/* Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Key Responsibilities
            </h2>
            <ul className="list-disc list-inside text-[#0f0f0f]/80 leading-relaxed space-y-2">
              <li>Lead and manage land development projects including residential subdivisions, commercial site plans, and mixed-use developments.</li>
              <li>Oversee site design, grading, stormwater management, utility design, and erosion control plans.</li>
              <li>Coordinate with local, county, and state agencies for permitting and plan approvals (zoning, land use, NPDES, highway occupancy).</li>
              <li>Manage project budgets, schedules, and resource allocation to meet client expectations.</li>
              <li>Mentor and supervise junior engineers, designers, and CAD technicians.</li>
              <li>Prepare and review engineering calculations, reports, and construction documents.</li>
              <li>Attend municipal planning and zoning meetings to present projects and address agency comments.</li>
              <li>Coordinate with surveyors, geotechnical engineers, environmental consultants, landscape architects, and traffic engineers.</li>
              <li>Conduct site visits and construction observations to ensure compliance with approved plans.</li>
            </ul>
          </section>

          {/* Qualifications */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Qualifications
            </h2>
            <ul className="list-disc list-inside text-[#0f0f0f]/80 leading-relaxed space-y-2">
              <li>Bachelor&apos;s degree in Civil Engineering or related field.</li>
              <li>Professional Engineer (PE) license required; Pennsylvania PE preferred.</li>
              <li>7+ years of progressive experience in land development engineering and project management.</li>
              <li>Proficiency in AutoCAD Civil 3D, stormwater modeling software, and Microsoft Office.</li>
              <li>Strong knowledge of Pennsylvania municipal land development codes, zoning ordinances, and PADEP regulations.</li>
              <li>Proven track record of managing multiple concurrent projects and meeting deadlines.</li>
              <li>Excellent communication, presentation, and client relationship management skills.</li>
            </ul>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Benefits
            </h2>
            <ul className="list-disc list-inside text-[#0f0f0f]/80 leading-relaxed space-y-2">
              <li>Competitive salary: $110,000 – $150,000 depending on experience.</li>
              <li>Flexible work model — office-based with remote flexibility.</li>
              <li>Health, dental, and vision insurance.</li>
              <li>401(k) with company match.</li>
              <li>Paid time off, holidays, and professional development support.</li>
              <li>PE license renewal and continuing education reimbursement.</li>
              <li>Clear path for career advancement within a growing firm.</li>
            </ul>
          </section>

          {/* Apply */}
          <section className="pt-4 border-t border-[#0f0f0f]/10">
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              How to Apply
            </h2>
            <p className="text-[#0f0f0f]/80 leading-relaxed mb-6">
              Click the button below to upload your resume and apply. Your submission will be delivered
              directly to <strong>connect@nexorastaffingllp.com</strong> and our recruiting leadership.
            </p>
            <ApplyButtonWithModal roleName={ROLE_NAME} roleSlug={ROLE_SLUG} />
          </section>
        </div>
      </div>
    </div>
  );
}
