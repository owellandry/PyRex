// modules/server.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configura el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, '../pages/public')));

// Ruta principal
app.get('/', (req, res) => {
  res.send('<h1>Bienvenido a tu primer framework</h1>');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
