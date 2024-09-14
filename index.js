#!/usr/bin/env node

const colors = require('./utils/colors');
const { startServer } = require('./utils/server'); // Corregido
const { setupWebSocket } = require('./utils/websocket'); // Corregido
const { watchFiles } = require('./utils/watcher'); // Corregido
const { setupSignalHandlers } = require('./utils/signals'); // Corregido
const getIpAddress = require('./utils/getIpAddress');
const logMessage = require('./utils/logMessage');

let port = 6500;
const args = process.argv.slice(2);
if (args.includes('-p')) {
    const index = args.indexOf('-p');
    if (index > -1 && args[index + 1]) {
        port = parseInt(args[index + 1], 10);
    }
}

startServer(port, () => {
    const ipAddress = getIpAddress();
    logMessage('correcto', `Server started on:\n    - http://localhost:${port}\n    - http://${ipAddress}:${port}`);
});

const wss = setupWebSocket(); // Corregido
watchFiles(wss); // Corregido

setupSignalHandlers();
