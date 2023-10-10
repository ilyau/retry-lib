# retry-lib
A javascript and typescript helper that runs async await function several times with delays until it returns result or attempts ends.

## Installation 
```sh
npm install retry-lib --save
```
## Usage

### TypeScript
```typescript
import retry from 'retry-lib';

const result = await retry({
    tryCounter: 3,
    delayBetweenRetryMs: 200,
    factor: 2, // second retry after 400ms (2 * 200), third retry after 600ms (3 * 200), and ...
    func: async () => {
        return methodWithError('finish1');
    },
});
```

### Javascript

```javascript
var retry = require('retry-lib'); // you can use commonjs
// or
var { default: retry } = require('retry-lib');
// or
import retry from 'retry-lib'; // you can use esm modules
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

## Other examples

```ts
const methodWithError: any = async (parameter: string) => {
    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error' + methodWithError.counter);
    }

    return parameter;
};
methodWithError.counter = 1;

try {

    const result = await retry({
        tryCounter: 3,
        delayBetweenRetryMs: 200,
        factor: 2,
        func: () => {
            return methodWithError('finish1');
        },
    });
    
    console.log(result);

} catch (e) {
    console.log(e);
}
```
