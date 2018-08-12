var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var hello = require('./routes/hello');

var app = express();

/**
 * set方法用于指定变量的值。
 */
// view engine setup
// 设定views变量，意为视图存放的目录
// app.set('views', __dirname +  '/views');
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'pug');
// app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 *use是express注册中间件的方法，它返回一个函数。
 **/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
// 模板文件默认存放在views子目录。这时，如果要在网页中加载静态文件（比如样式表、图片等），就需要另外指定一个存放静态文件的目录。
app.use(express.static(path.join(__dirname, 'public')));


/**
 var app = express();

 app.use(function(request, response, next) {
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!\n");
  } else {
    next();
  }
});

 app.use(function(request, response, next) {
  if (request.url == "/about") {
    response.writeHead(200, { "Content-Type": "text/plain" });
  } else {
    next();
  }
});

 app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});
 */

/**
 除了在回调函数内部判断请求的网址，use方法也允许将请求网址写在第一个参数。这代表，只有请求路径匹配这个参数，后面的中间件才会生效。无疑，这样写更加清晰和方便。

 app.use('/path', someMiddleware);


 var app = express();

 app.use("/home", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the homepage!\n");
});

 app.use("/about", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Welcome to the about page!\n");
});

 app.use(function(request, response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 error!\n");
});
 */

/**
 针对不同的请求，Express提供了use方法的一些别名。比如，上面代码也可以用别名的形式来写。

 get方法的第一个参数是访问路径，正斜杠（/）就代表根路径；第二个参数是回调函数，它的req参数表示客户端发来的HTTP请求，res参数代表发向客户端的HTTP回应
 ，这两个参数都是对象。在回调函数内部， 使用HTTP回应的send方法，表示向浏览器发送一个字符串。然后，运行下面的命令。

 app.all("*", function(request, response, next) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

 app.get("/", function(request, response) {
  response.end("Welcome to the homepage!");
});

 app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});

 app.get("*", function(request, response) {
  response.end("404!");
});

 上面代码的all方法表示，所有请求都必须通过该中间件，参数中的“*”表示对所有路径有效。
 get方法则是只有GET动词的HTTP请求通过该中间件，它的第一个参数是请求的路径。
 由于get方法的回调函数没有调用next方法，所以只要有一个中间件被调用了，
 后面的中间件就不会再被调用了。

 */

app.use('/', index);
app.use('/users', users);
app.use('/hello/:who', hello);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});






// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
