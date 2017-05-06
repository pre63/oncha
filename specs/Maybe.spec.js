import assert from 'assert'
import Maybe from '../package/maybe'

describe('A Maybe', () => {
  it('assert inspect will return a formatted maybe', () =>
    assert.equal(Maybe('Simon').inspect(), 'Maybe(Simon)'))

  it('assert else is ignored', () =>
    Maybe('Simon')
      .map(x => x.toUpperCase())
      .else(() => 'null value')
      .fold(x => assert(x, 'SIMON')))

  it('assert else is executed', () =>
    Maybe()
      .map(x => x.toUpperCase())
      .else(() => 'null value')
      .map(x => x.toUpperCase())
      .fold(x => assert(x, 'NULL VALUE')))

  const helloBill = Maybe('Hello Bill')
  const nothing = Maybe()

  describe('with a value', () => {
    it('will be transformed by a map', () =>
      helloBill.map(value => value.length).fold(x => assert(x === 10)))

    it('will be transformed by a chain', () =>
      helloBill.chain(() => Maybe('Hello')).fold(x => assert(x === 'Hello')))

    it('will be transformed by a map', () =>
      assert(helloBill.map(() => 'Hello').fold(x => x === 'Hello')))

    it('will be transformed by a chain', () =>
      assert(helloBill.chain(() => Maybe('Hello')).fold(x => x) === 'Hello'))

    it('will return the value when else() is called', () => {
      assert(helloBill.else(() => 'no no!').fold(x => x) === 'Hello Bill')
      assert(helloBill.else(() => 'no no!').fold(x => x) === 'Hello Bill')
    })

    it('will return the first monad on else', () =>
      helloBill.else(nothing).fold(x => assert(x === 'Hello Bill')))
  })

  describe('complies with FantasyLand spec for', () => {
    it("'of'", () => Maybe().of('hello').fold(x => assert(x === 'hello')))

    it("'chain'", () => {
      Maybe('a')
        .of('hello')
        .chain(a => Maybe().of(`${a} world`))
        .fold(x => assert(x === 'hello world'))
    })
  })

  describe('as a Setoid', () => {
    const a = Maybe(2)
    const b = Maybe(2)
    const c = Maybe(2)

    it('should equal another right of the same value (reflexivity)', () =>
      assert.equal(a.equals(a), true))

    it('should equal the result of another equal (symmetry)', () =>
      assert.equal(a.equals(b), b.equals(a)))

    it('should equal the result of another equal (transitivity)', () =>
      assert.equal(a.equals(b) === b.equals(c) === a.equals(c), true))
  })
})
