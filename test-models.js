// Quick test of Prisma models
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const models = [
    { name: "contactInquiry", fn: () => prisma.contactInquiry.findMany({ take: 1 }) },
    { name: "coupon", fn: () => prisma.coupon.findMany({ take: 1 }) },
    { name: "mediaAsset", fn: () => prisma.mediaAsset.findMany({ take: 1 }) },
    { name: "adminAuditLog", fn: () => prisma.adminAuditLog.findMany({ take: 1 }) },
    { name: "course", fn: () => prisma.course.findMany({ take: 1 }) },
    { name: "enrollment", fn: () => prisma.enrollment.findMany({ take: 1 }) },
    { name: "siteSetting", fn: () => prisma.siteSetting.findMany({ take: 1 }) },
    { name: "user", fn: () => prisma.user.findMany({ take: 1 }) },
    { name: "order", fn: () => prisma.order.findMany({ take: 1 }) },
    { name: "product", fn: () => prisma.product.findMany({ take: 1 }) },
  ];

  for (const m of models) {
    try {
      const result = await m.fn();
      console.log(`✅ ${m.name}: OK (${result.length} rows)`);
    } catch (err) {
      console.log(`❌ ${m.name}: ${err.message}`);
    }
  }

  await prisma.$disconnect();
  await pool.end();
}

main();
