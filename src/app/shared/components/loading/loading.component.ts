import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template : `
    @if(isLoading()){
    <div class="w-full h-[50vh] flex justify-center items-center">
    <span class="loading-spinner loading text-success w-30"></span>
    </div>
    }
  `
})
export class LoadingComponent {
  isLoading = input.required<boolean>()
}
