import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nexora handles information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    title: "Information submitted through this site",
    body: "The contact form requests your name, phone number, email address, optional SMS preference, and message. The referral form requests the referrer's details and the referred person's contact details. Please do not submit sensitive personal information through either form.",
  },
  {
    title: "How form information is used",
    body: "Form information is sent only when the website's server-side delivery workflow is configured and accepts the submission. It is intended to let the Nexora team respond to an inquiry or review a referral. A form that cannot be delivered shows an error instead of confirming success.",
  },
  {
    title: "Referral information",
    body: "Only submit another person's information when you are authorized to share it and they expect to hear from Nexora. The referral form requires that declaration before it can be sent.",
  },
  {
    title: "SMS preference",
    body: "Selecting the optional SMS checkbox records a request to receive SMS updates about that inquiry. Consent is not required to submit a form. Any live SMS program, including its message frequency, rates, opt-out handling, and recordkeeping, must be reviewed before use.",
  },
  {
    title: "Service providers and security",
    body: "A configured form-delivery provider may process submitted information solely to deliver the inquiry to Nexora. The deployment owner must maintain appropriate access controls, retention settings, and a reviewed provider agreement before collecting production submissions.",
  },
  {
    title: "Your choices",
    body: "To ask about information submitted through this website, use the contact details on the Contact page. The deployment owner must establish and honor applicable access, correction, deletion, and opt-out procedures before launch.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F19]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#2E8BF014_0%,transparent_65%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5">Privacy <span className="text-[#2E8BF0]">Policy</span></h1>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">A technical privacy baseline for information submitted through this website.</p>
        </div>
      </section>
      <section className="py-16 bg-[#121623] border-y border-[#1A202C]">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-5 text-sm leading-relaxed text-amber-100">
            This page requires review and approval by Nexora's authorized legal and privacy owner before public launch. It does not replace legal advice or verified business-specific disclosures.
          </div>
          {sections.map((section) => (
            <section key={section.title} className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-[#94A3B8] leading-relaxed">{section.body}</p>
            </section>
          ))}
          <p className="text-sm text-[#94A3B8]">See also the <Link href="/terms-and-conditions" className="text-[#2E8BF0] underline underline-offset-2">Terms &amp; Conditions</Link>.</p>
        </article>
      </section>
    </div>
  );
}
