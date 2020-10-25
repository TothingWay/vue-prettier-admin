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
    if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
      result[i] = deepClone(value)
    } else {
      result[i] = value
    }
  }
  return result
}

// The route path turned hump
export function pathToHump(path) {
  return path.replace(/\/(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

// Formatting dynamic routing
export function parseDynamicPath(path) {
  if (path && typeof path === 'string') {
    return parse(path)
      .map(item => {
        return typeof item === 'string' && item
      })
      .join('')
  }
  return ''
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
