## 1. fs   `mkdirSync` 一切文件的操作都是异步的

- 创建文件目录时，也是 》》 `fs.mkdirSync()`

- ```js
  const fs = require('fs')
  // 创建文件目录时，首先判断 文件目录是否已经存在
  const folderName = ''
  if(!fs.existsSync(folderName)){
  	fs.mkdirSync(folderName)
  }
  ```

## 2.  `createWriteStream` 

- 写入流  **文件路径必须存在**，文件名可以不存在，

- ```js
  const fs = require('fs')
  const imgPath = ''
  let wsImg = fs.createWriteStream(imgPath)
  ```

  

