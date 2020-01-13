# redis快照持久化

## Redis持久化配置

Redis的持久化有2种方式  
1. 快照
2. 日志



### Rdb工作原理

每隔N分钟或n次写操作后，从内存dump数据形成rdb文件，压缩，再放入备份目录中

优势：再redis启动后，会快速将rdb缓存导入到redis中，速度快  
缺点：因为是每隔几分钟或每隔n次操作才会缓存一次，所以会出现缓存丢失的情况


### Rdb快照的配置选项

在**redis.conf**配置中

```
save 900 1      # 刷新快照到硬盘中，必须满足两者要求才会触发，即900s之至少有1个关键字发生变化, 则产生快照 
save 300 10     # 必须300秒之后有10个关键字发生变化, 则产生快照
save 60 10000   # 必须是60秒之后有10000个关键字发生变化, 则产生快照
# (这3个选项都屏蔽,则rdb禁用)

stop-writes-on-bgsave-error yes  # 后台备份进程(子进程)出错时, 主进程停止写入redis
rdbcompression yes    # 导出的rdb文件是否压缩
rdbchecksum   yes     #  导入rbd恢复时数据时,要不要检验rdb的完整性
dbfilename dump.rdb   # 导出来的rdb文件名
dir ./  # rdb文件的放置路径
```

