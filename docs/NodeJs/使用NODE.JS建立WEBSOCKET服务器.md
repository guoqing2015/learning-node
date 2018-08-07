# 使用NODE.JS建立WEBSOCKET服务器

不像 socket.io 模块， ws 是一个单纯的websocket模块，不提供向上兼容（也就是fallback），使用最新浏览器的原生Websocket API即可通信。



## 创建服务器

ws模块包含两部分，一部分是客户端，一部分是服务端。客户端用以连接其他的websocket服务器（实现服务器间的ws通信），服务器用于创建在指定端口监听的服务器。


接下来我们获取一个websocket服务器对象

```javascript
var  WebSocketServer = require('ws').Server;
```

然后创建出ws服务器

```javascript
var ws = new WebSocketServer({
    port: 80,//监听的端口
    verifyClient: socketverify //(可选)用于验证连接的函数
});
```

这样一个服务器就创建好了，接着定义 ``socketverify`` 函数以验证连接是否符合要求，如果创建服务器时没有设置 ``verifyClient`` ，那么有连接上门的时候服务器就不会直接进行验证，所以推荐定义这一项。

```javascript
function socketverify(info) {
    //做一些事情来验证连接合法性，如果允许连接则return true，否则return false，如下例子
    var origin=info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);
    if (origin.length>=3 && origin[2]=="blog.luojia.me") {
        return true;//如果是来自blog.luojia.me的连接，就接受
    }
    return true;//否则拒绝
 
    //传入的info参数会包括这个连接的很多信息，你可以在此处使用console.log(info)来查看和选择如何验证连接
}
```

实际上除了以上两个选项，还有好多可选项，具体定义在此：[https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocketserver](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocketserver)，以下稍作说明。


- host:指定这个服务器的地址/域名，不指定则将接受所有接收到的发向任何域的请求
- server:由于websocket建立在http协议上，所以连接websocket必须要有一个http服务器(使用http模块建立的服务器)，如果不指定使用的http server，那么ws将会自动创建一个http server
- backlog:设置队列中最多可以有多少等待的连接
- handleProtocols:设置可以用来处理ws子协议的函数，具体见这里
- path:接收到的连接的url为这个path的时候才会处理这个连接
- noServer:不创建http服务器
- clientTracking:设置是否持续跟踪这个连接
- perMessageDeflate:是否开启deflate压缩。默认为false，要开启的话需要传入一个具有对应参数的对象，详见server文档下面的perMessageDeflate说明
- maxPayload:最大允许的消息数据字节数。

## 处理连接

```javascript
ws.on('connection', function(wsocket) {
    wsocket.on('message',message);
    wsocket.on('close',close);
    wsocket.on('error',error);
    wsocket.on('open',open);
});
 
function open(){
    //此链接开启后做些什么
    // console.log('open');
}

function message(msg){
    //对接收到的消息做些什么
    // console.log('message', msg);
}
function error(err){
    //处理错误
}
function close(){
    //连接关闭时做些什么
}
```





