/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable valid-typeof */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-properties */
/* eslint-disable no-bitwise */

import dayjs from 'dayjs';

const utc = require('dayjs/plugin/utc'); // dependent on utc plugin
const timezone = require('dayjs/plugin/timezone');
const relativeTime = require('dayjs/plugin/relativeTime');
const weekOfYear = require('dayjs/plugin/weekOfYear');

export function getQueryString(name, url = window.location.href) {
    name = name.replace(/[\\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Create form data
 * @param  {[object]}   data
 * @return {[mixed]}
 */
export const createFormData = (data, Type = FormData) => {
    if (![FormData, URLSearchParams].includes(Type)) {
        return data;
    }
    const formData = new Type();
    for (const key in data) {
        if (data[key] instanceof File) {
            formData.append(key, data[key], data[key].name);
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData;
};

export const toDotObject = (inputData = {}) => {
    const data = {};
    const recursive = (obj, prefix = '') => {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
                const updatedData = recursive(obj[key], `${prefix + key}.`);
                if (updatedData) {
                    data[`${prefix}${key}`] = updatedData;
                }
            } else if (obj[key]) {
                data[`${prefix}${key}`] = obj[key];
            }
        }
        return null;
    };
    recursive(inputData);
    return data;
};

export const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const dates = (dateString) => {
    const TZ = 'Europe/Helsinki';
    // eslint-disable-next-line no-unused-vars
    const TZ_CODE = 'en-EU';

    const instance = dayjs;
    instance.extend(utc);
    instance.extend(timezone);
    instance.extend(weekOfYear);
    instance.extend(relativeTime);
    instance.tz.setDefault(TZ);
    return instance.tz(dateString, TZ);
};

export const formatDateWithTz = (date, format = 'DD MMM, YYYY - hh:mma') =>
    dates(date).format(format);
export const formatDate = (date, format = 'DD MMM, YYYY - hh:mma') => dayjs(date).format(format);

export const formatNumber = (number) => number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

/**
 * Filter an object
 * @param  {[type]}   obj      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export function filterObject(obj, callback) {
    return Object.fromEntries(Object.entries(obj).filter(([key, val]) => callback(val, key)));
}

/**
 * Get the env variable
 * @param  {[name]} Boolean
 * @return {[Boolean]}
 */
export function env(key) {
    let name = key;

    if (!key.startsWith('NODE_')) {
        name = `REACT_APP_${key}`;
    }

    if (process === undefined) {
        return false;
    }

    return process.env[name];
}

/**
 * Check the env
 * @param  {[name]} Boolean
 * @return {[Boolean]}
 */
export function isEnv(name) {
    const currentEnv = env('NODE_ENV');
    if (Array.isArray(name)) {
        return name.includes(currentEnv);
    }
    return currentEnv === name;
}

/**
 * Conditionally callback or do something
 * @param  {[condition]} Boolean
 * @param  {Function} callback
 * @return {[mixed]}            [callback value]
 */
export function when(condition, callback, defaultValue = null) {
    if (condition) {
        if (typeof callback === 'function') {
            callback(condition);
        }
        return callback;
    }
    return defaultValue;
}

/**
 * Strip html tag an object
 * @param  {[string]}   txt
 * @return {[string]}
 */
export function stripTags(txt) {
    return `${txt}`.replace(/(<([^>]+)>)/gi, '');
}

/**
 * Error handler
 * @param  {[object]}   error
 * @return {[mixed]}
 */
export const errorHandler = (error) => {
    if (error.response) {
        return Promise.reject(error.response.data, error);
    }
    if (error.request) {
        return Promise.reject(error.request, error);
    }
    return Promise.reject(error.message, error);
};

/**
 * Error handler
 * @param  {[ArrayBuffer]}   arrayBuffer
 * @return {[json]}
 */
export const arrayBufferToJson = (arrayBuffer) =>
    JSON.parse(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

/**
 * Abbreviate a large Number
 * @param  {Number} number [description]
 * @return {string}        [description]
 */
export function abbreviateNumber(number, additionalSuffix = '+') {
    const SI_SYMBOL = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
    // what tier? (determines SI symbol)
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;
    // if zero, we don't need a suffix
    if (tier === 0) return number;
    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier] || '~';
    const scale = 10 ** (tier * 3);
    // scale the number
    const scaled = number / scale;
    // format number and add suffix
    return scaled.toFixed(1) + suffix + additionalSuffix;
}

/**
 * Convert Hex color to RGB/A
 * @param  {[type]} hex   [description]
 * @param  {[type]} alpha [description]
 * @return {[type]}       [description]
 */
export function hexToRGB(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Generate Random Color
 * @return {string} [Color code]
 */
export const generateRandomColor = (opacity) => {
    const characters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }
    if (opacity >= 0 && opacity <= 1) {
        return hexToRGB(color, opacity);
    }
    return color;
};
// check the item has children
export function hasChildren(item) {
    const { items: children } = item;

    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Array) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
}

/**
 * Generate random gradient
 * @param  {Boolean} radial [description]
 * @return {string}         [description]
 */
export const generateLinearGradient = (alpha = null) => {
    const direction = Math.round(Math.random() * 360);
    const r1 = Math.round(Math.random() * 255);
    const g1 = Math.round(Math.random() * 255);
    const b1 = Math.round(Math.random() * 255);
    const a1 = typeof alpha === 'number' ? alpha : Math.round(Math.random() * 10) / 10;

    const r2 = Math.round(Math.random() * 255);
    const g2 = Math.round(Math.random() * 255);
    const b2 = Math.round(Math.random() * 255);
    const a2 = typeof alpha === 'number' ? alpha : Math.round(Math.random() * 10) / 10;

    return `linear-gradient(${direction}deg, rgba(${r1},${g1},${b1},${a1}), rgba(${r2},${g2},${b2},${a2}))`;
};

export const generateRadialGradient = () => {
    const a1 = Math.round(Math.random() * 10) / 10;
    const a2 = Math.round(Math.random() * 10) / 10;
    const a3 = Math.round(Math.random() * 10) / 10;

    return `radial-gradient(ellipse, ${generateRandomColor(a1)}, ${generateRandomColor(
        a2
    )}, ${generateRandomColor(a3)})`;
};

export function throttle(func, delay) {
    let timer = 0;

    const callback = () => {
        const context = this;
        // eslint-disable-next-line prefer-rest-params
        const args = [].slice.call(arguments);

        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
    return callback;
}

/**
 * Generate random array
 * @param  {File} file
 * @return {object}       newly generated array
 */
export const getImgHeightWidth = async (file) =>
    new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height,
            });
            URL.revokeObjectURL(img.src);
        };
        // img.onerror = () => reject('failed to load');
        img.src = URL.createObjectURL(file);
    });

