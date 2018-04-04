'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    port: 8000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return 'Hello, world!';
    }
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();

// server.start((err) => {

//     if (err) {
//         throw err;
//     }
//     console.log(`Server running at: ${server.info.uri}`);
// });