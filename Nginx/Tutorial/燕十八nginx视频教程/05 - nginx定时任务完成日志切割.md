
## 05 - nginx定时任务完成日志切割

实际应用: shell+定时任务+nginx信号管理,完成日志按日期存储

分析思路:   
凌晨00:00:01,把昨天的日志重命名,放在相应的目录下  
再USR1信息号控制nginx重新生成新的日志文件  
具体脚本:  


runlog.sh文件

```
#!/bin/bash
base_path='/usr/local/nginx/logs'
log_path=$(date -d yesterday +"%Y%m")
day=$(date -d yesterday +"%d")
mkdir -p $base_path/$log_path
mv $base_path/access.log $base_path/$log_path/access_$day.log
#echo $base_path/$log_path/access_$day.log
kill -USR1 `cat /usr/local/nginx/logs/nginx.pid`
```

**定时任务**
Crontab 编辑定时任务
```
01 00 * * * /xxx/path/b.sh 
```
 每天0时1分(建议在02-04点之间,系统负载小)