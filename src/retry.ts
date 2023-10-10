import { IDefaultRetryParams, IRetryParams } from "./types";
import { sleep } from "./utils";

export async function retry(params: IRetryParams): Promise<any> {

    const defaultParams: IDefaultRetryParams = {
        tryCounter: 3,
        delayBetweenRetryMs: 1000,
        factor: 2,
    };

    params = {
        ...defaultParams, 
        ...params
    };

    return new Promise(async (resolve: any, reject: any) => {

        let result;

        while (params.tryCounter > 0) {
            try {
                result = await params.func();
                return resolve(result);

            } catch (e) {
                if (params.tryCounter == 1) {
                    reject(e);
                    return;
                }

                if (typeof params.onError === 'function') {
                    const onErrorResult: boolean = await params.onError(e);

                    if (!onErrorResult) {
                        reject(e);
                        return;
                    }
                }

                await sleep(params.delayBetweenRetryMs);
                params.tryCounter--;
            }
        }
    });

}
