import assert from 'assert'
import List from '../package/list'

const list = List([1, 2, 3])
const head = list.head()
const tail = list.tail()

describe('A List', () => {
  it('should have a lenght of 1 ', () => assert.equal(head.length(), 1))

  it('should not be an array', () => assert.equal(Array.isArray(tail), false))

  it('should tail to legnth of 2 ', () => assert.equal(tail.length(), 2))

  it('should nth', () => assert.equal(tail.nth(1), 3))

  it('should have a length of 3', () => assert.equal(list.length(), 3))

  it('should be [1,2,3] when inspecting', () =>
    assert.equal(list.inspect(), 'List([1,2,3])'))

  it('should be true when every is called', () =>
    assert.equal(List.of([1, 2, 3]).every(x => x < 4), true))

  it('should return an array of one when filtered', () =>
    assert.equal(List.of([1, 2, 3]).filter(x => x < 2).length(), 1))

  it('should include 2', () =>
    assert.equal(List.of([1, 2, 3]).includes(2), true))

  it('should return 1 as an indexOf 2', () =>
    assert.equal(List.of([1, 2, 3]).indexOf(2), 1))

  it('should the last index of ', () =>
    assert.equal(List.of([1, 2, 3, 3, 3, 3]).lastIndexOf(3), 5))

  it('should should not be modified when using of ', () =>
    assert.equal(List.of([1, 2, 3]).inspect(), 'List([1,2,3])'))

  it('should return 1,2,3 on an parmeterless join', () =>
    assert.equal(List.of([1, 2, 3]).join(), '1,2,3'))

  it('should double values calling map', () =>
    assert.equal(
      List.of([1, 2, 3]).map(x => x * 2).inspect(),
      'List([2,4,6])'
    ))

  it('should be true caling some (x === 3)', () =>
    assert.equal(List.of([1, 2, 3]).some(x => x === 3), true))

  it('should slice first index of array', () =>
    assert.equal(List.of([1, 2, 3]).slice(0)(1).inspect(), 'List([1])'))

  it('should have a lenght of 4', () =>
    assert.equal(list.concat([5], [6, 7]).length(), 6))
})
