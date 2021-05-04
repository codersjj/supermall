/**
 * 防抖函数
 * @param {*} func 函数
 * @param {*} delay 延迟
 * @returns 
 */
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer)
    // console.log(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
    // console.log(timer);
  }
}

/**
 * 格式化日期
 * @param {Date} date 日期对象
 * @param {string} fmt 日期格式化字符串
 */
export function formatDate(date, fmt) {
  // 正则表达式是干什么的？
  // 它是字符串匹配的利器（难，规则太多）

  // y+ -> 1 个或多个 y
  // y* -> 0 个或多个 y
  // y? -> 0 个或 1 个 y

  // 1. 获取年份
  // 2021
  // yy -> 21
  // yyyy -> 2021
  // y -> 1
  // yyy -> 021
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(), // 可扩展（h 和 H）
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const k in o) {
    // if (/(k)/.test(fmt)) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }

  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}