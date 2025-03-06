import { ICategory } from './../shared/Models/Category';
import { IPagination } from '../shared/Models/Pagination';
import { IProduct } from '../shared/Models/Product';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductParam } from '../shared/Models/ProductParam';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  products!: IProduct[];
  categories!: ICategory[];

  productParam = new ProductParam();

  // sorting by price
  SortingOption = [
    {name: 'Price', value: 'Name'},
    {name: 'Price:min-max', value: 'PriceAce'},
    {name: 'Price:max-min', value: 'PriceDce'}
  ]

  // filtering by word
  onSearch(search: string) {
    this.productParam.search = search;
    this.getAllProducts();
  }

  // reset all filteration values
  @ViewChild("sortSelected") selectedSort!: ElementRef;
  @ViewChild("search") searchInput!: ElementRef;

  totalCount!: number;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.productParam.sortSelected = this.SortingOption[0].value;
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.shopService.getProducts(this.productParam).subscribe({
      next: (value: IPagination) => {
        this.products = value.data;
        this.totalCount = value.totalCount;
        this.productParam.pageNumber = value.pageNumber;
        this.productParam.pageSize = value.pageSize;
      }
    });
  }

  onChangePage(event: any) {
    this.productParam.pageNumber = event;
    this.getAllProducts();
  }

  getAllCategories() {
    this.shopService.getCategories().subscribe({
      next: (value) => {
        this.categories = value;
      }
    });
  }

  selectedCategoryId(id: number) {
    this.productParam.CategoryId = id;
    this.getAllProducts(); 
  }

  sortingByPrice(sort:Event) {
    this.productParam.sortSelected = (sort.target as HTMLInputElement).value;
    this.getAllProducts();
  }

  resetFilterationValues() {
    this.productParam.search = "";
    this.productParam.sortSelected = this.SortingOption[0].value;
    this.productParam.CategoryId = 0;
    this.searchInput.nativeElement.value = "";
    this.selectedSort.nativeElement.selectedIndex = 0;
    this.getAllProducts();
  }
}
