import { Component, signal } from '@angular/core';

import { SharedModule } from '../../modules/shared.module';
import { Store } from '@ngrx/store';
import { selectCartsCount } from '../../../cart/reducers/cart.selectors';
import { noop, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-header',
  imports: [SharedModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  cartCount = signal<number>(0) ;
  
  constructor(private store : Store){
    this.getCartsCount()
  }

  private getCartsCount () : void {
    this.store.select(selectCartsCount).pipe(
    tap((count) => {
    this.cartCount.set(count)
    }),
    takeUntilDestroyed()
    ).subscribe({
    next : noop
    })
  }
  
}
