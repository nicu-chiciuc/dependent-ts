import { objEntries, objFromEntries, objKeys } from '../src/object'
import { expectType } from '../src/utils'

describe('object.ts', () => {
  describe('objKeys()', () => {
    it('should behave exactly as Object.keys()', () => {
      const obj = { a: 1, b: 2, c: 3 }

      expect(objKeys(obj)).toStrictEqual(['a', 'b', 'c'])
    })

    it('should return a typed array', () => {
      const obj = { a: 1, b: 2, c: 3 }

      const keys = objKeys(obj)

      expectType<('a' | 'b' | 'c')[]>()(keys, true)
    })
  })

  describe('objEntries()', () => {
    it('should behave exactly as Object.entries()', () => {
      const obj = { a: 1, b: 2, c: 3 }

      expect(objEntries(obj)).toStrictEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    })

    it('should return a typed array', () => {
      const obj = { a: 1, b: 2, c: 'three' }

      const entries = objEntries(obj)

      expectType<['a' | 'b' | 'c', number | string][]>()(entries, true)
    })

    it('should support const values', () => {
      const obj = { a: 1, b: 2, c: 'three' } as const

      const entries = objEntries(obj)

      expectType<['a' | 'b' | 'c', 1 | 2 | 'three'][]>()(entries, true)
    })
  })
  
  describe('objFromEntries()', () => {
    it('should behave exactly as Object.fromEntries()', () => {
      const entries = objEntries({ a: 1, b: 2, c: 3 })

      expect(objFromEntries(entries)).toStrictEqual({ a: 1, b: 2, c: 3 })
    })

    it('should return a typed object', () => {
      const entries = objEntries({ a: 1, b: 2, c: 3 })

      const obj = objFromEntries(entries)

      expectType<{ a: number; b: number; c: number }>()(obj, true)
    })

    it('should support const values', () => {
      const entries = [
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ] as const

      const obj = objFromEntries(entries)

      expectType<{ a: 1; b: 2; c: 3 }>()(obj, true)
    })
  }
})
