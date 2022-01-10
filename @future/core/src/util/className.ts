import { type } from './common';
export function getPrefixCls(suffixCls: string): string {
    return suffixCls ? `hy-${suffixCls}` : 'hy';
}
export function mergeClassName(...args): string {
    const classArray = [];
    [].forEach.call(args, (item) => {
      if (type(item) === 'string' || type(item) === 'number') {
        classArray.push(item);
      } else if (typeof item === 'object') {
        for (const key in item) {
          if (item.hasOwnProperty(key) && item[key]) {
            classArray.push(key);
          }
        }
      } else if (type(item) === 'array') {
        classArray.push(mergeClassName(...item));
      }
    })
    return classArray.join(' ');
}

