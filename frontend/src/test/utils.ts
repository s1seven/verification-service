export const flushAllPromises = () => new Promise((resolve) => setImmediate(resolve));

const sleep = (timeout = 150) => new Promise((resolve) => setTimeout(resolve, timeout));

export const waitForExpect = async <T>(callback: () => Promise<T>, timeout = 500, interval = 50): Promise<T> => {
  const maxTries = Math.floor(timeout / interval);
  for (let index = 0; index < maxTries; index++) {
    try {
      return await callback();
    } catch (err) {
      await sleep(interval);
    }
  }
  return await callback();
};
