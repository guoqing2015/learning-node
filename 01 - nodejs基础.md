# nodejs基础

## Node.js命令行工具

```node  -v```  

```node -e "console.log('hello world')"; ```
    
```node``` 直接进入编译模式
       

## 建立HTTP服务器



```        
var http=require('http')
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>PCAT</p>');
}).listen(3000);
console.log('HTTP server is listening at port 3000.');
```

启动： ```node  app.js```

打开浏览器访问  http://localhost:3000即可。这样就部署了一个web。比如tomcat、resin更加方便


## 使用supervisor调试代码

 安装supervisor 来控制调试代码。 不需要每次停止重启node.js的服务
使用supervisor app.js启动

```npm install supervisor -g```

 