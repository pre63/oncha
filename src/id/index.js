// equals a -> b -> Boolean
const equals = a => b => a === b

// Identity :: a -> Identity a
const Id = function Id(a) {
  return this instanceof Id
    ? Object.assign(this, {
        // ap :: Apply f -> Apply f a
        ap: app => app.map(f => f(a)),
        // chain :: Monad -> Monad
        chain: monad => monad(a),
        // equals :: Id -> Boolean
        equals: id => id.fold(equals(a)),
        // map :: (a -> b) -> Id b
        map: f => Id(f(a)),
        // fold :: a -> b -> b
        fold: (f = a => a) => f(a),
        // of :: a -> Id a
        of: x => Id(x),
        // inspect :: undefined -> String
        inspect: () => `Id(${a})`
      })
    : new Id(a)
}

// of :: a -> Id a
Id.of = Id

export default Id
