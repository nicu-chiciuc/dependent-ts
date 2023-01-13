function map(arr, callbackfn) {
  return arr.map(callbackfn);
}
function atLeast(n, arr) {
  return arr.length >= n;
}
/**
 * Wrapper around the `in` operator.
 * By default the `in` operator narrows the object (this is useful if the object
 * is a union type). We want to do the reverse, that is narrow down the key.
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing
 *
 * @param obj The object the keys of which we want to narrow to
 * @param key The key we want to check if is in the object
 */
function isKeyOf(obj, key) {
  return key in obj;
}
function excactly(length, arr) {
  return arr.length === length;
}
/**
 * Type guard that returns true if the value is not null or undefined
 *
 * The main usage is the filter function: `something.filter(notEmpty)`
 *
 * @param value A value that may or may not be null/undefined
 */
function notEmpty(value) {
  return value !== null && value !== undefined;
}
function atMod(arr, indexMod) {
  var len = arr.length;
  var elem = arr[(indexMod + len) % len];
  return elem != null ? elem : arr[0];
}
// TODO: Write this better
// export function groupBy<T extends {}, K extends string>(
//   arr: (T & { [k in K]?: string })[],
//   key: K
// ): { [k: string]: Array1<T> } {
//   const retObj: { [k: string]: Array1<T> } = {};
//
//   arr.forEach((elem) => {
//     if (!(key in elem)) return;
//
//     const elemVal: string | undefined = elem[key];
//
//     if (!elemVal) return;
//
//     if (isKeyOf(retObj, elemVal)) {
//       retObj[elemVal].push(elem);
//     } else {
//       retObj[elemVal] = [elem];
//     }
//   });
//
//   return retObj;
// }
// Maybe rewrite this more beautifully
function zip(arrT, arrB) {
  var first = [arrT[0], arrB[0]];
  var rest = map(arrT, function (tVal, index) {
    // First element was already extracted
    if (index === 0) return null;
    var bVal = arrB[index];
    if (!bVal) return null;
    var tup = [tVal, bVal];
    return tup;
  }).filter(notEmpty);
  return [first].concat(rest);
}
function last(arr) {
  return arr[arr.length - 1];
}
/**
 * Filter the values of an array in 2 groups based on the predicate
 *
 * @param arr Array with some values
 * @param pred The predicate
 */
function split(arr, pred) {
  var good = arr.filter(function (elem, index) {
    return pred(elem, index);
  });
  var bad = arr.filter(function (elem, index) {
    return !pred(elem, index);
  });
  return {
    good: good,
    bad: bad
  };
}
function promiseAll(promises) {
  return Promise.all(promises);
}
function mapAll(arr, callback) {
  return Promise.all(arr.map(callback));
}
function reverse(arr) {
  var tempArr = [].concat(arr);
  tempArr.reverse();
  return tempArr;
}
/**
 * Wrapper around `splice` that doesn't modify the initial array
 *
 * @param array
 * @param start
 * @param count
 * @param values
 */
function immutableSplice(array, start, count) {
  var newArr = [].concat(array);
  for (var _len = arguments.length, values = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    values[_key - 3] = arguments[_key];
  }
  newArr.splice.apply(newArr, [start, count].concat(values));
  return newArr;
}
/**
 * Wrapper around `Object.keys` that returns a typed array instead of `string[]`
 *
 * @param value
 */
function objKeys(value) {
  // @ts-expect-error This is expected
  return Object.keys(value);
}
/**
 * This function can be added in the default case of a switch statement
 * so that the switch is exhaustive (https://stackoverflow.com/a/39419171)
 * When this is added typescript will show an error if one of the possibilities
 * of an enum was not taken into account. See Compose.js setContent() for example
 */
function unreachable(v) {
  return v;
}
function promiseTimeout(millis) {
  return new Promise(function (resolve, reject) {
    try {
      setTimeout(resolve, millis);
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * Wrapper around `Array.includes()` that is also a type guard and doesn't err if the value
 * is not guaranteed to be in the given array
 *
 * @param arr
 * @param value
 */
function includes(arr, value) {
  // @ts-ignore
  return arr.includes(value);
}

export { atLeast, atMod, excactly, immutableSplice, includes, isKeyOf, last, map, mapAll, notEmpty, objKeys, promiseAll, promiseTimeout, reverse, split, unreachable, zip };
//# sourceMappingURL=tsdx-dependent.esm.js.map
