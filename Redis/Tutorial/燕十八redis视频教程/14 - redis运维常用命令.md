# redis运维常用命令


## redis 服务器端命令
```
redis 127.0.0.1:6380> time  ,显示服务器时间 , 时间戳(秒), 微秒数
1) "1375270361"
2) "504511"

redis 127.0.0.1:6380> dbsize  // 当前数据库的key的数量
(integer) 2
redis 127.0.0.1:6380> select 2
OK
redis 127.0.0.1:6380[2]> dbsize
(integer) 0
redis 127.0.0.1:6380[2]> 
```

`BGREWRITEAOF` 后台进程重写AOF  
`BGSAVE`       后台保存rdb快照  
`SAVE`         保存rdb快照  
`LASTSAVE`     上次保存时间  

`Slaveof master-Host port`  , 把当前实例设为master的slave

`Flushall`  清空所有库所有键 
`Flushdb`  清空当前库所有键
`Showdown` [save/nosave]

注: 如果不小心运行了flushall, 立即 shutdown nosave ,关闭服务器
然后 手工编辑aof文件, 去掉文件中的 “flushall ”相关行, 然后开启服务器,就可以导入回原来数据.

如果,flushall之后,系统恰好bgrewriteaof了,那么aof就清空了,数据丢失.

Slowlog 显示慢查询
注:多慢才叫慢? 
答: 由slowlog-log-slower-than 10000 ,来指定,(单位是微秒)

服务器储存多少条慢查询的记录?
答: 由 slowlog-max-len 128 ,来做限制

Info [Replication/CPU/Memory..] 
查看redis服务器的信息

Config get 配置项  
Config set 配置项 值 (特殊的选项,不允许用此命令设置,如slave-of, 需要用单独的slaveof命令来设置)
Redis运维时需要注意的参数
1: 内存
# Memory
used_memory:859192 数据结构的空间
used_memory_rss:7634944 实占空间
mem_fragmentation_ratio:8.89 前2者的比例,1.N为佳,如果此值过大,说明redis的内存的碎片化严重,可以导出再导入一次.
2: 主从复制
# Replication
role:slave
master_host:192.168.1.128
master_port:6379
master_link_status:up

3:持久化
# Persistence
rdb_changes_since_last_save:0
rdb_last_save_time:1375224063

4: fork耗时
#Status
latest_fork_usec:936  上次导出rdb快照,持久化花费微秒
注意: 如果某实例有10G内容,导出需要2分钟,
每分钟写入10000次,导致不断的rdb导出,磁盘始处于高IO状态.


5: 慢日志
config get/set slowlog-log-slower-than
CONFIG get/SET slowlog-max-len 
slowlog get N 获取慢日志



运行时更改master-slave
修改一台slave(设为A)为new master 
命令该服务不做其他redis服务的slave 
   命令: slaveof no one 
修改其readonly为yes

其他的slave再指向new master A
命令该服务为new master A的slave
   命令格式 slaveof IP port