import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/_core/services/store.service';
import { UsersService } from 'src/app/_core/services/users.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    phoneNumber: string;
    password: string;
    loading: boolean = false;
    errorMessage: string = null;
    submitted: boolean = false;
    constructor(
        public layoutService: LayoutService,
        private storeService: StoreService,
        private router: Router,
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        this.initialize();
    }

    initialize() {
        this.phoneNumber = null;
        this.password = null;
    }

    authUser() {
        this.submitted = true;
        this.errorMessage = null;
        if (this.phoneNumber?.trim() && this.password?.trim()) {
            this.loading = true;
            var body = {
                email: this.phoneNumber,
                password: this.password,
            };
            console.log(body);
            this.usersService.Login(body).subscribe({
                next: (res: any) => {
                    console.log(res);
                    this.router.navigate(['/']);
                    this.StoreData(res);

                    this.loading = false;
                },
                error: (error: any) => {
                    this.errorMessage = error.error.errors;
                    this.loading = false;
                },
                complete: () => this.initialize(),
            });
        }
    }

    StoreData(data: any) {
        // let roles = data.user.roles;

        // let rolesName = roles.map((d: any) => {
        //     return d.name;
        // });
        let body = [
            {
                key: 'name',
                value: data.username,
            },
            {
                key: 'token',
                value: data.token,
            },
            {
                key: 'user_id',
                value: data.id,
            },
            {
                key: 'email',
                value: data.email,
            },
            {
                key: 'role',
                value: data?.roles?.[0],
            },
            {
                key: 'balance',
                value: data.balance,
            },
            // {
            //     key: 'role',
            //     value: JSON.stringify(rolesName),
            // },
            // {
            //     key: 'rib',
            //     value: data.user.rib,
            // },
        ];

        this.storeService.set_DataSession(body);
    }
}
