import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/motion/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms for using the Nexora website and submitting an inquiry or referral.",
  alternates: { canonical: "/terms-and-conditions" },
};

const sections = [
  {
    title: "Website use",
    body: "Use this website lawfully and provide information that is accurate to the best of your knowledge. Website content is general information and is not an offer, guarantee of employment, legal advice, or professional advice.",
  },
  {
    title: "Contact inquiries",
    body: "Submitting a contact form requests a response from Nexora. It does not create a client, employment, agency, or other contractual relationship. A confirmation is shown only after the server has delivered the submission to its configured destination.",
  },
  {
    title: "Referral Program",
    body: "You may submit a referral only when you are authorized to provide that person's details and they expect contact. Eligible referrers may earn a $500 bonus for each referred candidate who is successfully placed and completes their minimum required employment period as defined by Nexora. Submission does not guarantee outreach, consideration, placement, or payout. The referral program is subject to Nexora's verification and final approval.",
  },
  {
    title: "Communications",
    body: "If you elect SMS updates, your consent is optional and not a condition of submitting a form. Any SMS communications are subject to the applicable program disclosures and opt-out procedures. You may use the contact details on this site to communicate with Nexora by phone or email.",
  },
  {
    title: "Changes and questions",
    body: "These terms are an implementation baseline and must be reviewed by Nexora's authorized owner before launch. The deployment owner is responsible for publishing final terms, effective dates, business identity, and applicable dispute, governing-law, and consumer disclosures.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="overflow-x-clip">
      <PageHero
        align="center"
        eyebrow="Legal"
        lines={["Terms & ", <span key="conditions" className="accent">Conditions</span>]}
        sub="Terms for using this website and submitting an inquiry or referral."
      />
      <section className="section-spacing bg-[#FFFFFF] border-t border-[#FFFFFF]">
        <article className="container-narrow space-y-6">
          <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 p-5 text-sm leading-relaxed text-amber-100">
            This page requires review and approval by Nexora's authorized legal owner before public launch. It does not replace legal advice.
          </div>
          {sections.map((section) => (
            <section key={section.title} className="glass-card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#171717] mb-3">{section.title}</h2>
              <p className="text-[#77736D] leading-relaxed">{section.body}</p>
            </section>
          ))}
          <p className="text-sm text-[#77736D]">Read the <Link href="/privacy-policy" className="text-[#F26A21] underline underline-offset-2">Privacy Policy</Link> for information-handling details.</p>
        </article>
      </section>
    </div>
  );
}
