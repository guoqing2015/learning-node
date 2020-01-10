var express = require('express');
var router = express.Router();
/**
 * 首先，Express.Router是一个构造函数，调用后返回一个路由器实例。然后，使用该实例的HTTP动词方法，为不同的访问路径，指定回调函数；最后，挂载到某个路径。
 */


/* GET hello page. */
router.get('/', function(req, res, next) {
    /**
     request.ip属性用于获得HTTP请求的IP地址。
     request.files用于获取上传的文件。
     */

    /**
     response.render方法用于渲染网页模板。
     response.sendFile方法用于发送文件。
     response.redirect方法允许网址的重定向。
     */


  res.render('hello', { username: 12312312 });
    // res.redirect("http://www.baidu.com");
});


// router实例对象的route方法，可以接受访问路径作为参数。

/**
 var router = express.Router();

 router.route('/api')
 .post(function(req, res) {
		// ...
	})
 .get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err) res.send(err);
			res.json(bears);
		});
	});

 app.use('/', router);
 */



// router对象的param方法用于路径参数的处理，可以


/**


 router.param('name', function(req, res, next, name) {
	// 对name进行验证或其他处理……
	console.log(name);
	req.name = name;
	next();
});

 router.get('/hello/:name', function(req, res) {
	res.send('hello ' + req.name + '!');
});
 */
module.exports = router;
