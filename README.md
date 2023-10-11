# retry-lib
A javascript and typescript helper that runs async await function several times with delays until it returns result or attempts ends.

## Installation 
```sh
npm install retry-lib --save
```
## Usage

## Import

### TypeScript
```typescript
import retry from 'retry-lib';
```

### Javascript

```javascript
var retry = require('retry-lib'); // you can use commonjs
// or
var { default: retry } = require('retry-lib');
// or
import retry from 'retry-lib'; // you can use esm modules
```

## Example

```js
const methodWithError = async (parameter) => {
    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error' + methodWithError.counter);
    }

    return parameter;
};
methodWithError.counter = 1;

const result = await retry({
    tryCounter: 3,
    delayBetweenRetryMs: 200,
    factor: 2, // second retry after 400ms (2 * 200), third retry after 600ms (3 * 200), and ...
    func: async () => {
        return methodWithError('finish1');
    },
});

console.log(result); // output 'finish1'
```

## Parameters

```ts
interface IRetryParams {
    tryCounter: number;
    delayBetweenRetryMs: number;
    factor: number;
    func: () => Promise<any>;
    onError?: (error: any): Promise<boolean>;;
}

export declare function retry(params: IRetryParams): Promise<any>;

```