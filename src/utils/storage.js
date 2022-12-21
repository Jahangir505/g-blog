import { encrypt, decrypt } from './encryption';



export const appStorage = {
  get: (key) => typeof window.localStorage.getItem(key),
  set: (key, value) => {
    typeof window.localStorage?.setItem(key, value);
  },
  remove: (key) => typeof window.localStorage.removeItem(key),
};

export const tempStorage = {
  get: (key) => typeof window.sessionStorage?.getItem(key),
  set: (key, value) => {
    typeof window.sessionStorage?.setItem(key, value);
  },
  remove: (key) => typeof window.sessionStorage?.removeItem(key),
};

export const secureStorage = {
  get: (key) => decrypt(typeof window.localStorage.getItem(encrypt(key)) ?? ''),
  set: (key, value) => {
    typeof window.localStorage.setItem(encrypt(key), encrypt(value));
  },
  remove: (key) => typeof window.localStorage.removeItem(encrypt(key)),
};

export const jsonStorage = {
  get: (key) => {
    try {
      return JSON.parse(typeof window.localStorage.getItem(key) ?? '{}');
    } catch (e) {
      return {};
    }
  },
  set: (key, value) => {
    typeof window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => typeof window.localStorage.removeItem(key),
};

export const secureJsonStorage = {
  get: (key) => {
    try {
      return JSON.parse(appStorage.get(encrypt(key)) ?? '{}');
    } catch (e) {
      return {};
    }
  },
  set: (key, value) => {
    typeof window.localStorage.setItem(encrypt(key), value);
  },
  remove: (key) => typeof window.localStorage.removeItem(encrypt(key)),
};

export default {
  appStorage,
  jsonStorage,
};
