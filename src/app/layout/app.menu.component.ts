import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StoreService } from '../_core/services/store.service';
import { LayoutService } from './service/app.layout.service';

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
        console.log(role);
        this.isAdmin = role.toLowerCase() == environment.admin.toLowerCase();
        this.isUser = role.toLowerCase() == environment.user.toLowerCase();

        console.log(environment);

        if (this.isAdmin) {
            this.model = [
                // {
                //     label: this.translate.instant('Home'),
                //     items: [
                //         {
                //             label: this.translate.instant('Dashboard'),
                //             icon: 'pi pi-fw pi-home',
                //             routerLink: ['/'],
                //         },
                //     ],
                // },
                {
                    label: 'E-Banking',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Home',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/'],
                        },
                    ],
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
                        {
                            label: 'Banquies',
                            icon: 'pi pi-fw pi-euro',
                            routerLink: ['/pages/users'],
                        },
                        {
                            label: 'Clients',
                            icon: 'pi pi-fw pi-user',
                            routerLink: ['/pages/clients'],
                        },
                        {
                            label: 'Bons Clients',
                            icon: 'pi pi-fw pi-chevron-circle-down',
                            routerLink: ['/pages/bonsclients'],
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
