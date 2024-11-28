import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { TokenHeadersInterceptor } from './_core/interceptors/token-headers.interceptor';

// registerLocaleData(localeAr, 'ar');

// export function createTranslateLoader(http: HttpClient): any {
//     return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: createTranslateLoader,
        //         deps: [HttpClient],
        //     },
        // }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenHeadersInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
