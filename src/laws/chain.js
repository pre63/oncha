// associativity :: Type -> (eq -> (x -> Boolean)))
export const associativity = t => eq => x =>
  eq(t.of(x).chain(t.of).chain(t.of), t.of(x).chain(x => t.of(x).chain(t.of)))

export default associativity
