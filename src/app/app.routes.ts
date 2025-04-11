import { Routes } from '@angular/router';


export const routes: Routes = [
    {path : 'products' ,
    loadComponent : () => import('./products/page/products.component').then((c) => c.ProductsComponent),
    },
    {path : 'products/:id' , 
    loadComponent : () => import('./products/product-details/page/product-details.component')
    .then((c) => c.ProductDetailsComponent),
    },
    {path : 'cart' , 
    loadComponent : () => import('./cart/page/cart.component')
    .then((c) => c.CartComponent),
    },
    {path : '', redirectTo :'products' , pathMatch : 'full'},
    {path : '**', redirectTo :'products' , pathMatch : 'full'}

];
