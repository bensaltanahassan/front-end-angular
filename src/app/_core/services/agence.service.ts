import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';

@Injectable({
    providedIn: 'root',
})
export class AgenceService {
    //Constructeur par défaut
    constructor(private http: CustomHttpService) {}

    //Méthode pour retourner la liste des enregistrements de type Agences
    getAll() {
        return this.http.get(`Agences/`);
    }

    //Méthode qui récupère le détail de l'enregistrement de type Agences
    load(id: any) {
        //On appelle l'api du load
        return this.http.get('Agences/' + id);
    }

    //Méthode qui permet de créer un enregistrement de type Agences
    insert(data: any) {
        //On appelle l'api d'insert
        return this.http.post('Agences/', data);
    }

    //Méthode qui permet de mettre à jour un enregistrement de type Agences
    update(id, data: any) {
        return this.http.put('Agences/' + id, data);
    }

    //Méthode qui permet de supprimer un enregistrement de type Agences
    delete(id: any) {
        //On appelle l'api du delete
        return this.http.delete('Agences/' + id);
    }
}
