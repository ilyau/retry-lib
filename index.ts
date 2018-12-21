function sleep(time: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

export default async function attempt(tryCounter: number,
                              sleepTime: number,
                              func: Function,
                              ...params: any[]): Promise<any> {

  return new Promise(async (resolve, reject) => {

    let result = undefined;

    for (let i = tryCounter; i > 0; i--) {
      try {
        result = await func(...params);
        break;

      } catch (e) {

        await sleep(sleepTime);

        if (i <= 1) {
          reject(e);

          return;
        }

      }
    }

    resolve(result);
  });

}