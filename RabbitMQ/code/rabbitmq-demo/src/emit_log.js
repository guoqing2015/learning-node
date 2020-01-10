#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'logs';
        var msg = process.argv.slice(2).join(' ') || 'Hello World!';

        /**
         * 参数1: 交换机名称
         * 
         * 参数2: 交换机类型：
         *  fanout: 对应的tabbitmq的工作模式为publish/subscribe
         *  direct: 对应的Routing的工作模式
         *  topic: 对应的Topics工作模式
         *  headers: 对应的Headers工作模式
         */
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
