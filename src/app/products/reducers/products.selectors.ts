import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductByIdState, ProductByIdStateKay, ProductsState, ProductsStateKay } from "./products.reducer";


const selectProductsFeature =  createFeatureSelector<ProductsState>(ProductsStateKay) ;
const selectProductByIdFeature =  createFeatureSelector<ProductByIdState>(ProductByIdStateKay) ;

export const selectLoadProductsSuccess = createSelector(
    selectProductsFeature ,
    (state) => state
)


export const selectProductByIdSuccess = createSelector(
    selectProductByIdFeature ,
    (state) => state
)

