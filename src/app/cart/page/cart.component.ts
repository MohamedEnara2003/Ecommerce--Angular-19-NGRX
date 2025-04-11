import { Component, inject } from '@angular/core';
import { QuantityFieldComponent } from "../../shared/components/quantity-field/quantity-field.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectCarts, selectCartsTotalPrice } from '../reducers/cart.selectors';
import { CartType } from '../interface/cart';
import { SharedModule } from '../../shared/modules/shared.module';
import { RemoveCartComponent } from "../components/remove-cart/remove-cart.component";


@Component({
  selector: 'app-cart',
  imports: [QuantityFieldComponent, SharedModule, RemoveCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private  store  = inject(Store) ;
  carts = toSignal<CartType[]>(this.store.select(selectCarts));;
  totalPrice = toSignal<number>(this.store.select(selectCartsTotalPrice));
}
