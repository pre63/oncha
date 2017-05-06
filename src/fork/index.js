// fork :: (a -> b) -> (a -> b) -> Forkable -> b
const fork = left => right => forkable => forkable.fork(left, right)

export default fork
