import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Accounting & Tax Services | Nexora",
  description:
    "Full-service bookkeeping, payroll management, corporate tax planning, and financial reporting support for businesses. Let Nexora handle the numbers.",
};

const services = [
  {
    title: "Bookkeeping & Financial Records",
    description: "Keep financial records organized, updated, and ready for informed business decisions.",
    icon: "◷",
  },
  {
    title: "Tax Preparation & Filing",
    description: "Organized tax preparation and filing support to help businesses manage their obligations.",
    icon: "↗",
  },
  {
    title: "Payroll Processing",
    description: "Support payroll administration, payment calculations, and recurring payroll tasks.",
    icon: "◎",
  },
  {
    title: "Financial Reporting & Insights",
    description: "Clear financial reports that help business owners understand performance and plan ahead.",
    icon: "▤",
  },
];

const benefits = [
  { title: "Clean Books, Clear Decisions", description: "Keep your financial records organized so you can understand where your business stands." },
  { title: "Tax Support Without the Stress", description: "Get structured support with tax documentation, preparation, and filing requirements." },
  { title: "Payroll That Runs Smoothly", description: "Make recurring payroll tasks easier to manage with a consistent process." },
  { title: "Reports You Can Use", description: "Turn financial information into useful insights for day-to-day business decisions." },
];

const process = [
  { number: "01", title: "Understand", description: "We learn about your business, current processes, and accounting requirements.", bg: "bg-white" },
  { number: "02", title: "Organize", description: "We identify the records, documents, and information needed to get started.", bg: "bg-[#F26A21]/15" },
  { number: "03", title: "Manage", description: "We help organize your agreed bookkeeping, payroll, and tax-related workflows.", bg: "bg-[#8FB8D8]/35" },
  { number: "04", title: "Review", description: "Review the work, clarify outstanding items, and plan the next steps.", bg: "bg-white" },
];

const faqs = [
  { question: "What accounting services does Nexora offer?", answer: "Our service offering can include bookkeeping, financial record organization, payroll support, tax preparation coordination, and financial reporting, depending on your requirements." },
  { question: "Can small businesses outsource bookkeeping?", answer: "Yes. Outsourcing bookkeeping can help small businesses organize financial records and reduce the administrative work involved in maintaining them." },
  { question: "Can I request payroll support separately?", answer: "Contact our team to discuss your payroll requirements and determine which services are suitable for your business." },
  { question: "How do I get started?", answer: "Contact Nexora with an overview of your business and requirements. Our team can discuss your needs and explain the next steps." },
];

const relatedServices = [
  { title: "Talent Acquisition", description: "Find talent that fits your business needs.", href: "/services/talent-acquisition", bg: "bg-[#8FB8D8]/45" },
  { title: "Background Verification", description: "Support informed and responsible hiring decisions.", href: "/services/background-verification", bg: "bg-[#F26A21]/20" },
  { title: "IT Training", description: "Develop skills for professional growth.", href: "/services/it-training", bg: "bg-[#F5F1E8]" },
  { title: "Job Placement", description: "Connect candidates with career opportunities.", href: "/services/job-placement", bg: "bg-[#8FB8D8]/25" },
];

