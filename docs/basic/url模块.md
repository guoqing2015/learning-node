# url模块

作用:
    url模块用于生成和解析URL。


## url.parse(urlString,boolean,boolean)

parse这个方法可以将一个url的字符串解析并返回一个url的对象

　　参数：urlString指传入一个url地址的字符串

　　　　　第二个参数（可省）传入一个布尔值，默认为false，为true时，返回的url对象中，query的属性为一个对象。

　　　　　第三个参数（可省）传入一个布尔值，默认为false

```
url.parse("http://user:pass@host.com:8080/p/a/t/h?query=string#hash");

/*
返回值：
{
protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' 
}
*/
```

## url.format(urlObj)

format这个方法是将传入的url对象编程一个url字符串并返回

```
url.format({
    protocol:"http:",
    host:"182.163.0:60",
    port:"60"
});
/*
返回值：
'http://182.163.0:60'
*/
```


## url.resolve(from, to)

url.resolve方法用于生成URL。它的第一个参数是基准URL，其余参数依次根据基准URL，生成对应的位置。

```
url.resolve('/one/two/three', 'four')
// '/one/two/four'

url.resolve('http://example.com/', '/one')
// 'http://example.com/one'

url.resolve('http://example.com/one/', 'two')
// 'http://example.com/one/two'

url.resolve('http://example.com/one', '/two')
// 'http://example.com/two'
```
