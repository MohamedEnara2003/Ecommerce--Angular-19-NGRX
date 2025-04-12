import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
    selectRouteParams,     
    selectCurrentRoute,
    selectUrl,
    selectQueryParams,
    selectRouteData,
} = getRouterSelectors(selectRouter);