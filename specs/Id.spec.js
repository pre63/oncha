import assert from 'assert'
import Id from '../package/id'

import { identity, composition } from '../src/laws/functor'
import { associativity } from '../src/laws/chain'

describe('A Id', () => {
  describe('as a monad', () => {
    const eq = (a, b) => assert(a.inspect() === b.inspect())

    it('is an identity', () => identity(Id.of)(eq)('Functional fun!'))

    it('is composable', () =>
      composition(Id.of)(eq)(x => x)(x => x)('Functional fun!'))

    it('can do maths', () => composition(Id.of)(eq)(x => x * 2)(x => x * 7)(3))

    it('is associative', () => associativity(Id)(eq)(7))
  })

  it('will map to uppercase', () => {
    Id('Simon').map(x => x.toUpperCase()).fold(x => assert.equal(x, 'SIMON'))
  })

  it('of will return a new Id', () => {
    assert.equal(Id.of('Simon').inspect(), Id('Simon').inspect())
  })

  it('inspect will format a correct Id', () => {
    assert.equal(Id('Simon').inspect(), 'Id(Simon)')
  })

  it('will be exactly 11', () => assert(Id(11).fold(x => x) === 11))

  it('will be exactly 12 when map is called', () => {
    const value = Id(11).map(value => value + 1).fold(x => x)
    assert(value === 12)
  })

  it('will be exactly 13 when bind is called', () => {
    const value = Id(12).chain(value => Id(value + 1)).fold(x => x)
    assert(value === 13)
  })

  it('will be exactly 12 when chain is called', () => {
    const value = Id(12).chain(value => Id(value)).fold(x => x)
    assert(value === 12)
  })

  it('will be exactly 12 after chain', () => {
    const value = Id(12).chain(value => Id(value)).fold(x => x)
    assert(value === 12)
  })

  it('Id.of || pure, should be 12', () => {
    const value = Id(17).of(12).fold(x => x)
    assert(value === 12)
  })

  it('Id.chain, should be 12', () => {
    const value = Id(Id(12)).chain(x => x).fold(x => x)
    assert(value === 12)
  })

  describe('as a Setoid', () => {
    const a = Id(2)
    const b = Id(2)
    const c = Id(2)

    it('should equal another right of the same value (reflexivity)', () =>
      assert.equal(a.equals(a), true))

    it('should equal the result of another equal (symmetry)', () =>
      assert.equal(a.equals(b), b.equals(a)))

    it('should equal the result of another equal (transitivity)', () =>
      assert.equal(a.equals(b) === b.equals(c) === a.equals(c), true))
  })
})
