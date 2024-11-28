import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { CustomHttpService } from './custom-http.service';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    //Constructeur par défaut
    constructor(
        private http: CustomHttpService,
        private storeService: StoreService
    ) {}

    //Méthode pour retourner la liste des enregistrements de type Users
    getAll() {
        return this.http.get(`users/`);
    }

    //Méthode pour le login de purchaiser
    Login(data: any) {
        //On appelle l'api du get
        return this.http.post('auth/login', data);
    }

    //Méthode qui récupère le détail de l'enregistrement de type Users
    load(id: any) {
        return this.http.get(`users/${id}`);
    }

    //Méthode qui permet de créer un enregistrement de type Users
    insert(data: any) {
        return this.http.post(`auth/client`, data);
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Users
    update(id: number, data: any) {
        return this.http.put(`users/${id}`, data);
    }

    changePWD(data: any) {
        //On appelle l'api d'update

        return this.http.put('Users/' + data.id + '/password', data);
    }

    //Méthode qui permet de supprimer un enregistrement de type Users
    delete(id: any) {
        return this.http.delete(`users/${id}`);
    }
    ennable(id: number, client: any) {
        return this.http.put(`users/enable-client/${id}`, client);
    }
}
