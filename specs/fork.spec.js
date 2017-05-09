import assert from 'assert'
import fork from '../package/fork'
import Future from '../package/future'

const toUpperCase = s => s.toUpperCase()

describe('A Fork', () => {
  it('should fork a forkable', () =>
    assert.equal(fork(a => a)(b => b)({ fork: (a, b) => b('exalted') }), 'exalted'))

  it('should fork a future', () =>
    assert.equal(fork(a => a)(b => b)(Future.of('EXALTED!')), 'EXALTED!'))
})
