import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StoreService } from '../_core/services/store.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private storeService: StoreService
    ) {}

    ngOnInit(): void {
        this.items = [
            {
                label: `${this.storeService.get_DataSession(
                    'name'
                )} (${this.storeService.get_DataSession('role')})`,
                icon: 'pi pi-user',
            },
            {
                separator: true,
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-power-off',
                command: (event) => {
                    this.logout();
                },
            },
        ];
    }

    logout() {
        //On affiche la popup de confirmation
        Swal.fire({
            title: 'Are you sure you want to disconnect?',
            icon: 'warning',
            background:'#1f2d40',
            color:'#fff',
            showCancelButton: true,
            confirmButtonColor: '#5664d2',
            cancelButtonColor: '#FD991D',
            cancelButtonText: '<i class="pi pi-times-circle"></i> ' + 'Cancel',
            confirmButtonText: ' <i class="pi pi-check-circle"></i> ' + 'Save',
            reverseButtons: true,
        }).then((result) => {
            //Si l'utilisateur confirme
            if (result.isConfirmed) {
                localStorage.clear();
                this.router.navigate(['/auth/login']).then(() => {
                    window.location.reload();
                });
            }
        });
    }
}
