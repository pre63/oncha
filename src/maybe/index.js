import Id from 'id'
import isNull from 'isNull'

// equals a -> b -> Boolean
const equals = a => b => a === b

// Nothing :: () -> Nothing
const Nothing = function Nothing() {
  return this instanceof Nothing
    ? Object.assign(this, {
        // ap :: Applicative -> Nothing
        ap: () => Nothing(),
        // chain :: ƒ -> Nothing
        chain: () => Nothing(),
        // map :: ƒ -> Nothing
        map: () => Nothing(),
        // else :: ƒ -> Maybe
        else: f => Maybe(f()),
        // equals :: Nothing -> Boolean
        equals: id => id.fold(equals()),
        // fold :: (a -> b) -> b
        fold: (f = a => a) => f(),
        // Any -> Maybe
        of: a => Maybe(a),
        // inspect :: () -> String
        inspect: () => 'Nothing()'
      })
    : new Nothing()
}

// getType :: a -> Maybe | Nothing
const getType = a => (isNull(a) ? Nothing : Maybe)

// Maybe :: a -> Maybe a
const Maybe = function Maybe(a) {
  return this instanceof Maybe
    ? Object.assign(this, {
        // ap :: Apply f -> Apply f a
        ap: app => app.map(f => f(a)),
        // chain :: Monad -> Monad
        chain: monad => monad(a),
        // else :: ƒ -> Maybe
        else: () => Maybe(a),
        // equals :: Maybe -> Boolean
        equals: id => id.fold(equals(a)),
        // map :: (a -> b) -> Maybe b
        map: f => Maybe(f(a)),
        // fold :: (a -> b) -> b
        fold: (f = a => a) => f(a),
        // of :: a -> Maybe a
        of: a => Maybe(a),
        // inspect :: undefined -> String
        inspect: () => `Maybe(${a})`
      })
    : new (getType(a))(a)
}

// of :: a -> Maybe a
Maybe.of = a => Maybe(a)

export default Maybe
