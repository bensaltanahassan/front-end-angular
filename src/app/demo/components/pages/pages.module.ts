import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/_shared/shared.module';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AuthGuard } from 'src/app/_core/guards/auth.guard';
import { HasPermitionsGuard } from 'src/app/_core/guards/has-permitions.guard';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { CheckPasswordDirective } from './user/check-password.directive';
import { TranslateSharedModule } from 'src/app/translate-shared.module';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { OperationComponent } from './operation/operation.component';
import { BonsClientComponent } from './bonsclient/bonsclient.component';

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
                canActivate: [AuthGuard, HasPermitionsGuard],
                data: {
                    allowedRoles: [environment.admin],
                },
            },
            {
                path: 'clients',
                component: ClientComponent,
                canActivate: [AuthGuard, HasPermitionsGuard],
                data: {
                    allowedRoles: [environment.admin],
                },
            },
            {
                path: 'bonsclients',
                component: BonsClientComponent,
                canActivate: [AuthGuard, HasPermitionsGuard],
                data: {
                    allowedRoles: [environment.admin],
                },
            },
            {
                path: 'operations',
                component: OperationComponent,
                canActivate: [AuthGuard, HasPermitionsGuard],
                data: { allowedRoles: [environment.admin] },
            },
            
            {
                path: 'transactions',
                component: TransactionComponent,
                canActivate: [AuthGuard, HasPermitionsGuard],
                data: { allowedRoles: [environment.user] },
            },

            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
})
export class PagesModule {}
