# redis字符串类型的操作

1. `set key value [ex 秒数] / [px 毫秒数]  [nx] /[xx]`  
如: set a 1 ex 10 , 10秒有效    
Set a 1 px 9000  , 9秒有效  

注: 如果ex,px同时写,以后面的有效期为准    
如 set a 1 ex 100 px 9000, 实际有效期是9000毫秒  

nx: 表示key不存在时,执行操作    
xx: 表示key存在时,执行操作  

2. `mset  multi set`  
一次性设置多个键值    
例: mset key1 v1 key2 v2 ....

3. `get key`  
作用:获取key的值  

4. `mget key1 key2 ..keyn`  
作用:获取多个key的值


5. `setrange key offset value`  
作用:把字符串的offset偏移字节,改成value

```
redis 127.0.0.1:6379> set greet hello
OK
redis 127.0.0.1:6379> setrange greet 2 x
(integer) 5
redis 127.0.0.1:6379> get greet
"hexlo"
```

注意: 如果偏移量>字符长度, 该字符自动补0x00

```
redis 127.0.0.1:6379> set greet hello
OK
redis 127.0.0.1:6379> setrange greet 6 !
(integer) 7
redis 127.0.0.1:6379> get greet
"heyyo\x00!"
```


6. `append key value`  
作用: 把value追加到key的原值上

7. `getrange key start stop`  
作用: 是获取字符串中 [start, stop]范围的值  
注意: 对于字符串的下标,左数从0开始,右数从-1开始  

```
redis 127.0.0.1:6379> set title 'chinese'
OK
redis 127.0.0.1:6379> getrange title 0 3
"chin"
redis 127.0.0.1:6379> getrange title 1 -2
"hines"
```

注意:   
1: start>=length, 则返回空字符串  
2: stop>=length,则截取至字符结尾  
3: 如果start 所处位置在stop右边, 返回空字符串  


8. `getset key newvalue`  
作用: 获取并返回旧值,设置新值  

```
redis 127.0.0.1:6379> set cnt 0
OK
redis 127.0.0.1:6379> getset cnt 1
"0"
redis 127.0.0.1:6379> getset cnt 2
"1"
```

9. `incr key`  
作用: 指定的key的值加1,并返回加1后的值  

注意:  
1:不存在的key当成0,再incr操作  
2: 范围为64有符号


10. `incrby key number`  
```
redis 127.0.0.1:6379> incrby age  90
(integer) 92
```

11. `incrbyfloat key floatnumber`  
```
redis 127.0.0.1:6379> incrbyfloat age 3.5
"95.5"
```

12. `decr key`  
作用: 指定的key的值加1,并返回加1后的值

```
redis 127.0.0.1:6379> set age 20
OK
redis 127.0.0.1:6379> decr age
(integer) 19
```

13. `decrby key number`  
```  
redis 127.0.0.1:6379> decrby age 3
(integer) 16
```

14. `getbit key offset`  
作用:获取值的二进制表示,对应位上的值(从左,从0编号)  

```
redis 127.0.0.1:6379> set char A
OK
redis 127.0.0.1:6379> getbit char 1
(integer) 1
redis 127.0.0.1:6379> getbit char 2
(integer) 0
redis 127.0.0.1:6379> getbit char 7
(integer) 1
```

15. `setbit  key offset value`  
设置offset对应二进制位上的值    
返回: 该位上的旧值    

注意:     
1:如果offset过大,则会在中间填充0,     
2: offset最大大到多少    
3:offset最大2^32-1,可推出最大的的字符串为512M  


17. `bitop operation destkey key1 [key2 ...]`  
对key1,key2..keyN作operation,并将结果保存到 destkey 上。  
operation 可以是 AND 、 OR 、 NOT 、 XOR  

```
redis 127.0.0.1:6379> setbit lower 7 0
(integer) 0
redis 127.0.0.1:6379> setbit lower 2 1
(integer) 0
redis 127.0.0.1:6379> get lower
" "
redis 127.0.0.1:6379> set char Q
OK
redis 127.0.0.1:6379> get char
"Q"
redis 127.0.0.1:6379> bitop or char char lower
(integer) 1
redis 127.0.0.1:6379> get char
"q"
```

注意: 对于NOT操作, key不能多个
