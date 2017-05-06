// identity :: ƒ -> (ƒ -> (Any -> Boolean))
export const identity = of => eq => x => eq(of(x).map(x => x), of(x))

// composition :: ƒ -> (ƒ -> (ƒ -> (ƒ -> (Any -> Boolean))))
export const composition = of => eq => f => g => x =>
  eq(of(x).map(x => f(g(x))), of(x).map(g).map(f))
