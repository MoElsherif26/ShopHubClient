import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = 'https://localhost:44343/api/';

  constructor(private http: HttpClient) { }

  private basketSource = new BehaviorSubject<IBasket>(null!);

  basket$ = this.basketSource.asObservable();

  private basketSourceTotal = new BehaviorSubject<IBasketTotal>(null!);
  basketTotal$ = this.basketSourceTotal.asObservable();


  calculateTotal() {
    const basket = this.getCurrentValue();
    const shipping = 0;
    const subtotal = basket.basketItems.reduce((a,c)=>{
      return (c.price * c.quantity) + a;
    },0);
    const total = shipping + subtotal;
    this.basketSourceTotal.next({shipping, subtotal, total});
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + "Baskets/get-basket-item/" + id)
    .pipe(
      map((value) => {
        this.basketSource.next(value as IBasket);
        this.calculateTotal();
        return value;
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + "Baskets/update-basket/", basket)
    .subscribe({
      next: (value) => {
        this.basketSource.next(value as IBasket);
        this.calculateTotal();
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }

  getCurrentValue() {
    return this.basketSource.value;
  }

  private mapProductToBasketItem(product: IProduct, 
    quantity: number): IBasketItem {
    
      return {
        id: product.id,
        category: product.categoryName,
        image: product.photos[0].imageName,
        name: product.name,
        price: product.newPrice,
        quantity: quantity,
        description: product.description
      }
  }

  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this
    .mapProductToBasketItem(product, quantity);

    let basket = this.getCurrentValue();
    if (basket.id == null) {
      basket = this.createBasket();
    }


    basket.basketItems = this.addOrUpdate(basket.basketItems, 
      itemToAdd, quantity
    );
    return this.setBasket(basket);
  }
  private addOrUpdate(basketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = basketItems.findIndex(i => i.id === itemToAdd.id);
    if (index == -1) {
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].quantity+= quantity;
    }
    return basketItems;
  }
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }
  
  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const itemIndex = basket.basketItems.findIndex(i => i.id === item.id);
    basket.basketItems[itemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentValue();
    const itemIndex = basket.basketItems.findIndex(i => i.id === item.id);
    if (basket.basketItems[itemIndex].quantity > 1) {
      basket.basketItems[itemIndex].quantity--;
      this.setBasket(basket);
    }
    else {
      this.removeItemFromBasket(item);
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentValue();
    if (basket.basketItems.some(i => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter(i => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      }
      else {
        this.deleteBasketItem(basket);
      }
    }

  }
  deleteBasketItem(basket: IBasket) {
    return this.http.delete(this.baseUrl+"Baskets/delete-basket-item/"+basket.id)
    .subscribe({
      next: (val)=> {
        this.basketSource.next(null!);
        localStorage.removeItem('basketId')
      }
    });
  }

  

}
