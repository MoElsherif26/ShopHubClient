import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/Models/Pagination';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:44343/api/';
  // baseUrl = 'https://localhost:7229/api/';
  constructor(private http: HttpClient) { }
  // categoryId?: number, sortSelected?: string, search?: string
  getProducts(productParam: ProductParam) {
  let param = new HttpParams();
    if (productParam.CategoryId) {
      param = param.append("CategoryId", productParam.CategoryId);
    }
    
    if (productParam.sortSelected) {
      param = param.append("sort", productParam.sortSelected);

    }

    if (productParam.search) {
      param = param.append("Search", productParam.search);
    }
    param = param.append("PageNumber", productParam.pageNumber);
    param = param.append("pageSize", productParam.pageSize);

    return this.http.get<IPagination>(this.baseUrl + "Products/get-all", {
      params: param
    });
  }
  
  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + "Categories/get-all");

  }
}
