import { IBasket, IBasketItem } from '../../shared/Models/Basket';
import { BasketService } from './../basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {

  basket!: IBasket;

  constructor (private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.basket$.subscribe({
      next: (val)=> {
        this.basket = val;

      }
    });
  }
  
  removeBasket(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementQuantity(item: IBasketItem) {
    this.basketService.incrementBasketItemQuantity(item);
  }

  decrementQuantity(item: IBasketItem) {
    this.basketService.decrementBasketItemQuantity(item);
  }



}
