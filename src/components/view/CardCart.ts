import { ensureElement } from "../../utils/utils";
import { IProduct, IActions } from "../../types";
import { CardBase } from "./CardBase";


export class CardCart extends CardBase<IProduct>  {
    protected indexElement: HTMLElement;
    protected btnDelete: HTMLButtonElement;
    protected _index:number = 0;
        constructor(container: HTMLElement, actions?: IActions) {
        super(container);
        
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.btnDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if(actions?.onClick) {
        this.btnDelete.addEventListener('click', actions.onClick);
        }
    }

    set index(_index: number) {
        this.setText(this.indexElement, `${_index + 1}`);
    }

    render(data: IProduct & { index?: number }): HTMLElement {
        super.render(data);
        return this.container;
    }
}