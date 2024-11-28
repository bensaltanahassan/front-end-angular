import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { TransactionComponent } from './demo/components/pages/transaction/transaction.component';
import { AuthGuard } from './_core/guards/auth.guard';
import { HomeComponent } from './demo/components/pages/home/home.component';
import { HasPermitionsGuard } from './_core/guards/has-permitions.guard';
import { environment } from 'src/environments/environment';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard, HasPermitionsGuard],
                data: { allowedRoles: [environment.user, environment.admin] },
            },
            {
                path: 'pages',
                loadChildren: () =>
                    import('./demo/components/pages/pages.module').then(
                        (m) => m.PagesModule
                    ),
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./demo/components/auth/auth.module').then(
                (m) => m.AuthModule
            ),
    },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
