const { tokenize } = require('../parser/tokenizer');
const { parse } = require('../parser/parser');
const { transform } = require('../transformer/transformer');
const fs = require('fs');
const path = require('path');

// Función para compilar archivos .pyx
function compilePyxFile(filePath) {
    // Leer el archivo .pyx
    const code = fs.readFileSync(filePath, 'utf8');

    // 1. Tokenizar el código
    const tokens = tokenize(code);
    console.log('Tokens:', tokens);

    // 2. Parsear los tokens a un AST
    const ast = parse(tokens);
    console.log('AST:', JSON.stringify(ast, null, 2));

    // 3. Transformar el AST en JavaScript
    const output = transform(ast);
    console.log('Generated JavaScript:', output);

    return output;
}

// Función para guardar el archivo generado
function saveCompiledOutput(output, outFilePath) {
    fs.writeFileSync(outFilePath, output);
    console.log(`Compiled output saved to ${outFilePath}`);
}

// Compilar archivo .pyx
function compile(filePath) {
    const output = compilePyxFile(filePath);

    // Guardar la salida compilada
    const outputFilePath = filePath.replace('.pyx', '.js');
    saveCompiledOutput(output, outputFilePath);
}

module.exports = { compile };
