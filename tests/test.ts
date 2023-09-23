'use strict';

import retry from '../index.js';

const methodWithError: any = async (parameter: string) => {
    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error' + methodWithError.counter);
    }

    return parameter;
};

(async () => {
    try {
        methodWithError.counter = 1;
    
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

    try {
        methodWithError.counter = 1;
        const result3 = await retry({
            tryCounter: 2,
            delayBetweenRetryMs: 2000,
            factor: 2,
            func: () => {
                return methodWithError('finish3');
            },
            onError: async (error: any) => {
                if (error.message === 'Error3') {
                    // stop attempts
                    return false;
                } else {
                    // continue execution
                    return true;
                }
            }
        });
        console.log(result3);

    } catch (e) {
        console.log(e);
    }

})();
