import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AccessComponent } from './access/access.component';
import { LoginComponent } from './login/login.component';
import { IsAuthGuard } from 'src/app/_core/guards/is-auth.guard';
import { SharedModule } from 'src/app/_shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AccessComponent, ErrorComponent, LoginComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: 'error',
                component: ErrorComponent,
            },
            {
                path: 'access',
                component: AccessComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [IsAuthGuard],
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
})
export class AuthModule {}
