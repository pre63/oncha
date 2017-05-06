import compose from 'compose'

// map :: (a -> b) -> Functor -> Functor
const map = f => functor => functor.map(f)

// composeMap :: ... -> (Any -> Any)
export default (...functions) => functor => functions.reduceRight((acc, f) => map(f)(acc), functor)
