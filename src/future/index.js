import curry from 'curry'

// fork :: (ƒ -> ƒ -> Any) -> ƒ -> ƒ -> Future
const fork = action => curry((error, success) => action(error, success))

// chain :: (ƒ -> ƒ -> Any) -> (Any -> Future) -> Future
const chain = action => func =>
  Future((reject, resolve) =>
    fork(action)(e => reject(e), data => func(data).fork(reject, resolve)))

// Future :: (ƒ -> ƒ -> Any) -> Future
const Future = function Future(action) {
  return this instanceof Future
    ? Object.assign(this, {
        // map :: (Any -> Any) -> Future
        map: func => chain(action)(a => Future.of(func(a))),
        // chain :: (Any -> Future) -> Future
        chain: chain(action),
        // fork :: ƒ -> (a -> b) -> b
        fork: fork(action),
        // fold:: (a -> b) -> b
        fold: (f = a => a) => action(f, f)
      })
    : new Future(action)
}

// countSparse :: Array -> Number
const countSparse = arr => arr.filter(x => x !== undefined).length

// all :: [Future] -> Future
const all = futures =>
  Future((left, right, errored = false) =>
    futures.reduce(
      (results, future, i) =>
        (future.fork(
          error => !errored && ((errored = true), left(error)),
          result =>
            ((results[i] = result), !errored &&
              countSparse(results) === futures.length &&
              right(results))
        ), results),
      []
    ))

// of :: a -> Future a
Future.of = a => Future((reject, resolve) => resolve(a))

// fromPromise :: Promise a -> Future a
Future.fromPromise = promise =>
  Future((reject, resolve) => Future.fromPromise(promise.then(resolve, reject)))

// all :: [Future] -> Future
Future.all = (...futures) => all([].concat(...futures))

export default Future
