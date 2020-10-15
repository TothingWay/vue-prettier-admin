import { parse } from 'path-to-regexp'

function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

export function toObject(arr) {
  var res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1)
}

export function deepClone(target) {
  let result
  const targetType = checkedType(target)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return target
  }
  for (const i in target) {
    const value = target[i]
    if (checkedType(value) === 'Object' ||
      checkedType(value) === 'Array') {
      result[i] = deepClone(value)
    } else {
      result[i] = value
    }
  }
  return result
}

// 路由path转驼峰
export function pathToHump(path) {
  return path.replace(/\/(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

export function parseDynamicPath(path) {
  if (path && typeof (path) === 'string') {
    return parse(path).map(item => {
      return typeof (item) === 'string' && item
    }).join('')
  }
  return ''
}
