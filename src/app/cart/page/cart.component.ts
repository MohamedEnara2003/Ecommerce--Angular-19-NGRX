import { Component, signal } from '@angular/core';
import { QuantityFieldComponent } from "../../shared/components/quantity-field/quantity-field.component";

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectCarts, selectCartsTotalPrice } from '../reducers/cart.selectors';
import { CartType } from '../interface/cart';
import { combineLatest, map} from 'rxjs';
import { SharedModule } from '../../shared/modules/shared.module';
import { RemoveCartComponent } from "../components/remove-cart/remove-cart.component";
import { ErrorMsgComponent } from "../../shared/components/error-msg/error-msg.component";


@Component({
  selector: 'app-cart',
  imports: [QuantityFieldComponent, SharedModule, RemoveCartComponent, ErrorMsgComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  carts = signal<CartType[]>([]) ;
  totalPrice = signal<number>(0);
  constructor(
  private store : Store
  ){
  this.getCarts() ;
  }

  private getCarts() : void {
  combineLatest([
  this.store.select(selectCarts) ,
  this.store.select(selectCartsTotalPrice)
  ]).pipe(
  map(([carts , totalPrice]) => {
  this.totalPrice.set(totalPrice) 
  return carts
  }),
  takeUntilDestroyed() ,
  )
  .subscribe({
  next : (value) => {
  this.carts.set(value);
  } ,
  error : (err) => {console.log(err);},
  complete : () => {}
  })
  }
  
 
}
