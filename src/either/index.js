import isNull from 'isNull'

// fromNullable :: Any -> Left | Right
export const fromNullable = x => (isNull(x) ? Left : Right)(x)

// Right :: Any -> Right
export const Right = x => ({
  // chain :: ƒ -> Monad
  chain: f => f(x),
  // map :: ƒ -> Right
  map: f => Right(f(x)),
  // fold :: (ƒ, ƒ) -> Any
  fold: (f, g) => g(x),
  // fromNullable :: Any -> Left | Right
  fromNullable,
  // inspect :: -> String
  inspect: () => `Right(${x})`
})

// of :: Any -> Right
Right.of = x => Right(x)

// Left :: Any -> Left
export const Left = x => ({
  // chain :: ƒ -> Left
  chain: () => Left(x),
  // map :: ƒ -> Left
  map: () => Left(x),
  // fold :: (ƒ, ƒ) -> Any
  fold: f => f(x),
  // fromNullable :: Any -> Left | Right
  fromNullable,
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
