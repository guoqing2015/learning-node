const Koa = require('koa')
const app = new Koa()

const config = require('./config/config')

// koa2加载模板引擎
const views = require('koa-views')
// 美观的输出JSON response的Koa中间件
const json = require('koa-json')

//jsonwebtoken在服务端生成token返回给客户端
const jwt = require('koa-jwt')


const onerror = require('koa-onerror')

// 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const bodyparser = require('koa-bodyparser')

// Development style logger middleware for koa。
const logger = require('koa-logger')

// koa跨域
const cors = require('kcors')

// 操作mongodb数据库
const mongoose = require('mongoose')

const nunjucks = require('nunjucks')


/**
 * Connect to database
 */
mongoose.connect(config.mongodb)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('success, mongodb connected!')
})

// const index = require('./routes/index')
// const users = require('./routes/users')

// error handler
onerror(app)

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(cors())
app.use(json())
// 另一种是默认不进行美化，但是当地址栏传入pretty参数的时候，则返回的结果是进行了美化的。
// app.use(json({ pretty: false, param: 'pretty' }));

// app.use(jwt({secret: config.jwt_secret}).unless({path:[/^\/api\/login/, /^\/api\/register/]}))

// app.use(logger())



/**
 * koa-static: 用于koa的静态文件服务中间件
 * 它可以传入两个参数：
 * 一个是root，静态文件的根目录。即只有包含在此根目录以内的文件才会提供静态服务。
 * 另一个是option，其中包含如下配置项：
 * maxage :浏览器缓存的最大时间（max-age），单位是milliseconds（毫秒）。默认为0
 * hidden : 允许传送隐藏文件，默认为false
 * index : Default file name, defaults to ‘index.html’
 * defer :If true, serves after yield next, allowing any downstream middleware to respond first.
 * gzip :当client支持 gzip 而且被请求的文件也有一个以 .gz 为扩展名的文件的时候，自动以所请求文件对应的 .gz 文件进行返回。默认为true
 * extensions :Try to match extensions from passed array to search for file when no extension 是合格的 in URL. First found is served. (defaults to false)
 **/
app.use(require('koa-static')(__dirname + '/public'))



/**
 * extension，用于指明view文件的默认后缀名。
 * map，指明后缀名为某种类型的文件采用何种引擎进行处理。如上例中即指明后缀为.html的文件使用underscore引擎进行处理。
 * engineSource，指明后缀名为某类型的文件采用某engine source来进行处理，替换掉默认的engine source —— consolidate。上例中表示所有以.foo为后缀的文件会被返回’bar’。
 * options，这是传入helpers和partials的地方，这些options会被传入到view engine中。
 */
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

/**
 * autoescape (默认值: true) 控制输出是否被转义，查看 Autoescaping
 * throwOnUndefined (default: false) 当输出为 null 或 undefined 会抛出异常
 * trimBlocks (default: false) 自动去除 block/tag 后面的换行符
 * lstripBlocks (default: false) 自动去除 block/tag 签名的空格
 * watch (默认值: false) 当模板变化时重新加载。使用前请确保已安装可选依赖 chokidar。
 * noCache (default: false) 不使用缓存，每次都重新编译
 * web 浏览器模块的配置项
 * 	useCache (default: false) 是否使用缓存，否则会重新请求下载模板
 * 	async (default: false) 是否使用 ajax 异步下载模板
 * express 传入 express 实例初始化模板设置
 * tags: (默认值: see nunjucks syntax) 定义模板语法，查看 Customizing Syntax
 */

nunjucks.configure('views', {
  autoescape: true,
  // throwOnUndefined: !(NODE_ENV === 'production' || NODE_ENV === 'prod'),
  // throwOnUndefined: !(NODE_ENV === 'production' || NODE_ENV === 'prod'),
  throwOnUndefined: false,
  noCache: false
  // noCache: true
});

app.use(views(__dirname + '/views', {
  map: { // opts.map: Map a file extension to an engine
    html: 'nunjucks' //In this example, each file ending with .html will get rendered using the nunjucks templating engine.
  }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  // console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
require('./routes')(app)


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app