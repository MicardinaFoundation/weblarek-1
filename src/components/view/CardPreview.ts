import { ensureElement } from "../../utils/utils";
import { IProduct, IActions } from "../../types";
import { CardImageAndCategory } from "./CardImageAndCategory";

export class CardPreview extends CardImageAndCategory<IProduct> {
    protected descriptionElement: HTMLElement;
    protected btnAddToCart: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IActions) {
        super(container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.btnAddToCart = ensureElement<HTMLButtonElement>('.card__button', this.container);

        if(actions?.onClick) {
        this.btnAddToCart.addEventListener('click', actions.onClick);
        }
    }

    set description(value: string) {
        this.setText(this.descriptionElement, value);
    }

    btnFree(): void {
         this.btnAddToCart.disabled = true;
         this.setText(this.btnAddToCart, 'Недоступно')
    }

    btnText(inCart: boolean) {
        this.setText(this.btnAddToCart, inCart? 'Удалить из корзины' : 'Купить')  
    }
        
}