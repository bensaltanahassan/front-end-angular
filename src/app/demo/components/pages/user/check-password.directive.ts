import { Directive } from '@angular/core';
import {
    AbstractControl,
    FormGroup,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
    ValidatorFn,
} from '@angular/forms';

function validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
        let isValid = false;
        if (control && control instanceof FormGroup) {
            let group = control as FormGroup;
            if (group.controls['passwordA'] && group.controls['passwordB']) {
                isValid =
                    group.controls['passwordA'].value ==
                    group.controls['passwordB'].value;
            }
        }
        if (isValid) {
            return null;
        } else {
            return { passwordCheck: 'password not match' };
        }
    };
}

@Directive({
    selector: '[appCheckPassword]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: CheckPasswordDirective,
            multi: true,
        },
    ],
})
export class CheckPasswordDirective implements Validator {
    private valFn: any;

    constructor() {
        this.valFn = validatePassword();
    }
    validate(control: AbstractControl): ValidationErrors {
        return this.valFn(control);
    }
}
