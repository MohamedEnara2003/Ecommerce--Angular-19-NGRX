import { Component, input, signal } from '@angular/core';
import { ProductCardComponent } from "../../../components/product-card/product-card.component";
import { Product } from '../../../interface/products';
import { Store } from '@ngrx/store';
import { selectLoadProductsSuccess } from '../../../reducers/products.selectors';
import { combineLatest, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-related-product',
  imports: [ProductCardComponent],
  template : `
  <section class="w-full flex flex-col justify-center items-center gap-5">
  <div class="w-full">
  <h1 class="text-2xl text-orange-950 capitalize font-bold m-2">related products</h1>
  </div>
  <app-product-card [products]="relatedProducts()"
  class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center"/>
  </section>
  `
})
export class RelatedProductComponent {
  product = input.required<Product | undefined>()

  relatedProducts = signal<Product[]>([]) ;
  
  constructor(
  private store : Store ,
  private activatedRoute : ActivatedRoute
  ){
  this.getRelatedProducts()
  }

  private getRelatedProducts () : void {
  combineLatest([
  this.store.select(selectLoadProductsSuccess),
  this.activatedRoute.queryParamMap
  ]).pipe(
  map(([res , queryParamMap]) => {
  const category = queryParamMap.get('category')! ;
  return res.products.filter((products) => products.category === category || category === null)
  }), takeUntilDestroyed()
  ).subscribe({
  next : (values) => {
  this.relatedProducts.set(values)
  },
  error : (err) => {console.log(err)},
  complete : () => {} ,
  })
  }
}
