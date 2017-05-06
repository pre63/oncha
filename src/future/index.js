import curry from 'curry'

// fork :: (ƒ -> ƒ -> Any) -> ƒ -> ƒ -> Future
const fork = action => curry((error, success) => Future.of(action(error, success)))

// chain :: (ƒ -> ƒ -> Any) -> (Any -> Future) -> Future
const chain = action => func =>
  Future((reject, resolve) =>
    fork(action)(e => reject(e), data => func(data).fork(reject, resolve)))

// Future :: (ƒ -> ƒ -> Any) -> Future
const Future = action => ({
  // map :: (Any -> Any) -> Future
  map: func => chain(action)(x => Future.of(func(x))),
  // chain :: (Any -> Future) -> Future
  chain: chain(action),
  // fork :: ƒ -> ƒ -> Any
  fork: fork(action),
  // fold:: (a -> a) -> a
  fold: (f = a => a) => action(f, f)
})

// of :: Any -> Future
Future.of = x => Future((reject, resolve) => resolve(x))

// fromPromise :: Promise -> Future
Future.fromPromise = promise => Future((reject, resolve) => promise.then(resolve, reject))

export default Future
