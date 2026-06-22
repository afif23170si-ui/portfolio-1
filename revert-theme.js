const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'components');
const appPath = path.join(__dirname, 'app');

const replacements = [
  { search: /#0df046/gi, replace: '#c8f135' }, // Toxic green back to Lime Green
  { search: /#0abf37/gi, replace: '#b8e020' }, // Toxic hover back to Lime hover
  { search: /#71ffa2/gi, replace: '#e4ff7a' }, // Toxic gradient back to Lime gradient
  { search: /rgba\(13,\s*240,\s*70,/g, replace: 'rgba(200, 241, 53,' }, // RGBA fix if any
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

      // Revert the SVG filter in HeroSection
      const oldNeonMatrix = `0 0 0 0 0.051
                    0 0 0 0 0.941
                    0 0 0 0 0.275
                    0 0 0 1 0`;
      const limeMatrix = `0 0 0 0 0.784
                    0 0 0 0 0.945
                    0 0 0 0 0.208
                    0 0 0 1 0`;
      
      if (content.includes('0 0 0 0 0.051')) {
        content = content.replace(oldNeonMatrix, limeMatrix);
        content = content.replace(/id="neon-glow"/g, 'id="lime-glow"');
        content = content.replace(/url\(#neon-glow\)/g, 'url(#lime-glow)');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Reverted: ${fullPath}`);
      }
    }
  }
}

processDirectory(directoryPath);
processDirectory(appPath);

console.log('Revert complete!');