export default function AccountingTaxesPage() {
  return (
    <div className="overflow-hidden bg-white text-[#171717]">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="mx-3 mt-3">
        <div className="relative flex min-h-[600px] max-w-[1600px] mx-auto items-center overflow-hidden rounded-[28px] lg:rounded-[32px] bg-[#171717] px-6 py-20 sm:px-12 lg:min-h-[680px] lg:px-20 xl:px-28">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-[#8FB8D8]/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[#F26A21]/10 blur-3xl" />

          <div className="relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-[#F5F1E8]">
                Accounting &amp; Taxes
              </span>

              <h1 className="mt-7 max-w-2xl leading-[1.08] tracking-tight text-[#F5F1E8] font-bold" style={{ fontSize: "clamp(36px,5vw,68px)", letterSpacing: "-0.065em", fontFamily: "Space Grotesk, sans-serif" }}>
                Your Accounting Team<br />That Actually{" "}
                <span className="text-[#F26A21]">Feels In-House.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-[1.8] text-white/70">
                From bookkeeping and financial reporting to payroll and tax-related support, Nexora helps businesses organize essential financial workflows so they can focus on growth.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-5 rounded-full bg-[#F26A21] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df5814] hover:-translate-y-0.5">
                  Get Started Today →
                </Link>
                <a href="#services" className="inline-flex items-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-[#171717]">
                  Explore Services
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/55">
                <span>● Business-focused support</span>
                <span>● Organized workflows</span>
                <span>● Clear communication</span>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative mx-auto hidden lg:flex min-h-[460px] w-full max-w-[520px] items-center justify-center">
              <div className="relative w-full h-[460px] flex items-center justify-center">
                <Image
                  src="/images/services/accounting-taxes-hero.png"
                  alt="Accounting and Taxes Solutions - Nexora"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  sizes="(max-width: 1200px) 50vw, 520px"
                />
              </div>
              <div className="absolute right-0 top-8 rounded-full border border-white/10 bg-[#303030]/90 backdrop-blur-md px-4 py-2.5 text-xs text-[#F5F1E8] shadow-lg">
                <span className="mr-2 text-[#F26A21]">✓</span>Organized records
              </div>
              <div className="absolute bottom-6 left-0 rounded-full border border-white/10 bg-[#303030]/90 backdrop-blur-md px-4 py-2.5 text-xs text-[#F5F1E8] shadow-lg">
                <span className="mr-2 text-[#8FB8D8]">✓</span>CPA Advisory &amp; Tax Strategy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE STRIP ──────────────────────────────────────────── */}
      <section className="px-5 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { number: "01", title: "Financial Organization", text: "Keep essential records structured and accessible." },
            { number: "02", title: "Payroll Support", text: "Create a more consistent process for payroll tasks." },
            { number: "03", title: "Tax Preparation", text: "Organize documentation for tax-related workflows." },
          ].map((item) => (
            <div key={item.number} className="rounded-2xl border border-[#171717]/5 bg-[#F5F1E8]/70 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FB8D8]/30 text-sm font-semibold">{item.number}</span>
              <h3 className="mt-5 text-lg font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#77736D]">{item.text}</p>
            </div>
          ))}

          <div className="flex flex-col items-start justify-center rounded-2xl bg-[#F26A21] p-6 text-white">
            <h3 className="text-2xl font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Need accounting support?</h3>
            <p className="mt-3 text-sm leading-6 text-white/85">Let&apos;s discuss your business requirements.</p>
            <Link href="/contact" className="mt-5 rounded-full bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-black">
              Talk to Nexora →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ACCORDION ───────────────────────────────────── */}
      <section id="services" className="bg-[#171717] px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21]">What We Do</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-[#F5F1E8] sm:text-5xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Numbers, Taxes, Deadlines. We Help You Manage Them.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              Get practical support for the recurring financial tasks that keep your business organized. We&apos;ll discuss your needs and identify the right scope of support.
            </p>
            <Link href="/contact" className="mt-8 inline-flex rounded-full bg-[#F26A21] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df5814]">
              Discuss Your Requirements →
            </Link>
          </div>

          <div className="space-y-3">
            {services.map((svc, idx) => (
              <details key={svc.title} className="group rounded-2xl border border-white/5 bg-[#242424] open:bg-[#2b2b2b]">
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F1E8]/5 text-lg text-[#F26A21]">{svc.icon}</span>
                  <span className="flex-1 text-sm font-medium text-[#F5F1E8] sm:text-base">{svc.title}</span>
                  <span className="text-2xl text-[#F26A21] transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-5 pb-6 pl-[76px] text-sm leading-7 text-white/60 sm:pl-[84px]">
                  {svc.description}
                  <div className="mt-4">
                    <Link href="/contact" className="text-sm font-medium text-[#F26A21] hover:underline">Ask us about this service →</Link>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">Why Nexora</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>A More Organized Way to Handle Your Numbers</h2>
            <p className="mt-4 text-sm leading-7 text-[#77736D] sm:text-base">Build a clearer process for the financial tasks that support your business.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* benefits dark card */}
            <div className="rounded-3xl bg-[#171717] p-7 text-[#F5F1E8] sm:p-10">
              <span className="inline-flex rounded-full bg-[#F26A21] px-4 py-2 text-xs font-semibold text-white">For Businesses</span>
              <h3 className="mt-6 text-2xl font-semibold sm:text-3xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Spend less time managing administrative tasks.</h3>
              <p className="mt-4 text-sm leading-7 text-white/60">Put a structured process around your bookkeeping, payroll, and financial documentation while keeping your team focused on its core responsibilities.</p>
              <div className="mt-8 space-y-5">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F26A21]/15 text-[#F26A21]">✓</span>
                    <div>
                      <h4 className="text-sm font-semibold">{b.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-white/55">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* approach cream card with visual */}
            <div className="rounded-3xl bg-[#F5F1E8] p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-[#171717]/5 shadow-sm">
              <div>
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-[#171717]/10 shadow-md bg-white p-2">
                  <div className="relative h-full w-full overflow-hidden rounded-xl">
                    <Image
                      src="/images/services/cpa-advisory-growth-strategy.png"
                      alt="Financial Growth & Corporate Strategy - CPA Advisory"
                      fill
                      className="object-contain transition-transform duration-500 hover:scale-105"
                      sizes="500px"
                    />
                  </div>
                </div>

                <span className="inline-flex rounded-full bg-[#8FB8D8]/40 px-4 py-2 text-xs font-semibold text-[#171717]">Our Approach</span>
                <h3 className="mt-4 text-2xl font-semibold sm:text-3xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Clarity in the process. Confidence in the details.</h3>
                <p className="mt-3 text-sm leading-7 text-[#77736D]">Every business has different requirements. We start by understanding your needs, then discuss an appropriate scope of service and communication process.</p>
                <div className="mt-6 space-y-2.5">
                  {["Understand your business requirements", "Define the appropriate service scope", "Organize the necessary information", "Maintain clear communication"].map((item, i) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-3.5 shadow-xs">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8FB8D8]/35 text-xs font-semibold">0{i + 1}</span>
                      <span className="text-xs sm:text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/contact" className="mt-7 inline-flex items-center justify-center rounded-full bg-[#F26A21] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#df5814] w-fit shadow-md">
                Start a Conversation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────── */}
      <section className="bg-[#F5F1E8] px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">Our Process</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>A Clearer Path From First Conversation to Ongoing Support</h2>
            <p className="mt-4 text-sm leading-7 text-[#77736D] sm:text-base">A straightforward process helps both sides understand the requirements, responsibilities, and next steps.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <article key={step.number} className={`${step.bg} rounded-3xl border border-[#171717]/5 p-6 sm:p-7`}>
                <span className="inline-flex rounded-full bg-[#171717] px-3 py-1.5 text-xs font-semibold text-white">STEP {step.number}</span>
                <h3 className="mt-8 text-xl font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#77736D]">{step.description}</p>
                <div className="mt-8 h-1 w-12 rounded-full bg-[#F26A21]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">Service Areas</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Support Built Around Your Business Needs</h2>
            <p className="mt-4 text-sm leading-7 text-[#77736D]">Discuss the areas where your business needs support and explore the appropriate service options.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { number: "01", title: "Bookkeeping", description: "Organize transactions, maintain records, and structure routine bookkeeping tasks.", accent: "bg-[#8FB8D8]/30" },
              { number: "02", title: "Payroll Administration", description: "Establish consistent processes for payroll-related records and recurring tasks.", accent: "bg-[#F26A21]/15" },
              { number: "03", title: "Tax & Reporting Support", description: "Coordinate financial documentation and reporting according to your agreed requirements.", accent: "bg-[#F5F1E8]" },
            ].map((item) => (
              <article key={item.number} className={`rounded-3xl ${item.accent} p-7 sm:p-8`}>
                <span className="text-sm font-semibold text-[#77736D]">{item.number}</span>
                <h3 className="mt-6 text-2xl font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#77736D]">{item.description}</p>
                <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-[#171717] hover:text-[#F26A21] transition-colors">
                  Learn More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────────────────── */}
      <section className="bg-[#F5F1E8] px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77736D]">Explore Nexora</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Other Services</h2>
            </div>
            <Link href="/services" className="text-sm font-semibold hover:text-[#F26A21] transition-colors">View All Services →</Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((svc) => (
              <Link key={svc.title} href={svc.href} className={`${svc.bg} group flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1`}>
                <div>
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{svc.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#171717]/70">{svc.description}</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-6xl font-light text-[#171717]/20">↗</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white transition group-hover:bg-[#F26A21]">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-4">Frequently Asked Questions</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Questions, Answered.</h2>
            <p className="mt-5 text-sm leading-7 text-[#77736D]">Have a question about our services? Review these answers or contact our team to discuss your specific requirements.</p>
            <Link href="/contact" className="mt-7 inline-flex rounded-full bg-[#171717] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#F26A21]">
              Contact Our Team →
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl bg-[#F5F1E8] p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center gap-4 text-sm font-semibold sm:text-base">
                  <span className="flex-1">{faq.question}</span>
                  <span className="text-2xl font-normal text-[#F26A21] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 pr-6 text-sm leading-7 text-[#77736D]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
