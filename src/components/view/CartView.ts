import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICart {
    total: number | string;
    items: HTMLElement[];
}
export class CartView extends Component<ICart> {
    protected contentList: HTMLUListElement;
    protected totalPrice: HTMLElement;
    protected btnOrder: HTMLButtonElement;

    constructor (protected events: IEvents, container: HTMLElement) {
         super(container);
         this.contentList = ensureElement<HTMLUListElement>('.basket__list', this.container);
         this.btnOrder = ensureElement<HTMLButtonElement>('.basket__button', this.container);
         this.totalPrice = ensureElement<HTMLElement>('.basket__price', this.container);
         this.items =[];

         this.btnOrder.addEventListener('click', () => this.events.emit('cart:order'));
    }

    set total (value: number) {
        this.totalPrice.textContent = `${value} синапсов`;
    }

     set items (items: HTMLElement[]) {
       if (items.length) {
            this.contentList.replaceChildren(...items);
        } else {
            this.contentList.textContent = 'Корзина пуста';
        }
    }

    btnDisabled(total: number) {
        this.btnOrder.disabled = total === 0;
    }
    
}


    
