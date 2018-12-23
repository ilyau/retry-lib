# attempt-async-await
A javascript and typescript helper that runs async await function several times with delays until it returns result or attempts ends.

## Installation 
```sh
npm install attempt-async-await --save
```
## Usage
### Javascript
```javascript
var attempt = require('attempt-async-await');
```

```js
async function methodWithError(parameter) {

    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error');
    }

    return parameter + ' World!';
}

methodWithError.counter = 1;

// invokes methodWithError 5 times with delay 200ms between errors
const result = await attempt.attempt(5, 200, null, methodWithError, 'Hello');
console.log(result);
```

Output
```sh
Hello World!
```

### TypeScript
```typescript
import { attempt } from 'attempt-async-await';
```
```sh
async function methodWithError(parameter: string): Promise<string> {

    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error');
    }

    return parameter + ' World!';
}

methodWithError.counter = 1;

// invokes methodWithError 5 times with delay 200ms between errors
const result: string = await attempt(5, 200, null, methodWithError, 'Hello');
console.log(result);
```
Output
```
Hello World!
```

## Build
```
npm run build
```

## Tests
```
npm run test
```

## Other examples

```js
async function methodWithError(parameter) {
    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error' + methodWithError.counter);
    }

    return parameter;
}

const parameter = 'finish';

// run 50 times with delay 200ms
const result = await attempt(50, 200, (error) => {
    if (error.message === 'Error3') {
        // stop attempts
        return false;
    } else {
        // continue execution
        return true;
    }
}, methodWithError, parameter);
```

If the method always throw exception the result of the attempt will be the last exception.

```
async function methodWithError(parameter) {
    throw new Error('Error ' + parameter);
}

// the code throws Error and you should resolves that
const result = await attempt(5, 200, null, methodWithError, 'test');
```