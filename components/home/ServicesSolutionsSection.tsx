"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  SearchCheck,
  Users,
  UserRoundCheck,
} from "lucide-react";

const services = {
  placement: {
    title: "Job Placement",
    description:
      "Helping professionals land meaningful full-time roles with end-to-end support from search to placement.",
    href: "/services",
  },
  staffing: {
    title: "Recruitment & Staffing",
    description:
      "Connecting businesses with skilled professionals who fit the role, team, and hiring requirements.",
    href: "/services",
  },
  acquisition: {
    title: "Talent Acquisition",
    description:
      "Strategic hiring support for building capable, high-performing teams.",
    href: "/services",
  },
  verification: {
    title: "Background Verification",
    description:
      "Comprehensive checks that help employers hire with greater trust and confidence.",
    href: "/services",
  },
  training: {
    title: "IT Training",
    description:
      "Practical training that prepares candidates for real-world technical careers.",
    href: "/services",
  },
  interview: {
    title: "Interview Preparation",
    description:
      "Focused preparation designed to help candidates approach interviews with greater confidence.",
    href: "/services",
  },
};

function ServiceLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group absolute inset-0 z-20 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26A21] focus-visible:ring-offset-2 ${className}`}
      aria-label={`Learn more about ${children}`}
    >
      <span className="sr-only">{children}</span>
    </Link>
  );
}

export default function ServicesSolutionsSection() {
  return (
    <section
      aria-labelledby="nexora-solutions-heading"
      className="relative overflow-hidden bg-[#F5F1E8] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      {/* Background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[#8FB8D8]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#F26A21]/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-[720px] text-center lg:mb-14">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F26A21]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26A21]" />
            Nexora Solutions
          </span>

          <h2
            id="nexora-solutions-heading"
            className="text-balance text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#171717]"
          >
            Workforce solutions
            <br />
            <span className="text-[#77736D]">built around people.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[600px] text-[15px] leading-7 text-[#77736D] sm:text-base">
            From getting hired to building the right team, Nexora connects
            candidates and businesses through practical, end-to-end talent
            solutions.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* FEATURED — JOB PLACEMENT */}
          <article
            className="
              service-card
              relative min-h-[390px]
              overflow-hidden rounded-[26px]
              border border-[#171717]/8
              bg-[#F1E8DC]
              p-7 sm:p-9
              md:col-span-2
              lg:col-span-8
            "
          >
            <ServiceLink href={services.placement.href}>
              {services.placement.title}
            </ServiceLink>

            <div className="relative z-10 max-w-[410px]">
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-[#F5F1E8]">
                <BriefcaseBusiness size={18} strokeWidth={1.7} />
              </span>

              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-3xl">
                {services.placement.title}
              </h3>

              <p className="mt-3 max-w-[430px] text-sm leading-6 text-[#77736D]">
                {services.placement.description}
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-medium text-[#171717]">
                Explore placement
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </div>

            {/* Editorial illustration */}
            <div
              aria-hidden="true"
              className="absolute -bottom-12 right-[-15px] h-[280px] w-[430px] sm:right-4"
            >
              <div className="absolute bottom-5 right-10 h-32 w-64 rotate-[-7deg] rounded-[42%] bg-[#8FB8D8]" />

              <div className="absolute bottom-0 right-20 h-48 w-20 rotate-[9deg] bg-[#F26A21] [clip-path:polygon(40%_0,100%_0,72%_100%,0_100%)]" />

              <div className="absolute bottom-[-5px] right-[105px] h-[205px] w-[92px] rounded-t-[50%] bg-[#171717] [clip-path:polygon(30%_0,70%_0,100%_100%,0_100%)]" />

              <div className="absolute bottom-[-5px] right-[60px] h-[150px] w-12 rotate-[14deg] bg-[#F5F1E8] [clip-path:polygon(40%_0,100%_0,70%_100%,0_100%)]" />

              <div className="absolute bottom-8 right-[280px] h-2 w-28 rotate-[-13deg] rounded-full bg-[#171717]/15" />
            </div>

            <div
              aria-hidden="true"
              className="absolute bottom-7 left-7 h-2 w-2 rounded-full bg-[#F26A21]"
            />
          </article>

          {/* STAFFING */}
          <article
            className="
              service-card
              relative min-h-[390px]
              overflow-hidden rounded-[26px]
              border border-[#171717]/8
              bg-[#DDEAF1]
              p-7 sm:p-9
              md:col-span-2
              lg:col-span-4
            "
          >
            <ServiceLink href={services.staffing.href}>
              {services.staffing.title}
            </ServiceLink>

            <div className="relative z-10">
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8FB8D8] text-[#171717]">
                <Users size={18} strokeWidth={1.8} />
              </span>

              <h3 className="max-w-[260px] text-2xl font-semibold tracking-[-0.035em] text-[#171717]">
                {services.staffing.title}
              </h3>

              <p className="mt-3 max-w-[280px] text-sm leading-6 text-[#5F6870]">
                {services.staffing.description}
              </p>
            </div>

            {/* Graphic */}
            <div
              aria-hidden="true"
              className="absolute bottom-[-5px] left-[-20px] h-48 w-[125%]"
            >
              <div className="absolute bottom-0 left-0 h-36 w-[115%] rotate-[-17deg] bg-[#8FB8D8] [clip-path:polygon(0_30%,100%_0,100%_70%,0_100%)]" />

              <div className="absolute bottom-10 left-[42%] h-24 w-24 rounded-full border-[18px] border-[#F26A21]/80" />

              <div className="absolute bottom-1 right-12 h-28 w-9 rounded-t-full bg-[#171717]" />

              <div className="absolute bottom-0 right-8 h-2 w-24 rounded-full bg-[#171717]/20" />
            </div>
          </article>

          {/* TALENT ACQUISITION */}
          <ServiceCard
            href={services.acquisition.href}
            title={services.acquisition.title}
            description={services.acquisition.description}
            className="bg-[#9BC8E6] md:col-span-1 lg:col-span-3"
            icon={<UserRoundCheck size={18} strokeWidth={1.8} />}
          >
            <div className="absolute bottom-[-18px] right-[-5px] h-32 w-32 rounded-full bg-[#F26A21]" />
            <div className="absolute bottom-0 left-12 h-28 w-16 rotate-[-18deg] bg-[#171717] [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
            <div className="absolute bottom-12 left-28 h-16 w-16 rounded-full bg-[#8FB8D8]" />
          </ServiceCard>

          {/* BACKGROUND VERIFICATION */}
          <ServiceCard
            href={services.verification.href}
            title={services.verification.title}
            description={services.verification.description}
            className="bg-[#F6D5AA] md:col-span-1 lg:col-span-3"
            icon={<SearchCheck size={18} strokeWidth={1.8} />}
          >
            <div className="absolute bottom-[-15px] left-7 h-28 w-28 rounded-full bg-[#F26A21]/75" />
            <div className="absolute bottom-0 right-8 h-28 w-20 rounded-t-[50%] bg-[#171717]" />
            <div className="absolute bottom-12 right-[-5px] h-20 w-20 rounded-full border-[13px] border-[#8FB8D8]" />
          </ServiceCard>

          {/* TRAINING */}
          <ServiceCard
            href={services.training.href}
            title={services.training.title}
            description={services.training.description}
            className="bg-[#F1DCE9] md:col-span-1 lg:col-span-3"
            icon={<GraduationCap size={18} strokeWidth={1.8} />}
          >
            <div className="absolute bottom-0 right-8 h-28 w-9 bg-[#F26A21]" />
            <div className="absolute bottom-0 right-20 h-20 w-8 bg-[#171717]" />
            <div className="absolute bottom-0 right-32 h-14 w-7 bg-[#F26A21]" />
            <div className="absolute bottom-12 left-10 h-10 w-10 rounded-full bg-[#8FB8D8]" />
          </ServiceCard>

          {/* INTERVIEW */}
          <ServiceCard
            href={services.interview.href}
            title={services.interview.title}
            description={services.interview.description}
            className="bg-[#E5DF9A] md:col-span-1 lg:col-span-3"
            icon={<CheckCircle2 size={18} strokeWidth={1.8} />}
          >
            <div className="absolute bottom-[-30px] right-[-15px] h-40 w-40 rounded-full bg-[#F26A21]/75" />
            <div className="absolute bottom-3 right-16 h-24 w-16 rotate-[10deg] rounded-t-full bg-[#171717]" />
            <div className="absolute bottom-16 right-8 h-14 w-14 rounded-full bg-[#8FB8D8]" />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  href,
  title,
  description,
  className,
  icon,
  children,
}: {
  href: string;
  title: string;
  description: string;
  className?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article
      className={`service-card relative min-h-[265px] overflow-hidden rounded-[24px] border border-[#171717]/8 p-6 sm:p-7 ${className}`}
    >
      <ServiceLink href={href}>{title}</ServiceLink>

      <div className="relative z-10">
        <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/55 text-[#171717]">
          {icon}
        </span>

        <h3 className="max-w-[210px] text-xl font-semibold leading-tight tracking-[-0.03em] text-[#171717]">
          {title}
        </h3>

        <p className="mt-2 max-w-[230px] text-[13px] leading-5 text-[#55534F]">
          {description}
        </p>
      </div>

      {children}
    </article>
  );
}
