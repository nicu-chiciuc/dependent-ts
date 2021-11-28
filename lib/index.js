"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseTimeout = exports.unreachable = exports.objKeys = exports.immutableSplice = exports.reverse = exports.mapAll = exports.promiseAll = exports.split = exports.last = exports.zip = exports.atMod = exports.notEmpty = exports.excactly = exports.isKeyOf = exports.atLeast = exports.map = void 0;
function map(arr, callbackfn) {
    return arr.map(callbackfn);
}
exports.map = map;
function atLeast(n, arr) {
    return arr.length >= n;
}
exports.atLeast = atLeast;
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
exports.isKeyOf = isKeyOf;
function excactly(length, arr) {
    return arr.length === length;
}
exports.excactly = excactly;
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
exports.notEmpty = notEmpty;
function atMod(arr, indexMod) {
    const len = arr.length;
    const elem = arr[(indexMod + len) % len];
    return elem !== null && elem !== void 0 ? elem : arr[0];
}
exports.atMod = atMod;
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
    const first = [arrT[0], arrB[0]];
    const rest = map(arrT, (tVal, index) => {
        // First element was already extracted
        if (index === 0)
            return null;
        const bVal = arrB[index];
        if (!bVal)
            return null;
        const tup = [tVal, bVal];
        return tup;
    }).filter(notEmpty);
    return [first, ...rest];
}
exports.zip = zip;
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
/**
 * Filter the values of an array in 2 groups based on the predicate
 *
 * @param arr Array with some values
 * @param pred The predicate
 */
function split(arr, pred) {
    const good = arr.filter((elem, index) => pred(elem, index));
    const bad = arr.filter((elem, index) => !pred(elem, index));
    return { good, bad };
}
exports.split = split;
function promiseAll(promises) {
    return Promise.all(promises);
}
exports.promiseAll = promiseAll;
function mapAll(arr, callback) {
    return Promise.all(arr.map(callback));
}
exports.mapAll = mapAll;
function reverse(arr) {
    const tempArr = [...arr];
    tempArr.reverse();
    return tempArr;
}
exports.reverse = reverse;
/**
 * Wrapper around `splice` that doesn't modify the initial array
 *
 * @param array
 * @param start
 * @param count
 * @param values
 */
function immutableSplice(array, start, count, ...values) {
    const newArr = [...array];
    newArr.splice(start, count, ...values);
    return newArr;
}
exports.immutableSplice = immutableSplice;
/**
 * Wrapper around `Object.keys` that returns a typed array instead of `string[]`
 *
 * @param value
 */
function objKeys(value) {
    return Object.keys(value);
}
exports.objKeys = objKeys;
/**
 * This function can be added in the default case of a switch statement
 * so that the switch is exhaustive (https://stackoverflow.com/a/39419171)
 * When this is added typescript will show an error if one of the possibilities
 * of an enum was not taken into account. See Compose.js setContent() for example
 */
function unreachable(v) {
    return v;
}
exports.unreachable = unreachable;
function promiseTimeout(millis) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, millis);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.promiseTimeout = promiseTimeout;
//# sourceMappingURL=index.js.map