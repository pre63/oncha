import assert from 'assert'
import compose from '../package/compose'

describe('A compose', () => {
  it('will compose one function', () => assert.equal(compose(a => a)('exalted'), 'exalted'))

  it('will compose two function', () => assert.equal(compose(a => a, a => a)('exalted'), 'exalted'))

  it('will compose three function', () =>
    assert.equal(compose(a => a, a => a, a => a)('exalted'), 'exalted'))

  it('will compose two function that add 1', () =>
    assert.equal(compose(a => a + 1, a => a + 1)(1), 3))

  it('will compose three function that add 1', () =>
    assert.equal(compose(a => a + 1, a => a + 1, a => a + 1)(1), 4))

  it('will compose three function that multiply', () =>
    assert.equal(compose(a => a * 7, a => a * 4, a => a * 5)(3), 420))

  it('will compose one function with 2 arguments', () =>
    assert.equal(compose((a, b) => a + b)(1, 2), 3))

  it('will compose two functions with 2 arguments', () =>
    assert.equal(compose(a => a, (a, b) => a + b)(1, 2), 3))

  it('will compose three functions with 3 arguments', () =>
    assert.equal(compose(a => a, (a, b, c) => a + b + c)(1, 2, 3), 6))
})
