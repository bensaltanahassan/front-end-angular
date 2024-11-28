import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    public token: any;
    constructor(private sevCrypt: CryptService) {}

    set_DataSession(body: any) {
        this.token = environment.KEY;
        this.token.toString(CryptoJS.enc.Base64);
        body.forEach((element: any) => {
            localStorage.setItem(
                element.key,
                this.sevCrypt
                    .set_crypteData(element.value, this.token)
                    .toString()
            );
            // localStorage.setItem(element.key, this.sevCrypt.set_crypteData(element.value, this.token));
        });
    }

    get_DataSession(key: any) {
        this.token = environment.KEY;
        return localStorage.getItem(key)
            ? this.sevCrypt.get_decrypteData(
                  localStorage.getItem(key),
                  this.token
              )
            : null;
    }

    remove_DataSessionItems(kyes: any) {
        kyes.forEach((element: any) => {
            localStorage.removeItem(element);
        });
    }

    isLoggedIn(): boolean {
        return !!this.get_DataSession('token');
    }

    convertObjectToArray(data: any) {
        let result = Object.keys(data).map(function (key) {
            return [Number(key), data[key]];
        });

        return result;
    }

    Error(
        title: any,
        icon: any = 'warning',
        timer: any = 2000,
        text: any = null
    ) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            timer: timer,
        });
    }

    GETfileType(saved_file_name: any) {
        //file type extension
        let checkFileType = saved_file_name.split('.').pop();
        let fileType: any;

        if (checkFileType == 'html') {
            fileType = 'text/html';
        }

        if (checkFileType == 'json') {
            fileType = 'application/json';
        }

        if (checkFileType == 'xml') {
            fileType = 'application/xml';
        }

        if (checkFileType == 'txt') {
            fileType = 'text/plain';
        }

        if (checkFileType == 'pdf') {
            fileType = 'application/pdf';
        }

        if (checkFileType == 'doc') {
            fileType = 'application/vnd.ms-word';
        }

        if (checkFileType == 'docx') {
            fileType = 'application/vnd.ms-word';
        }

        if (checkFileType == 'xls') {
            fileType = 'application/vnd.ms-excel';
        }

        if (checkFileType == 'xlsx') {
            fileType = 'application/vnd.ms-excel';
        }

        if (checkFileType == 'png' || checkFileType == 'PNG') {
            fileType = 'image/png';
        }

        if (checkFileType == 'jpg' || checkFileType == 'JPG') {
            fileType = 'image/jpeg';
        }

        if (checkFileType == 'jpeg' || checkFileType == 'JPEG') {
            fileType = 'image/jpeg';
        }

        if (checkFileType == 'gif') {
            fileType = 'image/gif';
        }

        if (checkFileType == 'csv') {
            fileType = 'text/csv';
        }

        return fileType;
    }

    getIcon(extension: any) {
        let icon: any;

        switch (extension) {
            case 'pdf':
                icon = 'fa fa-file-pdf-o';
                break;

            case 'doc':
                icon = 'fa fa-file-word-o';
                break;

            case 'docx':
                icon = 'fa fa-file-word-o';
                break;

            case 'xlsx':
                icon = 'fa fa-file-excel-o';
                break;

            case 'xls':
                icon = 'fa fa-file-excel-o';
                break;

            case 'txt':
                icon = 'fa fa-file';
                break;

            case 'html':
                icon = 'fa fa-code';
                break;

            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
            case 'PNG':
            case 'JPG':
            case 'JPEG':
                icon = 'fa fa-file-image-o';
                break;

            default:
                icon = 'fa fa-file';
                break;
        }
        return icon;
    }
}
