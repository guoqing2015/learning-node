'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    port: 8000,
    host: 'localhost'
});

const handler = (request, h) => {
    return request.params;
}

server.route({
    method: 'GET',
    path: '/users/{userId?}',
    handler
});

server.route({
    method: 'GET',
    // path: '/files/{files*}', //  /files/a/b/c/d.png 可匹配
    // path: '/files/{files*2}', //  /files/a/b.png 可匹配
    path: '/files/{files}.jpg', //  /files/a.png 可匹配
    handler
});



const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();