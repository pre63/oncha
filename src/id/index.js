// Id :: Any -> Id
const Id = x => ({
  // chain :: ƒ -> Monad
  chain: f => f(x),
  // map :: ƒ -> Id
  map: f => Id(f(x)),
  // fold :: ƒ -> Any
  fold: f => f(x),
  // ap :: ƒ -> Any
  ap: f => x(f),
  // of :: Any -> Id
  of: x => Id(x),
  // inspect :: -> String
  inspect: () => `Id(${x})`
})

// of :: Any -> Id
Id.of = x => Id(x)

export default Id
