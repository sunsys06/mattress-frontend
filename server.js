// Phusion Passenger startup file
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(PORT, '127.0.0.1', () => {
    console.log('Next.js ready on port ' + PORT);
  });
});
