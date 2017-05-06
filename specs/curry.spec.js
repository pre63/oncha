import assert from 'assert'
import curry from '../package/curry'

describe('A curry', () => {
  it('should curry a function', () => assert.equal(curry((a, b, c) => a + b + c)(1, 2, 3), 6))

  const add = (a, b, c) => a + b + c
  const multiply = (a, b) => a * b

  it('should return a function that works like original without curring', () =>
    assert.equal(curry(add)(1, 1, 1), add(1, 1, 1)))

  it('should return a function that works like original without curring', () =>
    assert.equal(curry(multiply)(2, 2), multiply(2, 2)))

  it('should return a curried function', () => assert.equal(curry(add)(1)(1, 1), add(1, 1, 1)))

  it('should return a curried function', () => assert.equal(curry(add)(1)(2, 3), add(1, 2, 3)))

  it('should return a curried function', () => assert.equal(curry(add)(1, 2)(1), add(1, 2, 1)))

  it('should return a curried function', () => assert.equal(curry(add)(2)(1)(2), add(2, 1, 2)))

  it('should return a curried function', () => assert.equal(curry(multiply)(2)(3), multiply(2, 3)))

  it('should provide a curried function with no more arguments', () =>
    assert.equal(curry(add)(1, 1, 1, 5, 22), add(1, 1, 1)))

  it('should provide a curried function with no more arguments', () =>
    assert.equal(curry(add)(1)(1, 1, 3), add(1, 1, 1)))

  it('should provide a curried function with no more arguments', () =>
    assert.equal(curry(add)(1)(2, 3, 5), add(1, 2, 3)))

  it('should provide a curried function with no more arguments', () =>
    assert.equal(curry(add)(1, 2)(1, 1), add(1, 2, 1)))

  it('should provide a curried function with no more arguments', () =>
    assert.equal(curry(add)(2)(1)(2, 3, 5, 7, 8), add(2, 1, 2)))

  it('should provide a curried function with no more arguments', () =>
    assert.equal(curry(multiply)(2)(3, 22), multiply(2, 3)))

  it('should provide a curried function with no more arguments', () =>
    assert.equal(curry(multiply)(2, 2, 3, 4), multiply(2, 2)))
})
