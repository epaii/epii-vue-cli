# 作用

- 最大幅度简化工作目录，只剩下页面页面
- 同一个项目可变异成多页面和单页面（默认单页面）
  

# 安装
```
npm install epii-vue-cli -g
```  
# 常用命令

创建模板项目

```
 epii-vue-cli init
``` 

单页面调试

```
epii-vue-cli
``` 
多页面调试

```
epii-vue-cli --mpa
``` 

编译成多页面

```
epii-vue-cli build --mpa
``` 

编译成单页面

```
epii-vue-cli build 
``` 

异步加载

```
epii-vue-cli --dynamic-import 
``` 