const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { createPublicFiles } = require('./fileManager');
const { createReadme } = require('./readme');

async function createApp(appName, promptStructure, promptLanguage) {
  const appDir = path.join(process.cwd(), appName);
  if (fs.existsSync(appDir)) {
    console.error('El directorio ya existe.');
    process.exit(1);
  }

  fs.mkdirSync(appDir);

  const answers = await promptStructure();

  if (answers.structure === 'src') {
    fs.mkdirSync(path.join(appDir, 'src'));
    fs.writeFileSync(path.join(appDir, 'src', 'index.js'), '// Tu código aquí');
  } else if (answers.structure === 'app') {
    fs.mkdirSync(path.join(appDir, 'app'));
    fs.writeFileSync(path.join(appDir, 'app', 'index.js'), '// Tu código aquí');
  } else if (answers.structure === 'page') {
    fs.mkdirSync(path.join(appDir, 'pages'));
    fs.writeFileSync(path.join(appDir, 'pages', 'index.js'), '// Tu código aquí');
  }

  createPublicFiles(appDir);
  createReadme(appDir);

  const langAnswer = await promptLanguage();
  if (langAnswer.language === 'typescript') {
    try {
      execSync('npm init -y', { cwd: appDir, stdio: 'inherit' });
      console.log('Proyecto inicializado con npm.');

      execSync('npm install typescript --save-dev', { cwd: appDir, stdio: 'inherit' });
      console.log('TypeScript instalado.');
    } catch (error) {
      console.error('Error al configurar el proyecto:', error.message);
    }
  } else {
    try {
      execSync('npm init -y', { cwd: appDir, stdio: 'inherit' });
      console.log('Proyecto inicializado con npm.');
    } catch (error) {
      console.error('Error al ejecutar npm init:', error.message);
    }
  }

  try {
    execSync('git init', { cwd: appDir, stdio: 'inherit' });
    console.log('Repositorio Git inicializado.');
  } catch (error) {
    console.error('Error al inicializar Git:', error.message);
  }

  console.log(`Aplicación Pyrex creada en ${appDir}`);
}

module.exports = { createApp };
