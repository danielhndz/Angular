import { AbstractControl } from '@angular/forms';

export class MyValidators {

    // tslint:disable-next-line: typedef
    static isPriceValid(control: AbstractControl) {
        const value = control.value;
        if (value > 1) {
            return { priceInvalid: true };
        }
        return null;
    }

}
