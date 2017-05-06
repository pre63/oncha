import assert from 'assert'
import Id from '../package/id'

import { identity, composition } from '../src/laws/functor'
import { associativity } from '../src/laws/chain'

describe('A Id', () => {
  describe('as a monad', () => {
    const eq = (a, b) => assert(a.inspect() === b.inspect())

    it('is an identity', () => identity(Id.of)(eq)('Functional fun!'))

    it('is composable', () => composition(Id.of)(eq)(x => x)(x => x)('Functional fun!'))

    it('can do maths', () => composition(Id.of)(eq)(x => x * 2)(x => x * 7)(3))

    it('is associative', () => associativity(Id)(eq)(7))
  })

  describe('as a applicative', () => {
    const add = a => b => a + b
    const mul = a => b => a * b
    const a = Id(mul(10))
    const u = Id(add(7))
    const v = Id(10)

    it('is an Apply', () =>
      assert.deepEqual(
        v.ap(u.ap(a.map(f => g => x => f(g(x))))).inspect(),
        v.ap(u).ap(a).inspect()))

    it('is an Apply solves to 170', () =>
      assert.deepEqual(v.ap(u.ap(a.map(f => g => x => f(g(x))))).fold(), 170))

    it('is an Apply solves to 170', () => assert.deepEqual(v.ap(u).ap(a).fold(), 170))

    it('is an Applicative identity', () => assert.equal(v.ap(Id.of(x => x)).inspect(), v.inspect()))

    it('is an Applicative homomorphism', () =>
      assert.equal(Id.of(10).ap(Id.of(add(78))).inspect(), Id.of(add(78)(10)).inspect()))

    it('is an Applicative interchange', () =>
      assert.equal(Id.of(10).ap(u).inspect(), u.ap(Id.of(f => f(10))).inspect()))
  })

  it('will map to uppercase', () => {
    Id('Exalted').map(x => x.toUpperCase()).fold(x => assert.equal(x, 'EXALTED'))
  })

  it('of will return a new Id', () => {
    assert.equal(Id.of('Exalted').inspect(), Id('Exalted').inspect())
  })

  it('inspect will format a correct Id', () => {
    assert.equal(Id('Exalted').inspect(), 'Id(Exalted)')
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
