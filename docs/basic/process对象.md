# process对象

process对象是 Node 的一个全局对象，提供当前 Node 进程的信息。它可以在脚本的任意位置使用，不必通过require命令加载。该对象部署了EventEmitter接口。

## 属性

- process.argv: 返回一个数组，成员是当前进程的所有命令行参数。由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
- process.execPath: 返回执行当前脚本的Node二进制文件的绝对路径。
- process.execArgv: 返回一个数组，成员是命令行下执行脚本时，在 Node 可执行文件与脚本文件之间的命令行参数。

- process.env：返回一个对象，成员为当前Shell的环境变量。

比如，process.env.HOME返回用户的主目录。

通常的做法是，新建一个环境变量NODE_ENV，用它确定当前所处的开发阶段，生产阶段设为production，开发阶段设为develop或staging，然后在脚本中读取process.env.NODE_ENV即可。

运行脚本时，改变环境变量，可以采用下面的写法。
```
$ export NODE_ENV=production && node app.js
# 或者
$ NODE_ENV=production node app.js
```



- process.installPrefix：返回一个字符串，表示 Node 安装路径的前缀，比如/usr/local。相应地，Node 的执行文件目录为/usr/local/bin/node。
- process.pid：返回一个数字，表示当前进程的进程号。
- process.platform：返回一个字符串，表示当前的操作系统，比如Linux。
- process.title：返回一个字符串，默认值为node，可以自定义该值。
- process.version：返回一个字符串，表示当前使用的 Node 版本，比如v7.10.0。

- process.stdout: 返回一个对象，表示标准输出。该对象的write方法等同于console.log，可用在标准输出向用户显示内容。
- process.stdin: 返回一个对象，表示标准输入。
- process.stderr: 属性指向标准错误。


## 方法

- process.chdir()：切换工作目录到指定目录。
- process.cwd()：返回运行当前脚本的工作目录的路径。
    
    注意，process.cwd()与__dirname的区别。前者进程发起时的位置，后者是脚本的位置，两者可能是不一致的。比如，node ./code/program.js，对于process.cwd()来说，返回的是当前目录（.）；对于__dirname来说，返回是脚本所在目录，即./code/program.js。

- process.exit()：退出当前进程。
- process.getgid()：返回当前进程的组ID（数值）。
- process.getuid()：返回当前进程的用户ID（数值）。
- process.nextTick()：指定回调函数在当前执行栈的尾部、下一次Event Loop之前执行。
- process.on()：监听事件。
- process.setgid()：指定当前进程的组，可以使用数字ID，也可以使用字符串ID。
- process.setuid()：指定当前进程的用户，可以使用数字ID，也可以使用字符串ID。



## 事件

- exit事件
```
process.on('exit', function () {
  fs.writeFileSync('/tmp/myfile', '需要保存到硬盘的信息');
});
```

- beforeExit事件
- uncaughtException事件: 当前进程抛出一个没有被捕捉的错误时，会触发uncaughtException事件。
- 信号事件

操作系统内核向Node进程发出信号，会触发信号事件。实际开发中，主要对SIGTERM和SIGINT信号部署监听函数，这两个信号在非Windows平台会导致进程退出，但是只要部署了监听函数，Node进程收到信号后就不会退出。

```
// 读取标准输入，这主要是为了不让当前进程退出
process.stdin.resume();

process.on('SIGINT', function() {
  console.log('SIGINT信号，按Control-D退出');
});
```


## 进程的退出码

进程退出时，会返回一个整数值，表示退出时的状态。这个整数值就叫做退出码。下面是常见的Node进程退出码。

- 0，正常退出
- 1，发生未捕获错误
- 5，V8执行错误
- 8，不正确的参数
- 128 + 信号值，如果Node接受到退出信号（比如SIGKILL或SIGHUP），它的退出码就是128加上信号值。由于128的二进制形式是10000000, 所以退出码的后七位就是信号值。