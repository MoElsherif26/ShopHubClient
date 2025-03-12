import { BasketService } from './../../basket/basket.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/Models/Product';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product!: IProduct;
  productMainImage!: string;

  quantity: number = 1;

  constructor(private shopService: ShopService, private route: ActivatedRoute,
    private toast: ToastrService, private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }
  
  loadProduct() {
    this.shopService.getProductDetails(parseInt(this.route.snapshot.paramMap.get('id') as string))
    .subscribe({
      next: (value: IProduct)=> {
        this.product = value;
        this.productMainImage = this.product.photos[0].imageName;
      }
    });
  }

  replaceImage(newImage: string) {
    this.productMainImage = newImage;
  }

  incrementBasket() {
    if (this.quantity < 10){
      this.quantity++;
      this.toast.success("Item has been added to the basket");
    } else {
      this.toast.error("You can not add more than 10 items");

    }
  }
  decrementBasket() {
    if (this.quantity > 1){
      this.quantity--;
      this.toast.warning("Item has been decremented to the basket");
    } else {
      this.toast.error("You can not decrement more than 1 items");

    }
  }

  addToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  calculateDiscount(oldPrice: number, newPrice: number): number {
    return parseFloat(
      Math.round(((oldPrice - newPrice) / oldPrice) * 100).toFixed(1)
    );
  }

}
