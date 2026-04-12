import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";


interface ISuccess {
    message: string;
    btnClose: HTMLButtonElement;
  }
  
export class Success extends Component<ISuccess> {
    protected _description: HTMLElement;
    protected btnClose: HTMLButtonElement;

    constructor (protected events: IEvents, container: HTMLElement) {
        super(container)
        this._description = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.btnClose = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.btnClose.addEventListener('click', () => { events.emit('success:close') });
    }

    set message(value: number) {
      this._description.textContent = `Списано ${value} синапсов`;
    }
}