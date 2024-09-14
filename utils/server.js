const http = require('http');
const fs = require('fs');
const path = require('path');
const { logMessage } = require('./logMessage');
const colors = require('./colors');

function startServer(port, callback) {
    if (isNaN(port) || port < 0 || port > 65535) {
        logMessage('error', `Invalid port number: ${port}`);
        return;
    }

    const server = http.createServer((req, res) => {
        const filePath = path.join(__dirname, '../public', req.url === '/' ? 'index.html' : req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                logMessage('error', `Error: File not found - ${req.url}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
                logMessage('correcto', `Served: ${req.url}`);
            }
        });
    });

    server.listen(port, callback);
}

module.exports = { startServer };
