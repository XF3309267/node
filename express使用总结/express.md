# Node.js ( express  之前 node 的总结 )

## 1.node 作用

	1.   Node.js  是    JS 运行时环境 ，没有   DOM  BOM
 	2.   Node.js   只有  JS 基本语法
 	3.   Node.js  中的  JS 提供了一些  服务器级别的  API

## 2. node   简单的使用

### 1.使用 node 进行文件的读写

- 首先   加载  fs 核心模块 ，file-system  操作文件相关的  API

- ```js
  // app.js  文件中的代码
  
  let  fs = require('fs')
  // readFile(arg1,[arg2],arg3)
  // arg1  文件路径 
  // arg2  可选参数，（表示文件的编码格式，如: 'utf8'; utf8  可以正常显示中文）
  // arg3  获得数据的可选参数  function(error,data)
  //   		error:   	当文件读取出错时，error 会是一个对象（即 错误对象）
  //           			读取到内容时， error 为 null
  // 			data: 		读取出错 为 null；
  
  fs.readFile('./data/a.text'，function(error,data){
      
      // 注意读取到的数据  是以二进制的形式展现的
      // 所以要使数据 以字符串的形式展现，可以使用  data.toString()  转换
  })
  // 写入文件 
  //  arg1 写入文件的文件路径
  //  arg2 写入的 字符串内容
  //  arg3 function(error){   }   写入成功  error:null; 写入失败: error 为错误对象
  fs.writeFile('./data/hello.md',)
  
  ```

### 2. 构建 服务器

- ```js
  let http = require('http')
  let server = http.createServer()
  // 服务器作用
  // 发送请求
  // 接收请求
  // 处理请求
  // 发送响应
  // 一个请求对应一个响应,且 一定要结束响应
  server.on('request',function(req,res){
      let url = req.url      // url 即访问服务器的 url     
      //res.write('hello')
      if(url === '/plain'){
          res.setHeader('Content-Type','text/plain; charset=utf-8')
          //  对于普通文本
          res.end('hello 世界')
      }
      if(url === '/html'){
          // 发布的  html 文件格式
          // Content-Type 告知客服端发送的内容是什么类型  
          // charset  告知客服端 返回内容的编码格式
          res.setHeader('Content-Type','text/html;charset=utf-8')
          res.end('<h1> 你好世界 </h1>')
      }
      
      
      // 结束响应
      res.end()
      // 可以知道 外界访问 服务器的 url 地址，
      // 根据 url 的不同，返回的数据可以不同。结合读取文件内容（例如：html）,就可以返回不同的页面了
      
  })
  // 监听服务器  3000  端口
  // 以上响应 也都只会在  3000 中响应
  server.listen(3000,function(){
      console.log('Server is  running')
})
  ```
  

### 3.  静态文件分享

- ```js
  // 就是将本地的一个文件分享出去
  // 当 url 是以 /public/  开头的，就会根据 url 去寻找 ./public/  文件下去寻找文件
  // 解析: 如： url为 localhost:3000/public/html/index.html
  server.on('request',function(req,res){
      const 
      let url = req.url
      if(url.indexOf('/public/') === 0){
          fs.readFile('.'+url,function(err,data){
              if(error){
                  console.log('访问数据错误')
              }else{
                  // 对 data 的展示
              }
          })
      }
  })
  ```

### 3. 使用 模板引擎

- ```js
  // 1. 安装模板引擎  npm i art-template
  // 2. 在文件模块中加载 art-template    require('art-template')
  // 3. 使用方法  let res = template.render('hello{{name}}',{ name: 'Jack'})
  let res = template.render(arg1,arg2)
  
  // arg1: 要被模板引擎渲染的模板字符串
  // arg2: 模板对象
  //  模板引擎  不管要渲染什么，他始终会去  寻找 {{}}  里面的内容
  //  渲染 html 文件也是这样的
  //  fs.readFile  读取到 html 文件（并且转换为 string 格式）再用 
   fs.readFile('./index.html',function(err,data){
       
       let ret = template.render(data.toString(),{
           name:'Jack',
           age:18,
           province:'上海市'
       })
   })
  ```

## 3.服务端渲染 和 客服端渲染

#### 1. 客户端渲染

- 客服渲染： 客户端 向 服务端 发起请求，服务端返回  html  字符串，浏览器根据 html 字符串进行解析，因为  html 中 还有对资源  数据的 请求，这时 客户端 发起第二次请求，
- 客户端 请求数据，一般使用的是 ajax 数据，因为不用刷新页面，就可以获得数据
- 先获得 空白的 html 文件，等 第二次 请求数据 和 资源 完整时，才会完整的渲染页面。

