import { AES, enc, SHA256 } from 'crypto-js';
const key = KEY_AES;

export function encryptAes(data, keyCrypto = null) {
    if (keyCrypto) return AES.encrypt(data, keyCrypto).toString();
    return AES.encrypt(data, key).toString();
}

export function decryptAes(data, keyCrypto = null) {
    if (keyCrypto) return AES.decrypt(data, keyCrypto).toString(enc.Latin1);
    return AES.decrypt(data, key).toString(enc.Latin1);
}

export function hashSha256(data) {
    return SHA256(data).toString(enc.Hex);
}