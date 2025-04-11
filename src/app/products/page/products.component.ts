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
  imports: [SharedModule, LoadingComponent, ErrorMsgComponent, ProductCardComponent, SortCategoryComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
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
