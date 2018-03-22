// 金钱：分转元
export function toMoney (num) {
  num = num.toFixed(2)
  num = parseFloat(num)
  num = num.toLocaleString()
  return num
}
