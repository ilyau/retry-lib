import { describe, expect, test } from '@jest/globals';
import retry from '../index';

const methodWithError: any = async (parameter: string) => {
    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error' + methodWithError.counter);
    }

    return parameter;
};

describe('retry lib', () => {
  test('simple retry', async () => {
    methodWithError.counter = 1;
    
    const result = await retry({
        tryCounter: 3,
        delayBetweenRetryMs: 200,
        factor: 2,
        func: () => {
            return methodWithError('finish1');
        },
    });
    
    expect(result).toBe('finish1');
  });

  test('simple retry 2', async () => {
    methodWithError.counter = 1;
    try {
        const result3 = await retry({
            tryCounter: 3,
            delayBetweenRetryMs: 2000,
            factor: 2,
            func: () => {
                return methodWithError('finish3');
            },
            onError: async (error: any) => {
                return true;
            }
        });
        expect(result3).toBe('finish3');
        
    } catch (e) {
        console.log(e);
    }
    
  });
});

