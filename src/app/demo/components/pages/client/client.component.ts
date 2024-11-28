import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Client } from 'src/app/_core/models/Client';
import { ClientsService } from 'src/app/_core/services/clients.service';
import { RoleService } from 'src/app/_core/services/role.service';

export interface ChangePassword {
    id: number;
    newPassword: string;
    confirmPassword: string;
}

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    providers: [MessageService],
})
export class ClientComponent implements OnInit {
    clientDialog: boolean = false;

    deleteclientDialog: boolean = false;
    showDialogchangePWD: boolean = false;

    clients: any;

    client: Client;

    changePassword: ChangePassword;
    msgReponse: string;

    submitted: boolean = false;
    submittedChangePass: boolean = false;

    cols: any[] = [];
    listeidRole: any = [];
    agences: any = [];
    header: string;
    is_update: boolean;
    clientPasswordId: number;

    constructor(
        private clientService: ClientsService,
        private messageService: MessageService,
        private rolesService: RoleService
    ) {}

    ngOnInit() {
        // var role = JSON.parse(this.storeService.get_DataSession('role'));
        // var role = this.storeService.get_DataSession('role');

        this.clientService.getAll().subscribe({
            next: (data: any) => {
                console.log(data);
                this.clients = data?.data.filter(
                    (client) =>
                        client.role.name.toLowerCase() ===
                        'CLIENT'.toLowerCase()
                );
            },
        });
        // this.clients.filter(client => client.role.id === 2)

        // if (this.isSuperAdmin) {
        //     this.agenceService.getAll().subscribe({
        //         next: (data: any) => (this.agences = data),
        //     });
        // }

        this.cols = [
            { field: 'id', header: 'ID Client' },
            { field: 'username', header: 'username' },
            { field: 'email', header: 'email' },
            { field: 'type', header: 'type' },
            { field: 'enabled', header: 'enabled' },
            { field: 'balance', header: 'Solde' },
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
    giveClientType(balance: number) {
        if (balance > 20000) {
            return { type: 'Bon Client', ico: 'success' };
        } else if (balance > 3000 && balance < 20000) {
            return { type: 'Client Normal', ico: 'info' };
        } else {
            return { type: 'Mouvis Client', ico: 'danger' };
        }
    }
    inilialzeChangePassword() {
        this.changePassword = {
            id: this.clientPasswordId,
            newPassword: null,
            confirmPassword: null,
        };
    }

    initialseClient() {
        // let idAgence = this.storeService.get_DataSession('id_agence');
        this.client = {
            id: 0,
            // name: null,
            // phoneNumber: null,
            // password: null,
            // passwordConfirmation: null,
            // rolesId: null,
            // idAgence: idAgence,
            // firstname: null,
            // lastname: null,
            username: null,
            // phone: null,
            email: null,
            password: null,
            balance: 0,
            enabled: false,
            // notificationToken: null,
        };
    }

    ShowDialogUpdatePWD(client: any) {
        this.clientPasswordId = client?.id;
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
        this.clientService.changePWD(this.changePassword).subscribe({
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
        this.initialseClient();
        this.submitted = false;
        this.clientDialog = true;
        this.header = 'add clients';
        this.is_update = true;
    }

    editClient(client: any) {
        this.header = 'edit clients';
        this.client = {
            id: client.id,
            username: client.username,
            // phone: null,
            email: client.email,
            password: client.password,
            balance: client.balance,
            enabled: client.enabled,
        };
        // this.client.rolesId = client.roles.map((role: any) => {
        //     return role.id;
        // });
        this.clientDialog = true;
        this.is_update = false;
    }

    deleteClient(client: Client) {
        this.deleteclientDialog = true;
        this.client = { ...client };
    }

    confirmDelete() {
        this.deleteclientDialog = false;
        //On appelle le service de suppression
        this.clientService.delete(this.client.id).subscribe({
            next: (res: any) => {
                this.clients = this.clients.filter(
                    (val) => val.id !== this.client.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'client Deleted',
                    life: 3000,
                });
                this.initialseClient();
            },
        });
    }

    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }

    hideChangePWDDialog() {
        this.showDialogchangePWD = false;
        this.submittedChangePass = false;
    }

    saveclient() {
        this.submitted = true;
        if (this.client.email && this.client.username) {
            if (this.client.id == 0) {
                this.clientService.insert(this.client).subscribe({
                    next: (data) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'client added successfuly',
                            life: 3000,
                        });
                    },
                });
                this.clients.push(this.client);
                this.clients = [...this.clients];
            } else {
                var putRequest = {
                    username: this.client.username,
                    email: this.client.email,
                    balance: this.client.balance,
                };
                this.clientService
                    .update(this.client.id, putRequest)
                    .subscribe({
                        next: (data: any) => {
                            // this.clients = this.clients.map((client: any) => {
                            //     return client.id == data.id ? data : client;
                            // });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'client updated',
                                life: 3000,
                            });
                        },
                    });
            }
            this.clientDialog = false;
            this.initialseClient();
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
    toggleSwitch(event: any, client: any) {
        this.clientService.ennable(client.id, client).subscribe({
            next: (data) => {
                this.client.enabled = !client.enabled;
            },
        });
    }
}
