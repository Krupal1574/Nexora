import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Real-World IT Training & Career Prep | Nexora",
  description:
    "Build practical IT skills through structured learning, hands-on production projects, resume guidance, and technical interview preparation. Job-ready transformation engineered for high-demand tech careers.",
};

const trainingFeatures = [
  {
    title: "Role-Based IT Training",
    description:
      "Build practical skills aligned with your target role, from frontend and backend development to QA, cloud engineering, and product-focused tech roles.",
    icon: "⌘",
  },
  {
    title: "Resume & Profile Building",
    description:
      "Present your projects, technical skills, and professional experience clearly with a high-impact, ATS-optimized resume and LinkedIn profile.",
    icon: "↗",
  },
  {
    title: "Interview Preparation",
    description:
      "Practice real-world technical coding questions, system design architecture, and behavioral STAR-method responses with senior tech mentors.",
    icon: "◎",
  },
  {
    title: "Production-Grade Projects",
    description:
      "Apply what you learn through structured agile sprints, code reviews, enterprise git standards, and scalable cloud deployments.",
    icon: "▤",
  },
];

const learningSections = [
  {
    label: "WHAT YOU WILL LEARN",
    title: "Build Skills Across Real IT Roles",
    description:
      "Develop a deep foundation in high-demand technologies and understand how those skills are applied in modern enterprise environments.",
    points: [
      "Role-focused technical learning in Cloud, Full-Stack, Data & DevOps",
      "Modern frontend frameworks and scalable backend architecture",
      "Automated testing, CI/CD pipelines, and software QA principles",
      "Production-grade application deployment and monitoring",
    ],
    imageSrc: "/images/services/fullstack-cloud-focus.png",
    imageAlt: "Full-Stack and Cloud Focus at Nexora",
    badge: "Full-Stack & Cloud Focus",
    background: "bg-[#8FB8D8]/25",
  },
  {
    label: "HOW WE TRAIN",
    title: "Practical Learning Beyond Theory",
    description:
      "Connect engineering concepts with hands-on labs, collaborative team projects, code reviews, and structured interview coaching.",
    points: [
      "Guided weekly coding sprints with live senior mentorship",
      "Agile ceremonies, issue tracking, and peer pull requests",
      "Portfolio architecture that stands out to enterprise hiring managers",
      "1-on-1 technical mock interviews with personalized feedback",
    ],
    imageSrc: "/images/services/agile-team-project.png",
    imageAlt: "Agile Team Project Collaboration at Nexora",
    badge: "Agile Team Projects",
    background: "bg-[#F5F1E8]",
  },
  {
    label: "YOUR NEXT STEP",
    title: "Move Toward Job-Ready Confidence",
    description:
      "Strengthen your ability to communicate technical decisions, demonstrate architectural trade-offs, and clear tough interview rounds.",
    points: [
      "Explain complex architectural decisions with clarity and poise",
      "Confidently walk through your capstone repository and codebase",
      "Master behavioral and technical problem-solving frameworks",
      "Seamless transition directly into Nexora's active placement network",
    ],
    imageSrc: "/images/services/career-interview-ready.png",
    imageAlt: "Career and Interview Ready Transformation",
    badge: "Career & Interview Ready",
    background: "bg-[#F26A21]/10",
  },
];

const process = [
  {
    number: "01",
    title: "Choose Your Path",
    description: "Align your career goals, existing background, and high-demand tech specializations.",
    color: "bg-white",
  },
  {
    number: "02",
    title: "Learn the Fundamentals",
    description: "Develop hands-on technical foundations through structured, instructor-led modules.",
    color: "bg-[#8FB8D8]/25",
  },
  {
    number: "03",
    title: "Build Projects",
    description: "Collaborate on production-grade applications that solve real business problems.",
    color: "bg-[#F26A21]/15",
  },
  {
    number: "04",
    title: "Prepare for Interviews",
    description: "Master coding challenges, system design, and role-specific technical communication.",
    color: "bg-white",
  },
  {
    number: "05",
    title: "Launch Your Career",
    description: "Transition into our candidate marketing pipeline and connect with top US employers.",
    color: "bg-[#8FB8D8]/20",
  },
];

