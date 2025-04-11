import { Component ,signal } from '@angular/core';
import { Product } from '../interface/products';
import { SharedModule } from '../../shared/modules/shared.module';
import { select, Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ErrorMsgComponent } from "../../shared/components/error-msg/error-msg.component";
import { ProductCardComponent } from "../components/product-card/product-card.component";
import { selectLoadProductsSuccess } from '../reducers/products.selectors';
import { SortCategoryComponent } from "../components/sort-category/sort-category.component";
import { ActivatedRoute } from '@angular/router';

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
    @if(products().length > 0){
    <app-sort-category class="w-full" [categories]="categories()"/>
    <app-product-card [products]="products()" 
    class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center"/>
    }
    <app-loading [isLoading]="isLoading()"/>
    <app-error-msg [errorMsg]="errorMsg()"/> 
</div>
</section>
  `
})
export class ProductsComponent {
  
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorMsg = signal<string>('');
  categories = signal<string[]>([]) ;

  constructor(
  private store: Store ,
  private activatedRoute : ActivatedRoute ,
  ){
  this.getProducts();
  }
  
  private getProducts () : void {
    combineLatest([
    this.store.pipe(select(selectLoadProductsSuccess)),
    this.activatedRoute.queryParamMap
    ]).pipe(
    map(([res , queryParamMap]) => {
    const category = queryParamMap.get('category')! ;
    this.isLoading.set(res.loading)
    this.errorMsg.set(res.error)

    const categories = res.products.map((products) => products.category);
    this.categories.set(categories.filter((prevCategory , i) => {
    return i == categories.findIndex((curCategory) => prevCategory  === curCategory);
    }));
    return res.products.filter((product) => product.category === category  
    || category === 'ALL' || category  === null)
    }),
    takeUntilDestroyed()
  ).subscribe({
    next: (value) => {
    this.products.set(value);
    }
  });
  }

}
