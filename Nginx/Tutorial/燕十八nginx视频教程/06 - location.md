
## 06 - location

### location 语法
location 有”定位”的意思, 根据Uri来进行不同的定位.

在虚拟主机的配置中,是必不可少的,location可以把网站的不同部分,定位到不同的处理方式上.

比如, 碰到.php, 如何调用PHP解释器?  --这时就需要location  
location 的语法  
```
location [=|~|~*|^~] patt {

}
```

中括号可以不写任何参数,此时称为一般匹配  
也可以写参数  
因此,大类型可以分为3种

1. location = patt {} [精准匹配]
2. location patt {}  [一般匹配]
3. location ~ patt{} [正则匹配]