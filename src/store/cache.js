
// satisfy SSR
const storage = typeof window !== 'undefined' ? window.localStorage : {
  getItem() {},
  setItem() {},
  removeItem() {},
};

const json = typeof window !== 'undefined' ? window.JSON : {
  parse() {},
  stringify() {},
};

export const get = (key) => json.parse(storage.getItem(key));
export const set = (key, value) => storage.setItem(key, json.stringify(value));
export const del = (key) => storage.removeItem(key);
