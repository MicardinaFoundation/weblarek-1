
export interface IOrderData {
    items: (string | number)[];
    total: number;
    payment: 'card' | 'cash' | '';
    address: string;
    email: string;
    phone: string;
}

export interface IApiResponse {
    id: string;
    total: number;
}

export interface IProduct {
    id: string | number;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    added?: boolean;
}

export interface IProductData {
    total: number;
    items: IProduct[];
}

export interface IBuyer {
    payment: 'card' | 'cash' | '';
    address: string;
    email: string;
    phone: string;
}

export type TOrderFormValues = Pick<IBuyer, 'payment' | 'address'>;

export type TContactsFormValues = Pick<IBuyer, 'email' | 'phone'>;

  export interface IActions {
	onClick: (event: MouseEvent) => void;
}

