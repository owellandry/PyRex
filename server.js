const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const port = 3000;
const publicDir = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const contentType = mime.getType(filePath) || 'text/plain';
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
