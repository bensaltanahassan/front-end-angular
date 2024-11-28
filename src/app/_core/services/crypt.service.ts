import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class CryptService {
    constructor() {}

    set_crypteData(data: any, token: any) {
        var ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            token.toString()
        );
        return ciphertext;
    }

    get_decrypteData(data: any, token: any) {
        var bytes = CryptoJS.AES.decrypt(data.toString(), token);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
}
