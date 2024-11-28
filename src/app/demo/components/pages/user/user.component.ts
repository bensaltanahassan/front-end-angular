import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/_core/models/User.model';
import { RoleService } from 'src/app/_core/services/role.service';
import { UsersService } from 'src/app/_core/services/users.service';

export interface ChangePassword {
    id: number;
    newPassword: string;
    confirmPassword: string;
}

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [MessageService],
})
export class UserComponent implements OnInit {
    userDialog: boolean = false;

    deleteUserDialog: boolean = false;
    showDialogchangePWD: boolean = false;

    users: any;

    user: User;

    changePassword: ChangePassword;
    msgReponse: string;

    submitted: boolean = false;
    submittedChangePass: boolean = false;

    cols: any[] = [];
    listeidRole: any = [];
    agences: any = [];
    header: string;
    is_update: boolean;
    UserPasswordId: number;

    constructor(
        private userService: UsersService,
        private messageService: MessageService,
        private rolesService: RoleService
    ) {}

    ngOnInit() {
        // var role = JSON.parse(this.storeService.get_DataSession('role'));
        // var role = this.storeService.get_DataSession('role');

        this.userService.getAll().subscribe({
            next: (data: any) => {
                this.users = data?.data.filter(
                    (client) => client.role.id === 1
                );
            },
        });

        // if (this.isSuperAdmin) {
        //     this.agenceService.getAll().subscribe({
        //         next: (data: any) => (this.agences = data),
        //     });
        // }

        this.cols = [
            { field: 'id', header: 'ID Banquier' },
            { field: 'username', header: 'username' },
            { field: 'email', header: 'email' },
            { field: 'createdAt', header: 'Created At' },
            { field: 'action', header: 'Actions' },
        ];

        //this.GetAllListeidRole();
    }

    GetAllListeidRole() {
        //On appelle le service
        this.rolesService.getAll().subscribe((res: any) => {
            //On parse le json
            this.listeidRole = res;
        });
    }

    inilialzeChangePassword() {
        this.changePassword = {
            id: this.UserPasswordId,
            newPassword: null,
            confirmPassword: null,
        };
    }

    initialseUser() {
        // let idAgence = this.storeService.get_DataSession('id_agence');
        this.user = {
            id: 0,
            // name: null,
            // phoneNumber: null,
            // password: null,
            // passwordConfirmation: null,
            role: null,
            // idAgence: idAgence,
            // firstname: null,
            // lastname: null,
            username: null,
            // phone: null,
            email: null,
            password: null,
            balance: 0,
            // notificationToken: null,
        };
    }
    giveUserType(balance: number) {
        if (balance > 20000) {
            return { type: 'Bon Client', ico: 'success' };
        } else if (balance > 3000 && balance < 20000) {
            return { type: 'Client Normal', ico: 'info' };
        } else {
            return { type: 'Mouvais Client', ico: 'danger' };
        }
    }

    ShowDialogUpdatePWD(user: any) {
        this.UserPasswordId = user?.id;
        this.inilialzeChangePassword();
        this.showDialogchangePWD = true;
        this.submittedChangePass = false;
        this.msgReponse = '';
        this.header = 'update password';
    }

    changePWD() {
        this.submittedChangePass = true;
        if (
            this.changePassword.newPassword &&
            this.changePassword.confirmPassword
        ) {
            if (
                this.changePassword.newPassword !=
                this.changePassword.confirmPassword
            ) {
                this.msgReponse = 'Passwords are not identical';
            } else {
                this.saveNewPassword();
            }
        }
    }

    private saveNewPassword() {
        this.userService.changePWD(this.changePassword).subscribe({
            next: (res) => {
                this.showDialogchangePWD = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Mot de passe modifié avec succès',
                    life: 3000,
                });
            },
        });
    }

    openNew() {
        this.initialseUser();
        this.submitted = false;
        this.userDialog = true;
        this.header = 'add users';
        this.is_update = true;
    }

    editUser(user: any) {
        this.header = 'edit users';
        this.user = {
            id: user.id,
            // firstname: null,
            // lastname: null,
            username: user.username,
            // phone: null,
            role: user.role,
            email: user.email,
            password: user.password,
            balance: user.balance,
        };
        // this.user.rolesId = user.roles.map((role: any) => {
        //     return role.id;
        // });
        this.userDialog = true;
        this.is_update = false;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        //On appelle le service de suppression
        this.userService.delete(this.user.id).subscribe({
            next: (res: any) => {
                this.users = this.users.filter(
                    (val) => val.id !== this.user.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'User Deleted',
                    life: 3000,
                });
                this.initialseUser();
            },
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    hideChangePWDDialog() {
        this.showDialogchangePWD = false;
        this.submittedChangePass = false;
    }

    saveUser() {
        this.submitted = true;
        if (
            // this.user.firstname &&
            // this.user.phone &&
            this.user.email &&
            // this.user.lastname &&
            this.user.username
        ) {
            if (this.user.id == 0) {
                this.user.role = 1;
                this.userService.insert(this.user).subscribe({
                    next: (data) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'user added successfuly',
                            life: 3000,
                        });
                    },
                });
                this.users.push(this.user);
                this.users = [...this.users];
            } else {
                var putRequest = {
                    username: this.user.username,
                    role: this.user.role,
                    email: this.user.email,
                    balance: this.user.balance,
                };
                this.userService.update(this.user.id, putRequest).subscribe({
                    next: (data: any) => {
                        // this.users = this.users.map((user: any) => {
                        //     return user.id == data.id ? data : user;
                        // });
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'user updated',
                            life: 3000,
                        });
                    },
                });
            }
            this.userDialog = false;
            this.initialseUser();
        }
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
