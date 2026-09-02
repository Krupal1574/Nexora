import { prisma } from "../lib/prisma";

const products = [
    {
        id: "launch-plan",
        slug: "launch-plan",
        name: "Launch Plan",
        description:
            "The Launch Plan is designed for tech professionals who need a solid foundation. You get expert resume optimization, a LinkedIn profile overhaul, and dedicated 1-on-1 career counseling.",
        originalPrice: 1499,
        price: 999,
        discount: 33,
        category: "package",
        image: "",
        stock: 100,
        featured: false,
    },
    {
        id: "accelerate-plan",
        slug: "accelerate-plan",
        name: "Accelerate Plan",
        description:
            "Our most popular package. The Accelerate Plan combines resume marketing, mock interview coaching, technical training sessions, and a dedicated personal recruiter.",
        originalPrice: 2499,
        price: 1749,
        discount: 30,
        category: "package",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "summit-plan",
        slug: "summit-plan",
        name: "Summit Plan",
        description:
            "Our premium, all-inclusive career transformation offering covering resume, training, placement, compliance, onboarding, and dedicated account management.",
        originalPrice: 4999,
        price: 3499,
        discount: 30,
        category: "package",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "resume-optimization",
        slug: "resume-optimization",
        name: "Resume Optimization",
        description:
            "A standalone professional resume service using ATS-compliant formatting, keyword optimization, and achievement-driven narratives.",
        originalPrice: 499,
        price: 349,
        discount: 30,
        category: "individual",
        image: "",
        stock: 100,
        featured: true,
    },
    {
        id: "interview-prep",
        slug: "interview-prep",
        name: "Interview Prep Bundle",
        description:
            "Prepare for behavioral and technical interviews with mock sessions, feedback reports, improvement plans, and question banks.",
        originalPrice: 599,
        price: 449,
        discount: 25,
        category: "individual",
        image: "",
        stock: 100,
        featured: false,
    },
    {
        id: "tech-training",
        slug: "tech-training",
        name: "Technical Training",
        description:
            "Focused technical training covering cloud, data, DevOps, full-stack, or AI/ML with live sessions, assessments, and certification preparation.",
        originalPrice: 699,
        price: 499,
        discount: 29,
        category: "individual",
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
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });