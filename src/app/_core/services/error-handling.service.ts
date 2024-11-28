import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlingService {
    constructor(private router: Router) {}

    //Méthode de gestion des erreurs en fonction des codes erreurs
    errorMessage(code: any) {
        switch (code) {
            case 403: {
                localStorage.clear();
                this.router.navigateByUrl('/auth/access').then((res: any) => {
                    this.DisplayError(
                        'Accès interdit ! Veuillez contacter votre administrateur.'
                    );
                });

                break;
            }

            case 401: {
                localStorage.clear();

                this.router
                    .navigateByUrl('/auth/access')
                    .then((res: any) => {});

                break;
            }

            case 500: {
                localStorage.clear();
                this.router.navigateByUrl('/login').then((res: any) => {});
                break;
            }

            case 404: {
                this.DisplayError('Page/Méthode inexistante ...');
                break;
            }

            case 204: {
                this.DisplayError('Fichier inexistant sur le serveur !');
                break;
            }

            case 0: {
                this.DisplayError(
                    'Serveur inaccessible ! Veuillez contacter votre administrateur.'
                );
                break;
            }
        } // fin switch erreur
    }

    //Méthode qui permet d'afficher un message d'erreur
    DisplayError(
        message: any,
        text: any = null,
        type: any = 'warning',
        timer: any = 2000
    ) {
        Swal.fire({
            icon: type,
            title: message,
            text: text,
            showConfirmButton: false,
            timer: timer,
        });
    }
}
