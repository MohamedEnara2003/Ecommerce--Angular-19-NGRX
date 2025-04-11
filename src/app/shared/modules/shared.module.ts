import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const Imports = [
  CommonModule ,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  RouterLink ,
]

@NgModule({
  declarations: [],
  imports: [...Imports ],
  exports : [...Imports ],

})
export class SharedModule { }
