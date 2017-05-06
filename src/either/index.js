import curry from 'curry'
import isNull from 'isNull'

// fromNullable :: Any -> Left | Right
export const fromNullable = x => (isNull(x) ? Left : Right)(x)

// Right :: Any -> Right
export const Right = x => ({
  // ap :: Applicative -> Applicative
  ap: app => app.map(f => f(x)),
  // chain :: ƒ -> Monad
  chain: f => f(x),
  // equals :: Right -> Boolean
  equals: (r, e = a => a === x) => r.fold(e, e),
  // map :: ƒ -> Right
  map: f => Right(f(x)),
  // fold :: (a -> a, a -> a) -> Any
  fold: curry((f, g = a => a) => g(x)),
  // inspect :: -> String
  inspect: () => `Right(${x})`
})

// of :: Any -> Right
Right.of = x => Right(x)

// Left :: Any -> Left
export const Left = x => ({
  // ap :: Applicative -> Applicative
  ap: app => Left(x),
  // chain :: ƒ -> Left
  chain: () => Left(x),
  // equals :: Right -> Boolean
  equals: (r, e = a => a === x) => r.fold(e, e),
  // map :: ƒ -> Left
  map: () => Left(x),
  // fold :: (ƒ, ƒ) -> Any
  fold: (f = a => a) => f(x),
  // inspect :: -> String
  inspect: () => `Left(${x})`
})

// of :: Any -> Left
Left.of = x => Left(x)

// Either :: Either
export const Either = {
  fromNullable,
  Left,
  Right
}

export default Either
