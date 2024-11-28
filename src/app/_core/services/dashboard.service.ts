import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    idAgence: number;
    constructor(
        private http: CustomHttpService,
        private storeService: StoreService
    ) {
        this.idAgence = this.storeService.get_DataSession('id_agence');
    }

    getMetrics() {
        return this.http.get(`Dashboard/metrics?idAgence=${this.idAgence}`);
    }
}
