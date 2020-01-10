var http = require("http");
var fs = require('fs');
var path = require('path');
var url = require('url');

function renderHtml(path, response) {
    fs.readFile(path, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found !');
        } else {
            response.write(data);
        }
        response.end();
    })
}

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'})

    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            renderHtml('./index.html', response)
            break;
        case '/login':
            renderHtml('./login.html', response)
            break;
        default:
            response.writeHeader(404);
            response.write('Route not defined');
            response.end()
            break;
    }
}

http.createServer(onRequest).listen(3000);