import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { IBasket } from '../../shared/Models/Basket';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  count!: Observable<IBasket>;
  constructor(private basketService: BasketService) {}
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId') as string;
    this.basketService.getBasket(basketId).subscribe({
      next: (val: any)=> {
        this.count = this.basketService.basket$;
      },
      error: ()=> {

      }
    });
  }

  visible: boolean = false;

  toggleDropdown() {
    this.visible = !this.visible;
  }

}