const faqs = [
  {
    question: "Who can join Nexora IT training?",
    answer:
      "Our programs are ideal for recent computer science or engineering graduates, professionals transitioning into Cloud, DevOps, Full-Stack, or Data, and individuals re-entering the tech market seeking production-level polish.",
  },
  {
    question: "What technologies and tracks are available?",
    answer:
      "We provide specialized training tracks across Cloud Architecture (AWS/GCP), Full-Stack Engineering (React, Next.js, Node.js), Data Engineering & Analytics, DevOps & Kubernetes, and Software Quality Engineering. Inquire to discuss custom pathways.",
  },
  {
    question: "Does the training include live production projects?",
    answer:
      "Yes. Every cohort builds end-to-end, multi-tier cloud applications utilizing industry best practices including Git branch workflows, pull request reviews, automated CI/CD pipelines, and live database integrations.",
  },
  {
    question: "Do you offer placement support after training?",
    answer:
      "Yes. Qualified graduates gain direct access to Nexora's active profile marketing and job placement pipelines, connecting them with verified employers and recruiters across the United States.",
  },
  {
    question: "How do I get started?",
    answer:
      "Reach out through our contact form or give us a call. A technical career advisor will review your background, evaluate your target roles, and help you choose the best learning plan.",
  },
];

const otherServices = [
  {
    title: "Job Placement",
    description: "Direct candidate profile marketing and placement support across top US employers.",
    href: "/services/job-placement",
    color: "bg-[#8FB8D8]/30",
    icon: "→",
  },
  {
    title: "Talent Acquisition",
    description: "End-to-end executive search and custom talent pipeline solutions for enterprises.",
    href: "/services/talent-acquisition",
    color: "bg-[#F5F1E8]",
    icon: "↗",
  },
  {
    title: "Accounting & Taxes",
    description: "Full-service bookkeeping, multi-state payroll, and corporate tax optimization.",
    href: "/services/accounting-and-taxes",
    color: "bg-[#F26A21]/15",
    icon: "▤",
  },
  {
    title: "Background Verification",
    description: "Fast, reliable, FCRA-compliant screening to support high-trust hiring.",
    href: "/services/background-verification",
    color: "bg-[#8FB8D8]/20",
    icon: "✓",
  },
];

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="ml-2 inline-block transition-transform group-hover:translate-x-1"
    >
      →
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#171717] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-[#77736D] sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function ITTrainingPage() {
  return (
    <main className="overflow-hidden bg-white text-[#171717]">
      {/* HERO */}
      <section className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative mx-auto flex min-h-[600px] max-w-[1600px] items-center overflow-hidden rounded-[24px] bg-[#171717] px-6 py-20 sm:rounded-[32px] sm:px-12 lg:min-h-[680px] lg:px-20 xl:px-28">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[#8FB8D8]/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[#F26A21]/10 blur-3xl" />

          <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-[#F5F1E8]">
                <Image
                  src="/LOGO.png"
                  alt="Nexora"
                  width={20}
                  height={20}
                  className="rounded-full object-contain"
                />
                <span>IT Training & Career Acceleration</span>
              </div>

              <h1 className="mt-7 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#F5F1E8] sm:text-5xl lg:text-6xl">
                Not Just Training.
                <br />
                Job-Ready
                <br />
                <span className="text-[#F26A21]">Transformation.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                Build practical IT skills through structured learning, hands-on
                projects, resume guidance, and interview preparation. Prepare for
                your next career step with a learning path focused on real-world
                applications.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center rounded-full bg-[#F5F1E8] px-6 py-3.5 text-sm font-semibold text-[#171717] transition hover:bg-[#F26A21] hover:text-white"
                >
                  Explore Training <Arrow />
                </Link>

                <Link
                  href="#learning"
                  className="inline-flex items-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-[#171717]"
                >
                  Explore Our Approach
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/55">
                <span>● Practical Production Learning</span>
                <span>● Agile Sprint Practice</span>
                <span>● Senior Tech Mentorship</span>
              </div>
            </div>

            {/* IT Training Hero Visual */}
            <div className="relative mx-auto flex min-h-[360px] w-full max-w-[500px] items-center justify-center sm:min-h-[460px]">
              <div className="relative w-full h-[460px] flex items-center justify-center">
                <Image
                  src="/images/services/it-training-hero.png"
                  alt="IT Training Agile Collaboration Table - Nexora"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  sizes="(max-width: 1200px) 50vw, 500px"
                />
              </div>

              <div className="absolute right-0 top-7 rounded-full border border-white/10 bg-[#303030]/90 px-4 py-2.5 text-xs text-white shadow-lg backdrop-blur-sm">
                <span className="mr-2 text-[#F26A21]">✓</span>
                Learn by doing
              </div>

              <div className="absolute bottom-7 left-0 rounded-full border border-white/10 bg-[#303030]/90 px-4 py-2.5 text-xs text-white shadow-lg backdrop-blur-sm">
                <span className="mr-2 text-[#8FB8D8]">✓</span>
                Build practical skills
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING HIGHLIGHTS */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Practical Projects",
              description:
                "Apply concepts through guided exercises, collaborative sprints, and realistic cloud deployments.",
            },
            {
              number: "02",
              title: "Role-Based Learning",
              description:
                "Focus on skills directly aligned to your target career direction: Full-Stack, Cloud, DevOps, or QA.",
            },
            {
              number: "03",
              title: "Interview Preparation",
              description:
                "Practice communicating your technical solutions and explaining complex system architecture.",
            },
          ].map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-[#171717]/5 bg-[#F5F1E8]/75 p-6 transition hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FB8D8]/35 text-sm font-semibold">
                {item.number}
              </span>

              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

              <p className="mt-2 text-sm leading-6 text-[#77736D]">
                {item.description}
              </p>
            </article>
          ))}

          <div className="flex flex-col items-start justify-center rounded-2xl bg-[#F26A21] p-6 text-white shadow-lg">
            <h3 className="text-2xl font-semibold">Ready to learn?</h3>

            <p className="mt-3 text-sm leading-6 text-white/85">
              Discuss your career goals and explore suitable training programs today.
            </p>

            <Link
              href="/contact"
              className="mt-5 rounded-full bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              Start Here <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* TRAINING ACCORDION */}
      <section id="learning" className="bg-[#171717] px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21]">
              Learning That Connects to Work
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#F5F1E8] sm:text-5xl">
              Complete IT Training That Helps You Prepare for Your Next Role.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              Build technical foundations, practice real-world scenarios,
              improve your professional profile, and prepare to communicate your
              skills with conviction in interviews.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-[#F5F1E8] px-6 py-3.5 text-sm font-semibold text-[#171717] transition hover:bg-[#F26A21] hover:text-white"
            >
              Discuss Your Goals <Arrow />
            </Link>
          </div>

          <div className="space-y-3">
            {trainingFeatures.map((feature) => (
              <details
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-[#242424] open:bg-[#2b2b2b] transition-all"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl text-[#F26A21]">
                    {feature.icon}
                  </span>

                  <span className="flex-1 text-sm font-medium text-[#F5F1E8] sm:text-base">
                    {feature.title}
                  </span>

                  <span className="text-2xl text-[#F26A21] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-5 pb-6 pl-20 text-sm leading-7 text-white/60 sm:pl-[84px]">
                  {feature.description}

                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-[#F26A21] hover:underline"
                    >
                      Ask about this area →
                    </Link>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING DETAIL SECTIONS WITH HIGH QUALITY NEXORA ASSETS */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl space-y-8">
          {learningSections.map((section, index) => {
            const isReversed = index % 2 === 1;
            return (
              <article
                key={section.title}
                className="grid items-stretch gap-6 overflow-hidden rounded-3xl border border-[#171717]/5 bg-[#F5F1E8]/40 p-3 md:grid-cols-2 md:p-4"
              >
                {/* Visual / Image Card */}
                <div
                  className={`relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl ${section.background} p-6 sm:min-h-[360px] ${
                    isReversed ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg sm:h-72 border border-white/80 bg-white/60 p-2">
                    <Image
                      src={section.imageSrc}
                      alt={section.imageAlt}
                      fill
                      className="object-contain p-1 transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#171717]/90 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-md">
                      {section.badge}
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div
                  className={`flex flex-col justify-center rounded-2xl bg-white p-7 sm:p-10 ${
                    isReversed ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F26A21]">
                    {section.label}
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl text-[#171717]">
                    {section.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#77736D]">
                    {section.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-[#77736D]"
                      >
                        <span className="mt-0.5 font-bold text-[#F26A21]">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* TRAINING PROCESS */}
      <section className="bg-[#F5F1E8] px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="How It Works"
            title="A Clear Path From Learning to Interview Preparation"
            description="Understand the process and identify the steps that can help you prepare for your target role with confidence."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((step) => (
              <article
                key={step.number}
                className={`${step.color} flex flex-col justify-between rounded-3xl border border-[#171717]/5 p-6 shadow-sm transition hover:-translate-y-1`}
              >
                <div>
                  <span className="inline-flex rounded-full bg-[#171717] px-3 py-1.5 text-xs font-semibold text-white">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-6 text-lg font-semibold text-[#171717]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#77736D]">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 h-1 w-10 rounded-full bg-[#F26A21]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL LEARNING CTA BANNER */}
      <section className="px-5 py-20 sm:py-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#171717] px-6 py-14 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border border-[#F26A21]/30 blur-sm" />
          <div className="pointer-events-none absolute -right-5 -top-10 h-56 w-56 rounded-full border border-[#8FB8D8]/25" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#F26A21]">
              <Image
                src="/LOGO.png"
                alt="Nexora"
                width={18}
                height={18}
                className="rounded-full object-contain"
              />
              <span>Start Your IT Career Journey</span>
            </div>

            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#F5F1E8] sm:text-4xl md:text-5xl">
              Learn Practical Skills. Build Real Projects. Prepare for What&apos;s Next.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
              Tell us about your goals and the skills you want to develop. We&apos;ll
              help you evaluate the curriculum, explore mentors, and select the right
              track.
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center rounded-full bg-[#F26A21] px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#df5814]"
            >
              Talk to Our Team <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="bg-[#F5F1E8] px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77736D]">
                Explore Nexora
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl">
                Other Services
              </h2>
            </div>

            <Link
              href="/services"
              className="text-sm font-semibold transition hover:text-[#F26A21]"
            >
              View All Services →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className={`${service.color} group flex min-h-56 flex-col justify-between rounded-3xl p-6 transition duration-200 hover:-translate-y-1 hover:shadow-md`}
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#171717]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#171717]/70">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-4xl text-[#171717]/30">
                    {service.icon}
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white transition group-hover:bg-[#F26A21]">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21]">
              Frequently Asked Questions
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#171717] sm:text-5xl">
              Questions, Answered.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#77736D]">
              Find out more about our IT training approach, practical project
              learning, and technical interview preparation.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center rounded-full bg-[#171717] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#F26A21]"
            >
              Contact Our Team <Arrow />
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-[#F5F1E8] p-5 sm:p-6 transition-all"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 text-sm font-semibold sm:text-base">
                  <span className="flex-1 text-[#171717]">{faq.question}</span>

                  <span className="text-2xl font-normal text-[#F26A21] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 pr-6 text-sm leading-7 text-[#77736D]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
