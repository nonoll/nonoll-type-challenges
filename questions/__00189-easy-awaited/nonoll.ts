import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type PromiseThenType<T = unknown, U = unknown> = (
  onfulfilled: (arg: T) => U,
) => U

type PromiseType<T = unknown> = {
  then: PromiseThenType<T>
}

type MyAwaited<T extends PromiseType> = T extends {
  then: (onfulfilled: (arg: infer Value) => any) => any
}
  ? Value extends PromiseType
    ? MyAwaited<Value>
    : Value
  : never

type ExampleType = Promise<string>

type Result1 = MyAwaited<ExampleType> // string
//     ^?

type Result2 = MyAwaited<Y>
//     ^?

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>
