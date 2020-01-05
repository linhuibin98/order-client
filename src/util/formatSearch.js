// 格式化路由参数 例如: ?redirect=/order

export default function formatSearch(str) {
  if (str) {
    let sp = 'redirect=';
    let len = sp.length;
    let index = str.indexOf(sp);
    return str.slice(len+index);
  }
  return '';
}