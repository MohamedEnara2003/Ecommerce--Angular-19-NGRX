import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cartStateKay } from "./cart.reducer";
import { CartType } from "../interface/cart";


export const selectCartFeature = createFeatureSelector<CartType[]>(cartStateKay);

export const selectCarts = createSelector(
    selectCartFeature ,
    (state) => state
) 

export const selectCartsCount = createSelector(
    selectCartFeature ,
    (state) => state.reduce((prev , cur) => prev += cur.quantity , 0)
) 

export const selectCartsTotalPrice = createSelector(
    selectCartFeature ,
    (state) => state.reduce((prev , cur) => prev += cur.product.price * cur.quantity , 0)
) 

