## Node 基础

1. Node 简介：(基于  chrome V8 引擎)

   - **Node.js    是一个 Javascript 运行时环境**
   - **浏览器中的 JS**
     - ECMA Script
     - BOM
     - DOM
   - **Node.js**
     - ECMAScript (没有 DOM　BOM)
     - Node 的 JS 执行环境 为 JS 提供了一些服务器级别的操作 API
       - 文件读写
       - 网络服务的构建
       - 网络通信
       - http 服务器
       - 。。。
     - event-driven 事件驱动
     - non-blocking I/O   非阻塞IO模型
     -  轻量  和 高效
     - npm 基于 node 开发的 装包工具
       - **npm 存放了 绝大多数的 JS 相关的包 **

2. **Node 的作用**

   - Web 服务器后台
   - 命令行工具
     - npm （node)
     - git       (c语言)
     - hexo （node)
   - 对于前端开发工程师，接触最多的是它的命令行工具
     - webpack    
     - gulp
     - npm

3. **Node.js  资源**

   - 《 深入浅出Node.js 》
   - 《 Node.js 权威指南》
   -  https://javascript.ruanyifeng.com/nodejs/fs.html   阮一峰
   - 《 Node 入门 》

4. **模块化编程**

   - RequireJS
   - SeaJs
   - @import('文件路径')
   - Node 可以像 ` @import()` 一样来引用 JavaScript 脚本文件   

5. Node 为 JavaScript 提供了 很多服务器级别的 API ，这些  API 的绝大多数的都被

   包装到了一个具名的核心模块中；

   - 例如文件操作的  fs 核心模块
   - http 服务构建的 **http** 模块，**path**  路径操作模块、**os** 操作系统信息模块