import { ENCRYPTDECRYPTKEY } from "@env";
import CryptoJS from 'crypto-js';

const adjustKeyLength = (key: string, length: number) => {
    let keyBytes = CryptoJS.enc.Utf8.parse(key);
    if (keyBytes.sigBytes >= length) {
      return CryptoJS.enc.Hex.parse(keyBytes.toString(CryptoJS.enc.Hex).substring(0, length * 2));
    } else {
      while (keyBytes.sigBytes < length) {
        key += '\0'; // Pad with null characters
        keyBytes = CryptoJS.enc.Utf8.parse(key);
      }
      return keyBytes;
    }
  };
  const encryptParams = (params:any) => {
    const paramsString = JSON.stringify(params);
    const adjustedKey = adjustKeyLength(ENCRYPTDECRYPTKEY, 32); 
    const iv = CryptoJS.lib.WordArray.random(16); 
    const encrypted = CryptoJS.AES.encrypt(paramsString, adjustedKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    const encryptedData = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
    return encodeURIComponent(encryptedData);
  };

  export default encryptParams;