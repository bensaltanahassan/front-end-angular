import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenHeadersInterceptor implements HttpInterceptor {
    constructor(private storeService: StoreService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.storeService.get_DataSession('token');
        req = req.clone({
            setHeaders: {
                ContentType: 'application/json',
                'Api-Subscription-Key': environment.KEY,
            },
        });

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return next.handle(req);
    }
}
