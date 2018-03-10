# Events模块

## EventEmitter

Event Emitter 是一个接口，可以在任何对象上部署。这个接口由events模块提供。

```
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
```

events模块的**EventEmitter**是一个构造函数，可以用来生成事件发生器的实例emitter。

- emitter.emit(name, data) 发出事件
- emitter.on(name, f) 对事件name指定监听函数f
- emitter.addListener(name, f) addListener是on方法的别名
- emitter.once(name, f) 与on方法类似，但是监听函数f是一次性的，使用后自动移除
- emitter.listeners(name) 返回一个数组，成员是事件name所有监听函数
- emitter.removeListener(name, f) 移除事件name的监听函数f
- emitter.removeAllListeners(name) 移除事件name的所有监听函数， 如果不带参数，则表示移除所有事件的所有回调函数。
- emitter.setMaxListeners(number) 用户指定多少个回调函数，Node默认允许同一个事件最多可以指定10个回调函数。

```
// on监听事件
emitter.on('someEvent',function(arg1,arg2){
	console.log('Listener2',arg1,arg2);
});

// emit发出事件
emitter.emit('someEvent','marico', 1991);
```


removeListener() 该方法用于移除回调函数。它接受两个参数，第一个是事件名称，第二个是回调函数名称。这就是说，不能用于移除匿名函数。

```
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

emitter.on('message', console.log);

setInterval(function(){
  emitter.emit('message', 'foo bar');
}, 300);

setTimeout(function(){
  emitter.removeListener('message', console.log);
}, 1000);
```

## Event Emitter 接口的部署

```
util.inherits(Radio, EventEmitter);
```

Radio是一个构造函数，它的实例继承了EventEmitter接口。


## 错误捕获

1. 使用**try...catch**

```
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.on('beep', function () {
  console.log('beep');
});

emitter.on('beep', function () {
  throw Error('oops!');
});

emitter.on('beep', function () {
  console.log('beep again');
});

console.log('before emit');

try {
  emitter.emit('beep');
} catch(err) {
  console.error('caught while emitting:', err.message);
}

console.log('after emit');
```

2. 使用**uncaughtException**

```
process.on('uncaughtException', function (err) {
  console.error('uncaught exception:', err.stack || err);
  // 关闭资源
  closeEverything(function(err) {
    if (err)
      console.error('Error while closing everything:', err.stack || err);
    // 退出进程
    process.exit(1);
  });
});
```

## newListener、removeListener事件类型

```
ee.on("newListener", function (evtName) {
  console.log("New Listener: " + evtName);
});

ee.on("removeListener", function (evtName) {
  console.log("Removed Listener: " + evtName);
});

function foo() {}

ee.on("save-user", foo);
ee.removeListener("save-user", foo);

// New Listener: removeListener
// New Listener: save-user
// Removed Listener: save-user
```
