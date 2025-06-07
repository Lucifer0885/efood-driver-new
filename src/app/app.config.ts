import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './interceptors/httpInterceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GoogleMapsModule } from '@angular/google-maps';
import environment from '../environments/environment';
import {  SocketIoModule } from 'ngx-socket-io';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([httpInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    importProvidersFrom(
      SweetAlert2Module.forRoot({}),
      GoogleMapsModule,
      SocketIoModule.forRoot({
        url: environment.socketUrl,
        options: {}
      })
    ),
  ]
};
