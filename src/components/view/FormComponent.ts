import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";


interface IForm {
    valid: boolean;
    error: string;
}

export abstract class FormComponent<T> extends Component<IForm> {
    protected _btnSubmit: HTMLButtonElement;
    protected errorsContainer: HTMLElement;

  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(container);
    this._btnSubmit = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    this.errorsContainer = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.inputChange(field, value);
        });

        this.container.addEventListener('submit', (evt: Event) => {
            evt.preventDefault();
            this.events.emit(`${this.container.getAttribute('name')}:submit`);
        });
    }

    protected inputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.getAttribute('name')}.${String(field)}:change`, {
            field,
            value
        });
    }

    set valid(value: boolean) {
        this._btnSubmit.disabled = !value;
    }

    set error(value: string) {
        this.errorsContainer.textContent = value;
    }

}
