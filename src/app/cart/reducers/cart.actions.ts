import { createAction, props } from "@ngrx/store";
import { CartType } from "../interface/cart";
import { Product } from "../../products/interface/products";


export const addToCart = createAction('[Cart] Add Item',  
props<{product : Product  , quantity?: number}>());
export const removeFromCart = createAction('[Cart] Remove Item', props<{productId: number}>());
export const editQuantityCart = 
createAction('[Quantity Field] edit Quantity Cart ', props<{productId: number ,quantity: number}>());

export const loadCart = createAction('[App] Load from LocalStorage');
export const loadCartSuccess = createAction('[App] Load Success', props<{ carts: CartType[]}>());

export const loadCartFailure  = createAction("[Cart Page] Empty Cart", props<{error : string}>())

