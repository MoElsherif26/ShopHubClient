import { IBasketTotal } from '../../Models/Basket';
import { BasketService } from './../../../basket/basket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-total',
  standalone: false,
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.scss'
})
export class OrderTotalComponent implements OnInit {
  basketTotals!: IBasketTotal
  constructor(private basketService: BasketService){}
  ngOnInit(): void {
    this.basketService.basketTotal$.subscribe({
      next: (value)=>{
        this.basketTotals = value;
      }
    });
  }

}
