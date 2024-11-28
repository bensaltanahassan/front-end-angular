import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root',
})
export class ExpensesPriceService {
    constructor(
        private http: CustomHttpService,
        private storeService: StoreService
    ) {}

    //Méthode pour retourner la liste des enregistrements de type Vehicle_Discounts
    getAll() {
        //On appelle l'api du get
        return this.http.get('ExpensesPrice/');
    }

    //Méthode qui récupère le détail de l'enregistrement de type Vehicle_Discounts
    load(id: any) {
        //On appelle l'api du load
        return this.http.get('ExpensesPrice/' + id);
    }

    //Méthode qui permet de créer un enregistrement de type Vehicle_Discounts
    insert(data: any) {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api d'insert
        return this.http.post(
            `ExpensesPrice/agences?idAgence=${idAgence}`,
            data
        );
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Vehicle_Discounts
    update(data: any) {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api d'update
        return this.http.put(
            `ExpensesPrice/${data.id}/agences?idAgence=${idAgence}`,
            data
        );
    }

    //Méthode qui permet de supprimer un enregistrement de type Vehicle_Discounts
    delete(id: any) {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api du delete
        return this.http.delete(
            `ExpensesPrice/${id}/agences?idAgence=${idAgence}`
        );
    }

    getPriceOfExpense(id: any) {
        return this.http.get(`ExpensesPrice/prices/${id}`);
    }
}
