import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StoreService } from '../_core/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    isAdmin: boolean = false;
    isUser: boolean = false;
    constructor(
        public layoutService: LayoutService,
        private storeService: StoreService
    ) {}

    ngOnInit() {
        // var role = JSON.parse(this.storeService.get_DataSession('role'));
        // this.isAdmin = role.includes(environment.admin);
        // this.isUser = role.includes(environment.user);
        var role = this.storeService.get_DataSession('role');
        this.isAdmin = role == environment.admin;
        this.isUser = role == environment.user;

        if (this.isAdmin) {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/'],
                        },
                    ],
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Users',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/pages/users'],
                        },
                        {
                            label: 'Clients',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/pages/clients'],
                        },
                        {
                            label: 'Operations',
                            icon: 'pi pi-fw pi-sort-alt',
                            routerLink: ['/pages/operations'],
                        },
                    ],
                },
            ];
        } else {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/'],
                        },
                    ],
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'operations',
                            icon: 'pi pi-fw pi-sort-alt',
                            routerLink: ['/pages/transactions'],
                        },
                    ],
                },
            ];
        }
    }
}
