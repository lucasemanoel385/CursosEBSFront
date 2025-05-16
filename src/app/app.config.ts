import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenJwtInterceptor } from './config/interceptor-reqJwtToken/token-jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    { provide: LOCALE_ID, useValue: 'pt-BR' },
    
    provideHttpClient(withInterceptors([tokenJwtInterceptor])),

    provideZoneChangeDetection({ eventCoalescing: true }), 

    provideRouter(routes, withComponentInputBinding(),

    withRouterConfig({paramsInheritanceStrategy: 'always'}))]
};
