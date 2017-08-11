import curry from 'curry'

// isFunction :: Any -> Boolean
const isFunction = func => !!(func && func.constructor && func.call && func.apply)

// defaultTolist :: (a, b -> c) -> c
const defaultTolist = (array, func) => func(Array.isArray(array) ? array : [])

// List :: Array -> List
const List = function List(array) {
  return this instanceof List
    ? Object.assign(
        this,
        defaultTolist(array, list => ({
          // head :: () -> List
          head: () => List(list.slice(0, 1)),
          // tail :: () -> List
          tail: () => List(list.slice(1)),
          // fold :: (Any -> Any) -> Array
          fold: (f = a => a) => (isFunction(f) ? f(list) : list),
          // nth :: Number -> Any
          nth: x => list[x],
          // concat :: List... -> List
          concat: (...y) => List(list.concat(...y)),
          // length :: () -> Number
          length: () => list.length,
          // every :: (Any -> Boolean) -> Boolean
          every: f => list.every(f),
          // filter :: (Any -> Boolean) -> List
          filter: f => List(list.filter(f)),
          // includes :: Any -> Boolean
          includes: x => list.indexOf(x) !== -1,
          // indexOf :: Any -> Number
          indexOf: x => list.indexOf(x),
          // inspect :: () -> String
          inspect: () => `List([${list}])`,
          // join :: String -> String
          join: s => list.join(s),
          // lastIndexOf :: Any -> List
          lastIndexOf: x => list.lastIndexOf(x),
          // map :: (Any -> Any) -> List
          map: f => List(list.map(f)),
          // reduce :: (b -> a -> b) -> b -> List of a -> b
          reduce: f => a => list.reduce((acc, elem) => f(acc)(elem), a),
          // reduceRight :: (b -> a -> b) -> b -> List of a -> b
          reduceRight: f => a => list.reduceRight((acc, elem) => f(acc)(elem), a),
          // reverse :: () -> List
          reverse: () => List(list.reverse()),
          // slice :: Number -> Number -> List
          slice: curry((begin, end) => List(list.slice(begin, end))),
          // some :: (Any -> Boolean) -> Boolean
          some: f => list.some(f),
          // of :: Array -> List
          of: List
        })))
    : new List(array)
}

// Array -> List
List.of = List

export default List
