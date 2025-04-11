import { Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { productsActions } from '../../reducers/action-types';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectProductByIdSuccess } from '../../reducers/products.selectors';
import { Product } from '../../interface/products';
import { SharedModule } from '../../../shared/modules/shared.module';
import { StarsRatingComponent } from "../../components/stars-rating/stars-rating.component";
import { QuantityFieldComponent } from "../../../shared/components/quantity-field/quantity-field.component";
import { cartActions } from '../../../cart/reducers/actions.types';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { ErrorMsgComponent } from "../../../shared/components/error-msg/error-msg.component";
import { RelatedProductComponent } from "../components/related-product/related-product.component";

@Component({
  selector: 'app-product-details',
  imports: [SharedModule, StarsRatingComponent, QuantityFieldComponent, LoadingComponent, ErrorMsgComponent, RelatedProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  
  product = signal<Product | undefined>(undefined);
  isLoading = signal<boolean>(false);
  errorMsg = signal<string>('');
  updatedQuantity = signal<number>(1);

  constructor(
  private activatedRoute: ActivatedRoute ,
  private store : Store ,
  ){
  this.initProductById();
  this.getProductById();
  } 

  private initProductById () : void {
  this.activatedRoute.paramMap.pipe(
  tap((paramMap) => {
  const id = +paramMap.get('id')!
  this.store.dispatch(productsActions.loadProduct({productId : id}))
  }),
  ).subscribe()
  }

  private getProductById() : void {
  this.store.select(selectProductByIdSuccess).pipe(
  map((res) => {
  this.isLoading.set(res.loading);
  this.errorMsg.set(res.error);
  return res.product
  }),
  takeUntilDestroyed()
  ).subscribe({
  next : (value) => {
  this.product.set(value)
  },
  error : (err)  => {console.log(err)},
  complete : () => {},
  })
  }
  
  getUpdatedQuantity(quantity : number) : void {
  this.updatedQuantity.set(quantity)
  }
  
  addToCart() : void {
  const product : Product = this.product()! ;
  const quantity = this.updatedQuantity() ;
  if(product){
  this.store.dispatch(cartActions.addToCart({product , quantity}))
  }
  }
}
