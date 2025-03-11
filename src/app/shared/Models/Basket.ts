import { v4 as uuidv4} from 'uuid';

export interface IBasket {
    id: string;
    basketItems: IBasketItem[];
}

export interface IBasketItem {
    id: number;
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
    category: string;
}

export class Basket implements IBasket {
    id = uuidv4();
    basketItems: IBasketItem[] = [];
}

export interface IBasketTotal {
    shipping: number;
    subtotal: number;
    total: number;
}
