import Id from 'id'

// isFunction :: Any -> Boolean
const isFunction = func =>
  !!(func && func.constructor && func.call && func.apply)

// List :: Array -> List
const List = array => Id(array || []).map(Object.freeze).chain(list => ({
    // head :: -> List
    head: () => List(list.slice(0, 1)),
    // tail :: -> List
    tail: () => List(list.slice(1)),
    // fold :: ƒ -> Array
    fold: f => isFunction(f) ? f(list) : list,
    // nth :: Number -> Any
    nth: x => list[x],
    // concat :: List -> List
    concat: y => List(list.concat(y)),
    // length :: -> Number
    length: () => list.length,
    // every :: ƒ -> Boolean
    every: f => list.every(f),
    // filter :: ƒ -> List
    filter: f => List(list.filter(f)),
    // includes :: Object -> Boolean
    includes: f => list.includes(f),
    // indexOf :: Object -> Number
    indexOf: f => list.indexOf(f),
    // inspect :: -> String
    inspect: () => `List([${list}])`,
    // join :: ƒ -> String
    join: f => list.join(f),
    // lastIndexOf :: ƒ -> List
    lastIndexOf: f => list.lastIndexOf(f),
    // map :: ƒ -> List
    map: f => List(list.map(f)),
    // reduce :: ƒ -> Any
    reduce: f => list.reduce(f),
    // reduceRight :: ƒ -> Any
    reduceRight: f => list.reduceRight(f),
    // reverse :: -> List
    reverse: () => List(list.reverse()),
    // slice :: Number -> (Number -> List)
    slice: begin => end => List(list.slice(begin, end)),
    // some :: ƒ -> Boolean
    some: f => list.some(f),
    // of :: Array -> List
    of: List,
  }))

// Array -> List
List.of = List

export default List
