# nginx信号量


## 信号量
查看nginx运行信息
`ps aux|grep nginx`

```
[root@iZbp10a8w2ct7tn3349wl9Z nginx]# ps aux|grep nginx
root      4550  0.0  0.0 112724   996 pts/1    S+   10:20   0:00 grep --color=auto nginx
root     10693  0.0  0.0  21340  1636 ?        Ss    2019   0:00 nginx: master process ./nginx
nobody   16334  0.0  0.0  21340  1884 ?        S     2019   0:06 nginx: worker process
```

```
kill -INT 10693
```



Nginx的信号控制
```
+--------------------------+--------------------------------------------------------+
| name                     | Value                                                   |
+--------------------------·+--------------------------------------------------------+
| TERM, INT     | Quick shutdown 快速关闭                                              |
| QUIT          | Graceful shutdown  优雅的关闭进程,即等请求结束后再关闭                    |
| HUP           | Configuration reload ,Start the new worker processes with  a new configuration Gracefully shutdown the old worker processes 改变配置文件,平滑的重读配置文件                                           |
| USR1         | Reopen the log files 重读日志,在日志按月/日分割时有用                     |
| USR2         | Upgrade Executable on the fly 平滑的升级nginx                          |
| WINCH        | Gracefully shutdown the worker processes 优雅关闭旧的进程(配合USR2来进行升级) |   
+--------------------------+--------------------------------------------------------+
```




具体语法:
`kill -信号选项 nginx的主进程号`
`kill -HUP 10693`


查看pid， 即主进程号：
```
cat  /usr/local/nginx
cat  ./logs/nginx.pid  
```
返回：10693



kill -信号控制 `cat /xxx/path/logs/nginx.pid`

Kil; -USR1 `cat /xxx/path/logs/nginx.pid`




## 启动、停止nginx
```
cd /usr/local/nginx/sbin/
./nginx 
./nginx -s stop
./nginx -s quit
./nginx -s reload
```

./nginx -s quit:此方式停止步骤是待nginx进程处理任务完毕进行停止。  
./nginx -s stop:此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。

查询nginx进程：
`ps aux|grep nginx`

## 重启 nginx

1.先停止再启动（推荐）：  
对 nginx 进行重启相当于先停止再启动，即先执行停止命令再执行启动命令。如下：
```
./nginx -s quit
./nginx
```

2.重新加载配置文件：  
当 ngin x的配置文件 nginx.conf 修改后，要想让配置生效需要重启 nginx，使用-s reload不用先停止 ngin x再启动 nginx 即可将配置信息在 nginx 中生效，如下：
`./nginx -s reload`

## 检查配置文件

判断配置文件是否正确
```
cd /usr/local/nginx/sbin/
./nginx -t
```