import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root',
})
export class IncomesService {
    constructor(
        private http: CustomHttpService,
        private storeService: StoreService
    ) {}

    //Méthode pour retourner la liste des enregistrements de type Vehicle_Discounts
    getAll() {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api du get
        return this.http.get(`Incomes/agences?idAgence=${idAgence}`);
    }

    //Méthode qui récupère le détail de l'enregistrement de type Vehicle_Discounts
    load(id: any) {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api du load
        return this.http.get(`Incomes/${id}/agences?idAgence=${idAgence}`);
    }

    //Méthode qui permet de créer un enregistrement de type Vehicle_Discounts
    insert(data: any) {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api d'insert
        return this.http.post(`Incomes/agences?idAgence=${idAgence}`, data);
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Vehicle_Discounts
    update(data: any) {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api d'update
        return this.http.put(
            `Incomes/${data.id}/agences?idAgence=${idAgence}`,
            data
        );
    }

    //Méthode qui permet de supprimer un enregistrement de type Vehicle_Discounts
    delete(id: any) {
        let idAgence = this.storeService.get_DataSession('id_agence');
        //On appelle l'api du delete
        return this.http.delete(`Incomes/${id}/agences?idAgence=${idAgence}`);
    }

    predictedIncomes(month: number) {
        return this.http.get(`Incomes/preductedIncomes?month=${month}`);
    }
}
