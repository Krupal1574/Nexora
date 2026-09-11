import "dotenv/config";
import { PrismaClient } from "@prisma/client";

async function main() {
  console.log("Creating PrismaClient WITHOUT pg adapter...");
  const prisma = new PrismaClient();
  
  try {
    console.log("Connecting...");
    const user = await prisma.user.findFirst();
    console.log("Success! Found user:", !!user);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
