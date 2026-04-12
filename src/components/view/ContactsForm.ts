import { TContactsFormValues } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { FormComponent} from "./FormComponent";



export class ContactsForm extends FormComponent<TContactsFormValues> {
	protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

	constructor(events: IEvents, container: HTMLFormElement) {
		super(events, container);

		this.emailInput = ensureElement<HTMLInputElement>('input[name=email]', this.container);
		this.phoneInput = ensureElement<HTMLInputElement>('input[name=phone]', this.container);

    }

    set phone(value: string) {
		this.phoneInput.value = value;
	}

	set email(value: string) {
		this.emailInput.value = value;
	}
}