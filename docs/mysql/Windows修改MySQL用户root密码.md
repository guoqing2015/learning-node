# Windows修改MySQL用户root密码

**​用SET PASSWORD命令**
打开终端win+r，输入cmd回车即可打开；

通过mysql -u用户名 -p指定root用户登录MySQL，输入后回车会提示输入密码。

修改MySQL的root用户密码，格式：mysql> set password for 用户名@localhost = password('新密码'); 例子：mysql> set password for root@localhost = password('root'); 上面例子将用户root的密码更改为root　；

重新登录，输入新密码root就ok了；

