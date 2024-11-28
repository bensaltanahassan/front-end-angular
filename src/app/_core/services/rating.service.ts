import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root',
})
export class RatingService {
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
        return this.http.get(`Ratings/agences?idAgence=${this.idAgence}`);
    }

    //Méthode qui récupère le détail de l'enregistrement de type Offres
    load(id: any) {
        //On appelle l'api du load
        return this.http.get(`Ratings/${id}/agences?idAgence=${this.idAgence}`);
    }

    //Méthode qui permet de créer un enregistrement de type Offres
    insert(data: any) {
        //On appelle l'api d'insert
        return this.http.post(
            `Ratings/agences?idAgence=${this.idAgence}`,
            data
        );
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Offres
    update(data: any) {
        //On appelle l'api d'update
        return this.http.put(
            `Ratings/${data.id}/agences?idAgence=${this.idAgence}`,
            data
        );
    }

    updateRange(data: any) {
        //On appelle l'api d'update
        return this.http.put(`Ratings/agences?idAgence=${this.idAgence}`, data);
    }

    delete(id: any) {
        // Change the HTTP method to DELETE and update the endpoint
        return this.http.delete(
            `Ratings/${id}/agences?idAgence=${this.idAgence}`
        );
    }

    getRatingsStudents() {
        return this.http.get(
            `Ratings/studentRatings?idAgence=${this.idAgence}`
        );
    }

    getRatingsStudent(id: number) {
        return this.http.get(`Ratings/student/${id}?idAgence=${this.idAgence}`);
    }
}
