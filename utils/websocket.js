const WebSocket = require('ws');
const { logMessage } = require('./logMessage');
const colors = require('./colors');

function setupWebSocket() {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on('connection', (ws) => {
        logMessage('correcto', 'WebSocket connection established');
    });

    wss.on('error', (err) => {
        logMessage('error', `WebSocket error: ${err}`);
    });

    return wss; // Retorna el WebSocket Server
}

module.exports = { setupWebSocket };
