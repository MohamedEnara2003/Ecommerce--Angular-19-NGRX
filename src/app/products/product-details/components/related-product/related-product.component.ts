import { Component, inject, input } from '@angular/core';
import { ProductCardComponent } from "../../../components/product-card/product-card.component";
import { Product } from '../../../interface/products';
import { Store } from '@ngrx/store';
import { selectLoadProductsSuccess } from '../../../reducers/products.selectors';
import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectQueryParams } from '../../../../router-reducers/router.selectors';

@Component({
  selector: 'app-related-product',
  imports: [ProductCardComponent],
  template : `
  <section class="w-full flex flex-col justify-center items-center gap-5">
  <div class="w-full">
  <h1 class="text-2xl text-orange-950 capitalize font-bold m-2">related products</h1>
  </div>
  <app-product-card [products]="relatedProducts()!"
  class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center"/>
  </section>
  `
})
export class RelatedProductComponent {
  private store  = inject(Store) ;
  product = input.required<Product | undefined>();

  relatedProducts = toSignal<Product[]>(
  this.store.select(selectQueryParams).pipe(
  map((Params) => Params['category']),
  switchMap((category) => this.store.select(selectLoadProductsSuccess).pipe(
  map((res) => res.products.filter((products) => products.category === category || category === null))
  ))
  )
  );
  
}
