const fs = require('fs');
const path = require('path');

// Font files to copy (from node_modules/@fontsource/be-vietnam-pro/files)
const fontFiles = [
  {
    src: '../node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-400-normal.woff2',
    dest: '../public/fonts/be-vietnam-pro-400.woff2'
  },
  {
    src: '../node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-500-normal.woff2',
    dest: '../public/fonts/be-vietnam-pro-500.woff2'
  },
  {
    src: '../node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-vietnamese-700-normal.woff2',
    dest: '../public/fonts/be-vietnam-pro-700.woff2'
  }
];

// Create fonts directory if it doesn't exist
const fontsDir = path.join(__dirname, '../public/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Copy each font file
fontFiles.forEach(file => {
  const srcPath = path.join(__dirname, file.src);
  const destPath = path.join(__dirname, file.dest);
  
  try {
    const data = fs.readFileSync(srcPath);
    fs.writeFileSync(destPath, data);
    console.log(`✅ Copied: ${file.src} → ${file.dest}`);
  } catch (err) {
    console.error(`❌ Error copying ${file.src}: ${err.message}`);
  }
});

console.log('Font copying completed!');
