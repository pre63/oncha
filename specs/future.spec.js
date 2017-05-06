import assert from 'assert'
import Future from '../package/future'

const toUpperCase = s => s.toUpperCase()

describe('A Future', () => {
  it('should map over the data', () =>
    Future((reject, resolve) => resolve('hello exalted one'))
      .map(toUpperCase)
      .fork(error => assert(false, error), data => assert(data === 'HELLO EXALTED ONE')))

  it('should return future after fork', () => {
    Future((reject, resolve) => {
      resolve(true)
      return 'this worked'
    })
      .fork(error => assert(false, error), data => assert(data))
      .fork(error => assert(false, error), data => assert(data === 'this worked'))
  })

  it('should not execute untill fork is called', () => {
    /**
       * I'm using assignment here because I
       * have to track as a side effect, the
       * map function call.
       */
    let executed = false
    const f = Future((reject, resolve) => {
      executed = true
      resolve(true)
    })

    assert(!executed)

    f.fork(
      () => assert(false, 'should not get here'),
      data => {
        assert(data === true)
        assert(executed === true)
      })
  })

  it('should not execute map untill fork is called', () => {
    /**
       * I'm using assignment here because I
       * have to track as a side effect, the
       * map function call.
       */
    let executed = false
    const f = Future((reject, resolve) => {
      executed = true
      resolve(true)
    })

    f.map(a => {
      executed = false
      return a
    })

    assert(!executed, 'should not execute')

    f.fork(
      () => assert(false, 'should not get here'),
      data => {
        assert(data === true)
        assert(executed === true)
      })
  })

  it('should handle promise fulfill', () => {
    const data = { fulfill: true }
    const promise = new Promise((fulfill, reject) => fulfill(data))

    Future.fromPromise(promise).fork(
      () => assert(false, 'promise should have fulfilled'),
      val => assert(val === data))
  })

  it('should handle promise reject', () => {
    const data = { fulfill: false }
    const promise = new Promise((fulfill, reject) => reject(data))
    const f = Future.fromPromise(promise)

    Future.fromPromise(promise).fork(
      val => assert(val === data),
      () => assert(false, 'promise should have rejected'))
  })

  it('should chain futures from promises', () => {
    Future.fromPromise(new Promise((fulfill, reject) => fulfill('1')))
      .chain(data => Future.fromPromise(new Promise((fulfill, reject) => fulfill(data + '2'))))
      .fork(() => assert(false, 'promise should have fulfilled'), val => assert(val === '12'))
  })
})
