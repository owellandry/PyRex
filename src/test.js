const { compile } = require('./compiler/pyxCompiler');

// Ruta del archivo .pyx a compilar
const filePath = './example.pyx';

// Compilar archivo .pyx
compile(filePath);
