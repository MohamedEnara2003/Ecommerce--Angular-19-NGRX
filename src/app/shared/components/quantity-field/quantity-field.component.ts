import { Component, input, linkedSignal, output } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { Store } from '@ngrx/store';
import { cartActions } from '../../../cart/reducers/actions.types';

@Component({
  selector: 'app-quantity-field',
  imports: [SharedModule],
  template : `
  <form class="w-28 flex justify-between items-center border-1 border-orange-200 rounded-box px-2 p-2">
    
  <button type="button" (click)="decrement()" class="w-[20%]" 
  [ngClass]="newQuantity() === 1 ? 'cursor-not-allowed' : 'cursor-pointer'">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
  stroke="currentColor" class="size-5 text-orange-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
  </svg>
  </button>

  <input type="text" disabled [value]="newQuantity()" name="Quantity" id="Quantity" 
  class="text-orange-900 outline-hidden border-transparent bg-white w-[60%] text-center">

  <button type="button" (click)="increment()" class="w-[20%]">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
  stroke="currentColor" class="size-5 text-orange-600 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  </button>

</form>
  `
})
export class QuantityFieldComponent {
  id = input<number>();
  existingQuantity = input.required<number>();
  newQuantity = linkedSignal<number>(() => this.existingQuantity());
  sendQuantity = output<number>();
  constructor(
  private store : Store
  ){}

  increment(): void {
  this.updateQuantity(1);
  }

  decrement(): void {
  this.updateQuantity(-1);
  }

  private updateQuantity(value: number): void {
  this.newQuantity.update((curQuantity) => Math.max(curQuantity + value, 1));
  const productId = this.id()!;
  const quantity  = this.newQuantity();

  this.sendQuantity.emit(quantity);
  
  if(productId > -1 && quantity ) {
  this.store.dispatch(cartActions.editQuantityCart({productId , quantity  }))
  }

  }
}
