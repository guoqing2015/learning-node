var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('someEvent', function (arg1, arg2) {
	console.log('Listener', arg1, arg2);
});
emitter.emit('someEvent', 'marico', 1991)