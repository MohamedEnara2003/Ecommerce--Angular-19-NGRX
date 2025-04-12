import { Component ,computed,inject } from '@angular/core';
import { Product } from '../interface/products';
import { SharedModule } from '../../shared/modules/shared.module';
import { select, Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ErrorMsgComponent } from "../../shared/components/error-msg/error-msg.component";
import { ProductCardComponent } from "../components/product-card/product-card.component";
import { selectLoadProductsSuccess } from '../reducers/products.selectors';
import { SortCategoryComponent } from "../components/sort-category/sort-category.component";
import { ProductsState } from '../reducers/products.reducer';
import { selectQueryParams } from '../../router-reducers/router.selectors';

@Component({
  selector: 'app-products',
  imports: [
    SharedModule,
    LoadingComponent,
    ErrorMsgComponent, 
    ProductCardComponent, 
    SortCategoryComponent],
  template : `
<section class="w-full flex flex-col  justify-center items-center gap-1"> 
<div class="w-[95%] flex flex-col  justify-center items-center gap-5">
    <div class="w-full text-left">
        <h1 class="text-3xl text-orange-950 capitalize font-extrabold m-5">products</h1>
    </div>
    @if( productsData()?.products?.length! > 0){
    <app-sort-category class="w-full" [categories]="categories()"/>
    <app-product-card [products]="products()!" 
    class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center"/>
    }
    <app-loading [isLoading]=" productsData()?.loading!"/>
    <app-error-msg [errorMsg]=" productsData()?.error!"/> 
</div>
</section>
  `
})
export class ProductsComponent {
  private store = inject(Store) ;

  productsData = toSignal<ProductsState>(this.store.pipe(select(selectLoadProductsSuccess)));
  products = toSignal<Product[]>(
  this.store.select(selectQueryParams).pipe(
  map((Params) => Params['category'] as string | null),
  switchMap((category) => this.store.select(selectLoadProductsSuccess).pipe(
  map((res) => res.products.filter((products) => category === undefined  || products.category === category))
  ))
  )
  );

  categories = computed<string[]>(() => 
  this.productsData()?.products?.map((product) => product.category)
  .filter((prevCategory , i) => {
  return i == this. productsData()?.products?.findIndex((curCategory) => prevCategory  === curCategory.category);
  })
  || []
  );


}
