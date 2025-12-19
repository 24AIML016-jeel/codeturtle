const fs = require('fs');
const path = require('path');

function removeComments(content) {
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  content = content.replace(/(?<!:)\/\/.*/g, '');
  content = content.replace(/^\s*[\r\n]/gm, '\n');
  content = content.replace(/\n{3,}/g, '\n\n');
  return content.trim() + '\n';
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cleaned = removeComments(content);
  fs.writeFileSync(filePath, cleaned, 'utf8');
  console.log(`✓ Processed: ${filePath}`);
}

function processDirectory(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && file !== 'generated') {
        processDirectory(filePath, extensions);
      }
    } else if (extensions.some(ext => file.endsWith(ext))) {
      processFile(filePath);
    }
  }
}

const srcDir = path.join(__dirname, '..', 'src');
const prismaDir = path.join(__dirname, '..', 'prisma');

console.log('🧹 Removing comments from source files...\n');
processDirectory(srcDir);
processDirectory(prismaDir);
console.log('\n✅ Done!');
