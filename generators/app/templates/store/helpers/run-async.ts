export const runAsync = (action: () => void): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      action();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const getResultAsync = <T>(func: () => T): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    try {
      const result = func();
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
