//modules/readme.md

const fs = require('fs');
const path = require('path');

function createReadme(appDir) {
  const readmeContent = `
# Pyrex App

Este es un proyecto creado con Pyrex.

## Estructura del Proyecto

Elige una estructura para tu proyecto:

1. **src**: Carpeta para el código fuente.
2. **app**: Carpeta para la aplicación principal.
3. **page**: Carpeta para las páginas del proyecto.

Usa los siguientes comandos para iniciar tu aplicación:

\`\`\`
npm install
npm start
\`\`\`
  `;
  
  fs.writeFileSync(path.join(appDir, 'README.md'), readmeContent);
}

module.exports = { createReadme };
