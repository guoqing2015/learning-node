# mysql的内存优化

## myisam内存优化

myisam存储引擎使用key_buffter缓存索引快，加速myisam索引的读写速度。对于myisam表数据块，mysql没有特别的缓存机制，完全依赖于操作系统的IO缓存。

**1. key_buffer_size**

key_buffer_size决定myisam索引块缓存区的大小。直接影响myisam表的存取效率。对于一般myisam数据库，建议将1/4可用内存分配给key_buffer_size:

```
key_buffter_size=2G
```

**2. read_buffer_size**

如果需要经常顺序扫描myisam表，可以通过增大read_buffer_size的值来改善性能。但需要注意的是read_buffer_size是每个session独占的，如果默认值设置太大，就会造成内存浪费。

**3. read_rnd_buffer_size**

对于需要做排序的myisam表查询，如带有order by的sql，适当增加read_rnd_buffer_size的值，可以改善此类sql的性能。但需要注意的是，read_rnd_buffer_size是每个session独占的，如果默认值设置太大，就会造成内存浪费。


## innodb内存优化

innodb用一块内存区做IO缓存池，该缓存池不仅用来缓存innodb的索引块，而且也用来缓存innodb的缓存块。


**1. innodb_buffer_pool_size**

该变量决定了innodb存储引擎表数据和索引数据的最大缓存区大小。

**2. innodb_log_buffer_size**
决定了innodb重做日志缓存的大小，对于可能产生大量更新记录的大事务，增加innodb_log_buffer_size的大小，可以避免innodb在事务提交前就执行不必要的日志写入磁盘操作。


## 调整mysql并发相关的参数

1. 调整`max_connections`，提高并发连接

2. 调整`thread_cache_size`，加快连接数据库的速度，mysql会缓存一定数量的客户服务线程以备重用，通过参数thread_cache_size可控制mysql缓存客户服务线程的数量。

3. `innodb_lock_wait_timeout`，控制innodb事务等待行锁的时间，对于快速处理的sql语句，可以将行锁的等待超时时间调小，以避免事务长时间挂起，对于后台运行的批处理操作，可以将行锁等待超时时间调大，以避免发生大的回滚操作。