import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  imports: [],
  template : `
    @if(errorMsg()) { 
    <div class="w-full h-[50vh] flex flex-col justify-center items-center gap-5">
    <h1 class="text-4xl font-extrabold capitalize text-black">error 404</h1>
    <span class="text-error capitalize font-[500] text-lg">{{errorMsg()}}</span>
    </div>
  }
  `
})
export class ErrorMsgComponent {
  errorMsg = input.required<string>()
} 
