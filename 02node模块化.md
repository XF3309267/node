## Node 的模块化

1. a.js

   ```js
   console.log('a.js')
   require('./b.js')  // b.js 与 a.js 在同一目录
   // 引入  b.js  的时候，会 执行  b.js 一遍
   ```

2. **模块作用域**

   - ```js
     console.log('a.js')
     let foo = 'a.js'
     require('./b.js')  // b.js 与 a.js 在同一目录
     // 若  b.js 中也定义了一个  foo 变量，两者的 foo 变量互不干扰
     // foo === 'a.js'
     ```

   - **引入其他模块的  属性  或 方法**

     - ```js
       // 导出 数据（变量 、 方法）
       let info = '基本信息'
       export.info = info
       // 利用  export 的属性的方式，向外导出  外部所需要的信息
       //  不导出时，其他模块在  导入 该模块信息时，获得的只是一个空对象
       
       //  导入 某个模块的 数据
       //  let b =  require('./data/b.js')
       //  b 是一个对象
       ```

3. **ip 地址   端口号**

   - ip 地址用来定位计算机
   - 端口号用来定位具体的应用程序
   - 所有需要联网的应用程序  都会占用一个  端口号

4. **服务端默认发送的数据，其实是 utf8  编码的内容 。浏览器在不知道 服务器响应内容的编码的情况下，会按照当前的操作系统 的 默认编码去解析**

   - **中文 操作系统默认是  gbk**
   - <font color=blue> 如何告诉浏览器 发送的内容的编码是什么（统一 utf-8) </font>
     - 设置头部： ` res.setHeader('Content-Type','text/plain;charset=utf-8')`
     - **Content-Type: ** 告知浏览器发送的数据内容是什么类型
       - text-plain:  纯文本格式
       - text-html:  html 格式
     - **Charset：**  编码格式  （编码格式 统一 :  utf-8）
       - 通常指的是 字符编码；图片不要自定义 编码

5. **端口号后面的  ’/home‘  、 ’/image/01.jpg‘  、 ’admin/home‘ ,这些统称  资源标识符 **

6. **如何向 客户端 发送 服务器上的文件**

   - ```js
     let http = require('http')
     let  fs = require('fs')
     let server = http.createServer()
     server.on('request',function(req,res){
         let url = req.url;
         if(url==='/'){
             fs.readFile('./views/resource/index.html',function(error,data){
                 if(error){
                     res.setHeader('Content-Type','text/plain;charset=utf-8')
                     res.end('获取资源失败') 
                 }else{
                     res.setHeader('Content-Type','text/html;charset=utf-8')
                     res.end(data) 
                 }
             })
         }
         else if(url==='/jpg'){
             fs.readFile('./views/resource/5a69a70dd34a5.jpg',function(error,data){
                 if(error){
                     res.setHeader('Content-Type','text/plain;charset=utf-8')
                     res.end('获取资源失败') 
                 }else{
                     res.setHeader('Content-Type','image/jpeg')
                     res.end(data)
                 }
                
             })
         }
     })
     server.listen(3000,function(){
         console.log('Server is running...')
     })
     ```

# 使用模块化

1. ## **a.js    引用  b.js  中导出的  add  方法** 

   1. 两种方式

      1. ```js
         // a.js
         let  b_export =  require('b.js')
         ```

         ```js
         // b.js
         function add(x,y){
         	return x + y;
         }
         exports.add = add
         ```

      2. ```js
         // a.js
         let b_add = require('b.js')
         ```

         ```js
         // b.js
         function add(x,y){
         	return x + y;
         }
         module.exports = add
         ```

         

   

   