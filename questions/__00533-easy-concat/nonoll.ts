import type { Equal, Expect } from '@type-challenges/utils'

const tuple = [1] as const

type ConcatGenericType = readonly unknown[]

type Concat<T extends ConcatGenericType, U extends ConcatGenericType> = [
  ...T,
  ...U,
]

type Result1 = Concat<[1], [2]> // expected to be [1, 2]
//     ^?

type Result2 = Concat<[1, 2], [3, 4]> // expected to be [1, 2, 3, 4]
//     ^?

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<
    Equal<
      Concat<['1', 2, '3'], [false, boolean, '4']>,
      ['1', 2, '3', false, boolean, '4']
    >
  >,
]

// @ts-expect-error
type error = Concat<null, undefined>
