import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductsEffects } from './products/reducers/productsEffects';
import { appReducers, storeConfig } from './app.store';
import { CartEffects } from './cart/reducers/cartEffect';
import { provideRouterStore } from '@ngrx/router-store';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withInMemoryScrolling(scrollConfig)),
    provideHttpClient(withFetch()),

    provideStore( appReducers ,storeConfig),
    provideRouterStore(),
    provideEffects([ProductsEffects , CartEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),



]
};
