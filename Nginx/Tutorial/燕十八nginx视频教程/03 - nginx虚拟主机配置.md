# nginx虚拟主机配置

Nginx配置段

// 全局区 
worker_processes 1; // 有1个工作的子进程,可以自行修改,但太大无益,因为要争夺CPU,一般设置为 CPU数*核数

Event {
// 一般是配置nginx连接的特性
// 如1个word能同时允许多少连接
 worker_connections  1024; // 这是指 一个子进程最大允许连1024个连接
}

```
http {  //这是配置http服务器的主要段
     Server1 { // 这是虚拟主机段
       
            Location {  //定位,把特殊的路径或文件再次定位 ,如image目录单独处理
            }             /// 如.php单独处理

     }

     Server2 {
     }
}
```

例子1: 基于域名的虚拟主机
```
    server {
        listen 80;  #监听端口
        server_name a.com; #监听域名

        location / {
                root /var/www/a.com;   #根目录定位
                index index.html;
        }
    }
```

例子2: 基于端口的虚拟主机配置
```
    server {
        listen 8080;
        server_name 192.168.1.204;

        location / {
                root /var/www/html8080;
                index index.html;
        }
    }
```

更多详细配置参考： 
[Nginx配置文件详解](https://www.cnblogs.com/ivy-zheng/p/10991915.html)