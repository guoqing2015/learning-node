# querystring模块

作用:
   处理客户端通过`get/post`请求传递过来的参数


1. **querystring.parse(str,separator,eq,options)**

parse这个方法是将一个字符串反序列化为一个对象。

参数：str指需要反序列化的字符串;

　　　separator（可省）指用于分割str这个字符串的字符或字符串，默认值为"&";

　　　eq（可省）指用于划分键和值的字符或字符串，默认值为"=";

　　　options（可省）该参数是一个对象，里面可设置maxKeys和decodeURIComponent这两个属性：

　　　　　　maxKeys：传入一个number类型，指定解析键值对的最大值，默认值为1000，如果设置为0时，则取消解析的数量限制;

　　　　　　decodeURIComponent:传入一个function，用于对含有%的字符串进行解码，默认值为querystring.unescape。
```
querystring.parse("name=whitemu&sex=man&sex=women");
 /*
 return:
 { name: 'whitemu', sex: [ 'man', 'women' ] }
 */
 
querystring.parse("name=whitemu#sex=man#sex=women","#",null,{maxKeys:2});
 /*
 return:
 { name: 'whitemu', sex: 'man' }
 */
```

2.  **querystring.stringify(obj,separator,eq,options)**

format这个方法是将传入的url对象编程一个url字符串并返回

stringify这个方法是将一个对象序列化成一个字符串，与querystring.parse相对。

参数：obj指需要序列化的对象

　　　separator（可省）用于连接键值对的字符或字符串，默认值为"&";

　　　eq（可省）用于连接键和值的字符或字符串，默认值为"=";

　　　options（可省）传入一个对象，该对象可设置encodeURIComponent这个属性：

　　　　　　encodeURIComponent:值的类型为function，可以将一个不安全的url字符串转换成百分比的形式，默认值为querystring.escape()。

```
querystring.stringify({name: 'whitemu', sex: [ 'man', 'women' ] });
```

3. **querystring.escape(str)**

escape可使传入的字符串进行编码

```
querystring.escape("name=abc");
```


4.  **querystring.unescape(str)**

unescape方法可将含有%的字符串进行解码

