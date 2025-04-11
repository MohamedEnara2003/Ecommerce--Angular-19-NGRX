import { createAction, props } from "@ngrx/store";
import { Product } from "../interface/products";




export const loadProducts = createAction(
    '[Products] load Products' ,
)
export const loadProductsSuccess = createAction(
    '[Products] load Products Success' ,
    props<{products : Product[]}>()
)

export const loadProductsFailure = createAction(
    '[Products] load Products Failure' ,
    props<{error : string}>()
)

export const loadProduct = createAction(
    '[Products Details] load Product',
    props<{productId : number}>()
)
export const loadProductSuccess = createAction(
    '[Products Details] load Product Success' ,
    props<{product : Product}>()
)

export const loadProductFailure = createAction(
    '[Products Details] load Product Failure' ,
    props<{error : string}>()
)
