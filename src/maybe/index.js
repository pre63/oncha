import Id from 'id'
import isNull from 'isNull'

// Nothing :: _ -> Nothing
const Nothing = () => ({
  // ap :: Applicative -> Nothing
  ap: () => Nothing(),
  // chain :: ƒ -> Nothing
  chain: () => Nothing(),
  // map :: ƒ -> Nothing
  map: () => Nothing(),
  // else :: ƒ -> Maybe
  else: f => Maybe(f()),
  // fold :: ƒ -> Any
  fold: (f = a => a) => f(),
  // Any -> Maybe
  of: x => Maybe(x),
  // inspect :: ƒ -> String
  inspect: () => 'Nothing()'
})

// Maybe :: Any -> Maybe
const Maybe = x =>
  Id(x).map(isNull).fold(
    nulled =>
      nulled
        ? Nothing()
        : {
            // ap :: Applicative -> Applicative
            ap: app => app.map(f => f(x)),
            // chain :: ƒ -> Any
            chain: f => f(x),
            // equals :: Right -> Boolean
            equals: (r, e = a => a === x) => r.fold(e, e),
            // map :: ƒ -> Maybe
            map: f => Maybe(f(x)),
            // fold :: ƒ -> Any
            fold: (f = a => a) => f(x),
            // else :: ƒ -> Maybe
            else: () => Maybe(x),
            // Any -> Maybe
            of: x => Maybe(x),
            // inspect :: -> String
            inspect: () => `Maybe(${x})`
          })

// Any -> Maybe
Maybe.of = x => Maybe(x)

export default Maybe
