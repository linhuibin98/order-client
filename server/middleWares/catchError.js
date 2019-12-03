const { HttpException } = require('../core/http-exception.js');

const catchError = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch(e) {
      if (e instanceof HttpException) {
        let sendMsg = {
          message: e.message,
          errorCode: e.errorCode
        }
        ctx.status= e.code;
        ctx.body = sendMsg;
      } else {
        console.log(e)
        ctx.body = {
          message: '服务端未知错误',
          errorCode: 1
        };
      }
    }
  }
}

module.exports = catchError;