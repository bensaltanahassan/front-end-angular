import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    //Constructeur par défaut
    constructor(private http: CustomHttpService) {}

    //Méthode pour retourner la liste des enregistrements de type Roles
    getAll() {
        //On appelle l'api du get
        return this.http.get(`Roles/`);
    }

    //Méthode qui récupère le détail de l'enregistrement de type Roles
    load(data: any) {
        //On appelle l'api du load
        return this.http.get(`Roles/${data.id}`);
    }

    //Méthode qui permet de créer un enregistrement de type Roles
    insert(data: any) {
        //On appelle l'api d'insert
        return this.http.post(`Roles/`, data);
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Roles
    update(data: any) {
        //On appelle l'api d'update
        return this.http.put(`Roles/${data.id}`, data);
    }

    delete(data: any) {
        // Change the HTTP method to DELETE and update the endpoint
        return this.http.delete(`Roles/${data.id}`);
    }
}
