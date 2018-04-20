# Nodejs创建HTTPS服务器


## 创建自己的CA机构

先安装openssl，(OpenSSL下载)](https://www.openssl.org/source/)

- 为CA生成私钥
```sh
openssl genrsa -out key.pem
```

- 通过CA私钥生成CSR
```sh
openssl req -new -key key.pem -out csr.pem
``

- 通过CSR文件和私钥生成CA证书
```sh
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```

- 删除csr.pem
```sh
rm csr.pem
```

之后会生产两个文件 **cert.pem** (the certificate) 和 **key.pem** (the private key).  这两个文件给你提供SSL连接。

## 创建https服务

```js
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

然后在浏览器中打开  https://localhost:8000 或者

```bash
curl -k https://localhost:8000
```




```js
const crypto = require('crypto'),
  fs = require("fs"),
  http = require("http");

var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

var credentials = crypto.createCredentials({key: privateKey, cert: certificate});

var handler = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
};

var server = http.createServer();
server.setSecure(credentials);
server.addListener("request", handler);
server.listen(8000);
```



参考：
- [用Node.js创建自签名的HTTPS服务器](https://cnodejs.org/topic/54745ac22804a0997d38b32d)
- [How to create an https server?](https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/)