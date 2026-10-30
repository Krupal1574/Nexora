import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import ApplyButtonWithModal from "@/components/careers/ApplyButtonWithModal";

export const metadata: Metadata = {
  title: "Full-Stack Software Engineer – Retell AI",
  description:
    "Apply for the Full-Stack Software Engineer position at Retell AI in Redwood City, California. Full-time, on-site. $215,000–$290,000.",
};

const ROLE_NAME = "Full-Stack Software Engineer – Retell AI";
const ROLE_SLUG = "full-stack-software-engineer-retell-ai";
const ROLE_IMAGE = "/images/careers/full-stack-engineer.webp";

export default function FullStackEngineerPage() {
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
          Full-Stack Software Engineer
        </h1>
        <p className="text-xl text-[#0f0f0f]/70 mb-8">Retell AI</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <MapPin className="w-4 h-4" /> Redwood City, California
          </span>
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <DollarSign className="w-4 h-4" /> $215,000 – $290,000
          </span>
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <Clock className="w-4 h-4" /> Full-time
          </span>
          <span className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] text-sm px-4 py-2.5 rounded-full font-medium shadow-sm">
            <Building2 className="w-4 h-4" /> On-site
          </span>
        </div>

        {/* Role Banner Image */}
        <div className="relative aspect-[16/10] md:aspect-[2/1] w-full rounded-[24px] overflow-hidden shadow-sm mb-8 bg-white border border-black/5 p-4 md:p-6 flex items-center justify-center">
          <Image
            src={ROLE_IMAGE}
            alt={ROLE_NAME}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
            className="object-contain p-2 md:p-4"
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
              Retell AI is building the future of conversational AI, enabling businesses to deploy
              lifelike AI voice agents at scale. As a Full-Stack Software Engineer, you will work
              across the entire stack — from React-based dashboards to high-performance backend
              services — shipping features that power real-time voice interactions for thousands of
              businesses worldwide.
            </p>
          </section>

          {/* Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Key Responsibilities
            </h2>
            <ul className="list-disc list-inside text-[#0f0f0f]/80 leading-relaxed space-y-2">
              <li>Design, build, and maintain full-stack features across the Retell AI platform (React/Next.js frontend, Node.js/Python backend).</li>
              <li>Develop and optimize real-time communication pipelines for AI voice agents including WebSocket and WebRTC integrations.</li>
              <li>Build intuitive dashboards, developer tools, and APIs that make it easy for customers to create, test, and deploy voice agents.</li>
              <li>Collaborate with ML/AI engineers to integrate LLM-powered features and speech models into the product.</li>
              <li>Design scalable database schemas and data pipelines to support rapid growth.</li>
              <li>Write clean, well-tested code and participate in code reviews to maintain high engineering standards.</li>
              <li>Identify and resolve performance bottlenecks across the stack, especially in latency-sensitive voice pipelines.</li>
              <li>Contribute to architecture decisions, technical roadmap planning, and engineering culture.</li>
            </ul>
          </section>

          {/* Qualifications */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Qualifications
            </h2>
            <ul className="list-disc list-inside text-[#0f0f0f]/80 leading-relaxed space-y-2">
              <li>Bachelor&apos;s or Master&apos;s degree in Computer Science, Software Engineering, or equivalent practical experience.</li>
              <li>3+ years of professional full-stack development experience.</li>
              <li>Strong proficiency in TypeScript/JavaScript, React, and Node.js.</li>
              <li>Experience with Python, cloud infrastructure (AWS/GCP), and containerized deployments (Docker, Kubernetes).</li>
              <li>Familiarity with real-time systems, WebSockets, or telephony/VoIP platforms is a strong plus.</li>
              <li>Experience with LLM APIs (OpenAI, Anthropic, etc.) or speech-to-text / text-to-speech systems is highly valued.</li>
              <li>Strong problem-solving skills with a bias toward shipping high-quality products quickly.</li>
              <li>Excellent communication skills and ability to work in a fast-paced, collaborative startup environment.</li>
            </ul>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-2xl font-bold text-[#0f0f0f] mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Benefits
            </h2>
            <ul className="list-disc list-inside text-[#0f0f0f]/80 leading-relaxed space-y-2">
              <li>Competitive total compensation: $215,000 – $290,000 (base + equity).</li>
              <li>Significant equity package in a high-growth AI startup.</li>
              <li>Comprehensive health, dental, and vision insurance.</li>
              <li>Catered meals and snacks at the Redwood City office.</li>
              <li>Generous PTO and paid holidays.</li>
              <li>Home office setup stipend and learning & development budget.</li>
              <li>Opportunity to shape foundational technology in the conversational AI space.</li>
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
