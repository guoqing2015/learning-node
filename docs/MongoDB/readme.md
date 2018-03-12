http://blog.csdn.net/yule_czh/article/details/78942448


添加为系统服务 PowerShell（Admin） 
mongod.exe –config C:\personal\MongoDB\conf\mongodb.config –install –serviceName "MongoDB"
启动服务 
net start mongodb



1）安装mongodb服务：mongod.exe --config D:\softInstall\mongodb\mongod.config --install

2）运行mongodb：net start mongodb（停止命令为：net stop mongodb）

3）连接到mongodb：mongo

4）创建用户：切换到admin：use admin，创建用户：db.createUser({user:'kilian',pwd:'qing1211',roles:['readWrite','dbAdmin']}); 查看用户：db.system.users.find();（注意：mongodb的语句后要加 ; 号）

5）查看数据库：show dbs

至此，mongodb安装完成，可以在可视化工具如MongoBooster中通过localhost连接到本地数据库
