# body-parser中间件


## body-parser是什么?

功能： bodyParser中间件用来**解析http请求体**,使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，


## 基本使用

```
var express = require('express')
//获取模块
var bodyParser = require('body-parser')

var app = express()

// 创建 application/json 解析
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login 获取 URL编码的请求体
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

// POST /api/users 获取 JSON 编码的请求体
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
});
app.listen(3000);
```

**bodyParser.urlencoded 模块用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}。**

bodyParser.json(options): 解析json数据
bodyParser.urlencoded(options): 解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded
bodyParser.raw(options): 解析二进制格式(Buffer流数据)
bodyParser.text(options): 解析文本数据



常见的四种Content-Type类型：

- application/x-www-form-urlencoded 常见的form提交
- multipart/form-data 文件提交
- application/json 提交json格式的数据
- text/xml 提交xml格式的数据



