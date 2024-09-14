const chokidar = require('chokidar');
const { logMessage } = require('./logMessage');
const colors = require('./colors');

function watchFiles(wss) {
    const watcher = chokidar.watch('./public', { persistent: true });

    watcher.on('change', (path) => {
        logMessage('correcto', `public/${path} has changed, notifying clients...`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('File changed: ' + path);
            }
        });
    });
}

module.exports = { watchFiles };
