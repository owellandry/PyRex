const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { createPublicFiles } = require('./fileManager');
const { createReadme } = require('./readme');

async function createApp(appName, promptStructure) {
  const appDir = path.join(process.cwd(), appName);
  if (fs.existsSync(appDir)) {
    console.error('El directorio ya existe.');
    process.exit(1);
  }

  // Crear el directorio principal
  fs.mkdirSync(appDir);

  // Preguntar al usuario sobre la estructura del proyecto
  const answers = await promptStructure();

  // Crear la estructura de carpetas según la elección del usuario
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

  // Crear archivos públicos y README
  createPublicFiles(appDir);
  createReadme(appDir);

  // Ejecutar npm init -y para crear package.json
  try {
    execSync('npm init -y', { cwd: appDir, stdio: 'inherit' });
    console.log('Proyecto inicializado con npm.');
  } catch (error) {
    console.error('Error al ejecutar npm init:', error.message);
  }

  // Instalar TypeScript
  try {
    execSync('npm install typescript --save-dev', { cwd: appDir, stdio: 'inherit' });
    console.log('TypeScript instalado.');
  } catch (error) {
    console.error('Error al instalar TypeScript:', error.message);
  }

  // Inicializar Git
  try {
    execSync('git init', { cwd: appDir, stdio: 'inherit' });
    console.log('Repositorio Git inicializado.');
  } catch (error) {
    console.error('Error al inicializar Git:', error.message);
  }

  console.log(`Aplicación Pyrex creada en ${appDir}`);
}

module.exports = { createApp };
