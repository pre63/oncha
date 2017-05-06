import assert from 'assert'
import Id from '../package/id'
import { Either, Right, Left, fromNullable } from '../package/either'

describe('A Either', () => {
  it('should not call the map function when created from nullable', () =>
    fromNullable(null).map(() => assert(false)).map(() => assert(false)).map(() => assert(true)))

  it('should return x with code 200', () =>
    Either.fromNullable({ ok: true, code: 200, body: 'yay!' }).fold(
      x => x,
      x => assert.equal(x.code, 200)))

  it('should fold left', () =>
    Either.fromNullable(null).fold(x => assert.equal(x, null), () => assert(false)))

  it('should chain to Id', () =>
    fromNullable('Exalted').chain(Id.of).fold(x => assert.equal(x, 'Exalted')))

  it('should build right', () => assert.equal(Right('Exalted').inspect(), 'Right(Exalted)'))

  it('should build left', () => assert.equal(Left('Exalted').inspect(), 'Left(Exalted)'))

  describe('as a Setoid', () => {
    const rightA = Right(2)
    const rightB = Right(2)
    const rightC = Right(2)

    it('should equal another right of the same value (reflexivity)', () =>
      assert.equal(rightA.equals(rightA), true))

    it('should equal the result of another equal (symmetry)', () =>
      assert.equal(rightA.equals(rightB), rightB.equals(rightA)))

    it('should equal the result of another equal (transitivity)', () =>
      assert.equal(rightA.equals(rightB) === rightB.equals(rightC) === rightA.equals(rightC), true))

    const leftA = Left(2)
    const leftB = Left(2)
    const leftC = Left(2)

    it('should equal another left of the same value (reflexivity)', () =>
      assert.equal(leftA.equals(leftA), true))

    it('should equal the result of another equal (symmetry)', () =>
      assert.equal(leftA.equals(leftB), leftB.equals(leftA)))

    it('should equal the result of another equal (transitivity)', () =>
      assert.equal(leftA.equals(leftB) === leftB.equals(leftC) === rightA.equals(leftC), true))
  })

  describe('as a Right and as a applicative', () => {
    const add = a => b => a + b
    const mul = a => b => a * b
    const a = Right(mul(10))
    const u = Right(add(7))
    const v = Right(10)

    it('is an Apply', () =>
      assert.deepEqual(
        v.ap(u.ap(a.map(f => g => x => f(g(x))))).inspect(),
        v.ap(u).ap(a).inspect()))

    it('is an Apply solves to 170 a', () =>
      assert.deepEqual(v.ap(u.ap(a.map(f => g => x => f(g(x))))).fold(a => a), 170))

    it('is an Apply solves to 170 b', () => assert.deepEqual(v.ap(u).ap(a).fold(a => a), 170))

    it('is an Applicative identity', () =>
      assert.equal(v.ap(Right.of(x => x)).inspect(), v.inspect()))

    it('is an Applicative homomorphism', () =>
      assert.equal(Right.of(10).ap(Right.of(add(78))).inspect(), Right.of(add(78)(10)).inspect()))

    it('is an Applicative interchange', () =>
      assert.equal(Right.of(10).ap(u).inspect(), u.ap(Right.of(f => f(10))).inspect()))
  })

  describe('as a Left and as a applicative', () => {
    const add = a => b => a + b
    const mul = a => b => a * b
    const a = Left(mul(10))
    const u = Left(add(7))
    const v = Left(10)

    it('is an Apply', () =>
      assert.deepEqual(
        v.ap(u.ap(a.map(f => g => x => f(g(x))))).inspect(),
        v.ap(u).ap(a).inspect()))

    it('is an Apply solves to 170', () =>
      assert.deepEqual(v.ap(u.ap(a.map(f => g => x => f(g(x))))).fold(a => a), 10))

    it('is an Apply solves to 170', () => assert.deepEqual(v.ap(u).ap(a).fold(a => a), 10))

    it('is an Applicative identity', () =>
      assert.equal(v.ap(Left.of(x => x)).inspect(), v.inspect()))

    it('is an Applicative homomorphism', () =>
      assert.equal(Left.of(10).ap(Left.of(add(78))).inspect(), Left.of(add(0)(10)).inspect()))

    it('is an Applicative interchange', () =>
      assert.equal(Left.of(10).ap(u).inspect(), v.ap(Left.of(f => f(10))).inspect()))
  })
})
