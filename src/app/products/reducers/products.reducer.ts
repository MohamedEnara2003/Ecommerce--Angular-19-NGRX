import { Product } from "../interface/products";
import { createReducer, on } from "@ngrx/store";
import { productsActions } from "./action-types";


export const ProductsStateKay : string = "products" ;
export const ProductByIdStateKay : string = "productById" ;

export interface ProductsState {
    products: Product[],
    loading : boolean,
    error : string,
}

export const initialState : ProductsState = {
    products: [],
    loading : false,
    error : '',
};


export const productsReducer = createReducer(
    initialState, 
    on(productsActions.loadProducts, (state) =>({...state , loading : true})),
    on(productsActions.loadProductsSuccess,(state,{products}) => ({...state ,loading: false, products})),
    on(productsActions.loadProductsFailure,(state,{error}) => ({...state , loading : false, error})),
)


export interface ProductByIdState {
    product: Product | undefined,
    loading : boolean,
    error : string,
}

export const initialProuductState : ProductByIdState = {
    product: undefined,
    loading : false,
    error : '',
};

export const productReducer = createReducer(
    initialProuductState, 
    on(productsActions.loadProduct, (state) =>({...state , loading : true})),
    on(productsActions.loadProductSuccess,(state,{product}) => ({...state ,loading: false, product})),
    on(productsActions.loadProductFailure,(state,{error}) => ({...state , loading : false, error})),
)