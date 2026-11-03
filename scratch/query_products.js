const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  await client.connect();
  const res = await client.query('SELECT id, slug, name, price, "originalPrice", discount, category, status FROM "Product"');
  console.log("DB Products:", JSON.stringify(res.rows, null, 2));
  await client.end();
}

main().catch(err => {
  console.error("PG error:", err);
  process.exit(1);
});

