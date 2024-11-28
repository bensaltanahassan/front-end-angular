import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CustomHttpService {
    constructor(
        private http: HttpClient,
        private errorHandlingService: ErrorHandlingService
    ) {}
    // add baseUrl to url
    private getFullUrl(url: string) {
        return environment.API_BASE_URL + url;
    }

    // get request
    get(url: string) {
        return this.http.get(this.getFullUrl(url)).pipe(
            catchError((err: HttpErrorResponse) => {
                this.errorHandlingService.errorMessage(err.status);
                return throwError(err);
            })
        );
    }

    // post request
    post(url: string, body: any) {
        return this.http.post(this.getFullUrl(url), body).pipe(
            catchError((err: HttpErrorResponse) => {
                this.errorHandlingService.errorMessage(err.status);
                return throwError(err);
            })
        );
    }

    // put request
    put(url: string, body: any) {
        return this.http.put(this.getFullUrl(url), body).pipe(
            catchError((err: HttpErrorResponse) => {
                this.errorHandlingService.errorMessage(err.status);
                return throwError(err);
            })
        );
    }

    // delete request
    delete(url: string) {
        return this.http.delete(this.getFullUrl(url)).pipe(
            catchError((err: HttpErrorResponse) => {
                this.errorHandlingService.errorMessage(err.status);
                return throwError(err);
            })
        );
    }

    errorMessage(status: number) {}
}
