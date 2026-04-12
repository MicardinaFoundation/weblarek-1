import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { FormComponent} from "./FormComponent";
import { TOrderFormValues } from "../../types";

export class OrderForm extends FormComponent<TOrderFormValues> {
    protected btnCard: HTMLButtonElement;
    protected btnCash: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
    
    constructor(protected events: IEvents, container: HTMLFormElement) {
        super(events, container);
   
        this.btnCard = ensureElement<HTMLButtonElement>('button[name="card"]', this.container) as HTMLButtonElement;
        this.btnCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container) as HTMLButtonElement;
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container) as HTMLInputElement;
        
        this.btnCard.addEventListener('click', () => {
            events.emit('order:payment',  { payment: 'card' });
        });

        this.btnCash.addEventListener('click', () => {
            events.emit('order:payment', { payment: 'cash' });
        });
    }
   
    set payment(method: 'card' | 'cash' | '') {
        this.btnCard.classList.toggle('button_alt-active', method === 'card');
        this.btnCash.classList.toggle('button_alt-active', method === 'cash');
  }

    get payment(): 'card' | 'cash' | '' {
        return this.btnCard.classList.contains('button_alt-active') ? 'card' :
        this.btnCash.classList.contains('button_alt-active') ? 'cash' : '';
    }
   
    set address(value: string) {
        this.addressInput.value = value;
    }
}