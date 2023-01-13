/**
 * Wrapper around `Object.keys` that returns a typed array instead of `string[]`
 *
 * @param value
 */
export declare function objKeys<T extends object>(value: T): (keyof T)[];
export declare function objEntries<T extends object>(value: T): [keyof T, T[keyof T]][];
