import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Injectable({
    providedIn: 'root',
})
export class IsAuthGuard implements CanActivate {
    constructor(private srv: StoreService, private router: Router) {}

    canActivate(): boolean {
        if (!this.srv.get_DataSession('token')) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
