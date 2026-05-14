const { createServer } = require('node:http');
const path = require('node:path');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 8080;


const server = createServer((req, res) => {
    
    if (req.url == "/") {
        page = fs.readFileSync('index.html', 'utf8');
        res.statusCode = 200;
    } else if (req.url == '/contact') {
        page = fs.readFileSync('contact.html', 'utf8')
        res.statusCode = 200;
    } else if (req.url == '/about'){
        page = fs.readFileSync('about.html','utf8')
        res.statusCode = 200;
    } else {
        page = fs.readFileSync('404.html','utf8')
        res.statusCode = 404;
    }

    res.setHeader('Content-Type', 'html')
    res.end(page)
})

server.listen(port, hostname, () => {
    console.log('server running')
})
