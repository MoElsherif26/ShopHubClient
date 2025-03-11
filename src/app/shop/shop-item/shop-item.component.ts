import { BasketService } from './../../basket/basket.service';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {

  constructor(private basketService: BasketService){}
  @Input() product!: IProduct;
  setBasketValue() {
    this.basketService.addItemToBasket(this.product);
  }
}
