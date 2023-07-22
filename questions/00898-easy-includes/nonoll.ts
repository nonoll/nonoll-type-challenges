import type { Equal, Expect } from '@type-challenges/utils'

type IncludesGenericType = readonly unknown[]

type IncludesMatchedValue<Value, Type> = Value extends Type ? true : '222'

type Includes<T extends IncludesGenericType, U> = T extends [
  infer Value,
  ...infer Rest extends IncludesGenericType,
]
  ? Value extends U
    ? IncludesMatchedValue<Value, U>
    : Includes<Rest, U>
  : false

type Result1 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>
//     ^?

type Result2 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'aaaa'>
//     ^?

type Result3 = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>
//     ^?

type Result4 = Includes<[{}], { a: 'A' }>
//     ^?

type cases = [
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>
  >,
  Expect<
    Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]
