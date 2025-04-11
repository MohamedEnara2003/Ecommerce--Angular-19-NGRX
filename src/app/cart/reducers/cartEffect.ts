import { Injectable, OnInit } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects";
import { map, Observable } from "rxjs";
import { CartType } from "../interface/cart";
import { cartActions } from "./actions.types";
import { cartStateKay } from "./cart.reducer";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";



@Injectable()
export class CartEffects implements OnInit {
    loadCarts$! : Observable<{carts : CartType[]}>;

    constructor(
    private actions$ : Actions ,
    ){}

    ngOnInit(): void {
    this.initLoadCart()
    }

    private initLoadCart() : void {
    this.loadCarts$ = createEffect(() =>
        this.actions$.pipe(
        ofType(cartActions.loadCart),
        map(() => {
            const storedCart = localStorage.getItem(cartStateKay);
            const carts: CartType[] = storedCart ? JSON.parse(storedCart) : [];
            return cartActions.loadCartSuccess({ carts });
        }),
        )
    );
    }

}