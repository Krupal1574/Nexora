import { prisma } from "../lib/prisma";
import * as argon2 from "argon2";

const products = [
    {
        id: "application-guarantee",
        slug: "application-guarantee",
        name: "Application Guarantee",
        description: "Guaranteed job applications to top tech companies with personalized cover letters and optimized candidate profiles.",
        originalPrice: 499,
        price: 499,
        discount: 0,
        category: "pro-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "interview-coaching",
        slug: "interview-coaching",
        name: "Interview Coaching",
        description: "One-on-one personalized interview coaching with mock interviews and real-time feedback.",
        originalPrice: 999,
        price: 999,
        discount: 0,
        category: "pro-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "ultimate-support",
        slug: "ultimate-support",
        name: "Ultimate Support",
        description: "Complete career transformation package including resume, LinkedIn, portfolio, and ongoing mentorship.",
        originalPrice: 1999,
        price: 1999,
        discount: 0,
        category: "pro-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "all-in-one",
        slug: "all-in-one",
        name: "All In One",
        description: "Premium all-inclusive package with dedicated career coaching, interview prep, and placement assistance.",
        originalPrice: 2999,
        price: 2999,
        discount: 0,
        category: "pro-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "resume-craft",
        slug: "resume-craft",
        name: "Resume Craft",
        description: "Professional resume creation and optimization tailored to tech industry standards.",
        originalPrice: 199,
        price: 199,
        discount: 0,
        category: "add-on-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "resume-session",
        slug: "resume-session",
        name: "Resume Session",
        description: "Expert one-on-one resume review session with actionable feedback and improvements.",
        originalPrice: 249,
        price: 249,
        discount: 0,
        category: "add-on-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "interview-sessions",
        slug: "interview-sessions",
        name: "Interview Sessions",
        description: "Multiple mock interview sessions covering behavioral, technical, and system design questions.",
        originalPrice: 799,
        price: 799,
        discount: 0,
        category: "add-on-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "technical-interview-prep",
        slug: "technical-interview-prep",
        name: "Technical Interview Prep",
        description: "Intensive coding interview preparation with algorithm practice and problem-solving strategies.",
        originalPrice: 189,
        price: 189,
        discount: 0,
        category: "add-on-services",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "30-day-extension",
        slug: "30-day-extension",
        name: "30-Day Extension",
        description: "Extend your current service package for an additional 30 days of support and guidance.",
        originalPrice: 499,
        price: 499,
        discount: 0,
        category: "service-extensions",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "60-day-extension",
        slug: "60-day-extension",
        name: "60-Day Extension",
        description: "Extend your service package for 60 days with continued mentorship and job search support.",
        originalPrice: 899,
        price: 899,
        discount: 0,
        category: "service-extensions",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "90-day-extension",
        slug: "90-day-extension",
        name: "90-Day Extension",
        description: "Three-month extension providing comprehensive support through your entire job search journey.",
        originalPrice: 1299,
        price: 1299,
        discount: 0,
        category: "service-extensions",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "unlimited-support",
        slug: "unlimited-support",
        name: "Unlimited Support",
        description: "Six months of unlimited 24/7 support with priority access to career coaches and resources.",
        originalPrice: 1999,
        price: 1999,
        discount: 0,
        category: "service-extensions",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "placement-assistance",
        slug: "placement-assistance",
        name: "Placement Assistance",
        description: "Full job placement support including job matching, interview preparation, and offer negotiation.",
        originalPrice: 1599,
        price: 1599,
        discount: 0,
        category: "placement-charges",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "direct-company-referral",
        slug: "direct-company-referral",
        name: "Direct Company Referral",
        description: "Direct referrals to our network of 500+ partner tech companies.",
        originalPrice: 1999,
        price: 1999,
        discount: 0,
        category: "placement-charges",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "guaranteed-interviews",
        slug: "guaranteed-interviews",
        name: "Guaranteed Interviews",
        description: "Guaranteed interviews with top-tier tech companies including FAANG and unicorn startups.",
        originalPrice: 2999,
        price: 2999,
        discount: 0,
        category: "placement-charges",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "executive-placement",
        slug: "executive-placement",
        name: "Executive Placement",
        description: "Premium placement service with dedicated executive recruiter and senior-level job opportunities.",
        originalPrice: 3999,
        price: 3999,
        discount: 0,
        category: "placement-charges",
        image: "",
        stock: 100,
        featured: true,
    },
];

async function main() {
    for (const product of products) {
        await prisma.product.upsert({
            where: {
                id: product.id,
            },
            update: product,
            create: product,
        });
    }

    console.log(`Seeded ${products.length} products.`);

    // Seed ADMIN user
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPassword) {
        const hashedPassword = await argon2.hash(adminPassword);
        
        await prisma.user.upsert({
            where: { email: adminEmail },
            update: {
                password: hashedPassword,
                role: "ADMIN",
            },
            create: {
                email: adminEmail,
                name: "Admin User",
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log(`Seeded ADMIN user: ${adminEmail}`);
    } else {
        console.log(`Skipped seeding ADMIN user: ADMIN_EMAIL or ADMIN_PASSWORD not set in environment.`);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });