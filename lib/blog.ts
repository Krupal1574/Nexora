export type BlogCategory = "Career Tips" | "Tech Trends" | "Interview Prep" | "Success Stories";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "how-to-beat-the-ats",
    title: "How to Beat the ATS: A Comprehensive Guide",
    excerpt: "Applicant Tracking Systems reject 75% of resumes. Learn how to format yours so it actually reaches a human recruiter.",
    content: "## The ATS Challenge\n\nApplicant Tracking Systems (ATS) are used by 99% of Fortune 500 companies. While they streamline recruitment, they also blindly reject qualified candidates simply because of bad formatting.\n\n### 1. Ditch the Fancy Formatting\nColumns, tables, and complex graphics confuse ATS parsers. Stick to standard, single-column layouts.\n\n### 2. Keyword Optimization\nYour resume must include the exact keywords found in the job description. Don't just list them—weave them into your achievements.\n\n### 3. File Types Matter\nUnless specifically requested otherwise, always submit your resume as a standard PDF or Word document.",
    category: "Career Tips",
    author: {
      name: "Jessica Wong",
      role: "Lead Career Coach",
      avatar: "/images/default-avatar.svg",
    },
    date: "Sep 01, 2026",
    readTime: "5 min read",
    image: "/images/blog/career-tips.svg",
  },
  {
    id: "b2",
    slug: "top-tech-skills-2027",
    title: "Top 5 Tech Skills Employers Want in 2027",
    excerpt: "The tech landscape is evolving rapidly. From AI engineering to cloud security, these are the skills that will get you hired next year.",
    content: "## The Evolving Landscape\n\nAs we look ahead, the demand for specialized tech skills continues to shift. Here are the top skills you should focus on:\n\n1. **Applied AI & Machine Learning**: Beyond basic prompt engineering, companies want engineers who can integrate AI models into existing products.\n2. **Cloud Security**: With remote work here to stay, securing cloud infrastructure is more critical than ever.\n3. **Data Engineering**: Data is useless without pipelines. Data engineers are currently in higher demand than data scientists.\n4. **Rust & Go**: These languages are rapidly gaining enterprise adoption for their performance and safety.\n5. **FinOps**: Managing cloud costs is now a distinct discipline that tech companies highly value.",
    category: "Tech Trends",
    author: {
      name: "Marcus Chen",
      role: "Technical Recruiter",
      avatar: "/images/default-avatar.svg",
    },
    date: "Aug 28, 2026",
    readTime: "7 min read",
    image: "/images/blog/tech-trends.svg",
  },
  {
    id: "b3",
    slug: "system-design-interview-tips",
    title: "Mastering the System Design Interview",
    excerpt: "System design interviews are notoriously difficult. We break down the framework you need to ace them and land that Senior role.",
    content: "## The Framework\n\nSystem design interviews aren't about getting the \"right\" answer—they're about demonstrating your thought process.\n\n### Step 1: Clarify Requirements\nNever start drawing immediately. Ask questions to establish functional and non-functional requirements. How many users? What is the read/write ratio?\n\n### Step 2: High-Level Design\nDraw the core components (API Gateway, App Servers, Database) before diving into the details.\n\n### Step 3: Deep Dive\nFocus on the hardest technical challenges of the specific system. Is it data partitioning? Caching strategy? Network latency?\n\n### Step 4: Identify Bottlenecks\nEvery system has limits. Pointing out the flaws in your own design shows maturity and experience.",
    category: "Interview Prep",
    author: {
      name: "David Smith",
      role: "Senior Engineering Coach",
      avatar: "/images/default-avatar.svg",
    },
    date: "Aug 15, 2026",
    readTime: "10 min read",
    image: "/images/blog/interview-prep.svg",
  },
  {
    id: "b4",
    slug: "from-bootcamp-to-six-figures",
    title: "From Bootcamp to Six Figures: A Nexora Success Story",
    excerpt: "How Maria transitioned from a marketing background into a $130K software engineering role in just 8 months with Nexora's guidance.",
    content: "## Maria's Journey\n\nMaria Lopez spent 6 years in digital marketing before deciding to pivot into software engineering. Like many career changers, she felt overwhelmed by the sheer volume of things to learn.\n\n### The Turning Point\nAfter completing a 14-week coding bootcamp, Maria had the skills but struggled to get past the initial screening rounds. That's when she found Nexora.\n\n### How Nexora Helped\nOur career coaches worked with Maria on three fronts:\n\n1. **Resume Repositioning**: We reframed her marketing experience as a strength — product thinking, user empathy, and data-driven decision making.\n2. **Technical Interview Prep**: Weekly mock interviews focused on data structures, algorithms, and React-specific challenges.\n3. **Salary Negotiation**: When she received her first offer at $110K, our coaches helped her negotiate up to $130K with a signing bonus.\n\n### The Result\nMaria is now a Frontend Engineer at a Series B fintech startup in Austin, TX. She credits the structured approach and personal attention from Nexora for making the transition possible.",
    category: "Success Stories",
    author: {
      name: "Rachel Torres",
      role: "Career Success Manager",
      avatar: "/images/default-avatar.svg",
    },
    date: "Aug 10, 2026",
    readTime: "6 min read",
    image: "/images/blog/success-stories.svg",
  },
  {
    id: "b5",
    slug: "remote-work-productivity-tips",
    title: "10 Productivity Hacks for Remote Tech Workers",
    excerpt: "Working from home sounds great until your productivity tanks. Here are battle-tested strategies from engineers who've mastered remote work.",
    content: "## The Remote Work Reality\n\nRemote work offers incredible flexibility, but it also comes with unique challenges. Here are 10 strategies that top-performing remote engineers swear by.\n\n### 1. Time-Block Your Deep Work\nSchedule 2-3 hour blocks of uninterrupted coding time. Turn off Slack, close your email, and focus.\n\n### 2. Create a Dedicated Workspace\nYour brain needs environmental cues. A dedicated desk signals \"work mode\" and helps you switch off at the end of the day.\n\n### 3. Over-Communicate\nIn a remote setting, no one can see you working. Send daily standups, document decisions, and keep your status updated.\n\n### 4. Take Real Breaks\nThe Pomodoro Technique (25 min work / 5 min break) is popular for a reason. Step away from your screen — walk, stretch, hydrate.\n\n### 5. Invest in Your Setup\nA good monitor, ergonomic chair, and mechanical keyboard aren't luxuries — they're investments in your health and output.",
    category: "Career Tips",
    author: {
      name: "Jessica Wong",
      role: "Lead Career Coach",
      avatar: "/images/default-avatar.svg",
    },
    date: "Aug 05, 2026",
    readTime: "8 min read",
    image: "/images/blog/career-tips.svg",
  },
  {
    id: "b6",
    slug: "ai-engineering-career-guide",
    title: "The Complete Guide to Becoming an AI Engineer in 2026",
    excerpt: "AI engineering is the hottest career in tech. Here's a realistic roadmap from fundamentals to landing your first AI role.",
    content: "## Why AI Engineering?\n\nAI engineering sits at the intersection of software engineering and machine learning. Unlike research scientists, AI engineers focus on building production-ready AI systems.\n\n### The Roadmap\n\n### Phase 1: Foundations (Months 1-3)\nMaster Python, linear algebra, and statistics. Build a strong understanding of how neural networks work from scratch before using frameworks.\n\n### Phase 2: Frameworks & Tools (Months 4-6)\nLearn PyTorch or TensorFlow, experiment with Hugging Face Transformers, and understand MLOps basics like model versioning and deployment.\n\n### Phase 3: Specialization (Months 7-9)\nChoose a focus area: NLP, computer vision, recommendation systems, or generative AI. Build 2-3 portfolio projects that solve real problems.\n\n### Phase 4: Job Search (Months 10-12)\nTarget mid-size companies and AI startups first. They're more willing to take bets on engineers with strong portfolios over years of experience.",
    category: "Tech Trends",
    author: {
      name: "Marcus Chen",
      role: "Technical Recruiter",
      avatar: "/images/default-avatar.svg",
    },
    date: "Jul 28, 2026",
    readTime: "12 min read",
    image: "/images/blog/tech-trends.svg",
  },
  {
    id: "b7",
    slug: "behavioral-interview-star-method",
    title: "The STAR Method: Your Secret Weapon for Behavioral Interviews",
    excerpt: "Behavioral interviews trip up even experienced engineers. Learn the STAR framework and never stumble on 'Tell me about a time when...' again.",
    content: "## What Is the STAR Method?\n\nSTAR stands for Situation, Task, Action, Result. It's a structured way to answer behavioral interview questions that hiring managers love.\n\n### Situation\nSet the context. Where were you working? What was the project? Keep it brief — 2-3 sentences max.\n\n### Task\nWhat was your specific responsibility? What was expected of you? This is where you establish stakes.\n\n### Action\nThis is the meat of your answer. What exactly did YOU do? Use \"I\" not \"we.\" Be specific about your technical and leadership contributions.\n\n### Result\nQuantify the outcome. \"Reduced API latency by 40%\" is far more powerful than \"improved performance.\" Always tie results to business impact when possible.\n\n### Common Mistakes\n\n1. **Being too vague**: Interviewers want specifics, not generalizations.\n2. **Taking too long**: Keep each STAR response under 2 minutes.\n3. **Skipping the Result**: The result is what makes your story memorable. Never leave it out.",
    category: "Interview Prep",
    author: {
      name: "David Smith",
      role: "Senior Engineering Coach",
      avatar: "/images/default-avatar.svg",
    },
    date: "Jul 20, 2026",
    readTime: "6 min read",
    image: "/images/blog/interview-prep.svg",
  },
  {
    id: "b8",
    slug: "career-pivot-at-40",
    title: "Switching to Tech at 40: It's Not Too Late",
    excerpt: "Age is just a number in tech. Meet three professionals who successfully pivoted into software engineering after 40.",
    content: "## Breaking the Age Myth\n\nThere's a persistent myth in Silicon Valley that tech is a young person's game. The data tells a different story.\n\n### Meet the Pivoteers\n\n### James, 42 — Former Accountant → Data Engineer\nJames leveraged his deep understanding of financial systems to transition into data engineering. His domain expertise made him invaluable to fintech companies.\n\n### Priya, 45 — Former Teacher → QA Engineer\nPriya's attention to detail and ability to explain complex concepts clearly made her a natural fit for quality assurance. She now leads a QA team of 5.\n\n### Robert, 41 — Former Mechanic → DevOps Engineer\nRobert's troubleshooting mindset and hands-on approach translated perfectly into infrastructure and systems work.\n\n### The Common Thread\nAll three had one thing in common: they didn't try to compete with 22-year-olds on raw coding speed. Instead, they positioned their life experience as a competitive advantage.",
    category: "Success Stories",
    author: {
      name: "Rachel Torres",
      role: "Career Success Manager",
      avatar: "/images/default-avatar.svg",
    },
    date: "Jul 12, 2026",
    readTime: "7 min read",
    image: "/images/blog/success-stories.svg",
  },
  {
    id: "b9",
    slug: "salary-negotiation-tech",
    title: "How to Negotiate a $20K Higher Salary in Tech",
    excerpt: "Most candidates leave money on the table. Learn the exact scripts and strategies that have helped our clients earn $15-30K more.",
    content: "## The Negotiation Gap\n\nStudies show that 58% of tech workers accept the first offer they receive. On average, those who negotiate earn $15,000-$30,000 more per year.\n\n### Rule 1: Never Name a Number First\nWhen asked about salary expectations, deflect. Say: \"I'd love to learn more about the role and responsibilities before discussing compensation. What's the budgeted range for this position?\"\n\n### Rule 2: Get Multiple Offers\nThe strongest negotiating position is having alternatives. Even if you have a clear first choice, continue interviewing until you have at least 2 offers.\n\n### Rule 3: Negotiate Total Compensation\nBase salary is just one piece. Consider signing bonuses, equity/RSUs, remote work flexibility, PTO, professional development budgets, and relocation assistance.\n\n### Rule 4: Use the Right Language\nDon't say \"I want\" or \"I need.\" Say \"Based on my research and the value I'll bring to this role, I believe a compensation of $X is more aligned with market rates.\"\n\n### Rule 5: Get It In Writing\nVerbal offers mean nothing. Don't resign from your current job until you have a signed offer letter with all negotiated terms documented.",
    category: "Career Tips",
    author: {
      name: "Jessica Wong",
      role: "Lead Career Coach",
      avatar: "/images/default-avatar.svg",
    },
    date: "Jul 05, 2026",
    readTime: "9 min read",
    image: "/images/blog/career-tips.svg",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
