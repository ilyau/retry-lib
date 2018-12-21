'use strict';
var expect = require('chai').expect;
var attempt = require('../dist/index.js');

async function methodWithError(parameter) {
    console.log(methodWithError.counter);
    if (methodWithError.counter < 3) {
        methodWithError.counter++;
        throw new Error('Error');
    }

    return parameter;
}

methodWithError.counter = 1;

describe('attempt function test', () => {
    
    it('run methodWithError', async () => {
        
        const parameter = 'finish';

        const result = await attempt.default(5, 200, (e) => {
            console.log(e.message);
            return true;
        }, methodWithError, parameter);

        expect(result).to.equal(parameter);

    });

    it('run methodWithError 2', async () => {

        const parameter = 'finish';

        const result = await attempt.default(5, 200, undefined, methodWithError, parameter);

        expect(result).to.equal(parameter);

    });
    
});