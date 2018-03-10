# Http模块

## http.STATUS_CODES

http.STATUS_CODES是一个对象，属性名都是状态码，属性值则是该状态码的简短解释。

```
require('http').STATUS_CODES['301']
```

## http服务端

### 处理GET请求

ceateServer方法接受一个函数作为参数，该函数的request参数是一个对象，表示客户端的HTTP请求；response参数也是一个对象，表示服务器端的HTTP回应。

response.writeHead方法用来写入HTTP回应的头信息；

response.end方法用来写入HTTP回应的具体内容，以及回应完成后关闭本次对话。最后的listen(8080)表示启动服务器实例，监听本机的8080端口。

```
var http = require('http');

// 创造一个服务器实例
http.createServer(function (request, response){
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Hello World");
  response.end();
}).listen(8080, '127.0.0.1');

console.log('Server running on port 8080.');
```
[查看代码1](https://github.com/guoqing2013/learning-nodejs/blob/master/code/05%20-%20http%E6%9C%8D%E5%8A%A1%E7%AB%AF/get.js)

[查看代码]("../code/05 - http服务端/get.js")


#### request 对象

createServer方法的回调函数的第一个参数是一个request对象，拥有以下属性。

- url：发出请求的网址。
- method：HTTP请求的方法。
- headers：HTTP请求的所有HTTP头信息。

方法：
- setEncoding()方法用于设置请求的编码。
- addListener()方法用于为请求添加监听事件的回调函数。



### 处理POST请求

当客户端采用POST方法发送数据时，服务器端可以对data和end两个事件，设立监听函数。

```
var http = require('http');

http.createServer(function (req, res) {
  var content = "";

  req.on('data', function (chunk) {
    content += chunk;
  });

  req.on('end', function () {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("You've sent: " + content);
    res.end();
  });

}).listen(8080);
```

data事件会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数。end事件则是在所有数据接收完成后触发。

[查看代码](../code/05 - http服务端/post.js)


## http客户端

### get()

```
var request = http.get({
    host: 'localhost',
    path: '/user?name=marico&age=21',
    port: 3000
}, function (response) {
    response.setEncoding('utf-8');
    var body = '';
    response.on('data', function (data) {
        body += d;
    });
    response.on('end', function() {
      var parsed = JSON.parse(body);
    });
});
```

[查看代码](../code/06 - http客户端/clientGet.js)

### request()

```
http.request(options[, callback])
```

request方法的options参数，可以是一个对象，也可以是一个字符串。如果是字符串，就表示这是一个URL，Node内部就会自动调用**url.parse()**，处理这个参数。

- host：HTTP请求所发往的域名或者IP地址，默认是localhost。
- hostname：该属性会被url.parse()解析，优先级高于host。
- port：远程服务器的端口，默认是80。
- localAddress：本地网络接口。
- socketPath：Unix网络套接字，格式为host:port或者socketPath。
- method：指定HTTP请求的方法，格式为字符串，默认为GET。
- path：指定HTTP请求的路径，默认为根路径（/）。可以在这个属性里面，指定查询字符串，比如/index.html?page=12。如果这个属性里面包含非法字符（比如空格），就会抛出一个错误。
- headers：一个对象，包含了HTTP请求的头信息。
- auth：一个代表HTTP基本认证的字符串user:password。
- agent：控制缓存行为，如果HTTP请求使用了agent，则HTTP请求默认为Connection: keep-alive，它的可能值如下：
- undefined（默认）：对当前host和port，使用全局Agent。
- Agent：一个对象，会传入agent属性。
- false：不缓存连接，默认HTTP请求为Connection: close。
- keepAlive：一个布尔值，表示是否保留socket供未来其他请求使用，默认等于false。
- keepAliveMsecs：一个整数，当使用KeepAlive的时候，设置多久发送一个TCP KeepAlive包，使得连接不要被关闭。默认等于1000，只有keepAlive设为true的时候，该设置才有意义。


http.request()返回一个**http.ClientRequest**类的实例。它是一个可写数据流，如果你想通过POST方法发送一个文件，可以将文件写入这个ClientRequest对象。

[查看代码](../code/06 - http客户端/clientRequest.js)

## Server()

Server方法用于新建一个服务器实例。

```
var http = require('http');
var server = new http.Server();
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>we are pcat</h1>'); //指定HTTP回应的内容。
    res.end("<p>I'm marico.</p>"); //发送HTTP回应。
});
server.listen(3000);
```

listen方法用于启动服务器，它可以接受多种参数。

```
var server = new http.Server();

// 端口
server.listen(8000);

// 端口，主机
server.listen(8000, 'localhost');

// 对象
server.listen({
  port: 8000,
  host: 'localhost',
})
```

## 搭建HTTPs服务器

搭建HTTPs服务器需要有SSL证书。对于向公众提供服务的网站，SSL证书需要向证书颁发机构购买；对于自用的网站，可以自制。

自制SSL证书需要OpenSSL，具体命令如下。

```
$ openssl genrsa -out key.pem
$ openssl req -new -key key.pem -out csr.pem
$ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
$ rm csr.pem
```

上面的命令生成两个文件：ert.pem（证书文件）和 key.pem（私钥文件）。有了这两个文件，就可以运行HTTPs服务器了。


Node内置Https支持。

```
var server = https.createServer({
  key: privateKey,
  cert: certificate,
  ca: certificateAuthorityCertificate
}, app);
```

Node.js提供一个https模块，专门用于处理加密访问。

```
var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);
```

上面代码显示，HTTPs服务器与HTTP服务器的最大区别，就是createServer方法多了一个options参数。运行以后，就可以测试是否能够正常访问。

```
curl -k https://localhost:8000
```






























































