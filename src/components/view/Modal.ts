import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

interface IModal {
    content: HTMLElement;
}
export class Modal extends Component<IModal> {
    protected _content: HTMLElement;
    protected btnClose: HTMLButtonElement;
    protected isOpen: boolean = false;
    protected activeClass = 'modal_active';

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        
        this._content = ensureElement<HTMLElement>('.modal__content', this.container);
        this.btnClose = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        
        this.btnClose.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.handleClick.bind(this));
        this._content.addEventListener('click', (evt) => evt.stopPropagation());
        
        this.escape = this.escape.bind(this);
    }

    open(content: HTMLElement): void {
        if (!content || this.isOpen) return;
        
        this._content.replaceChildren(content);
        this.container.classList.add(this.activeClass);
        document.addEventListener('keyup', this.escape);
        this.isOpen = true;
        
        this.events.emit('modal:open');
    }

    close(): void {
        if (!this.isOpen) return;
        
        this._content.innerHTML = '';
        this.container.classList.remove(this.activeClass);
        document.removeEventListener('keyup', this.escape);
        this.isOpen = false;
        
        this.events.emit('modal:close');
    }

    
    handleClick(evt: MouseEvent): void {
        
        if (evt.target === this.container) {
            this.close();
        }
    }

    escape (evt: KeyboardEvent): void {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}