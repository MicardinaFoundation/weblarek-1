import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGallery {
    galleryItems: HTMLElement[];
}

export class GalleryView extends Component<IGallery> {
    protected catalogElement: HTMLElement;
    constructor(container: HTMLElement) {
        super(container);
        this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
    }

    set galleryItems(items: HTMLElement[]) {
		this.catalogElement.replaceChildren(...items);
	}
}