//modules/fileManager.js

const fs = require('fs');
const path = require('path');

function createPublicFiles(appDir) {
  const publicDir = path.join(appDir, 'public');
  fs.mkdirSync(publicDir);

  fs.copyFileSync(path.join(__dirname, '../pages/public/index.html.js'), path.join(publicDir, 'index.html'));
  fs.copyFileSync(path.join(__dirname, '../pages/public/style.css.js'), path.join(publicDir, 'style.css'));
  fs.copyFileSync(path.join(__dirname, '../pages/public/favicon.ico'), path.join(publicDir, 'favicon.ico'));
}

module.exports = { createPublicFiles };
