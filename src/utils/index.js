// 金钱：分转元
export function toMoney (num) {
  num = num.toFixed(2)
  num = parseFloat(num)
  num = num.toLocaleString()
  return num
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function formatDate (date, fmt) {
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    let str = o[k] + ''
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};
