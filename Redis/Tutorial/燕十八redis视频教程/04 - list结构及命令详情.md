# list结构及命令详情


1. `lpush key value`

作用: 把值插入到链接头部

2. `rpush`

作用: 把值插入到链接尾部

3. `rpop key`

作用: 返回并删除链表尾元素

4. `lpop`

5. `lrange key start stop`

作用: 返回链表中[start ,stop]中的元素  
规律: 左数从0开始,右数从-1开始


6. `lrem key count value`

作用: 从key链表中删除 value值  
注: 删除count的绝对值个value后结束  
Count>0 从表头删除  
Count<0 从表尾删除  

7. `ltrim key start stop`

作用: 剪切key对应的链接,切[start,stop]一段,并把该段重新赋给key

8. `lindex key index`

作用: 返回index索引上的值,
如  lindex key 2

9. `llen key`

作用:计算链接表的元素个数
```
redis 127.0.0.1:6379> llen task
(integer) 3
redis 127.0.0.1:6379> 
```

10. `linsert key after|before search value`
作用: 在key链表中寻找’search’,并在search值之前|之后,.插入value
注: 一旦找到一个search后,命令就结束了,因此不会插入多个value


11. `rpoplpush source dest`
作用: 把source的尾部拿出,放在dest的头部,并返回 该单元值

```
127.0.0.1:0>rpush task a b c d
"4"
127.0.0.1:0>lrange task 0 -1
 1)  "a"
 2)  "b"
 3)  "c"
 4)  "d"
127.0.0.1:0>rpoplpush task job 
"d"
127.0.0.1:0>lrange task 0 -1
 1)  "a"
 2)  "b"
 3)  "c"
127.0.0.1:0>lrange job 0 -1
 1)  "d"
127.0.0.1:0>
```


场景: task + bak 双链表完成安全队列
Task列表                             bak列表

业务逻辑:
1:Rpoplpush task bak
2:接收返回值,并做业务处理
3:如果成功,rpop bak 清除任务. 如不成功,下次从bak表里取任务


12. `brpop|blpop  key timeout`

作用: 等待弹出key的尾/头元素, Timeout为等待超时时间，如果timeout为0,则一直等待

场景: 长轮询Ajax,在线聊天时,能够用到


