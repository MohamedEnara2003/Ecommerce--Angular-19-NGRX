import { Component, inject } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { Store } from '@ngrx/store';
import { selectCartsCount } from '../../../cart/reducers/cart.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [SharedModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private store = inject(Store);
  cartCount = toSignal<number>(this.store.select(selectCartsCount)) ;
}