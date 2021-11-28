export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
/**
 * Use this instead of {}. It seems that {} causes problems especially when used in generics.
 */
export declare type EmptyObject = Record<string, unknown>;
export declare type Arguments<T extends (...args: unknown[]) => unknown> = T extends (...args: infer R) => unknown ? R : never;
export declare type FirstArgument<T extends (arg: any, ...args: any[]) => any> = T extends (val: infer R, ...args: any[]) => any ? R : never;
export declare type SecondArgument<T extends (first: any, second: any, ...args: any[]) => any> = T extends (first: any, second: infer R, ...args: any[]) => any ? R : never;
/**
 * Given a function of type `(v: A) => Ap | (v: B) => Bp`
 * transform it's type into `(v: A | B) => Ap | Bp`
 */
export declare type UnionFuncFix<F extends (arg: any) => any> = (value: FirstArgument<F>) => ReturnType<F>;
export declare type FlattenUnion<T> = {
    [K in keyof UnionToIntersection<T>]: K extends keyof T ? T[K] extends unknown[] ? T[K] : T[K] extends object ? FlattenUnion<T[K]> : T[K] : UnionToIntersection<T>[K] | undefined;
};
/**
 * Different implementation of Array1/Array2/...
 *
 * Not sure if it provides any advantages
 */
export declare type ArrayN<N extends number, T> = N extends 1 ? [T, ...T[]] : N extends 2 ? [T, T, ...T[]] : N extends 3 ? [T, T, T, ...T[]] : N extends 4 ? [T, T, T, T, ...T[]] : N extends 5 ? [T, T, T, T, T, ...T[]] : N extends 6 ? [T, T, T, T, T, T, ...T[]] : N extends 7 ? [T, T, T, T, T, T, T, ...T[]] : T[];
export declare type Array1<T> = [T, ...T[]];
export declare type Array2<T> = [T, T, ...T[]];
export declare type Array3<T> = [T, T, T, ...T[]];
export declare type Array4<T> = [T, T, T, T, ...T[]];
export declare type Array5<T> = [T, T, T, T, T, ...T[]];
export declare type Array6<T> = [T, T, T, T, T, T, ...T[]];
export declare type Array7<T> = [T, T, T, T, T, T, T, ...T[]];
export declare function map<T, U>(arr: Array1<T>, callbackfn: (value: T, index: number) => U): Array1<U>;
export declare function map<T, U>(arr: Array2<T>, callbackfn: (value: T, index: number) => U): Array2<U>;
export declare function map<T, U>(arr: T[], callbackfn: (value: T, index: number) => U): U[];
export declare function atLeast<T>(n: 1, arr: T[]): arr is Array1<T>;
export declare function atLeast<T>(n: 2, arr: T[]): arr is Array2<T>;
export declare function atLeast<T>(n: 3, arr: T[]): arr is Array3<T>;
/**
 * Wrapper around the `in` operator.
 * By default the `in` operator narrows the object (this is useful if the object
 * is a union type). We want to do the reverse, that is narrow down the key.
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing
 *
 * @param obj The object the keys of which we want to narrow to
 * @param key The key we want to check if is in the object
 */
export declare function isKeyOf<T>(obj: T, key: string | number | symbol): key is keyof T;
/**
 * Type guard that returns true if the passed array has the exact length as specified
 *
 * @param length The expected length of the array
 * @param arr The array the length of which we test
 */
export declare function excactly<T>(length: 1, arr: T[]): arr is [T];
export declare function excactly<T>(length: 2, arr: T[]): arr is [T, T];
export declare function excactly<T>(length: 3, arr: T[]): arr is [T, T, T];
/**
 * Type guard that returns true if the value is not null or undefined
 *
 * The main usage is the filter function: `something.filter(notEmpty)`
 *
 * @param value A value that may or may not be null/undefined
 */
export declare function notEmpty<TValue>(value: TValue | null | undefined): value is TValue;
export declare function atMod<T>(arr: Array1<T>, indexMod: number): T;
export declare function zip<T, B>(arrT: Array1<T>, arrB: Array1<B>): Array1<[T, B]>;
/**
 * Returns the last element of the array
 * If the array is Array1, it will return `T`
 * otherwise it will return `T | undefined`
 *
 * @param arr An array of elements
 */
export declare function last<T>(arr: Array1<T>): T;
export declare function last<T>(arr: T[]): T | undefined;
/**
 * Filter the values of an array in 2 groups based on the predicate
 *
 * @param arr Array with some values
 * @param pred The predicate
 */
export declare function split<T>(arr: T[], pred: (elem: T, index: number) => boolean): {
    good: T[];
    bad: T[];
};
/**
 * Wrapper over `Promise.all()` that maintains the guarantees of the passed array
 *
 * @param promises A list of promises
 */
export declare function promiseAll<T>(promises: Array3<Promise<T>>): Promise<Array3<T>>;
export declare function promiseAll<T>(promises: Array2<Promise<T>>): Promise<Array2<T>>;
export declare function promiseAll<T>(promises: Array1<Promise<T>>): Promise<Array1<T>>;
export declare function promiseAll<T>(promises: Promise<T>[]): Promise<T[]>;
/**
 * Wrapper over `Promise.all(array.map(callback))` that maintains the guarantees of the array
 */
export declare function mapAll<T, B>(arr: Array3<T>, callback: (value: T, index: number) => Promise<B>): Promise<Array3<B>>;
export declare function mapAll<T, B>(arr: Array2<T>, callback: (value: T, index: number) => Promise<B>): Promise<Array2<B>>;
export declare function mapAll<T, B>(arr: Array1<T>, callback: (value: T, index: number) => Promise<B>): Promise<Array1<B>>;
export declare function mapAll<T, B>(arr: T[], callback: (value: T, index: number) => Promise<B>): Promise<B[]>;
/**
 * Reverses an array (creates a new array) maintaining its guarantees
 *
 * @param arr The array to reverse
 */
export declare function reverse<T>(arr: Array3<T>): Array3<T>;
export declare function reverse<T>(arr: Array2<T>): Array2<T>;
export declare function reverse<T>(arr: Array1<T>): Array1<T>;
export declare function reverse<T>(arr: Array1<T>): Array1<T>;
/**
 * Wrapper around `splice` that doesn't modify the initial array
 *
 * @param array
 * @param start
 * @param count
 * @param values
 */
export declare function immutableSplice<T>(array: T[], start: number, count: number, ...values: T[]): T[];
/**
 * Wrapper around `Object.keys` that returns a typed array instead of `string[]`
 *
 * @param value
 */
export declare function objKeys<T>(value: T): (keyof T)[];
/**
 * This function can be added in the default case of a switch statement
 * so that the switch is exhaustive (https://stackoverflow.com/a/39419171)
 * When this is added typescript will show an error if one of the possibilities
 * of an enum was not taken into account. See Compose.js setContent() for example
 */
export declare function unreachable(v: never): never;
export declare function promiseTimeout(millis: number): Promise<undefined>;
