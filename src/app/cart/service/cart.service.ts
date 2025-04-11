import { Injectable } from '@angular/core';
import {  Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartType } from '../interface/cart';
import { Product } from '../../products/interface/products';
import { cartActions } from '../reducers/actions.types';
import { selectCarts } from '../reducers/cart.selectors';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
  private store : Store<CartType>
  ) {}

  getCarts() : Observable<CartType[]> {
  return this.store.select(selectCarts);
  }
  
  addToCart(product : Product) : void {
  this.store.dispatch(cartActions.addToCart({product}))
  }
}
