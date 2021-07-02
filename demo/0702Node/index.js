const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const baseUrl = 'https://www.doutula.com/article/list/'
let pageNum = 0

for (let i = 0; i < 4; i++) {
  spiderImg(pageNum)
  pageNum++
}
async function spiderImg() {
  let pageList = await getPageAllImgDetailLink(pageNum)
  pageList.each(async (i,element) => {
    let imgObj = await getPageAllImgSrc(element)
    let imgSrcList = imgObj.imgSrcList
    let listTitle = imgObj.title
    const folderName = './imgs/'+ listTitle
    try {
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
      }
    } catch (err) {}

    imgSrcList.each((i,imgItem)=>{
      let imgPathObj = path.parse(String(imgItem))
      let imgName = imgPathObj.base
      let imgPath = `./imgs/${listTitle}/${imgName}`
    
      let wsImg = fs.createWriteStream(imgPath)
      axios({
        'url': String(imgItem),
        method: 'get',
        responseType: 'stream',
      }).then(imgStream=>{
        imgStream.data.pipe(wsImg)
        imgStream.data.on('close',function(){
          wsImg.end();
        })
      })
    })
  });
}

// getPageAllImgDetailLink().then(res=>{
//   getPageAllImgSrc(res[0]).then(imgRes=>{

//   })
// })





/**
 * @function getPageAllImgSrc
 * @param  detailLinke [string]   页面网络链接
 * @desc  在页面中获取所有的 图片链接 以及 图片系列的标题
 * @return promise [promise]  res: Object  { imgSrcList: [array] (图片链接 数组 ), title: [string] (图片系列标题) }
 */
function getPageAllImgSrc( detailLinke ) {
  return new Promise((resolve,reject)=>{
    axios({
      url: detailLinke,
      method: 'get',
    }).then(res => {
      let $ = cheerio.load(res.data)
      let title = $('.col-sm-9 .pic-title a').text()
      let imgSrcList = $('.col-sm-9 .pic-content a>img').map((i, item) => {
        let imgLink = $(item).attr('src')
        return imgLink
      })
      resolve({ imgSrcList, title })
    })
  })

}

/**
 * @function getPageAllLink
 * @param  pageNum [Number] 
 * @desc  以 baseUrl 为基础链接 ,获取每一页中 表情包详情页的 a 链接
 * @return promise [promise]  返回 a 链接数组
 */
function getPageAllImgDetailLink( pageNum ) {
  return new Promise((resolve,reject) => {
    axios({
      url: baseUrl,
      method: 'get',
      params: {
        page: pageNum
      }
    }).then(res=>{
      let $ = cheerio.load(res.data)
      let aImgList = $('#home .col-sm-9>a').map((i, item)=>{
        let detailLink = $(item).attr('href')
        return detailLink.toString()
      })
      resolve(aImgList)
    })
  })
}