#### 2. 服务端渲染

- html 文件   、 html 中需要展示的数据  以及 html 中所需要的资源  已经在 服务端渲染好了，客服端请求时，直接 返回  完整的  html 文件。
- 服务端渲染 虽然减少了 客户端请求的次数，但是  服务端的任务就加重了。浏览器请求时，一直在转，且页面 毫无响应，必须等 服务端完整渲染好 html。

## 4. 模块系统规则

### 1. 模块的导出和加载

```js
// a.js
// 加载 b.js  中的  bAdd  和  bReduce   方法
let {bAdd,bReduce} = require('./b')
```

```js
// b.js
function bAdd(x,y){
    return x + y
}
function bReduce(x,y){
    return x - y
}
module.exports = { bAdd,bReduce }
// 这里还有一个 exports 属性
// 你也可以使用 exports.bAdd = bAdd  ;     exports.bReduce = bReduce

// 但是注意： exports = module.exports
// node.js 中会默认向外暴露 module.exports 上的静态属性
// 所以 当你只是在 exports 上增加静态属性时 就相当于 在 module.exports 增加静态属性
// 然而当你： exports = { bAdd,bReduce } 时
// exports 指向的地址 就不再是  module.exports 指向的地址
// 所以 无法更改 module.exports 上的属性，也就无法向外导出 bAdd bReduce
```

### 2. 加载规则

- 当出现下面情况时

  ```js
  // a.js
  // 这里注意了，我们执行 a.js
  // 打印如下
  // 这里是 b.js
  // 这里是 c.js         只执行了 一次
  
  // 我们可以看到，a 加载 b，a 加载 c；   b 加载了 c
  // 因为 b 加载过 c
  // 所以当 a 加载会 优先从缓存中 获取 c向外暴露的各种属性
  let bb = require('./b.js')
  let cc = require('./c.js')
  
  
  // b.js
  console.log('这里是 b.js')
  let bb = 'bb bb'
  let cc = require('./c.js')
  exports.bb = bb
  
  
  // c.js
  console.log('这里是 c.js')
  let cc = 'cc cc'
  exports.cc = cc
  
  ```

## 5. express 的使用（ 快速搭建 ）

### 1. express 基本使用

1. 安装  `npm install --save express`

2. 使用  `npm init -y`  初始化一个项目的配置文件
   - name:  项目名称
   - version:  项目版本
   - description:  项目描述
   - .......
   - dependencies:  项目运行所依赖的模块，          运行模式  -S
   - devDependencies:  项目开发所需要的模块，    开发模式  -D
   - **-S   和  -D   的区别：-D 是开发时所需要用到的依赖模块，到发行时，可能就不需要了；-S 是运行时所需要的模块，当然也就是  开发 和 运行都需要的依赖。**
   
3. ```js
   let express = require('express')
   let app = express()
   
   app.get('/',function(req,res){
     
       res.render('发出的信息')
   	
   })
   app.get('/post',function(req,res){
       res.render('好的')
       setTimeout(function(){
           res.redirect('/')
       },2000)
       // 使用 req.query  获取 get 请求 url 地址后面带的参数
       let query = req.query
   })
   
   
   app.listen(3000,function(){
       console.log('Server is running')
   })
   ```

4. **使用 nodemon  工具 自动重启服务器**

   1. `npm i --save-dev nodemon`  只在开发环境中加载使用  nodemon
   2. 使用：  nodemon  a.js  ( 平常是用   node a.js )

5. express  使用 static-server 静态资源服务

   - ```js
      let express = requires('express')
      let app = expresss()
      
      app.use('/public/',express.static('./public/'))
     // 当 url 是以 /public/ 开头，就会自动去寻找 './public/' 下的文件
      app.use(express.static('./public/'))
     // 省略了第一个参数，即表示: 直接以 '/' 开头，就会自动去寻找 './public/' 下的文件
     // 注意！！！！！！！！！！！！
     // 不建议省略 第一个参数，因为会和 普通的路由 混淆，所以建议带上一个标识
     //  如   '/public/js/a.js'   对应    './public/js/a.js' 文件
     
     ```

