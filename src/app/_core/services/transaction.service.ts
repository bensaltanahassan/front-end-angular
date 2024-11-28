import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    idAgence: number;
    //Constructeur par défaut
    constructor(
        private http: CustomHttpService,
        private storeService: StoreService
    ) {
        this.idAgence = this.storeService.get_DataSession('id_agence');
    }

    //Méthode pour retourner la liste des enregistrements de type Customers
    getAll() {
        //On appelle l'api du get
        return this.http.get(`Students/agences?idAgence=${this.idAgence}`);
    }

    //Méthode qui récupère le détail de l'enregistrement de type Customers
    load(id: any) {
        //On appelle l'api du load
        // return this.http.get(`users/historique/${id}`);
        return this.http.get(`users/operations`);
    }

    //Méthode qui permet de créer un enregistrement de type Customers
    insert(data: any) {
        return this.http.post(`users/transfer`, data);
    }
    //Méthode qui permet de mettre à jour un enregistrement de type Customers
    update(id: any, data: any) {
        //On appelle l'api d'update
        return this.http.put(
            `Students/${id}/agences?idAgence=${this.idAgence}`,
            data
        );
    }

    //Méthode qui permet de supprimer un enregistrement de type Customers
    delete(id: any) {
        //On appelle l'api du delete
        return this.http.delete(
            `Students/${id}/agences?idAgence=${this.idAgence}`
        );
    }
}
