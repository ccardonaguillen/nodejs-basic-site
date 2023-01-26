const http = require('http');
const fs = require('fs');

console.log('running');

const port = 8080;
const server = http.createServer(handleRequest);
server.listen(8080);

function handleRequest(request, response) {
    // Parse the GET request to get the target URL
    // Then load the corresponding page or redirect to 404 page
    switch (request.url) {
        case '/':
            loadPage(response, 'views/index.html');
        case '/about':
            loadPage(response, 'views/about.html');
        case '/contact':
            loadPage(response, 'views/contact.html');
        default:
            loadPage(response, 'views/404.html');
    }
}

function loadPage(response, path) {
    // Catch the response to load the HTML corresponding to each file URL
    fs.readFile(path, function (err, data) {
        if (err) throw err;
        // Return 200 (success) and the type of the response (HTML)
        response.writeHead(200, { 'Content-Type': 'text/html' });
        // Write content of html file in response
        response.write(data);
        return response.end;
    });
}
