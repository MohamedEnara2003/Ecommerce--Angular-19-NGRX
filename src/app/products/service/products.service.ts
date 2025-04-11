import { inject, Injectable } from '@angular/core';
import { SingleTonApiService } from '../../core/services/single-ton-api.service';
import { Observable } from 'rxjs';
import { Product } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly typeData = "products"
  private singleTonApi = inject(SingleTonApiService) ;


  getProducts() : Observable<Product[]> {
  return this.singleTonApi.getData(this.typeData)
  }

  getProductById(id : number) : Observable<Product> {
  return this.singleTonApi.getDataBy(this.typeData , id)
  }


}
