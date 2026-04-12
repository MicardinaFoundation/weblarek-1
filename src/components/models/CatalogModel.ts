import { IProductData, IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class CatalogModel {
   items: IProductData;
   protected events: IEvents;
   
   constructor (events: IEvents) {
       this.items = {
         total: 0,
         items: [],
       };
      this.events = events;  
  }

   setItems(items: IProductData) {
    this.items = items;
    this.events.emit('model:cards updated')
   }

   getItems() {
      return this.items.items;
   }

   getItem(id: string| number): IProduct {
      const item = this.items.items.find(item => item.id === id);
      if(!item) {
         throw new Error(`Товар с ID ${id} не найден!`)
      }
      return item;
   }
}