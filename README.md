# attempt-async-await
A javascript and typescript helper that runs async await function several times with delays until it returns result.

## Installation 
```sh
npm install attempt-async-await --save
```
## Usage
### Javascript
```javascript
var attempt = require('attempt-async-await');
```

```
async function methodWithError(parameter) {

    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error');
    }

    return parameter + ' World!';
}

methodWithError.counter = 1;

// invokes methodWithError 5 times with delay 200ms between errors
const result = await attempt(5, 200, null, methodWithError, 'Hello');
console.log(result);
```

Output
```
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

## Tests
```
npm run tests
```

## Other examples

```
async function methodWithError(parameter) {
    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error' + methodWithError.counter);
    }

    return parameter;
}

const parameter = 'finish';

// run 50 times with delay 200ms
const result = await attempt.default(50, 200, (error) => {
    if (error.message === 'Error3') {
        // stop attempts
        return false;
    } else {
        // continue execution
        return true;
    }
}, methodWithError, parameter);
```