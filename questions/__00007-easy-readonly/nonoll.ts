import type { Equal, Expect } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type MyReadonly<T extends object> = {
  readonly [P in keyof T]: T[P]
}

type Resolve1 = MyReadonly<Todo1>
//     ^?

// @ts-expect-error
type Error1 = MyReadonly<1>
//     ^?

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>]
