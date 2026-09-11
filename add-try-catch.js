const fs = require('fs');
const path = require('path');

const dirs = ['users', 'courses', 'products', 'orders', 'inquiries', 'coupons', 'media', 'settings', 'logs'];

dirs.forEach(d => {
  const apiPath = path.join('app', 'api', 'admin', d, 'route.ts');
  if (fs.existsSync(apiPath)) {
    let content = fs.readFileSync(apiPath, 'utf8');
    
    // Wrap GET findMany in try-catch
    if (!content.includes('try {\\n    const items')) {
      content = content.replace(
        /const items = await prisma\.[a-zA-Z]+\.findMany\(\{[\s\S]*?\}\);\s*return NextResponse\.json\(items\);/m,
        match => `try {
    ${match}
  } catch (error) {
    console.error('GET Error in ${d}:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }`
      );
      
      // Update POST error logging
      content = content.replace(
        /return NextResponse\.json\(\{ error: "Internal Error" \}, \{ status: 500 \}\);/g,
        `console.error('POST Error in ${d}:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });`
      );

      fs.writeFileSync(apiPath, content);
    }
  }
});

console.log('Added try-catch and logging to APIs');
