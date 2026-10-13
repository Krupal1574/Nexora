export interface ServiceDetail {
  slug: string;
  title: string;
  subtext: string;
  iconName: "ShieldCheck" | "Globe2" | "Users" | "BadgeCheck" | "Calculator" | "GraduationCap";
  heroEyebrow: string;
  heroTitle: [string, string];
  heroSub: string;
  stats: { value: string; label: string }[];
  overview: string;
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  whoIsThisFor: string[];
  faqs: { q: string; a: string }[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "job-placement",
    title: "Job Placement",
    subtext: "Your Partner in Career Success Across the USA",
    iconName: "ShieldCheck",
    heroEyebrow: "CAREER PLACEMENT EXCELLENCE",
    heroTitle: ["Empowering Your Career,", "Securing Your Dream Role"],
    heroSub:
      "Specialized job placement support for F-1, OPT, STEM OPT, H-1B, H-4 EAD, Green Card, and USC candidates across top tech hubs nationwide.",
    stats: [
      { value: "94%", label: "Placement Rate" },
      { value: "45 Days", label: "Average Time to Offer" },
      { value: "$120k+", label: "Average Starting Compensation" },
      { value: "500+", label: "Partner Employer Network" },
    ],
    overview:
      "Navigating the competitive US technology job market requires more than standard applications. Nexora connects talent with hiring managers through direct marketing, strategic company outreach, and ATS-tailored positioning, helping you secure high-paying, career-defining roles.",
    features: [
      {
        title: "Active Candidate Profile Marketing",
        description: "Direct outreach to verified technical recruiters, talent acquisition heads, and hiring decision-makers.",
      },
      {
        title: "End-to-End Interview Support",
        description: "Technical screening guidance, behavioral practice, and interview debriefs to ensure maximum conversion.",
      },
      {
        title: "Offer Negotiation & Compensation Guidance",
        description: "Expert advice on total compensation packages, signing bonuses, benefits, and contract evaluation.",
      },
      {
        title: "Immigration-Friendly Employer Matching",
        description: "Prioritized connections with employers experienced in OPT, STEM OPT extensions, and H-1B sponsorship.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Candidate Profile Audit",
        description: "Comprehensive assessment of your academic background, technical skills, project portfolio, and target roles.",
      },
      {
        step: "02",
        title: "Resume & Portfolio Optimization",
        description: "Re-architecting your resume for high ATS scoring and hiring-manager engagement in the US market.",
      },
      {
        step: "03",
        title: "Multi-Channel Recruiter Outreach",
        description: "Daily active outreach across enterprise hiring pipelines, vetted direct vendor lists, and client networks.",
      },
      {
        step: "04",
        title: "Interview Clear & Onboarding",
        description: "Dedicated mentor preparation ahead of each round, salary negotiation, and smooth client onboarding.",
      },
    ],
    whoIsThisFor: [
      "F-1 OPT & STEM OPT graduates seeking their initial job or extension-compliant roles",
      "H-1B professionals seeking transfer or tier-1 enterprise opportunities",
      "H-4 EAD and Permanent Residents looking for accelerated career re-entry",
      "Software Engineers, Data Scientists, Cloud Architects, and Product Managers",
    ],
    faqs: [
      {
        q: "What visa statuses do you support?",
        a: "We actively work with candidates on F-1 OPT, STEM OPT, H-1B, H-4 EAD, L2 EAD, Green Card holders, and US Citizens.",
      },
      {
        q: "How long does the placement process typically take?",
        a: "Most candidates actively in our placement pipeline secure interviews within 2 to 3 weeks and land formal offers within 30 to 60 days.",
      },
      {
        q: "Do you offer interview preparation alongside placement?",
        a: "Yes. Every candidate receives role-specific mock interviews, technical review sessions, and real-time feedback before speaking with clients.",
      },
    ],
  },
  {
    slug: "recruitment-and-staffing",
    title: "Recruitment & Staffing",
    subtext: "Technical Staffing Solutions That Scale Your Business",
    iconName: "Globe2",
    heroEyebrow: "ENTERPRISE TALENT SOLUTIONS",
    heroTitle: ["Scalable Technical Staffing", "Built for Speed & Quality"],
    heroSub:
      "Connecting fast-growing startups and Fortune 500 enterprises with pre-vetted engineers, architects, data specialists, and IT leaders.",
    stats: [
      { value: "48 Hours", label: "Average Time to First Candidate" },
      { value: "98%", label: "Client Retention Rate" },
      { value: "10k+", label: "Vetted Tech Talent Pool" },
      { value: "50 States", label: "Nationwide Coverage" },
    ],
    overview:
      "Whether you need contract-to-hire, full-time permanent placements, or agile project-based staff augmentation, Nexora provides flexible, compliant staffing models designed to scale alongside your engineering roadmap.",
    features: [
      {
        title: "Rigorous Technical Vetting",
        description: "In-depth coding assessments, architecture evaluations, and cultural fit screenings conducted by veteran engineers.",
      },
      {
        title: "Contract, C2H & Direct Hire",
        description: "Flexible engagement models tailored to your project budgets, headcount constraints, and delivery timelines.",
      },
      {
        title: "E-Verify & Compliance Assurance",
        description: "Complete I-9 verification, payroll administration, background checks, and compliance with federal and state regulations.",
      },
      {
        title: "Rapid Deployment Pipeline",
        description: "Deliver shortlists of qualified, interview-ready candidates within 48 to 72 hours of receiving your requisition.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Requisition Discovery",
        description: "We align with your hiring managers on exact tech stack specifications, team dynamics, and delivery milestones.",
      },
      {
        step: "02",
        title: "Precision Sourcing",
        description: "Leveraging our proprietary database, passive talent networks, and targeted technical community channels.",
      },
      {
        step: "03",
        title: "Technical & Cultural Screening",
        description: "Conducting technical challenge evaluations, background screenings, and soft-skills assessments.",
      },
      {
        step: "04",
        title: "Seamless Onboarding",
        description: "Managing compliance, equipment provisioning logistics, onboarding checklists, and ongoing performance check-ins.",
      },
    ],
    whoIsThisFor: [
      "Engineering leaders seeking specialized developers for mission-critical deadlines",
      "Enterprises looking to reduce hiring cycle times and recruitment overhead",
      "Startups scaling their core product development and DevOps capabilities",
      "Organizations requiring compliant contract staffing without administrative burden",
    ],
    faqs: [
      {
        q: "What engagement models do you offer for employers?",
        a: "We support Contract (Staff Augmentation), Contract-to-Hire (C2H), and Direct Hire (Permanent Placement) models.",
      },
      {
        q: "How do you verify the technical skills of candidates?",
        a: "Our internal technical team conducts structured coding assessments, live system design discussions, and previous project validations.",
      },
      {
        q: "Are you an E-Verify compliant staffing partner?",
        a: "Yes. Nexora is a certified E-Verify employer adhering strictly to federal immigration and employment compliance standards.",
      },
    ],
  },
  {
    slug: "talent-acquisition",
    title: "Talent Acquisition",
    subtext: "Full-Cycle Talent Acquisition Solutions",
    iconName: "Users",
    heroEyebrow: "STRATEGIC RECRUITMENT PARTNERSHIP",
    heroTitle: ["Full-Cycle Talent Acquisition", "That Drives Innovation"],
    heroSub:
      "Transforming how organizations discover, attract, and retain elite technical talent through strategic talent mapping and executive search.",
    stats: [
      { value: "3.5x", label: "Faster Hiring Cycles" },
      { value: "91%", label: "Candidate Offer Acceptance" },
      { value: "24/7", label: "Dedicated Sourcing Engines" },
      { value: "100%", label: "Transparent Pipeline Visibility" },
    ],
    overview:
      "Modern talent acquisition goes beyond job postings. Nexora functions as an extension of your internal talent team, designing custom employer branding, active candidate pipelines, and market intelligence to secure hard-to-find specialists.",
    features: [
      {
        title: "Executive & Specialized Search",
        description: "Confidential search for Principal Engineers, Heads of Engineering, Product VPs, and specialized domain architects.",
      },
      {
        title: "Talent Mapping & Competitive Benchmarking",
        description: "Deep research on talent distribution, compensation benchmarks, and competitor hiring trends across tech centers.",
      },
      {
        title: "Employer Brand Amplification",
        description: "Positioning your brand effectively to attract high-caliber passive candidates who aren't on typical job boards.",
      },
      {
        title: "Embedded Recruiting Partner",
        description: "Dedicated talent acquisition specialists operating directly within your ATS, Slack, and recruitment workflows.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Strategic Talent Mapping",
        description: "Mapping out target talent pools across competitor organizations, emerging tech hubs, and industry specializations.",
      },
      {
        step: "02",
        title: "High-Touch Passive Outreach",
        description: "Personalized executive outreach campaigns that build excitement around your company mission and vision.",
      },
      {
        step: "03",
        title: "Comprehensive Assessment",
        description: "Structured evaluation frameworks analyzing technical leadership, cultural alignment, and long-term retention.",
      },
      {
        step: "04",
        title: "Closing & Offer Engineering",
        description: "Partnering through equity discussion, competitive offer structures, and resignation transition support.",
      },
    ],
    whoIsThisFor: [
      "Companies establishing new engineering centers or expanding into US markets",
      "Firms needing hard-to-source niche skillsets (AI/ML, Distributed Systems, Cloud Security)",
      "High-growth businesses looking for an agile talent acquisition partner without internal agency fees",
      "Leadership teams aiming to upgrade candidate experience and increase offer acceptance rates",
    ],
    faqs: [
      {
        q: "How does Talent Acquisition differ from traditional staffing?",
        a: "Talent Acquisition focuses on long-term workforce planning, employer branding, executive search, and building proactive talent pipelines rather than filling one-off temporary slots.",
      },
      {
        q: "Can you integrate with our existing Applicant Tracking System (ATS)?",
        a: "Yes. Our team seamlessly integrates with Greenhouse, Lever, Workday, Ashby, and all major enterprise ATS platforms.",
      },
    ],
  },
  {
    slug: "background-verification",
    title: "Background Verification",
    subtext: "Comprehensive Employee Background Check USA",
    iconName: "BadgeCheck",
    heroEyebrow: "COMPLIANCE & RISK MITIGATION",
    heroTitle: ["Reliable Background Screening", "For High-Trust Hiring"],
    heroSub:
      "FCRA-compliant employee background checks, employment history validation, education verification, and criminal record screening across all 50 states.",
    stats: [
      { value: "24-48h", label: "Turnaround Time" },
      { value: "100%", label: "FCRA & State Compliant" },
      { value: "50+", label: "County & Federal Databases" },
      { value: "99.9%", label: "Accuracy Rate" },
    ],
    overview:
      "Hiring mistakes are costly. Nexora provides fast, accurate, and completely compliant background verification services that safeguard your organization while keeping candidate onboarding smooth and professional.",
    features: [
      {
        title: "Criminal History & Database Checks",
        description: "County court records, federal district checks, national sex offender registry, and global watchlist screenings.",
      },
      {
        title: "Employment & Reference Verification",
        description: "Direct contact with past HR departments to confirm titles, dates of employment, and performance eligibility.",
      },
      {
        title: "Education & Degree Authentication",
        description: "Official National Student Clearinghouse and direct university registrar validations for all degrees and certifications.",
      },
      {
        title: "Identity & Social Security Trace",
        description: "SSN validation, address history verification, and identity cross-referencing to prevent fraudulent credentials.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Secure Digital Consent",
        description: "Candidate receives a secure mobile-friendly portal to submit consent and required documentation in minutes.",
      },
      {
        step: "02",
        title: "Automated & Primary Source Checks",
        description: "Simultaneous querying across primary judicial repositories, academic institutions, and employer databases.",
      },
      {
        step: "03",
        title: "Quality Review & Discrepancy Flagging",
        description: "Trained compliance specialists review all records to ensure FCRA compliance and flag variances objectively.",
      },
      {
        step: "04",
        title: "Comprehensive Report Delivery",
        description: "Secure digital report delivered directly to your HR dashboard with clear pass/review status indicators.",
      },
    ],
    whoIsThisFor: [
      "Companies hiring remote or on-site technology talent in regulated sectors (FinTech, HealthTech)",
      "Staffing agencies requiring reliable verification before client placements",
      "Enterprises needing audit-proof compliance records for federal contracts",
      "Startups wanting enterprise-grade hiring risk management without enterprise software costs",
    ],
    faqs: [
      {
        q: "Are your background checks FCRA compliant?",
        a: "Yes. All our background screening procedures strictly comply with the Fair Credit Reporting Act (FCRA) and relevant state regulations.",
      },
      {
        q: "What is the typical turnaround time for a complete check?",
        a: "Most standard verifications are completed within 24 to 48 hours. County court checks in jurisdictions requiring manual searches may take 2 to 4 days.",
      },
      {
        q: "How is candidate privacy protected?",
        a: "All candidate records and personal data are encrypted end-to-end with SOC-2 compliant protocols and never shared with unauthorized parties.",
      },
    ],
  },
  {
    slug: "accounting-and-taxes",
    title: "Accounting & Taxes",
    subtext: "Your seamless Accounting and Tax partner",
    iconName: "Calculator",
    heroEyebrow: "FINANCIAL COMPLIANCE & STRATEGY",
    heroTitle: ["Seamless Accounting & Taxes", "Tailored for IT Businesses & Consultants"],
    heroSub:
      "Full-service bookkeeping, payroll management, corporate tax planning, and individual consultant tax optimization for tech professionals and staffing firms.",
    stats: [
      { value: "100%", label: "IRS & State Compliance" },
      { value: "$15k+", label: "Average Annual Tax Savings Found" },
      { value: "Zero", label: "Filing Penalty Guarantee" },
      { value: "Year-Round", label: "Dedicated CPA Advisory" },
    ],
    overview:
      "From multi-state payroll for remote IT workers to optimized 1099/C2C tax filings and corporate compliance, Nexora's accounting specialists take the complexity out of numbers so you can focus on growth.",
    features: [
      {
        title: "Corporate & Multi-State Tax Filing",
        description: "Preparation and filing of Form 1120-S, 1065, state franchise taxes, and multi-jurisdictional sales/withholding taxes.",
      },
      {
        title: "1099, C2C & W-2 Payroll Processing",
        description: "Flawless automated payroll execution, quarterly payroll tax returns (941/940), and year-end W-2/1099 distribution.",
      },
      {
        title: "Bookkeeping & Financial Reporting",
        description: "Monthly reconciliation, profit & loss analysis, balance sheets, and cash flow forecasting in QuickBooks and Xero.",
      },
      {
        title: "Consultant Tax Strategy & Deductions",
        description: "Maximizing eligible home office deductions, equipment write-offs, SEP-IRA/401(k) setups, and Section 199A benefits.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Financial & Tax Diagnostic",
        description: "We review your historical filings, current entity structure, and cash flow to identify overlooked deductions and risks.",
      },
      {
        step: "02",
        title: "Streamlined Systems Setup",
        description: "Integrating modern cloud accounting, automated receipt capture, and payroll schedules.",
      },
      {
        step: "03",
        title: "Ongoing Monthly Management",
        description: "Regular bookkeeping, timely expense categorizations, payroll runs, and quarterly estimated tax planning.",
      },
      {
        step: "04",
        title: "Year-End Filing & Optimization",
        description: "Accurate filing, complete compliance documentation, and strategic roadmap for the upcoming tax year.",
      },
    ],
    whoIsThisFor: [
      "Independent IT consultants operating under LLCs, S-Corps, or Corp-to-Corp (C2C)",
      "Tech staffing agencies managing multi-state contractors and payroll obligations",
      "Tech founders needing clear financial reporting and investor-ready balance sheets",
      "Foreign professionals on visas needing clarity on US tax residency and dual-status returns",
    ],
    faqs: [
      {
        q: "Do you assist with Corp-to-Corp (C2C) entity formation and taxation?",
        a: "Yes. We guide consultants on whether an LLC or S-Corporation is optimal for their income level and handle all associated state filings.",
      },
      {
        q: "Can you manage payroll across multiple US states?",
        a: "Yes. We manage multi-state withholding, state unemployment registrations, and local tax compliance for distributed remote teams.",
      },
    ],
  },
  {
    slug: "it-training",
    title: "IT Training",
    subtext: "Training that prepares candidate for real world careers",
    iconName: "GraduationCap",
    heroEyebrow: "CAREER ACCELERATION & SKILLS MASTERY",
    heroTitle: ["Real-World IT Training", "Built by Industry Practitioners"],
    heroSub:
      "Hands-on project-driven programs in Cloud, Full-Stack Development, Data Engineering, DevOps, and AI, engineered to bridge the gap between theory and high-paying jobs.",
    stats: [
      { value: "100%", label: "Live Project Experience" },
      { value: "1-on-1", label: "Senior Industry Mentorship" },
      { value: "4.9/5", label: "Student Satisfaction Rating" },
      { value: "Top Tier", label: "Curriculum Updated Monthly" },
    ],
    overview:
      "Traditional bootcamps teach syntax; Nexora teaches production-grade engineering. Our hands-on training immerses candidates in real enterprise codebases, agile sprint ceremonies, and cloud architectures expected by top US employers.",
    features: [
      {
        title: "Live Production Project Architecture",
        description: "Build, deploy, and monitor scalable applications on AWS, GCP, and Kubernetes with CI/CD pipelines.",
      },
      {
        title: "Technical Interview Mastery",
        description: "Rigorous algorithm problem-solving, system design patterns, and behavioral STAR-method coaching.",
      },
      {
        title: "1-on-1 Senior Tech Mentorship",
        description: "Weekly private office hours with Principal Engineers and Tech Leads currently working at leading tech enterprises.",
      },
      {
        title: "Direct Placement Pathway",
        description: "Graduates transition directly into our active job placement and profile marketing pipelines.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Baseline Evaluation & Pathway Selection",
        description: "We assess your current coding ability and select the training track that aligns with current high-demand job market gaps.",
      },
      {
        step: "02",
        title: "Intensive Sprint Learning",
        description: "Live interactive sessions, real-world case studies, architecture teardowns, and daily hands-on labs.",
      },
      {
        step: "03",
        title: "Production Capstone Project",
        description: "Collaborative multi-tier project built under agile workflows, code reviews, and enterprise git standards.",
      },
      {
        step: "04",
        title: "Mock Interviews & Placement Launch",
        description: "Intensive technical screening simulations, resume polish, and direct launch into client placement pipelines.",
      },
    ],
    whoIsThisFor: [
      "Recent computer science and engineering graduates seeking their first competitive US role",
      "Engineers transitioning from legacy technologies into Cloud, DevOps, or Data Engineering",
      "Professionals re-entering the tech market after a career gap or visa status update",
      "Developers looking to clear tough FAANG/Enterprise technical coding rounds",
    ],
    faqs: [
      {
        q: "What tracks are currently available?",
        a: "We offer specialized tracks in Full-Stack Web Development (React/Node/Next.js), Cloud & DevOps (AWS/Docker/K8s), Data Engineering & Analytics, and AI/ML Engineering.",
      },
      {
        q: "Is prior coding experience required?",
        a: "While basic foundational knowledge of computer science or programming is recommended, our curriculum is designed to ramp you up rapidly to production proficiency.",
      },
      {
        q: "Does completing the training guarantee job placement support?",
        a: "Yes. All training program graduates immediately gain access to Nexora's active profile marketing and job placement services.",
      },
    ],
  },
];
