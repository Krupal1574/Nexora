import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { randomBytes } from "node:crypto";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const email = "krupalprajapati007@outlook.com";

  try {
    // Step 1: Find user
    console.log("1. Finding user...");
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("   User found:", !!user, "Has password:", !!user?.password);

    if (!user) {
      console.log("   No user found, exiting.");
      return;
    }

    // Step 2: Delete existing tokens
    console.log("2. Deleting existing tokens...");
    const deleted = await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });
    console.log("   Deleted:", deleted.count);

    // Step 3: Create new token
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    console.log("3. Creating token...");
    const created = await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });
    console.log("   Created:", !!created);

    // Step 4: Verify we can read it back
    console.log("4. Reading token back...");
    const found = await prisma.verificationToken.findUnique({
      where: { token },
    });
    console.log("   Found:", !!found);

    // Cleanup
    await prisma.verificationToken.delete({ where: { token } });
    console.log("5. Cleanup done. ALL STEPS PASSED.");
  } catch (error) {
    console.error("ERROR:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
