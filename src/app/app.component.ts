import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from "./shared/components/header/header.component";
import { cartActions } from './cart/reducers/actions.types';
import { CartType } from './cart/interface/cart';
import { productsActions } from './products/reducers/action-types';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  styleUrl: './app.component.css',
  template : `
<section class=" w-full  bg-white ">
<app-header />
<router-outlet/>
<app-footer />
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
  this.initLoadCarts();
  }

  private initLoadProducts() : void {
  this.store.dispatch(productsActions.loadProducts());
  }

  private initLoadCarts() : void {
  this.store.dispatch(cartActions.loadCart())
  }



}