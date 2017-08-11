import curry from 'curry'
import isNull from 'isNull'

// fromNullable :: Any -> Left | Right
export const fromNullable = x => (isNull(x) ? Left : Right)(x)

// isFunction :: Any -> Boolean
const isFunction = func => !!(func && func.constructor && func.call && func.apply)

// equals a -> b -> Boolean
const equals = a => b => a === b

// Right :: a -> Right a
export const Right = function Right(a) {
  return this instanceof Right
    ? Object.assign(this, {
        // ap :: Apply -> Apply
        ap: app => app.map(f => f(a)),
        // chain :: Monad -> Monad
        chain: monad => monad(a),
        // equals :: Right -> Boolean
        equals: r => r.fold(equals(a), equals(a)),
        // map :: ƒ -> Right
        map: f => Right(f(a)),
        // fold :: (a -> a, a -> a) -> Any
        fold: curry((f, g = a => a) => g(a)),
        // inspect :: -> String
        inspect: () => `Right(${a})`
      })
    : new Right(a)
}

// of :: Any -> Right
Right.of = Right

// Left :: Any -> Left
export const Left = function Left(a) {
  return this instanceof Left
    ? Object.assign(this, {
        // ap :: Applicative -> Applicative
        ap: app => Left(a),
        // chain :: ƒ -> Left
        chain: () => Left(a),
        // equals :: Right -> Boolean
        equals: r => r.fold(equals(a), equals(a)),
        // map :: ƒ -> Left
        map: () => Left(a),
        // fold :: (ƒ, ƒ) -> Any
        fold: (f = a => a) => f(a),
        // inspect :: -> String
        inspect: () => `Left(${a})`
      })
    : new Left(a)
}

// of :: Any -> Left
Left.of = Left

// callIfFunction :: (A | (a -> b)) -> (A | (a | b))
const callIfFunction = f => (isFunction(f) ? f() : f)

// cond :: (() -> Boolean) -> (() -> c) -> (() -> d) -> c | d
// cond :: (() -> Boolean) -> c -> d -> c | d
// cond :: Boolean -> b -> c -> b | c
const cond = curry(
  (cond, left, right) => (callIfFunction(cond) ? callIfFunction(right) : callIfFunction(left)))

// fromCond :: (() -> Boolean) -> a -> b -> Either
// fromCond :: Boolean -> a -> b -> Either
const fromCond = curry((cond, left, right) => (callIfFunction(cond) ? Right(right) : Left(left)))

// Either :: Either
export const Either = {
  cond,
  fromCond,
  fromNullable,
  Left,
  Right
}

export default Either
