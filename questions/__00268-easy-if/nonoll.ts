import type { Equal, Expect } from '@type-challenges/utils'

type If<C extends boolean, T, F> = C extends true ? T : F

type Result1 = If<true, 'a', 'b'> // expected to be 'a'
//     ^?

type Result2 = If<false, 'a', 'b'> // expected to be 'b'
//     ^?

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>
