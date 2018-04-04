'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    port: 8000,
    host: 'localhost'
});

let goodOptions = {
    reporters: {
        myConsoleReporter: [{
            // module: require('good-console'),
            module: 'good-console',
        }, 'stdout']
    }
}


const init = async () => {

    await server.register({
        plugin: require('good'),
        options: goodOptions
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            // return h.file('./public/hello.html');
            server.log('error', 'Oh no!')
            server.log('info', 'replying')
            return 'Hello, world!';
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init()


// server.register({
//     plugin: require('good'),
//     options: goodOptions
// }, err => {

//     server.route({
//         method: 'GET',
//         path: '/',
//         handler: function (request, h) {
//             server.log('error', 'Oh no!')
//             server.log('info', 'replying')
//             return 'Hello, world!';
//         }
//     });

//     server.start((err) => {
//         console.log(server.info)
//         console.log(`Server running at: ${server.info.uri}`);
//     });
// })