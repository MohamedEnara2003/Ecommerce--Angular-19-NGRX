import { createReducer, on } from "@ngrx/store";
import { CartType } from "../interface/cart";
import { cartActions } from "./actions.types";



export const cartStateKay = "carts" ;


export const initialCart : CartType[] = []


export const cartReducer = createReducer(
initialCart ,
    on(cartActions.addToCart , (state , {product , quantity}) => {
    const itemIndex = state.findIndex((cart) => cart.product.id === product.id);
    const updatedQuantity = quantity || 1 ;
    if(itemIndex > -1) {
    const updatedItem : CartType =
    {...state[itemIndex] , quantity : state[itemIndex].quantity + updatedQuantity};
    const updatedState = [...state];
    updatedState[itemIndex] = updatedItem;
    return updatedState ;
    }else {
    const updatedState = [...state, { product, quantity: quantity ? quantity : 1 }];
    return updatedState ;
    }
    }
    ),
    on(cartActions.removeFromCart, (state , {productId}) => {
    const curCarts = state.filter((cart) => cart.product.id !== productId);
    return curCarts;
    }
    ),
    on(cartActions.editQuantityCart, (state , {productId ,quantity}) => {

    const itemIndex = state.findIndex((cart) => cart.product.id === productId);
    if(itemIndex > -1) {
    const updatedItem : CartType = {...state[itemIndex] , quantity};
    const updatedState = [...state];
    updatedState[itemIndex] = updatedItem;
    return updatedState ;
    }else{
    return state;
    }
    }
    ),
    on(cartActions.loadCartSuccess, (_, { carts }) => carts),

) 