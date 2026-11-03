
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const p = await prisma.product.findMany();
  console.log(JSON.stringify(p.map(x => ({ slug: x.slug, name: x.name, price: x.price, originalPrice: x.originalPrice, discount: x.discount, category: x.category })), null, 2));
}
main().catch(e => console.log('Err:', e.message)).finally(() => process.exit(0));
