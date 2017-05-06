import Id from 'id'
import isNull from 'isNull'

// Nothing :: _ -> Nothing
const Nothing = () => ({
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
            // chain :: ƒ -> Any
            chain: f => f(x),
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
