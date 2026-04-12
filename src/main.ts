import { EventEmitter } from './components/base/Events';
import { CatalogModel } from './components/models/CatalogModel';
import './scss/styles.scss';
import { Api, IApi } from './components/base/Api';
import { API_URL } from './utils/constants';
import { ProductApi } from './components/communication/ProductApi';
import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { CardCart } from './components/view/CardCart';
import { GalleryView} from './components/view/GalleryView';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/view/Modal';
import { IProduct} from './types';
import { CartModel } from './components/models/CartModel';
import { Header } from './components/view/Header';
import { CartView } from './components/view/CartView';
import { ContactsForm } from './components/view/ContactsForm';
import { BuyerModel } from './components/models/BuyerModel';
import { OrderForm } from './components/view/OrderForm';
import { Success } from './components/view/Success';


 const events = new EventEmitter();
 
 const baseApi:IApi =new Api(API_URL);
 const api = new ProductApi(baseApi);

 const tmpCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
 const tmpCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
 const tmpCardCart = ensureElement<HTMLTemplateElement>('#card-basket');
 const tmpCart = ensureElement<HTMLTemplateElement>('#basket');
 const tmpOrderForm =ensureElement<HTMLTemplateElement>('#order');
 const tmpContactsForm = ensureElement<HTMLTemplateElement>('#contacts');
 const tmpSuccess = ensureElement<HTMLTemplateElement>('#success');

const catalogData = new CatalogModel(events);
const cartData = new CartModel(events);
const formData = new BuyerModel(events);
const gallerySection =  ensureElement<HTMLElement>('.page');
const gallery = new GalleryView(gallerySection);
const pageWrapper = ensureElement<HTMLElement>('.page__wrapper');
const headerContainer = ensureElement<HTMLElement>('.header')
const header = new Header(events, headerContainer);
const modalContainer = ensureElement<HTMLElement>('#modal-container');
const modal = new Modal(events, modalContainer);
const cart = new CartView(events, cloneTemplate(tmpCart));
const success = new Success(events, cloneTemplate(tmpSuccess));
const formContacts = new ContactsForm(events, cloneTemplate(tmpContactsForm));
const formOrder = new OrderForm(events, cloneTemplate(tmpOrderForm));

events.on('model:cards updated', () => {
    const cards = catalogData.getItems().map((item) => {
        const cardInstant = new CardCatalog(cloneTemplate(tmpCardCatalog), {
            onClick: () => events.emit('card:selected', item),
        });
        return cardInstant.render(item);
        });
    gallery.render({galleryItems: cards});
    })

 events.on('card:selected', (item: IProduct) => {
    const card = new CardPreview(cloneTemplate(tmpCardPreview), {
        onClick: () => {
            events.emit('preview:add to cart', item)
        }
    })

    const inCart = cartData.hasItem(item.id);
    card.btnText(inCart);
    
    if (item.price === null || item.price === 0) {
        card.btnFree();
    }

    modal.open(card.render(item));
   
 })

 events.on('modal:open', () => {
    pageWrapper.classList.toggle('page__wrapper_locked', true);
 })

 events.on('modal:close', () => {
    pageWrapper.classList.toggle('page__wrapper_locked', false);
})


events.on('preview:add to cart', (item: IProduct) => {
     if (cartData.hasItem(item.id)) {
            cartData.deleteItem(item.id);
    } else {
            cartData.addItem(item);
    }
    
    modal.close();
    header.counter= cartData.getTotalItem();
})

function updateCartUI() {
    header.counter= cartData.getTotalItem();
   
    const items = cartData.items;
    const cardItem = items.map((item, index): HTMLElement => {
        const card = new CardCart(cloneTemplate(tmpCardCart), {
            onClick: () => events.emit('cart:delete from cart', item)
        });
         return card.render({
            ...item,
            index: index
        });
    })
    cart.items = cardItem;
    const totalSum = cartData.getTotalPrice()
    cart.total = totalSum;
    cart.btnDisabled(totalSum);
 }

events.on('model:cart change', () => {
    header.counter= cartData.getTotalItem();
    updateCartUI();
})

events.on('cart:open', () => {
    updateCartUI();
    modal.open(cart.render());
})

events.on('cart:delete from cart', (item: IProduct) => {
    cartData.deleteItem(item.id);
});


events.on('cart:order', () => {
    modal.close();
    modal.open(formOrder.render());
})

events.on('order:payment',(data: { payment: 'card' | 'cash' }) => {
    formData.payment = data.payment;
})

events.on('order.address:change', (data:{field:string, value:string}) => {
    formData.address = data.value;
});

events.on('contacts.email:change', (data:{field:string, value:string}) => {
    formData.email = data.value;
});

events.on('contacts.phone:change', (data:{field:string, value:string}) => {
    formData.phone = data.value;
});

events.on('buyer:change', (data:{field:string}) => {
    const errors = formData.isValid();
    if (['payment', 'address'].includes(data.field)) {
        formOrder.payment = formData.buyer.payment;
        formOrder.address = formData.buyer.address;

        formOrder.valid = !errors.payment && !errors.address;;
        formOrder.error = 
        (errors.payment ? errors.payment + '\n' : '') +
        (errors.address ? errors.address : '');
    };
    
    if (['email', 'phone'].includes(data.field)) {
        formContacts.email = formData.buyer.email;
        formContacts.phone = formData.buyer.phone;

        formContacts.valid = !errors.email && !errors.phone;
        formContacts.error =
        (errors.email ? errors.email + '\n' : '') +
        (errors.phone ? errors.phone : '');
    }

})

events.on('order:submit', () => {
    modal.close();
    modal.open(formContacts.render());
})

events.on('contacts:submit', () => {
    const buyer = formData.buyer;
    const total = {total: cartData.getTotalPrice()}
    const products = {items: cartData.items.map((item) => item.id)};
    const orderData = {...buyer, ...total, ...products}
   
    api
        .postOrder(orderData)
        .then((data) => {
            modal.close();
            modal.open(success.render());
            success.message = data.total;
            cartData.clear();
            formData.resetBuyer();
        })
        .catch((err) => {
            console.error(err);
        })
})

events.on('success:close', () => {
    modal.close();
})

api
    .getProduct()
    .then((initialCards) => {
        catalogData.setItems(initialCards);
    })
    .catch((err) => {
        console.error(err);
    })