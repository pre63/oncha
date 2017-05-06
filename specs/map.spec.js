import assert from 'assert'
import map from '../package/map'

describe('A map', () => {
  it('will compose map 1 function with 1 arguments', () =>
    assert.deepEqual(map(a => a * 2)([1, 2, 3]), [2, 4, 6]))

  it('will compose map 2 function with 1 arguments', () =>
    assert.deepEqual(map(a => a * 7, a => a * 2)([1, 2, 3]), [14, 28, 42]))
})
