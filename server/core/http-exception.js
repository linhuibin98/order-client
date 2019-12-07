// 全局错误处理
class HttpException extends Error {
  constructor(msg = '服务端错误', errorCode = 10000, code = 500) {
    super(msg);
    this.errorCode = errorCode;
    this.code = code;
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode = 40000, code = 400) {
    let msgArr = msg && msg.split(':');
    msg = msg && `参数${msgArr[0]}${msgArr[1]}` || '参数错误';
    super(msg);
    this.errorCode = errorCode;
    this.code = code;
  }
}

class DBException extends HttpException {
  constructor(msg, errorCode = 40001, code = 400) {
    super(msg);
    this.errorCode = errorCode;
    this.code = code;
  }
}

module.exports = {
  HttpException,
  ParameterException,
  DBException
}