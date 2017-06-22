# ऊंचा Oncha
A modular exalted javascript monadic library & functional fun. [fantasy-land](https://github.com/fantasyland/fantasy-land) compliant.

# Install
``` bash
yarn add oncha
```

# Types

| Name              | [Apply][8]   | [Applicative][4] | [Setoid][1]  | [Semigroup][2] | [Foldable][6]| [Functor][3] | [Monad][5] | [Chain][7]    |
| ----------------- | :----------: | :--------------: | :----------: | :------------: | :----------: | :----------: | :--------: | :-----------: |
| [Either](#either) |    **✔︎**     |      **✔︎**       |    **✔︎**     |                |     **✔︎**    |     **✔︎**    |   **✔︎**    |     **✔︎**     |
| [Future](#future) |    **✔︎**     |                  |    **✔︎**     |                |     **✔︎**    |     **✔︎**    |            |     **✔︎**     |
| [Identity](#id)   |    **✔︎**     |      **✔︎**       |    **✔︎**     |                |     **✔︎**    |     **✔︎**    |   **✔︎**    |     **✔︎**     |
| [Maybe](#maybe)   |    **✔︎**     |      **✔︎**       |    **✔︎**     |                |     **✔︎**    |     **✔︎**    |   **✔︎**    |     **✔︎**     |
| [List](#list)     |    **✔︎**     |                  |    **✔︎**     |     **✔︎**      |     **✔︎**    |     **✔︎**    |            |     **✔︎**     |

* There is a divergence form fantasy land where `reduce` is named `fold` for some types.

## All
These functions are available on all types.

### ap
[Apply][8]
```
chain :: (a -> b) -> b
```
```javascript
Id(5).chain(a => Id(a))
//=> Id(5)

// You can use chain to join the monads.
Id(Id(5)).chain(a => a)
//=> Id(5)
```

### equals
[Setoid][1]
```
equals :: Id -> Boolean
```
```javascript
Id(1).equals(Id(1))
//=> true

Id(2).equals(Id(1))
//=> false

Id(2).equals(Id(1)) === Id(1).equals(Id(1))
//=> false
```

### chain
[Chain][7]
```
chain :: (a -> b) -> b
```
```javascript
Id(5).chain(a => Id(a))
//=> Id(5)

// You can use chain to join the monads.
Id(Id(5)).chain(a => a)
//=> Id(5)
```

### map
[Functor][3]
```
map :: (a -> b) -> Id of b
```
```javascript
Id(7).map(a => a * 2)
//=> Id(14)
```

### of
[Applicative][4]
```
of :: a -> Id of a
```
```javascript
Id(5).of(6)
//=> Id(6)

Id(5).of(Id(6))
//=> Id(Id(6))
```

### inspect
```
inspect :: () -> String
```
```javascript
Id(5).inspect()
//=> Id(5)
```

## Id
Identity monad.

``` javascript
import Id from 'oncha/id'
import log from 'nyaya/console/log'

Id(5)
  .map(num => num * 7)
  .map(num => num - 1)
  .fold(log)
//=> 34
```

### fold
[Foldable][6]
```
fold :: (a -> b) -> b
```
```javascript
Id(5).fold()
//=> 5

Id(5).fold(a => a + 1)
//=> 6
```

## Maybe
Maybe monad.

``` javascript
import Maybe from 'oncha/maybe'
import log from 'nyaya/console/log'

// Maybe of a string
Maybe('Hello exalted one')
  .map(sentence => sentence.toUpperString())
  .map(sentence => `${sentence}!`)
  .fold(log)
//=> 'HELLO EXALTED ONE!'

// Maybe of nothing
Maybe(null)
  .map(sentence => sentence.toUpperString())
  .else(() => 'Maybe received a null')
  .fold(log)
//=> 'Maybe received a null'
```

### else
Sets the value to fold on.
```
else :: Any -> Nothing of Any
```
```javascript
Maybe(1).else(5).fold()
//=> 1

Maybe(null).else(5).fold()
//=> 5
```

### fold
[Foldable][6]
```
fold :: (a -> b) -> b
```
```javascript
Maybe(5).fold()
//=> 5

Maybe(5).fold(a => a + 1)
//=> 6
```

## Either
An Either monad includes cond, fromCond, fromNullable, Left, Right.

``` javascript
import Either from 'oncha/either'
const { Left, Right, fromNullable } = Either

Either.fromNullable('Hello') // this will return a Right('Hello')
  .fold(
    () => 'Oops',
    val => `${val} world!`)
//=> 'Hello world!'

Either.fromNullable(null) // this will return a Left(null)
  .fold(
    () => 'Oops',
    val => `${val} world!`)
//=> 'Oops'

const extractEmail = obj => obj.email ? Right(obj.email) : Left()
extractEmail({ email: 'test@example.com' }
  .map(extractDomain)
  .fold(
    () => 'No email found!',
    x => x)
//=> 'example.com'

extractEmail({ name: 'user' }
  .map(extractDomain) // this will not get executed
  .fold(
    () => 'No email found!',
    x => x)
//=> 'No email found!'
```

### cond
`A -> B -> C -> Any`
Evaluates A when truly calls C if it is a function or return C, when falsely calls B if it is a function or returns B.
```
cond :: (() -> Boolean) -> (() -> c) -> (() -> d) -> c | d
cond :: (() -> Boolean) -> c -> d -> c | d
cond :: Boolean -> b -> c -> b | c
```
```javascript
Either.cond(1 === 1)(0)(1)
//=> 1

Either.cond(() => true)(0)(1)
//=> 1

Either.cond(() => true)(() => 0)(() => 1)
//=> 1

Either.cond(true)(() => 0)(1)
//=> 1
```

### fromCond
`A -> B -> C -> Either`
Evaluates A when truly return Right of C or Left or B.
```
fromCond :: (() -> Boolean) -> a -> b -> Either
fromCond :: Boolean -> a -> b -> Either
```
```javascript
Either.fromCond(1 === 1)(0)(1)
//=> Right(1)

Either.fromCond(() => true)(0)(1)
//=> Right(1)

Either.fromCond(() => true)(() => 0)(() => 1)
//=> Right(1)

Either.fromCond(true)(() => 0)(1)
//=> Right(1)
```

### fold
[Foldable][6] - Folds on the first function for `Left` and the second for `Right`.
```
fold :: (a -> a, b -> b) -> a | b
```
```javascript
Right(5).fold(a => a + 1, a => a + 2)
//=> 7

Left(5).fold(a => a + 1)
//=> 6
```

## List
List Monad.

``` javascript
import List from 'oncha/list'
import log from 'nyaya/console/log'

List([2, 4, 6])
  .map(num => num * 2)
  .filter(num => num > 5)
  .fold(log)
//=> [8, 12]
```

## Future
A Future monad for async computation.

``` javascript
import Future from 'oncha/future'
import log from 'nyaya/console/log'

// Basic usage
Future((reject, resolve) => resolve('Yay'))
  .map(res => res.toUpperString())
  .fork(
    err => log(`Err: ${err}`),
    res => log(`Res: ${res}`))
//=> 'YAY'

// Handle promises
Future.fromPromise(fetch('https://api.awesome.com/catOfTheDay'))
  .fork(
    err => log('There was an error fetching the cat of the day :('),
    cat => log('Cat of the day: ' + cat))
//=> 'Cat of the day: Garfield'

// Chain http calls
Future.fromPromise(fetch('https://api.awesome.com/catOfTheDay'))
  .chain(cat => Future.fromPromise(fetch(`https://api.catfacts.com/${cat}`)))
  .fork(
    err => log('There was an error fetching the cat of the day :('),
    facts => log('Facts for cat of the day: ' + facts))
//=> 'Facts for cat of the day: Garfield is awesome.'
```

### fold
[Foldable][6]
```
fold :: (a -> b) -> b
```
```javascript
Future.of(5).fold()
//=> 5

Future.of(5).fold(a => a + 1)
//=> 6
```

### fork
Executes the `Future` returning a `Future` of the resuts.
```
fork :: (a -> a, b -> b) -> Future of a | b
```
```javascript
Future((left, right) => right(5)).fork(a => a, a => a)
//=> Future of 5

Future((left, right) => left(Error('this is an error'))).fork(a => a)
//=> Future of Error
```

# Higher Order
## Compose
Compose takes n functions as arguments and return a function.

``` javascript
import compose from 'oncha/compose'
import log from 'nyaya/console/log'

const transform = compose(sentence => sentence.toUpperString(), sentence => `${sentence}!`)
const logTransform = compose(log, transform)

logTransform('Hello exalted one')
//=> 'HELLO EXALTED ONE!'

// supports miltiple arguments
compose(path.normalize, path.join)('./exalted', '/one')
//=> './exalted/one'
```

## Curry
Creates a partially applicable function.

``` javascript
import curry from 'oncha/curry'

const curried = curry((a, b) => a * b)
curried(3)(6)
//=> 18

curry((a, b, c) => a + b + c)(1, 2, 3)
//=> 6
```

## Fork
Fork as partial application and first class.

``` javascript
import fork from 'oncha/fork'
import future from 'oncha/future'

const fut = Future.of('EXALTED!')

fork(a => a)(b => b)(fut)
//=> 'EXALTED!'
```

## Map
Map as partial application and first class with arity support.

``` javascript
import fork from 'oncha/map'

map(a => a + 1, a => a * 3)([1, 2, 3])
//=> [4, 7, 10]
```

[1]: https://github.com/fantasyland/fantasy-land#setoid
[2]: https://github.com/fantasyland/fantasy-land#semigroup
[3]: https://github.com/fantasyland/fantasy-land#functor
[4]: https://github.com/fantasyland/fantasy-land#applicative
[5]: https://github.com/fantasyland/fantasy-land#monad
[6]: https://github.com/fantasyland/fantasy-land#foldable
[7]: https://github.com/fantasyland/fantasy-land#chain
[8]: https://github.com/fantasyland/fantasy-land#apply
