'use strict';

const deepChange = (obj, cb1, cb2) => {
  const newObj = Array.isArray(obj) ? [] : {};
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'object') {
        newObj[i] = deepChange(obj[i], cb1, cb2);
      } else {
        newObj[i] = typeof cb2 === 'function' ? cb2(obj[i]) : obj[i];
      }
    }
  } else {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      newObj[typeof cb1 === 'function' ? cb1(keys[i]) : keys[i]] =
        typeof obj[keys[i]] === 'object' ? deepChange(obj[keys[i]], cb1, cb2) : typeof cb2 === 'function' ? cb2(obj[keys[i]]) : obj[keys[i]];
    }
  }
  return newObj;
};

export default deepChange;
