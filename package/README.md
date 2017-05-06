# ऊंचा Oncha
A modular exalted javascript monadic library & functional fun. [fantasy-land](https://github.com/fantasyland/fantasy-land) compliant.

| Name              | [Setoid][1]  | [Semigroup][2] | [Functor][3] | [Applicative][4] | [Monad][5] | [Foldable][6] | [Chain][7] |
| ----------------- | :----------: | :------------: | :----------: | :--------------: | :--------: | :-----------: | :------------: |
| [Either](#either) |    **✔︎**     |                |     **✔︎**    |      **✔︎**       |   **✔︎**    |     **✔︎**     |     **✔︎**      |
| [Future](#future) |              |                |     **✔︎**    |                  |   **✔︎**    |     **✔︎**     |     **✔︎**      |
| [Identity](#id)   |    **✔︎**     |                |     **✔︎**    |      **✔︎**       |   **✔︎**    |     **✔︎**     |     **✔︎**      |
| [Maybe](#maybe)   |    **✔︎**     |                |     **✔︎**    |      **✔︎**       |   **✔︎**    |     **✔︎**     |     **✔︎**      |
| [List](#list)     |              |     **✔︎**      |     **✔︎**    |                  |   **✔︎**    |     **✔︎**     |     **✔︎**      |


## Install
``` bash
yarn add oncha
```

# ऊंचा Oncha Id
Identity monad implementation.

``` javascript
import Id from 'oncha/id'
import log from 'nyaya/console/log'

Id(5)
  .map(num => num * 7)
  .map(num => num - 1)
  .fold(log)
//=> 34
```

# ऊंचा Oncha Maybe
Maybe monad implementation.

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

# ऊंचा Oncha Either
An Either monad implementation includes Left, Right, fromNullable.

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

# ऊंचा Oncha List
An immutable array implementation of with head, tail, fold methods.

``` javascript
import List from 'oncha/list'
import log from 'nyaya/console/log'

List([2, 4, 6])
  .map(num => num * 2)
  .filter(num => num > 5)
  .fold(log)
//=> [8, 12]
```

# ऊंचा Oncha Future
A Future monad implementation includes map, chain and fold methods.

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

# ऊंचा Oncha Compose
Compose implementation, takes n functions as parameters and return a function.

``` javascript
import compose from 'oncha/compose'
import log from 'nyaya/console/log'

const transform = compose(sentence => sentence.toUpperString(), sentence => `${sentence}!`)
const logTransform = compose(log, transform)

logTransform('Hello exalted one')
//=> 'HELLO EXALTED ONE!'
```

# ऊंचा Oncha Fork
Fork as partial application and first class.

``` javascript
import fork from 'oncha/fork'
import future from 'oncha/future'

const fut = Future.of('EXALTED!')

fork(a => a)(b => b)(fut)
//=> 'EXALTED!'
```

# ऊंचा Oncha Curry
Curries a function.

``` javascript
import curry from 'oncha/curry'

const curried = curry((a, b) => a * b);
curried(3)(6);
// 18

curry((a, b, c) => a + b + c)(1, 2, 3)
// 6
```

[1]: https://github.com/fantasyland/fantasy-land#setoid
[2]: https://github.com/fantasyland/fantasy-land#semigroup
[3]: https://github.com/fantasyland/fantasy-land#functor
[4]: https://github.com/fantasyland/fantasy-land#applicative
[5]: https://github.com/fantasyland/fantasy-land#monad
[6]: https://github.com/fantasyland/fantasy-land#foldable
[7]: https://github.com/fantasyland/fantasy-land#chain
