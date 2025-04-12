import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { productsActions } from '../../reducers/action-types';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectProductByIdSuccess } from '../../reducers/products.selectors';
import { Product } from '../../interface/products';
import { SharedModule } from '../../../shared/modules/shared.module';
import { StarsRatingComponent } from "../../components/stars-rating/stars-rating.component";
import { QuantityFieldComponent } from "../../../shared/components/quantity-field/quantity-field.component";
import { cartActions } from '../../../cart/reducers/actions.types';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { ErrorMsgComponent } from "../../../shared/components/error-msg/error-msg.component";
import { RelatedProductComponent } from "../components/related-product/related-product.component";
import { ProductByIdState } from '../../reducers/products.reducer';
import { selectRouteParams } from '../../../router-reducers/router.selectors';

@Component({
  selector: 'app-product-details',
  imports: [SharedModule, StarsRatingComponent, QuantityFieldComponent, LoadingComponent, ErrorMsgComponent, RelatedProductComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  private store = inject(Store)
  productData = toSignal<ProductByIdState | undefined>(this.store.select(selectProductByIdSuccess)) ;

  updatedQuantity = signal<number>(1);

  ngOnInit(): void {
    this.initProductById();
  }
  
  private initProductById () : void {
    this.store.select(selectRouteParams).pipe(
    map((params) => params['id']) ,
      ).subscribe({
      next : (productId) =>{ 
        this.store.dispatch(productsActions.loadProduct({productId}))
      }
    })
  }

  getUpdatedQuantity(quantity : number) : void {
  this.updatedQuantity.set(quantity)
  }
  
  addToCart() : void {
  const product : Product = this.productData()?.product! ;
  const quantity = this.updatedQuantity() ;
  if(product){
  this.store.dispatch(cartActions.addToCart({product , quantity}))
  }
  }
}
