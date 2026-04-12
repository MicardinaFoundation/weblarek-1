import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";


export abstract class CardBase<T extends IProduct> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    protected setText(element: HTMLElement, value: unknown) {
        if(element) {
            element.textContent = String(value);
        }
    }

    set title(value: string) {
        this.setText(this.titleElement, value);
    }

    set price(value: number | null) {
        this.setText(this.priceElement, value === null ? 'Бесценно' : `${value} синапсов`);
    }
}
