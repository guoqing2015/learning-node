# 10 - 慢查询


## 

MYSQL记录下查询超过指定时间的语句，我们将超过指定时间的SQL语句查询称之为“慢查询”

`show variables like '%fun%'; `

**如果变量为off，那么需要开启**
`set global log_bin_trust_function_creators = 1; `

**创建函数的语法**
```
create function 函数名(变量 数据类型)
returns 数据类型
begin
   ...执行的程序代码
    return 数据;
end;
```