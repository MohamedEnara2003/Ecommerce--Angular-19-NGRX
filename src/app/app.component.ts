import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from "./shared/components/header/header.component";
import { initFlowbite } from 'flowbite';
import { cartActions } from './cart/reducers/actions.types';
import { CartType } from './cart/interface/cart';
import { productsActions } from './products/reducers/action-types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  styleUrl: './app.component.css',
  template : `
<section class=" w-full  bg-gray-50 ">
<app-header />
<router-outlet/>
</section>
`
})

export class AppComponent implements OnInit {
  
  constructor(
  private store: Store<CartType> ,
  ){
  this.initLoadProducts() ;
  }
  
  ngOnInit(): void {
  initFlowbite() ; 
  this.initLoadCarts();
  }

  private initLoadProducts() : void {
  this.store.dispatch(productsActions.loadProducts());
  }

  private initLoadCarts() : void {
  this.store.dispatch(cartActions.loadCart())
  }



}