import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Operation } from 'src/app/_core/models/Operation.model';
import { User } from 'src/app/_core/models/User.model';
import { StoreService } from 'src/app/_core/services/store.service';
import { OperationService } from 'src/app/_core/services/operation.service';
import { UsersService } from 'src/app/_core/services/users.service';

@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss'],
    providers: [MessageService],
})
export class OperationComponent {
    operationDialog: boolean = false;
    header: any;
    is_update: boolean;
    deleteoperationDialog: boolean = false;

    operations: any;

    operation: Operation;

    submitted: boolean = false;

    cols: any[] = [];
    maxDate: Date;
    subscriptionStatus: any = [
        { name: 'Active' },
        { name: 'Inactive' },
        { name: 'Expired' },
    ];

    sender: User;
    reciver: User;

    constructor(
        private operationService: OperationService,
        private messageService: MessageService,
        private storeService: StoreService,
        private userService: UsersService
    ) {}

    ngOnInit() {
        this.maxDate = new Date();

        this.operationService.getAll().subscribe({
            next: (data: any) => {
                this.operations = data;
            },
        });
        this.cols = [
            { field: 'id', header: 'ID Operation' },
            { field: 'clientId', header: 'ID Sender' },
            { field: 'beneficiaireId', header: 'ID Reciver' },
            { field: 'balance', header: 'balance' },
            { field: 'createdAt', header: 'Created at' },
            
        ];
    }

    initialseoperation() {
        let idAgence = this.storeService.get_DataSession('id_agence');
        this.operation = {
            id: 0,
            clientId: null,
            beneficiaireId: null,
            montant: null,
        };
    }

    openNew() {
        this.initialseoperation();
        this.submitted = false;
        this.operationDialog = true;
        this.header = 'Add operations';
        this.is_update = true;
    }

    // editoperation(operation: operation) {
    //     this.operation = { ...operation };
    //     this.operation.dateBirth = new Date(operation.dateBirth);
    //     this.operationDialog = true;
    //     this.header = 'Update operations';
    //     this.is_update = false;
    // }

    deleteoperation(operation: Operation) {
        this.deleteoperationDialog = true;
        this.operation = { ...operation };
    }

    confirmDelete() {
        this.deleteoperationDialog = false;
        this.operationService.delete(this.operation.id).subscribe({
            next: (res: any) => {
                this.operations = this.operations.filter(
                    (val) => val.id !== this.operation.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'operation Deleted',
                    life: 3000,
                });
                this.initialseoperation();
            },
        });
    }

    hideDialog() {
        this.operationDialog = false;
        this.submitted = false;
    }

    saveoperation() {
        this.submitted = true;
        if (
            this.operation.clientId &&
            this.operation.beneficiaireId &&
            this.operation.montant
        ) {
            if (this.operation.id == 0) {
                this.operationService.insert(this.operation).subscribe({
                    next: (data) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'operation added successfuly',
                            life: 3000,
                        });
                        this.operations.push(data);
                    },
                });
            } else {
                this.operationService
                    .update(this.operation.id, this.operation)
                    .subscribe({
                        next: (data: any) => {
                            this.operations = this.operations.map(
                                (operation: any) => {
                                    return operation.id == data.id
                                        ? data
                                        : operation;
                                }
                            );

                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'operation updated',
                                life: 3000,
                            });
                        },
                    });
            }
            this.operationDialog = false;
            this.initialseoperation();
        }
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

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
