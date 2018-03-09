# Express 应用程序生成器


(1) 安装 express：

```$ npm install express-generator -g```


(2) 创建名为 **myapp** 的 Express 应用程序

``` express --view=pug myapp```

(3) 安装依赖项：

```$ cd myapp```
```$ npm install```

(4) 启动：

MacOS 或 Linux：
```$ DEBUG=myapp:* npm start``` 

Windows： ```set DEBUG=myapp:* & npm start```

然后在浏览器中输入 http://localhost:3000/ 以访问此应用程序。

