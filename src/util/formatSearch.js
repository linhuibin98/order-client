// 格式化路由参数 例如: ?redirect=/order

export default function formatSearch(str) {
  const params = {};
  if (str) {
    str = str.slice(1);
    let result = str.split('&');
    result.forEach(item => {
      const param = item.split('=');
      params[param[0]] = param[1];
    })
  }
  return params;
}