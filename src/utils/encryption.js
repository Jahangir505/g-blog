import { APP_HASH_KEY } from 'src/helpers/config';
import { isEmpty } from 'src/helpers/functions';

/* eslint-disable no-bitwise */
export const cipher = (salt) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n) => `0${Number(n).toString(16)}`.substr(-2);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return (text) => text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

export const decipher = (salt) => {
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return (encoded) =>
    encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join('');
};

/*
// Usages
// To create a cipher
const myCipher = cipher('mySecretSalt')

//Then cipher any text:
myCipher('the secret string')   // --> "7c606d287b6d6b7a6d7c287b7c7a61666f"

//To decipher, you need to create a decipher and use it:
const myDecipher = decipher('mySecretSalt')
myDecipher("7c606d287b6d6b7a6d7c287b7c7a61666f")

*/

export const encrypt = (text) => {
  if (isEmpty(text)) return '';
  const encryption = cipher(APP_HASH_KEY);
  return encryption(text || '');
};

export const decrypt = (text) => {
  if (isEmpty(text)) return '';
  const decryption = decipher(APP_HASH_KEY);
  return decryption(text || '');
};

// window.enc = { encrypt, decrypt };

export default {
  cipher,
  decipher,
  encrypt,
  decrypt,
};
