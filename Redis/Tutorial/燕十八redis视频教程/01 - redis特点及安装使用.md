# redis特点及安装使用


## Redis基础知识

高性能键值对（key-value）数据库。它通过提供多种键值数据类型来适应不同场景下的存储需求，目前为止redis支持的键值数据类型如下
字符串、列表（lists）、集合（sets）、有序集合（sorts sets）、哈希表（hashs

## Redis的应用场景

 1. 缓存（数据查询、短连接、新闻内容、商品内容等等）。（最多使用）
 2. 分布式集群架构中的session分离。
 3. 聊天室的在线好友列表。
 4. 任务队列。（秒杀、抢购、12306等等）
 5. 应用排行榜。
 6. 网站访问统计。
 7. 数据过期处理（可以精确到毫秒）



## Redis下载安装

1. 官方站点: redis.io 下载最新版或者最新stable版

`wget http://download.redis.io/releases/redis-3.0.0.tar.gz`

2. 解压源码并进入目录

`tar -zxvf redis-3.0.0.tar.gz`

3. 直接`make` 或 安装到指定的目录,比如 /usr/local/redis目录

`make  PREFIX=/usr/local/redis install`

此时在 usr/local/redis/bin 目录下，有以下：

`redis-benchmark` redis性能测试工具

`redis-check-aof` AOF文件修复工具

`redis-check-rdb` RDB文件修复工具

`redis-cli` redis命令行客户端

`redis-sentinal` redis集群管理工具

`redis-server` redis服务进程

4. 可选步骤: `make test`  测试编译情况

(可能出现: You need tcl 8.5 or newer in order to run the Redis test 这种情况, `yum install tcl`)

5. 复制配置文件

`cp /path/redis.conf usr/local/redis`

6. 后端模式启动

修改redis.conf配置文件， daemonize yes 以后端模式启动

`vim /usr/local/redis/bin/redis.conf`

`daemonize yes`

7. 启动redis

`cd /usr/local/redis`

`./bin/redis-server ./redis.conf`

8. 连接redis

`/usr/local/redis/bin/redis-cli`

9. 关闭redis

`cd /usr/local/redis`

`./bin/redis-cli shutdown`

10. 强行终止redis

`pkill redis-server`

11. 让redis开机自启

`vim /etc/rc.local`

//添加

`/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis-conf`