import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root',
})
export class ConfigurationService {
    idAgence: number;
    //Constructeur par défaut
    constructor(
        private http: CustomHttpService,
        private storeService: StoreService
    ) {
        this.idAgence = this.storeService.get_DataSession('id_agence');
    }

    //Méthode pour retourner la liste des enregistrements de type Customers
    getConf() {
        //On appelle l'api du get
        return this.http.get(`Configuration/agences?idAgence=${this.idAgence}`);
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Customers
    update(id: any, data: any) {
        //On appelle l'api d'update
        return this.http.put(
            `Configuration/${id}/agences?idAgence=${this.idAgence}`,
            data
        );
    }
}
