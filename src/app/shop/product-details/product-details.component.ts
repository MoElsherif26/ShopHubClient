import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/Models/Product';
import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  product!: IProduct;
  productMainImage!: string;

  constructor(private shopService: ShopService, private route: ActivatedRoute) {}

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
  
}
