function paddZero(num) {
  return num = num < 10 ? '0' + num : num;
}

export default function formatDate(date) {
  date = (date && new Date(date)) || new Date();
  let y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(),
      mi = date.getMinutes(),
      s = date.getSeconds();
    
  m = paddZero(m);
  d = paddZero(d);
  h = paddZero(h);
  mi = paddZero(mi);
  s = paddZero(s);

  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
}