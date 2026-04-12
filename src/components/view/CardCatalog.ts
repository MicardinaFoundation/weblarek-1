import { IProduct, IActions } from "../../types";
import { CardImageAndCategory } from "./CardImageAndCategory";

export class CardCatalog extends CardImageAndCategory<IProduct> {
    constructor(container: HTMLElement, actions?: IActions) {
        super(container)

        if(actions?.onClick) {
        this.container.addEventListener('click', actions.onClick);
        }
    }
}