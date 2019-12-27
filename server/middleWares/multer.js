const multer = require('koa-multer');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../static/uploads/avatars'))
  },
  // 保存文件名
  filename: function (req, file, cb) {
    let { query } = url.parse(req.url);
    let { id } = querystring.parse(query);
    let arr = file.originalname.split('.');
    let type = arr[arr.length-1];
    cb(null, `${id}-${file.fieldname}-${Date.now().toString(16)}.${type}`)
  }
})
//文件上传限制
const limits = {
  fields: 10,//非文件字段的数量
  fileSize: 500 * 1024 * 1024,//文件大小 单位 b
  files: 1//文件数量
}
const upload = multer({ storage, limits });

module.exports = upload;