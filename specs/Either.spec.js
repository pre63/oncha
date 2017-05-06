import assert from 'assert'
import Id from '../package/id'
import { Either, Right, Left, fromNullable } from '../package/either'

describe('A Either', () => {
  it('should not call the map function when created from nullable', () =>
    fromNullable(null)
      .map(() => assert(false))
      .map(() => assert(false))
      .map(() => assert(true)))

  it('should return x with code 200', () =>
    Either.fromNullable({ ok: true, code: 200, body: 'yay!' }).fold(
      x => x,
      x => assert.equal(x.code, 200)))

  it('should fold left', () =>
    Either.fromNullable(null).fold(
      x => assert.equal(x, null),
      () => assert(false)))

  it('should chain to Id', () =>
    fromNullable('Simon').chain(Id.of).fold(x => assert.equal(x, 'Simon')))

  it('should build right', () =>
    assert.equal(Right('Simon').inspect(), 'Right(Simon)'))

  it('should build left', () =>
    assert.equal(Left('Simon').inspect(), 'Left(Simon)'))

  describe('as a Setoid', () => {
    const rightA = Right(2)
    const rightB = Right(2)
    const rightC = Right(2)

    it('should equal another right of the same value (reflexivity)', () =>
      assert.equal(rightA.equals(rightA), true))

    it('should equal the result of another equal (symmetry)', () =>
      assert.equal(rightA.equals(rightB), rightB.equals(rightA)))

    it('should equal the result of another equal (transitivity)', () =>
      assert.equal(
        rightA.equals(rightB) ===
          rightB.equals(rightC) ===
          rightA.equals(rightC),
        true
      ))

    const leftA = Left(2)
    const leftB = Left(2)
    const leftC = Left(2)

    it('should equal another left of the same value (reflexivity)', () =>
      assert.equal(leftA.equals(leftA), true))

    it('should equal the result of another equal (symmetry)', () =>
      assert.equal(leftA.equals(leftB), leftB.equals(leftA)))

    it('should equal the result of another equal (transitivity)', () =>
      assert.equal(
        leftA.equals(leftB) === leftB.equals(leftC) === rightA.equals(leftC),
        true
      ))
  })
})
