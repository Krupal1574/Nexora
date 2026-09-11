const fs = require('fs');
const path = require('path');

const dirs = ['users', 'courses', 'products', 'orders', 'inquiries', 'coupons', 'media', 'settings', 'logs'];

dirs.forEach(d => {
  // Update APIs
  const apiPath = path.join('app', 'api', 'admin', d, 'route.ts');
  if (fs.existsSync(apiPath)) {
    let content = fs.readFileSync(apiPath, 'utf8');
    content = content.replace(/new NextResponse\("Unauthorized", \{ status: 401 \}\)/g, 'NextResponse.json({ error: "Unauthorized" }, { status: 401 })');
    content = content.replace(/new NextResponse\("Internal Error", \{ status: 500 \}\)/g, 'NextResponse.json({ error: "Internal Error" }, { status: 500 })');
    fs.writeFileSync(apiPath, content);
  }

  // Update Pages
  const pagePath = path.join('app', 'admin', d, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let pContent = fs.readFileSync(pagePath, 'utf8');
    
    // Replace the specific block of useEffect
    pContent = pContent.replace(
      /\.then\(res => res\.json\(\)\)\s*\n\s*\.then\(data => \{\s*\n\s*setItems\(Array\.isArray\(data\) \? data : \[\]\);\s*\n\s*setLoading\(false\);\s*\n\s*\}\);/g,
      `.then(res => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });`
    );
    
    fs.writeFileSync(pagePath, pContent);
  }
});

console.log('Fixed API and Page errors');
