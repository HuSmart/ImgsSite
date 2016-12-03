## 基于Vue2.0的摄影作品展示网站(-。-只是个DEMO)

​	在学习ES6的过程中结合Vue2.0和Webpack等知识写了一个类似于“图库”的一个单页面应用DEMO。考虑到很多数据都是静态资源，所以决定将图片配置信息等数据存储在七牛云上。有访问请求或更新时从七牛上直接拉取，管理员对信息更改后更新七牛上的文件。（七牛有的文件都更新了好久了拉下来的还是未修改的版本太坑了！）

​	[DEMO主页](http://ohlyett59.bkt.clouddn.com/index.html/)

​	[管理员入口](http://ohlyett59.bkt.clouddn.com/admin/index.html/)

### 功能

- 按照分类、相册进行图片的浏览
- 自定义搜索内容
- 管理员对站点进行全方位的管理
- 桌面和移动的页面自适应

![cover](https://github.com/HuSmart/ImgsSite/tree/master/assets/img/README/cover.png)

### 使用方法

clone下来后dist文件中拿出来就能直接用了，几个入口目录如下

1. 主页：dist/index.html
2. 初始化页面: dist/admin/init.html
   程序运行需要先进行初始化，输入自己七牛云帐号的双KEY，初始化完成后会给与提示
3. 管理员入口：dist/admin/index.html

也许会遇到很多BUG，毕竟是练手的。有任何问题可以在Issues中提出来，我会尽力，毕竟自己也是个菜鸡

### 收工

​	写这个花的事件还不少，下班后拼拼凑凑也就做出来了， 也不算很完善自己写着玩 开心就好。写完后才发现真的是很基础的东西呢，自己还差得远呢，填完这个坑，下一个坑已经给自己挖好，准备起跳。