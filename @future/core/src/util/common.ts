//防抖函数
export const debounce = function (fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    var args = arguments;
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => {
      // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, args);
    }, 500);
  };
};

//节流函数
export const throttle = function (fn, timeout) {
  timeout = timeout || 500;
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    var args = arguments;
    if (!canRun) return; // 在函数开头判断标记是否为 true，不为 true 则 return
    canRun = false; // 立即设置为 false
    setTimeout(() => {
      // 将外部传入的函数的执行放在 setTimeout 中
      fn.apply(this, args);
      // 最后在 setTimeout 执行完毕后再把标记设置为 true(关键) 表示可以执行下一次循环了。当定时器没有执行的时候标记永远是 false，在开头被 return 掉
      canRun = true;
    }, timeout);
  };
};

// 类型判断函数
export const type = function (o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

export const tuple = <T extends string[]>(...args: T) => args;

export const omit = <T>(props: T, keys: string[]) => {
  const newOj = {} as any;
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const element = props[key];
      if (keys.indexOf(key) === -1) {
        newOj[key] = element;
      }
    }
  }
  return newOj;
};
