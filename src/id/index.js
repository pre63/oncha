// Id :: Any -> Id
const Id = x => ({
  // ap :: Applicative -> Applicative
  ap: app => app.map(f => f(x)),
  // chain :: ƒ -> Monad
  chain: f => f(x),
  // equals :: Id -> Boolean
  equals: (id, e = a => a === x) => id.fold(e),
  // map :: ƒ -> Id
  map: f => Id(f(x)),
  // fold :: ƒ -> Any
  fold: (f = a => a) => f(x),
  // of :: Any -> Id
  of: x => Id(x),
  // inspect :: -> String
  inspect: () => `Id(${x})`
})

// of :: Any -> Id
Id.of = x => Id(x)

export default Id
