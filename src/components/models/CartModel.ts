import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
export class CartModel {
    protected _items: IProduct[] = [];

    constructor (protected events: IEvents) {};

    hasItem(id: string | number): boolean {
        return this._items.some(item => item.id === id);
    }

    addItem(item: IProduct): void {
        if(this.hasItem(item.id)) {
            throw new Error(`Товар с ID ${item.id} уже добавлен!`);
        }
        const itemClone: IProduct = {...item, added: true};
        this._items.push(itemClone);
        this.events.emit('model:cart change');
    }

    deleteItem(id: string | number): void {
        this._items = this._items.filter(item => item.id !== id);
        this.events.emit('model:cart change');
    }

     get items() {
      return this._items;
   }

    getTotalItem(): number {
        return this._items.length;
    }

    getTotalPrice(): number {
        return this._items.reduce((total, item) => total + (item.price ?? 0), 0);
    };

    clear(): void {
        this._items = [];
        this.events.emit('model:cart change');
    }

}