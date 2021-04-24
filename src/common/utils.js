/**
 * 防抖函数
 * @param {*} func 
 * @param {*} delay 
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
