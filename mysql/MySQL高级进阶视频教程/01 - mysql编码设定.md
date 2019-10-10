# 01 - mysql编码设定


使用`show create table table_name;`, 可查看创建该表的sql语句，

如：
```mysql
CREATE TABLE `tb_users` (
  `user_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '表id',
  `sex` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0 保密 1 男 2 女',
  `birthday` int(11) NOT NULL DEFAULT '0' COMMENT '生日',
  `nickname` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '第三方返回昵称',
  PRIMARY KEY (`user_id`)
)  AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
```


使用`show variables like 'char%';`，可查看字符集

```
+--------------------------+--------------------------------------------------------+
| Variable_name            | Value                                                  |
+--------------------------·+--------------------------------------------------------+
| character_set_client     | utf8mb4                                                |
| character_set_connection | utf8mb4                                                |
| character_set_database   | utf8                                                   |
| character_set_filesystem | binary                                                 |
| character_set_results    | utf8mb4                                                |
| character_set_server     | utf8mb4                                                |
| character_set_system     | utf8                                                   |
| character_sets_dir       | /usr/local/Cellar/mysql/8.0.17_1/share/mysql/charsets/ |
+--------------------------+--------------------------------------------------------+
```

`character_set_client`：客户端请求数据的字符集
`character_set_connection`：从客户端接收到数据，然后传输的字符集
`character_set_database`：默认数据库的字符集，无论默认数据库如何改变，都是这个字符集；如果没有默认数据库，那就使用 character_set_server指定的字符集，这个变量建议由系统自己管理，不要人为定义。
`character_set_filesystem`：把os上文件名转化成此字符集，即把 character_set_client转换character_set_filesystem， 默认binary是不做任何转换的
`character_set_results`：结果集的字符集
`character_set_server`：数据库服务器的默认字符集。可在配置文件中修改， 
`character-set-server=utf8`, 修改后重新启动mysql
`character_set_system`：这个值总是utf8，不需要设置，是为存储系统元数据的字符集


 使用命令`set names 'uft8';`可将 character_set_client，character_set_connection，character_set_results的编码格式全改成utf8；            