/**
 * Generate random array
 * @param  {Number} limit [description]
 * @return {array}       newly generated array
 */
export function randomArray(limit = 10, unique = false) {
    if (!unique) {
        return Array.from({ length: limit }, () => Math.floor(Math.random() * limit));
    }
    return [
        ...new Set(Array.from({ length: limit * 2 }, () => Math.floor(Math.random() * limit * 2))),
    ].slice(0, limit);
}

/**
 * Unique the array by key by keeping first match
 * @param  {[type]} array [description]
 * @param  {[type]} key   [description]
 * @return {[type]}       [description]
 */
export function uniqByKeepFirst(array, key) {
    if (!Array.isArray(array)) {
        return [];
    }
    const seen = new Set();
    return array.filter((item) => {
        const finder = key(item);
        return seen.has(finder) ? false : seen.add(finder);
    });
}
/**
 * * Unique the array by key by keeping last match
 * @param  {[type]} array [description]
 * @param  {[type]} key   [description]
 * @return {[type]}       [description]
 */
export function uniqByKeepLast(array, key) {
    if (!Array.isArray(array)) {
        return [];
    }
    return [...new Map(array.map((item) => [key(item), item])).values()];
}

/**
 * Pick object from another object
 * @param  {[type]} obj [description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
export function pick(obj, arr) {
    const newObj = {};
    arr.forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

/**
 * Check the password strength
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export function passwordStrengthValidator(value) {
    const regexp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).+$/;
    const strong = regexp.test(value);
    return strong;
}
/**
 * De-bounce
 * @param  {Function} callback [description]
 * @param  {[type]}   wait     [description]
 * @return {[type]}            [description]
 */
