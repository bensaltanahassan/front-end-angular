import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';

@Injectable({
    providedIn: 'root',
})
export class HasPermitionsGuard implements CanActivate {
    constructor(private srv: StoreService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const allowedRoles = route.data['allowedRoles'];
        const userRole = this.srv.get_DataSession('role');
        // const userRoles = JSON.parse(this.srv.get_DataSession('role'));
        // const isAllowed = userRoles.some((role: any) =>
        //     allowedRoles.includes(role)
        // );
        const isAllowed = allowedRoles.includes(userRole);
        if (isAllowed) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
