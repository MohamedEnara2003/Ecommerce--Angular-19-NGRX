

import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { ProductByIdState, productReducer, productsReducer, ProductsState } from './products/reducers/products.reducer';
import { cartReducer, cartStateKay } from './cart/reducers/cart.reducer';
import { CartType } from './cart/interface/cart';

export interface AppState {
    products: ProductsState;
    productById : ProductByIdState;
    carts : CartType[]
}

export function localStorageSyncReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return localStorageSync({
    keys: [cartStateKay],
    rehydrate: true,
})(reducer);
}

export const appReducers :ActionReducerMap<AppState> = {
products: productsReducer,
productById: productReducer,
carts : cartReducer
};


export const storeConfig = {
    metaReducers: [localStorageSyncReducer],
};