import assert from 'assert'
import Id from '../../package/id'
import reduce from '../../package/array/reduce'
import log from '../../package/console/log'

describe('A reduce', () => {
  it('shoud reduce arrays to a single value', () =>
    Id([1, 2, 3])
      .map(reduce((acc, x) => acc + x)(0))
      .map(a => a === 6)
      .map(assert))

  it('shoud reduce arrays to a single array', () =>
    Id([[1], [2], [3]])
      .map(reduce((acc, x) => acc.concat(x))([]))
      .map(a => assert.deepEqual(a, [1, 2, 3])))

  it('shoud reduce arrays to a single array when empty', () =>
    Id([[], [], []])
      .map(reduce((acc, x) => acc.concat(x))([]))
      .map(a => assert.deepEqual(a, [])))
})
