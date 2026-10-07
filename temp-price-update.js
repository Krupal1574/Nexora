const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    // List all products with their slugs and prices
    const result = await client.query(
      `SELECT "id", "name", "slug", "price", "originalPrice", "discount", "category" FROM "Product" ORDER BY "category", "name"`
    );
    console.log('All products:');
    result.rows.forEach(r => {
      console.log(`  [${r.category}] ${r.name} (slug: ${r.slug}) — price: $${r.price}, original: $${r.originalPrice}, discount: ${r.discount}%`);
    });
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
