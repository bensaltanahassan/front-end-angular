import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_core/guards/auth.guard';
import { SharedModule } from 'src/app/_shared/shared.module';
import { TranslateSharedModule } from 'src/app/translate-shared.module';
import { environment } from 'src/environments/environment';
import { BonsClientComponent } from './bonsclient/bonsclient.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { OperationComponent } from './operation/operation.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CheckPasswordDirective } from './user/check-password.directive';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        UserComponent,
        ClientComponent,
        BonsClientComponent,
        TransactionComponent,
        OperationComponent,
        CheckPasswordDirective,
        HomeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateSharedModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: 'users',
                component: UserComponent,
                canActivate: [AuthGuard],
                data: {
                    allowedRoles: [environment.admin],
                },
            },
            {
                path: 'clients',
                component: ClientComponent,
                canActivate: [AuthGuard],
                data: {
                    allowedRoles: [environment.admin],
                },
            },
            {
                path: 'bonsclients',
                component: BonsClientComponent,
                canActivate: [AuthGuard],
                data: {
                    allowedRoles: [environment.admin],
                },
            },
            {
                path: 'operations',
                component: OperationComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: [environment.admin] },
            },

            {
                path: 'transactions',
                component: TransactionComponent,
                canActivate: [AuthGuard],
                data: { allowedRoles: [environment.user] },
            },

            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
})
export class PagesModule {}
