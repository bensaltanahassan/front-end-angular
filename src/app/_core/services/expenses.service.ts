import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root',
})
export class ExpensesService {
    idAgence: number;
    constructor(
        private http: CustomHttpService,
        private storeService: StoreService
    ) {
        this.idAgence = this.storeService.get_DataSession('id_agence');
    }

    //Méthode pour retourner la liste des enregistrements de type Offres
    getAll() {
        //On appelle l'api du get
        return this.http.get(`Expenses/agences?idAgence=${this.idAgence}`);
    }

    //Méthode qui récupère le détail de l'enregistrement de type Offres
    load(id: any) {
        //On appelle l'api du load
        return this.http.get(
            `Expenses/${id}/agences?idAgence=${this.idAgence}`
        );
    }

    //Méthode qui permet de créer un enregistrement de type Offres
    insert(data: any) {
        //On appelle l'api d'insert
        return this.http.post(
            `Expenses/agences?idAgence=${this.idAgence}`,
            data
        );
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Offres
    update(data: any) {
        //On appelle l'api d'update
        return this.http.put(
            `Expenses/${data.id}/agences?idAgence=${this.idAgence}`,
            data
        );
    }

    delete(id: any) {
        // Change the HTTP method to DELETE and update the endpoint
        return this.http.delete(
            `Expenses/${id}/agences?idAgence=${this.idAgence}`
        );
    }
}
