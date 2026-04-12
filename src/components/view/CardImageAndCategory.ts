import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";
import { CardBase } from "./CardBase";
import { categoryMap } from "../../utils/constants";
import { CDN_URL } from "../../utils/constants";


export abstract class CardImageAndCategory<T extends IProduct> extends CardBase<T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    
    constructor(container: HTMLElement) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    }

    set category(value: keyof typeof categoryMap) {
        this.setText(this.categoryElement, value);
        this.categoryElement.classList.value = categoryMap[value];
    }

   set image(value: string) {
        const fullImageUrl = `${CDN_URL}/${value}`;
        this.setImage(this.imageElement, fullImageUrl, this.title);
    }
}