# ऊंचा Oncha
A modular exalted javascript monadic library & functional fun.

## Install
``` bash
yarn add oncha
```

# ऊंचा Oncha Id
Identity monad implementation.

``` javascript
import Id from 'oncha/id'
import log from 'oncha/console/log'

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
import log from 'oncha/console/log'

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
...
```

# ऊंचा Oncha List
An immutable array implementation of with head, tail, fold methods.

``` javascript
import List from 'oncha/list'
import log from 'oncha/console/log'

List([2, 4, 6])
  .map(num => num * 2)
  .filter(num => num > 5)
  .fold(log)
//=> [8, 12]
```

# ऊंचा Oncha Compose
Compose implementation, takes n functions as parameters and return a function.

``` javascript
import compose from 'oncha/compose'
import log from 'oncha/console/log'

const transform = compose(sentence => sentence.toUpperString(), sentence => `${sentence}!`)
const logTransform = compose(log, transform)

logTransform('Hello exalted one')
//=> 'HELLO EXALTED ONE!'
```