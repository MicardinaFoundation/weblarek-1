import { IBuyer} from "../../types";
import { IEvents } from "../base/Events";

export class BuyerModel implements IBuyer {
    protected _payment: 'card' | 'cash' | '' = '';
    protected _address: string ='';
    protected _email: string = '';
    protected _phone: string = '';

    constructor (protected events: IEvents) {}

    get buyer():IBuyer {
        return {
            payment: this._payment,
            address: this._address,
            email: this._email,
            phone: this._phone,
        };
    }

    protected fieldValue(field: keyof IBuyer, value: any) {
 
    this[`_${field}`]= value;
 
    this.events.emit(`buyer:change`, {field});
 }

    set payment(value: 'card' | 'cash' | '') {
        this.fieldValue('payment', value);
    }

     set address(value: string) {
        this.fieldValue('address', value)
    }

    set email(value: string) {
        this.fieldValue('email', value)
    }

    set phone(value: string) {
        this.fieldValue('phone', value)
    }

    resetBuyer(): void {
        this.fieldValue('payment', '');
        this.fieldValue('address', '');
        this.fieldValue('email', '');
        this.fieldValue('phone', '');
    }

    isValid(): Record<string, string> {
        const errors: Record<string, string> = {};

        if (!this._payment) {
            errors.payment = 'Необходимо выбрать способ оплаты!';
        }

         if (!this._address) {
            errors.address = 'Необходимо указать адрес доставки!';
        }

        if (!this._email) {
            errors.email = 'Необходимо указать email!';
        }

        if (!this._phone) {
            errors.phone = 'Необходимо указать номер телефона!';
        }

        return errors;
    }

}