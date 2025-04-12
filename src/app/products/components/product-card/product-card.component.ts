import { Component, effect, input, signal } from '@angular/core';
import { Product } from '../../interface/products';
import { SharedModule } from '../../../shared/modules/shared.module';
import { StarsRatingComponent } from "../stars-rating/stars-rating.component";
import { CartService } from '../../../cart/service/cart.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-product-card',
  imports: [SharedModule, StarsRatingComponent],
  template : ` 
    @for (product of products(); track product) {
<div class="relative w-full  h-100  bg-white border border-gray-200 rounded-lg shadow-sm  ">
        <picture [routerLink]="['/products' , product.id]" [queryParams]="{category : product.category.trim()}"
        class="bg-white w-[95%] h-60 flex justify-center items-center my-1">
                        <img
                        class="p-8 rounded-t-lg w-45 object-contain object-center"
                        [src]="product.image"
                        alt="product image"
                        loading="lazy"
                        />
        </picture>
    <div class="px-5 pb-5">
        <a >
      <h5 class="text-lg line-clamp-1 font-semibold tracking-tight text-orange-900">
        {{product.title}}
      </h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <app-stars-rating [productRate]="product.rating.rate"/>
            </div>

        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-orange-950">{{product.price | currency }}</span>
            <a (click)="addToCart(product); isProductAdded.set(product.id)" 
            class="cursor-pointer text-white bg-orange-600 hover:bg-orange-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            Add to cart
            </a>
        </div>
    </div>

  @if(isProductAdded() === product.id){
  <div class="toast  toast-top toast-start absolute  ">
  <div class="alert alert-success  capitalize text-orange-950">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
  stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
  <span>Product added to cart successfully.</span>
  </div>
  </div>
  }

</div>

  }
  `
})
export class ProductCardComponent {
  products = input.required<Product[]>()
  isProductAdded = signal<number>(0);

  constructor(
  private cartService : CartService
  ){
  effect(() => {
  if(this.isProductAdded() > 0){
  timer(1000).subscribe(() => this.isProductAdded.set(0))
  }
  })
  }

  addToCart(product : Product) : void {
  this.cartService.addToCart(product) ;
  }
  
} 
