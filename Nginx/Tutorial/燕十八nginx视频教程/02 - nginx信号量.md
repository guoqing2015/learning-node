# nginx信号量

查看nginx运行信息
`ps aux|grep nginx`

```
[root@iZbp10a8w2ct7tn3349wl9Z nginx]# ps aux|grep nginx
root      4550  0.0  0.0 112724   996 pts/1    S+   10:20   0:00 grep --color=auto nginx
root     10693  0.0  0.0  21340  1636 ?        Ss    2019   0:00 nginx: master process ./nginx
nobody   16334  0.0  0.0  21340  1884 ?        S     2019   0:06 nginx: worker process
```

```
kill -INT 4550
```






Nginx的信号控制
```
+--------------------------+--------------------------------------------------------+
| name                    | Value                                                   |
+--------------------------·+--------------------------------------------------------+
| TERM, INT     | Quick shutdown 快速关闭                                                |
| QUIT          | Graceful shutdown  优雅的关闭进程,即等请求结束后再关闭                         |
| HUP           | Configuration reload ,Start the new worker processes with  a new configuration Gracefully shutdown the old worker processes 改变配置文件,平滑的重读配置文    件                                                    |
| USR1         | Reopen the log files 重读日志,在日志按月/日分割时有用                           |
| USR2         | Upgrade Executable on the fly 平滑的升级                                     |
| WINCH        | Gracefully shutdown the worker processes 优雅关闭旧的进程(配合USR2来进行升级)    
+--------------------------+--------------------------------------------------------+
```



具体语法:
`kill -信号选项 nginx的主进程号`
`kill -HUP 4873`

kill -信号控制 `cat /xxx/path/log/nginx.pid`

Kil; -USR1 `cat /xxx/path/log/nginx.pid`


