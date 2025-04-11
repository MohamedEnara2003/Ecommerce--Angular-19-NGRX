import { Component, input, output, signal } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-sort-category',
  imports: [SharedModule],
  template : `
  <div class="w-full flex justify-start items-center">
  <ul class="w-full flex flex-wrap justify-center items-center gap-5 capitalize">
    
  <li [routerLink]="['/products']" [queryParams]="{category : null}" > 
  <a (click)="selected.set('ALL') " 
  class="btn btn-neutral  bg-orange-700 text-orange-100"
  [ngClass]="selected() === 'ALL' ? 'bg-transparent text-orange-600' : ''">
  all Products</a>
  </li>
  
  @for (category of categories(); track category) {
  <li [routerLink]="['/products']" [queryParams]="{category : category.trim()}">
  <a (click)="selected.set(category) "
  class="btn btn-neutral  bg-orange-700 text-orange-100"
  [ngClass]="selected() === category ? 'bg-transparent text-orange-600' : ''">
  {{category}}</a>
  </li>
  }
  </ul>
  </div>
  `
})

export class SortCategoryComponent {
  categories = input<string[]>();
  selected = signal<string>('ALL');
}
