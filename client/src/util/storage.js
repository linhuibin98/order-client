export function getStorage(key) {
  let value = window.localStorage.getItem(key);
  return JSON.parse(value);
}

export function setStorage(key, val) {
  val = JSON.stringify(val); 
  window.localStorage.setItem(key, val);
}