# 频道发布和消息订阅

使用办法:  
订阅端: `subscribe 频道名称`  
发布端: `publish 频道名称 发布内容`  


客户端例子:  
```
redis 127.0.0.1:6379> subscribe news
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "news"
3) (integer) 1
1) "message"
2) "news"
3) "good good study"
1) "message"
2) "news"
3) "day day up"
```

服务端例子:
```
redis 127.0.0.1:6379> publish news 'good good study'
(integer) 1
redis 127.0.0.1:6379> publish news 'day day up'
(integer) 1
```


Redis 的发布与订阅实现支持模式匹配（pattern matching）： 客户端可以订阅一个带 * 号的模式， 如果某个/某些频道的名字和这个模式匹配， 那么当有信息发送给这个/这些频道的时候， 客户端也会收到这个/这些频道的信息。

```
redis> PSUBSCRIBE news.*
```