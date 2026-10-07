node -e "
const fs = require('fs');

const css = fs.readFileSync('app/globals.css', 'utf-8');

const updatedCss = css.replace(/@theme \{[^}]+\}/g, \`@theme {
  --color-nexora-cream: #F5F1E8;
  --color-nexora-coal: #171717;
  --color-nexora-orange: #F26A21;
  --color-nexora-blue: #8FB8D8;
  --color-nexora-muted: #77736D;
  
  --color-nexora-bg: var(--color-nexora-cream);
  --color-nexora-surface: #ffffff;
  --color-nexora-card: #ffffff;
  --color-nexora-border: rgba(23, 23, 23, 0.12);
}\`);

const bodyBgRegex = /(body\s*\{[^}]*)background-color:\s*#[a-f0-9]+;([\s\S]*?)color:\s*#[a-f0-9]+;([\s\S]*?\})/i;
const updatedBody = updatedCss.replace(bodyBgRegex, '\$1background-color: var(--color-nexora-cream);\$2color: var(--color-nexora-coal);\$3');

const finalCss = updatedBody
  .replace(/background:\s*rgba\(26,\s*32,\s*44,\s*0\.75\);/g, 'background: var(--nexora-glass-light);')
  .replace(/border: 1px solid rgba\(0,\s*242,\s*254,\s*0\.12\);/g, 'border: 1px solid rgba(23, 23, 23, 0.10);')
  .replace(/box-shadow:\s*0 8px 32px rgba\(0,\s*242,\s*254,\s*0\.12\);/g, 'box-shadow: 0 12px 40px rgba(23, 23, 23, 0.08);')
  .replace(/border-color:\s*rgba\(0,\s*242,\s*254,\s*0\.35\);/g, 'border-color: rgba(23, 23, 23, 0.25);')
  
  .replace(/background: linear-gradient[^;]+;/g, 'background: var(--color-nexora-orange);')
  .replace(/color:\s*#0b0f19/g, 'color: #ffffff')
  
  .replace(/color:\s*#00f2fe/g, 'color: var(--color-nexora-orange)')
  .replace(/border: 1\.5px solid #00f2fe;/g, 'border: 1px solid var(--color-nexora-coal);')
  .replace(/background:\s*rgba\(0,\s*242,\s*254,\s*0\.1\);/g, 'background: rgba(23, 23, 23, 0.05);')
  .replace(/box-shadow:\s*0 0 16px rgba\(0,\s*242,\s*254,\s*0\.3\);/g, 'box-shadow: 0 4px 12px rgba(23, 23, 23, 0.05);')
  
  .replace(/border:\s*1px solid rgba\(0,\s*242,\s*254,\s*0\.2\);/g, 'border: 1px solid rgba(23, 23, 23, 0.15);')
  .replace(/color:\s*#ffffff;/g, 'color: var(--color-nexora-coal);')
  .replace(/border-color:\s*#00f2fe;/g, 'border-color: var(--color-nexora-orange);')
  .replace(/box-shadow:\s*0 0 0 3px rgba\(0,\s*242,\s*254,\s*0\.15\);/g, 'box-shadow: 0 0 0 3px rgba(242, 106, 33, 0.15);')
  .replace(/color:\s*#64748b;/g, 'color: var(--color-nexora-muted);');

const nexoraVars = \`:root {
  --nexora-cream: #F5F1E8;
  --nexora-coal: #171717;
  --nexora-orange: #F26A21;
  --nexora-blue: #8FB8D8;
  --nexora-muted: #77736D;
  --nexora-border-light: rgba(23, 23, 23, 0.12);
  --nexora-border-dark: rgba(245, 241, 232, 0.14);
  --nexora-glass-light: rgba(245, 241, 232, 0.72);
  --nexora-glass-dark: rgba(23, 23, 23, 0.72);
  --nexora-shadow-soft: 0 12px 40px rgba(23, 23, 23, 0.08);
  --nexora-shadow-medium: 0 20px 60px rgba(23, 23, 23, 0.12);
}\`;

let finalOutput = finalCss.replace(/:root\s*\{/, nexoraVars + '\n\n:root {');

finalOutput = finalOutput
  .replace(/--nx-cyan:#00f2fe/g, '--nx-cyan:var(--nexora-orange)')
  .replace(/--nx-teal:#00d2c4/g, '--nx-teal:var(--nexora-blue)')
  .replace(/--nx-ink:#06080f/g, '--nx-ink:var(--nexora-coal)')
  .replace(/--nx-line:rgba\(255,255,255,\.1\)/g, '--nx-line:rgba(23,23,23,.1)')
  .replace(/color: rgba\(255,255,255,\.35\)/g, 'color: var(--nexora-muted)')
  .replace(/-webkit-text-stroke: 1px rgba\(255,255,255,\.35\)/g, '-webkit-text-stroke: 1px var(--nexora-border-light)')
  .replace(/linear-gradient\(120deg,#fff 0%,var\(--nx-cyan\) 60%,var\(--nx-teal\) 100%\)/g, 'var(--nexora-coal)')
  .replace(/background-image: linear-gradient\(var\(--nx-line\) 1px,transparent 1px\), linear-gradient\(90deg,var\(--nx-line\) 1px,transparent 1px\);/g, 'background-image: linear-gradient(var(--nexora-border-light) 1px,transparent 1px), linear-gradient(90deg,var(--nexora-border-light) 1px,transparent 1px);')
  .replace(/color:#06080f;/g, 'color:var(--nexora-cream);') 
  .replace(/color:rgba\(6,8,15,\.7\);/g, 'color:rgba(245,241,232,0.7);');

fs.writeFileSync('app/globals.css', finalOutput);
"
