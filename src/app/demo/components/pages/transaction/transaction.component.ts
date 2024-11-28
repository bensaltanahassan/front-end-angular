import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Transaction } from 'src/app/_core/models/Transaction.model';
import { User } from 'src/app/_core/models/User.model';
import { StoreService } from 'src/app/_core/services/store.service';
import { TransactionService } from 'src/app/_core/services/transaction.service';
import { UsersService } from 'src/app/_core/services/users.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss'],
    providers: [MessageService],
})
export class TransactionComponent {
    transactionDialog: boolean = false;
    header: any;
    is_update: boolean;
    deletetransactionDialog: boolean = false;

    transactions: any;
    yourid: any;
    yourbalance: number;
    transaction: Transaction;

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
        private transactionService: TransactionService,
        private messageService: MessageService,
        private storeService: StoreService,
        private userService: UsersService
    ) {}

    ngOnInit() {
        this.maxDate = new Date();
        this.yourid = this.storeService.get_DataSession('user_id');
        this.yourbalance = this.storeService.get_DataSession('balance');

        this.transactionService
            .load(this.storeService.get_DataSession('user_id'))
            .subscribe({
                next: (data: any) => {
                    this.transactions = data.filter((data: any) => {
                        // Customize the condition based on your actual data structure
                        return (
                            data.clientId ===
                                this.storeService.get_DataSession('user_id') ||
                            data.beneficiaireId ===
                                this.storeService.get_DataSession('user_id')
                        );
                    });
                    this.transactions?.map((transaction: any) => {
                        this.userService.load(transaction.clientId).subscribe({
                            next: (data: any) => {
                                transaction.sender = data.data;
                            },
                        });

                        this.userService
                            .load(transaction.beneficiaireId)
                            .subscribe({
                                next: (data: any) => {
                                    transaction.reciver = data.data;
                                },
                            });
                    });
                },
            });

        this.cols = [
            { field: 'senderName', header: 'senderName' },
            { field: 'senderEmail', header: 'senderEmail' },
            { field: 'reciverName', header: 'reciverName' },
            { field: 'reciverEmail', header: 'reciverEmail' },
            { field: 'balance', header: 'balance' },
            { field: 'createdAt', header: 'Created at' },
        ];
    }

    initialsetransaction() {
        let idAgence = this.storeService.get_DataSession('id_agence');
        this.transaction = {
            id: 0,
            clientId: null,
            beneficiaireId: null,
            montant: null,
        };
    }

    openNew() {
        this.initialsetransaction();
        this.submitted = false;
        this.transactionDialog = true;
        this.header = 'Add transactions';
        this.is_update = true;
    }

    deletetransaction(transaction: Transaction) {
        this.deletetransactionDialog = true;
        this.transaction = { ...transaction };
    }

    confirmDelete() {
        this.deletetransactionDialog = false;
        this.transactionService.delete(this.transaction.id).subscribe({
            next: (res: any) => {
                this.transactions = this.transactions.filter(
                    (val) => val.id !== this.transaction.id
                );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'transaction Deleted',
                    life: 3000,
                });
                this.initialsetransaction();
            },
        });
    }

    hideDialog() {
        this.transactionDialog = false;
        this.submitted = false;
    }

    savetransaction() {
        this.submitted = true;
        if (this.transaction.beneficiaireId && this.transaction.montant) {
            if (this.transaction.id == 0) {
                this.transaction.clientId = this.yourid;
                this.transactionService.insert(this.transaction).subscribe({
                    next: (data) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'transaction added successfuly',
                            life: 3000,
                        });
                        this.transactions.push(data);
                    },
                });
            } else {
                this.transactionService
                    .update(this.transaction.id, this.transaction)
                    .subscribe({
                        next: (data: any) => {
                            this.transactions = this.transactions.map(
                                (transaction: any) => {
                                    return transaction.id == data.id
                                        ? data
                                        : transaction;
                                }
                            );
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'transaction updated',
                                life: 3000,
                            });
                        },
                    });
            }
            this.transactionDialog = false;
            this.yourbalance = this.yourbalance - this.transaction.montant;
            this.storeService.set_DataSession([
                { key: 'balance', value: this.yourbalance },
            ]);
            this.initialsetransaction();
            Swal.fire({
                title: 'Successful Transaction',
                icon: 'success',
                timer: 2000,
                reverseButtons: true,
                confirmButtonColor: '#FFD54F',
                background: '#1f2d40',
                color: '#fff',
            });
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
