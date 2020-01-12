# hash结构及命令详解


1. `hset key field value`  
作用: 把key中 filed域的值设为value  
注:如果没有field域,直接添加,如果有,则覆盖原field域的值

2. `hmset key field1 value1 [field2 value2 field3 value3 ......fieldn valuen]`  
作用: 设置field1->N 个域, 对应的值是value1->N  
(对应PHP理解为  $key = array(file1=>value1, field2=>value2 ....fieldN=>valueN))


3. `hget key field`  
作用: 返回key中field域的值

4. `hmget key field1 field2 fieldN`  
作用: 返回key中field1 field2 fieldN域的值

5. `hgetall key`  
作用:返回key中,所有域与其值

6. `hdel key field`  
作用: 删除key中 field域

7. `hlen key`  
作用: 返回key中元素的数量

8. `hexists key field`  
作用: 判断key中有没有field域

9. `hinrby key field value`  
作用: 是把key中的field域的值增长整型值value

10. `hinrby float  key field value`  
作用: 是把key中的field域的值增长浮点值value

11. `hkeys key`  
作用: 返回key中所有的field

12. `kvals key`  
作用: 返回key中所有的value
