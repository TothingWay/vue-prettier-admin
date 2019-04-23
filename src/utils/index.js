import dayjs from 'dayjs'

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

/* 判断当前时段 */
export function judgeTimeSlot() {
  const hour = dayjs().hour()
  if (hour >= 6 && hour < 11) {
    return '早上好'
  } else if (hour >= 11 && hour <= 12) {
    return '中午好'
  } else if (hour > 12 && hour <= 18) {
    return '下午好'
  } else if (hour > 18 && hour <= 23) {
    return '晚上好'
  } else {
    return '凌晨好'
  }
}