export function debounce(callback, wait) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}
/**
 * Chunk the array
 * @param  {array} inputArray
 * @param  {Number} chunk      divide to
 * @return {array}            new array
 */
export function arrayChunk(inputArray, chunk = 3) {
    if (!Array.isArray(inputArray)) {
        return [inputArray];
    }
    if (chunk < 0) {
        throw new Error('Invalid chunk size!');
    }
    return inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunk);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
}

/**
 * Check the value is empty or not.
 * @param  {[type]}  value [description]
 * @return {Boolean}       [description]
 */
export function isEmpty(value) {
    if (typeof value === undefined || value === null || value === undefined) {
        return true;
    }
    if (Array.isArray(value) && value.length <= 0) {
        return true;
    }
    if (typeof value === 'object') {
        return Object.values(value).filter((item) => item).length <= 0;
    }
    if (typeof value === 'string') {
        return value.length <= 0;
    }
    if (typeof value === 'number') {
        return value <= 0;
    }
    return !value;
}

export function isItArray(value) {
    if (Array.isArray(value)) {
        return true;
    }
    return !value;
}

export function isUpper(str) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

/**
 * Capitalize the text
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export function capitalize(string) {
    if (isEmpty(string)) {
        return '';
    }
    const value = string.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * serialize the text
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export function serializeText(string) {
    if (isEmpty(string)) {
        return '';
    }
    const value = string.toString().split('_').join(' ');
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * serialize the response error
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export function serializeApiError(errors = [], type = 'array') {
    const items = errors
        .map((item) => {
            const message =
                type === 'string' ? item.message[0] ?? 'Something went wrong' : item.message;
            const error = {
                [item.field]: message,
            };
            return error;
        })
        .reduce((current, accumulator) => ({ ...current, ...accumulator }), {});
    return items;
}

/**
 * Filter an object
 * @param  {[type]}   obj      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
export const camelCaseToText = (str) =>
    capitalize(str.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`).trim());

export function camelize(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, '');
}
/**
 * Download JSON Object as File
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function checkSpecialChars(str) {
    const specialChars = /[@]/;
    return specialChars.test(str);
}

/**
 * replace undefined with a empty string
 * @param  {[type]} string [description]
 * @return {[type]} string [description]
 */
export function replaceUndefinied(item) {
    const str = JSON.stringify(item, (key, value) => (value === undefined ? '' : value));
    return JSON.parse(str);
}

export function download(data, { fileName = 'file.zip', type = 'application/zip' }) {
    const downloadUrl = typeof window.URL.createObjectURL(new Blob([data], { type }));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName); // any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
}

export function generateSrcSet(url) {
    const sizes = [
        100, 200, 300, 480, 600, 720, 980, 1080, 1350, 1600, 1600, 1920, 2200, 2400, 2592,
    ];
    return sizes.map((size) => `${url}?w=${size} ${size}w`).join(', ');
}

export function forceHttps(url) {
    if (!url) return url;
    if (url.startsWith('http://')) {
        return `https://${url.substr(7)}`;
    }
    return url;
}
// export function generateSize() {
//     const sizes = [((minWidth: 1335px) 416px), ((minWidth: 992px) calc(calc(100vw - 72px) / 3)), ((minWidth: 768px) calc(calc(100vw - 48px) / 2)), 100vw];

//     return sizes.map((size) => size.join(', '));
// }

//  window.download = download;
