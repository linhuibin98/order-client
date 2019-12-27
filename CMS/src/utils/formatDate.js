function paddZero(num) {
  return num < 10 ? '0' + num : num
}

export default function formatDate(date) {
  date = date && new Date(date) || new Date()
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let mi = date.getMinutes()
  let s = date.getSeconds()

  m = paddZero(m)
  d = paddZero(d)
  h = paddZero(h)
  mi = paddZero(mi)
  s = paddZero(s)

  return `${y}-${m}-${d} ${h}:${mi}:${s}`
}
