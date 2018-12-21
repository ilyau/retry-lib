# attempt-async-await
A js helper that runs async await function several times with delays until it returns result.

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