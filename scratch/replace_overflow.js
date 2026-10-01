const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.tsx')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allTsxFiles = walkDir('app');

allTsxFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('overflow-x-hidden')) {
        content = content.replace(/overflow-x-hidden/g, 'overflow-x-clip');
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
console.log('Done!');
