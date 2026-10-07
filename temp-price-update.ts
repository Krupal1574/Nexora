import { prisma } from "./lib/prisma";

async function main() {
  const result = await prisma.product.update({
    where: { slug: "ultimate-session" },
    data: { price: "1999" }
  });
  console.log("Updated ultimate-session price to $1999:", result);

  // Verify
  const product = await prisma.product.findFirst({
    where: { slug: "ultimate-session" },
  });
  console.log("Verified:", { name: product?.name, price: product?.price, originalPrice: product?.originalPrice });
}

main();
