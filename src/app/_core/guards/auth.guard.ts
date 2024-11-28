import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private srv: StoreService, private router: Router) {}

    canActivate(): boolean {
        if (this.srv.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
