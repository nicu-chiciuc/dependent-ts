/**
 * Wrapper around `Object.keys` that returns a typed array instead of `string[]`
 *
 * @param value
 */
export function objKeys<T extends object>(value: T): (keyof T)[] {
  return Object.keys(value) as (keyof T)[]
}

export function objEntries<Obj extends Record<PropertyKey, unknown>>(
  value: Obj
): [keyof Obj, Obj[keyof Obj]][] {
  // @ts-expect-error We expect an error here
  return Object.entries(value)
}

export function objFromEntries<Key extends PropertyKey, Value extends unknown>(
  entries: ReadonlyArray<[Key, Value]>
): Record<Key, Value> {
  // @ts-expect-error We expect an error here
  return Object.fromEntries(entries)
}

export function objMapEntries<
  Obj extends Record<PropertyKey, unknown>,
  ResultKey extends PropertyKey,
  ResultValue extends unknown
>(
  value: Obj,
  callback: (entry: [key: keyof Obj, value: Obj[keyof Obj]]) => [ResultKey, ResultValue]
): Record<ResultKey, ResultValue> {
  return objFromEntries(objEntries(value).map(callback))
}
