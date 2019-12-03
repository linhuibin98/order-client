// 生成订单号
const tradeNo = function () {
  const now = new Date()
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  String(month).length < 2 ? (month = Number("0" + month)) : month;
  String(day).length < 2 ? (day = Number("0" + day)) : day;
  String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
  String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
  String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
  const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
  return yyyyMMddHHmmss + '_' + Math.random().toString(36).substr(2, 9);
};

module.exports =  tradeNo;