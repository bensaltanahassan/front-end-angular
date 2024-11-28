import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_core/guards/auth.guard';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { HomeComponent } from './demo/components/pages/home/home.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [
                    AuthGuard,

                    // HasPermitionsGuard
                ],
                // data: { allowedRoles: [environment.user, environment.admin] },
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
