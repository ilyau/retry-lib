export interface IOnErrorCallback {
    (error: any): Promise<boolean>;
}

export interface IDefaultRetryParams {
    tryCounter: number;
    delayBetweenRetryMs: number;
    factor: number;
}

export interface IRetryParams extends IDefaultRetryParams {
    func: () => Promise<any>,
    onError?: IOnErrorCallback,
}