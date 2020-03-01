export type Array1<T> = [T, ...T[]];

export function map<T, U>(
  arr: [T, ...T[]],
  callbackfn: (value: T, index: number) => U,
): [U, ...U[]];
export function map<T, U>(
  arr: [T, T, ...T[]],
  callbackfn: (value: T, index: number) => U,
): [U, U, ...U[]];
export function map<T, U>(
  arr: T[],
  callbackfn: (value: T, index: number) => U,
): U[] {
  return arr.map(callbackfn);
}

export function hasAtLeast<T>(n: 1, arr: T[]): arr is [T, ...T[]];
export function hasAtLeast<T>(n: 2, arr: T[]): arr is [T, T, ...T[]];
export function hasAtLeast<T>(n: 3, arr: T[]): arr is [T, T, T, ...T[]];
export function hasAtLeast<T>(n: number, arr: T[]): arr is T[];
export function hasAtLeast<T>(n: number, arr: T[]): arr is T[] {
  return arr.length >= n;
}

export function hasExactly<T>(n: 1, arr: T[]): arr is [T];
export function hasExactly<T>(n: 2, arr: T[]): arr is [T, T];
export function hasExactly<T>(n: 3, arr: T[]): arr is [T, T, T];
export function hasExactly<T>(n: number, arr: T[]): arr is T[];
export function hasExactly<T>(n: number, arr: T[]): arr is T[] {
  return arr.length === n;
}

export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export function atMod<T>(arr: Array1<T>, indexMod: number): T {
  const len = arr.length;
  const elem = arr[(indexMod + len) % len];

  return elem ?? arr[0];
}

// TODO: Write this better
export function groupBy<T extends {}, K extends string>(
  arr: (T & { [k in K]?: string })[],
  key: K,
): { [k: string]: Array1<T> } {
  const retObj: { [k: string]: Array1<T> } = {};

  arr.forEach(elem => {
    if (!(key in elem)) return;

    const elemVal: string | undefined = elem[key];

    if (!elemVal) return;

    if (elemVal in retObj) {
      retObj[elemVal].push(elem);
    } else {
      retObj[elemVal] = [elem];
    }
  });

  return retObj;
}

// Maybe rewrite this more beautifully
export function zip<T, B>(
  arrT: [T, ...T[]],
  arrB: [B, ...B[]],
): [[T, B], ...[T, B][]] {
  const first: [T, B] = [arrT[0], arrB[0]];

  const rest = map(arrT, (tVal, index) => {
    // First element was already extracted
    if (index === 0) return null;

    const bVal = arrB[index];

    if (!bVal) return null;

    const tup: [T, B] = [tVal, bVal];

    return tup;
  }).filter(notEmpty);

  return [first, ...rest];
}

export function lastElem<T>(arr: [T, ...T[]]): T {
  const last: T = arr[arr.length - 1]!;

  return last;
}
