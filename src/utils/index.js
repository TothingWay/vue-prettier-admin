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

// 实现深度克隆---对象/数组
export function deepClone(target) {
  // 判断拷贝的数据类型
  // 初始化变量result 成为最终克隆的数据
  let result; const targetType = checkedType(target)
  if (targetType === 'Object') {
    result = {}
  } else if (targetType === 'Array') {
    result = []
  } else {
    return target
  }
  // 遍历目标数据
  for (const i in target) {
    // 获取遍历数据结构的每一项值。
    const value = target[i]
    // 判断目标结构里的每一值是否存在对象/数组
    if (checkedType(value) === 'Object' ||
      checkedType(value) === 'Array') { // 对象/数组里嵌套了对象/数组
      // 继续遍历获取到value值
      result[i] = deepClone(value)
    } else { // 获取到value值是基本的数据类型或者是函数。
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

