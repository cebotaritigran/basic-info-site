// const { createServer } = require('node:http');
// const path = require('node:path');
// const fs = require('fs');
// const hostname = '127.0.0.1';
// const port = 8080;


// const server = createServer((req, res) => {

//     if (req.url == "/") {
//         page = fs.readFileSync('index.html', 'utf8');
//         res.statusCode = 200;
//     } else if (req.url == '/contact') {
//         page = fs.readFileSync('contact.html', 'utf8')
//         res.statusCode = 200;
//     } else if (req.url == '/about'){
//         page = fs.readFileSync('about.html','utf8')
//         res.statusCode = 200;
//     } else {
//         page = fs.readFileSync('404.html','utf8')
//         res.statusCode = 404;
//     }

//     res.setHeader('Content-Type', 'html')
//     res.end(page)
// })

// server.listen(port, hostname, () => {
//     console.log('server running')
// })

const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '127.0.0.1';
const port = 8080;

const routes = {
    '/': 'index.html',
    '/contact': 'contact.html',
    '/about': 'about.html'
};

const server = createServer((req, res) => {

    // Choose file based on route
    // if req.url exists use it if not use the error page
    const fileName = routes[req.url] || '404.html';

    // Set status code
    // if req.url exists status is OK (200) if not, not found (404)
    res.statusCode = routes[req.url] ? 200 : 404;

    // Build full file path
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Internal Server Error');
        }

        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
