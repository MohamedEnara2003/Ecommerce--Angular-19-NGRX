import { Actions, createEffect,  ofType } from "@ngrx/effects";
import { ProductsService } from "../service/products.service";
import { productsActions } from "./action-types";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Product } from "../interface/products";





@Injectable()

export class ProductsEffects {
    
    loadProducts$! : Observable<{products : Product[] } | {error : string}>;
    loadProductById$! : Observable<{product : Product} | {error : string}>;

    constructor(
    private actions$: Actions,
    private productsService : ProductsService
    ) {
    this.initLoadProducts();
    this.initLoadProductById();
    }

    private initLoadProducts () : void {
    this.loadProducts$ = createEffect( () => 
            this.actions$.pipe(
                ofType(productsActions.loadProducts),
                switchMap(() => {
                return this.productsService.getProducts().pipe(
                map((products) => 
                productsActions.loadProductsSuccess({products})
                ),
                catchError((_) => of(productsActions.loadProductsFailure
                ({error : "Oops! We couldn't load the products. Please try again later."}))
                ),
                takeUntilDestroyed()
                )
                })
            )
    )
}
    private initLoadProductById () : void {
    this.loadProductById$ = createEffect( () => 
            this.actions$.pipe(
                ofType(productsActions.loadProduct),
                switchMap((data) => {
                return this.productsService.getProductById(data.productId).pipe(
                map((product) => 
                productsActions.loadProductSuccess({product})
                ),
                catchError((_) => of(productsActions.loadProductFailure
                ({error : "Oops! We couldn't load the product. Please try again later."}))
                ),
                )
                })
            )
    )
}
}