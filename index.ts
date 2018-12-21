function sleep(time: number): Promise<void> {
  return new Promise(function (resolve: any) {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

interface IOnErrorCallback {
  (error: any): boolean;
}

export default async function attempt(tryCounter: number,
                              sleepTime: number,
                              onError: IOnErrorCallback,
                              func: Function,
                              ...params: any[]): Promise<any> {

  return new Promise(async (resolve: any, reject: any) => {

    let result = undefined;

    for (let i = tryCounter; i > 0; i--) {
      try {
        result = await func(...params);
        break;

      } catch (e) {
        if (i <= 1) {
          reject(e);
          return;
        } else {
          if (typeof onError === 'function') {
            const r = onError(e);

            if (r) {
              await sleep(sleepTime);
            } else {
              reject(e);
              return;
            }
          } else {
              await sleep(sleepTime);
          }
        }
      }
    }

    resolve(result);
  });

}