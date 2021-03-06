# set结构的命令详解


集合的性质: **唯一性**, **无序性**, **确定性**

注: 在string和link的命令中,可以通过range 来访问string中的某几个字符或某几个元素 
但,因为集合的无序性,无法通过下标或范围来访问部分元素. 
因此想看元素,要么随机先一个,要么全选  

1. `sadd key value1 value2`  
作用: 往集合key中增加元素

2. `srem key value1 value2`  
作用: 删除集合中集为 value1 value2的元素  
返回值: 忽略不存在的元素后,真正删除掉的元素的个数  

3. `spop key`  
作用: 返回并删除集合中key中1个随机元素

随机--体现了无序性

4. `srandmember key`  
作用: 返回集合key中,随机的1个元素.

5. `sismember key value`  
作用: 判断value是否在key集合中  
是返回1,否返回0

6. `smembers key`  
作用: 返回集中中所有的元素

7. `scard key`  
作用: 返回集合中元素的个数

8. `smove source dest value`  
作用:把source中的value删除,并添加到dest集合中


9. `sinter  key1 key2 key3`  
作用: 求出key1 key2 key3 三个集合中的交集,并返回

```
redis 127.0.0.1:6379> sadd s1 0 2 4 6
(integer) 4
redis 127.0.0.1:6379> sadd s2 1 2 3 4
(integer) 4
redis 127.0.0.1:6379> sadd s3 4 8 9 12
(integer) 4
redis 127.0.0.1:6379> sinter s1 s2 s3
1) "4"
redis 127.0.0.1:6379> sinter s3 s1 s2
"4"
```

10. `sinterstore dest key1 key2 key3`    
作用: 求出key1 key2 key3 三个集合中的交集,并赋给dest


11. `suion key1 key2.. Keyn`  
作用: 求出key1 key2 keyn的并集,并返回

12. `sdiff key1 key2 key3`   
作用: 求出key1与key2 key3的差集  
即key1-key2-key3 

