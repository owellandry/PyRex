const readline = require('readline');
const logMessage = require('./logMessage');
const colors = require('./colors');

function setupSignalHandlers() {
    process.on('SIGINT', () => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`${colors.fgYellow}¿Está seguro de que desea detener el servidor? (s/n)${colors.reset} `, (answer) => {
            if (answer.toLowerCase() === 's') {
                logMessage('correcto', 'Servidor detenido correctamente.');
                rl.close();
                process.exit(0);
            } else {
                logMessage('correcto', 'Detención cancelada.');
                rl.close();
            }
        });
    });
}

module.exports = { setupSignalHandlers };