6. express 中 获取 get url 携带数据   和  使用 `body-parser`  获取 post 请求体数据

   - ```js
     app.get('/',function(req,res){
         let query = req.query
         // {name:'Jack',age:18}
     })
     ```

   - ```js
     // 装 body-parser
     // Express 内部没有获取表单 POST 请求的API
     // 这里我们需要一个第三方包  body-parser
     // 1. 安装 npm install  --save body-parser
     // 2. 配置 
     var express = require('express')
     var bodyParser  = require('body-parser')
     
     var app = express()
     // 只要配置了 bodyParser 
     // req 就会多出一个静态属性  body,用以获取 post 请求体数据
     // 配置 bodyParser
     app.use(bodyParser.urlencoded({extend:false}))
     app.use(bodyParser.json())
     
     app.post('/post',function(req,res){
         console.log(req.body)
         // 这里可以获取 以 post方式 请求 '/post' 时，post 请求体中携带的数据
     })
     ```

7. express  使用  使用模板引擎

   - ```js
     npm install --save art-template
     npm install --save express-art-template
     
     // 使用前，必须安装上面的两项
     var express = require('express');
     var app = express();
     
     
     // app.engine('html',....)
     // 标识 只有以 html 后缀的文件，才可以使用  模板引擎
     
     app.engine('html', require('express-art-template'));
     app.set('views', arg2 );    // arg2 填写修改默认渲染文件的路径
     app.get('/',function(req,res){
         res.render('index.html',{
             comment: {id:0,name:'Jack',age:23}
         })
     })
     ```

### 2. 自我对 express 的解析

- 安装 `npm install --save express`

- 简单使用 

  ```js
  let express = require('express')
  let app = express()
  // app 就是  http 的 server
  
  // >>>>>>>  express 中 分享静态资源
  // 第一个参数，只是一个标识
  // 即 url  '/public/'  印射  './public/'  目录下的文件 
  app.use( '/public/',express.static('./public/'))
  
  
  // >>>>>>  express 使用模板引擎
  // 1. 安装
  // npm install --save art-template
  // npm install --save express-art-template
  // 2. 配置
  //   2.1 	哪种文件将会使用模板引擎
    		app.engine('html', require('express-art-template'));
  // 3. 使用
  //		app.set('views',这里填写修改的默认路径)   
  //		views 存放需要渲染的文件，res.render(arg1,arg2) 
  //				arg1 要渲染的文件（ express 会自动去 views 文件夹下寻找 arg1 文件）
  //				views 是默认的 res.render 寻找的文件夹
  //				也可以通过 app.set('views',路径)  修改默认渲染文件路径
  //		express
  		app.get('/',function(req,res){
              res.render('index.html',arg2)   // arg2 是一个对象，用以渲染 index.html 文件
          })
  //	4. 获取响应的  query , post请求体
  // let query = req.query
  // 获取 post 请求体，需安装  body-parser
  	npm install  --save body-parser
  // 2. 配置 
      var bodyParser  = require('body-parser')
      // 只要配置了 bodyParser 
      // req 就会多出一个静态属性  body,用以获取 post 请求体数据
      // 配置 bodyParser
      app.use(bodyParser.urlencoded({extend:false}))
      app.use(bodyParser.json())
  
  // 路由配置
  app.get('/',function(req,res){
      // 监听 url === '/' 
      let url = req.url		// 完整的 url
      let query = req.query  	// get 请求时的 请求体
  })
  
  // 监听服务器 3000 端口
  app.listen(3000,function(){
     	console.log('Server is Running')
  })
  ```

## 6. 自我实践

### 1.  res.end( )   和  res.render( )  没有分清楚

- `res.end()  `  node.js  自带的  响应数据的方式

- `res.render()`   express 模块中  用以来 渲染页面的

  - ```js
    res.render('index.html',{ name: 'Jack'})
    // 第一个参数： 文件名   （ 默认会去  views 文件中去找 ）
    // 第二个参数： 渲染页面所需的数据对象    （  ）
    //  使用  render 之前还必须 如下
    npm install --save art-template
    npm install --save express-art-template
    // 使用 express-art-template 模板引擎渲染 html 文件
    app.engine('html',require('express-art-template'))
    ```

### 2.  fs.readFile( ) 是异步的

- 所以想要获得 读取文件的数据

- ```js
  // request/student.js     用以 students 数据的所有 ＡＰＩ操作
  let fs = require('fs')
  // 外界通过 传入一个函数（如同一个管子）
  // 异步内部到时候获得数据，就会调取方法并  将 data 以参数的形式 传递至外界
  function getInfo(callback){
      fs.readFile('student.json','utf8',function(err,data){
          // 必须使用 'utf8'  保证获取到得数据中的汉字正常编码
          if(!err){
              callback(data)
          }
      })
  }
  ```

### 3. 使用模板引擎渲染   html 文件

- ```html
  <!-- students 是一个数组，记住是一个数组 -->
  {{each students}}
  <tr>
  <!-- $value 是每一项  -->
  	{{$value}}
  </tr>
  {{/each}}
  ```

  



