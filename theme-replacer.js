const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'components');
const appPath = path.join(__dirname, 'app');

const replacements = [
  { search: /#3b82f6/g, replace: '#c8f135' }, // Accent
  { search: /#2563eb/g, replace: '#b8e020' }, // Accent Hover
  { search: /#0d1527/g, replace: '#0d0d0d' }, // Hero BG / Dark borders
  { search: /#153366/g, replace: '#1a2510' }, // Radial Glow
  { search: /#00d2ff/g, replace: '#e4ff7a' }, // Gradient Light
  { search: /rgba\(59,130,246,/g, replace: 'rgba(200,241,53,' }, // RGBA shadow
  { search: /rgba\(59, 130, 246,/g, replace: 'rgba(200, 241, 53,' }, // RGBA selection
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const rule of replacements) {
        if (rule.search.test(content)) {
          content = content.replace(rule.search, rule.replace);
          modified = true;
        }
      }

      // Special replacement for the SVG blue-glow matrix
      const oldMatrix = `0 0 0 0 0.231
                    0 0 0 0 0.510
                    0 0 0 0 0.965
                    0 0 0 1 0`;
      const newMatrix = `0 0 0 0 0.784
                    0 0 0 0 0.945
                    0 0 0 0 0.208
                    0 0 0 1 0`;
      if (content.includes('0 0 0 0 0.231')) {
        content = content.replace(oldMatrix, newMatrix);
        content = content.replace('id="blue-glow"', 'id="lime-glow"');
        content = content.replace('url(#blue-glow)', 'url(#lime-glow)');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
processDirectory(appPath);

console.log('Theme replacement complete!');
